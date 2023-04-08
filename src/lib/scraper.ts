import * as cheerio from "cheerio";
import { devData } from "./devData";
import { extractSalariesFromPage } from "./extractSalariesFromPage";
import { getNextDDTag } from "./helpers";
import Redis from "ioredis";
import { isDev } from "./constants";

const generateQuery = (page: number) =>
  `https://www.finn.no/job/fulltime/search.html?job_sector=1812&occupation=0.23&page=${page}&q=kr&sort=PUBLISHED_DESC`;

export interface Post {
  title: string;
  salaryMin: number;
  salaryMax: number;
  location: string;
  company: string;
  finnUrl: string;
  imageUrl: string;
}

export async function scrapeAdPage(pageNumber: number): Promise<Post[]> {
  let res = await fetch(generateQuery(pageNumber));
  const html = await res.text();
  const $ = cheerio.load(html);

  // Find all anchor tags that match the specified format
  const links = $("a[id][href].ads__unit__link")
    .map((_, link) => {
      const href = $(link).attr("href");
      return href;
    })
    .toArray();

  // todo order of links / finnCodes is important for published order, or last modified date
  const finnCodes = links.map((link) => link.match(/finnkode=(\d+)/)[1]);
  console.log(finnCodes);
  const redis = new Redis(process.env.REDIS_URL);

  // todo. redis get all for historic old jobposts?
  const cache = await redis.mget(finnCodes);
  const salaries = [];
  const docsToFetch: Promise<{
    doc: string;
    originalIndex: number;
  }>[] = [];
  cache.forEach((c, i) => {
    if (c) {
      console.log("CACHE HIT!");
      salaries.push(JSON.parse(c));
    } else {
      console.log("CACHE MISS!" + c + finnCodes[i]);
      docsToFetch.push(
        fetch(links[i]).then((res) =>
          res.text().then((doc) => ({ doc, originalIndex: i }))
        )
      );
    }
  });
  const rawDocuments = await Promise.all(docsToFetch);
  for (let i = 0; i < rawDocuments.length; i++) {
    const { doc, originalIndex } = rawDocuments[i];
    const $ = cheerio.load(doc);

    // Job posts sometimes have more than one salary range,
    // eg. for junior and senior. This
    const allSalaries = extractSalariesFromPage(doc);
    const jobTitle = getNextDDTag($, "Stillingstittel");
    const company = getNextDDTag($, "Arbeidsgiver");
    const imageUrl =
      $('a[data-controller*="trackShow"][data-controller*="Logo"] > img').attr(
        "src"
      ) ?? "";

    const salaryMin = Math.min(...allSalaries);
    const salaryMax = Math.max(...allSalaries);
    const salary = {
      salaryMin,
      salaryMax,
      title: jobTitle,
      company,
      finnUrl: links[originalIndex],
      location: "Oslo",
      imageUrl,
    };
    await redis.set(finnCodes[originalIndex], JSON.stringify(salary));
    salaries.push(salary);
  }
  if (isDev) {
    return salaries;
  }
  return salaries.filter((salary) => salary.salaryMin > 100000);
}

export async function getAllPageNumbers(doc: string) {
  const $ = cheerio.load(doc);
  const lastPageNum = parseInt($("a.pagination__page").last().text());
  return Array.from({ length: lastPageNum }, (_, i) => i + 1);
}

export async function scrapeAds(): Promise<Post[]> {
  if (isDev) {
    return devData;
  }
  const firstPage = await fetch(generateQuery(1));
  const html = await firstPage.text();

  const allPageNumbers = await getAllPageNumbers(html);
  const pages = await Promise.all(allPageNumbers.map(scrapeAdPage));
  const uniqueUrls = pages.flat().reduce<Post[]>((names, item) => {
    if (!names.find((it) => it.finnUrl === item.finnUrl)) {
      return [...names, item];
    }
    return names;
  }, []);

  return uniqueUrls;
}
