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
  const links = $("a[id][href].sf-search-ad-link")
    .map((_, link) => {
      const href = $(link).attr("href");
      return href;
    })
    .toArray();

  // todo order of links / finnCodes is important for published order, or last modified date
  const finnCodes = links.map((link) => link.match(/finnkode=(\d+)/)?.[1]);
  console.log({ finnCodes });

  // todo. redis get all for historic old jobposts?
  const salaries = [];
  const docsToFetch = links.map((l, i) =>
    fetch(l).then((res) =>
      res.text().then((doc) => ({ doc, originalIndex: i }))
    )
  );
  const rawDocuments = await Promise.all(docsToFetch);
  for (let i = 0; i < rawDocuments.length; i++) {
    const { doc, originalIndex } = rawDocuments[i];
    const $ = cheerio.load(doc);

    // Job posts sometimes have more than one salary range,
    // eg. for junior and senior. This
    const allSalaries = extractSalariesFromPage(
      $("body main article section").text()
    );
    const jobTitle = $("h2").eq(1).text();
    const image = $("img[alt*='logo']");
    const company = image.attr("alt")?.split(" ")?.[0] ?? "";
    const imageUrl = image.attr("src") ?? "";

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
    salaries.push(salary);
  }

  return salaries.filter((salary) => salary.salaryMin > 100000);
}

function getLastPageNumber(doc: string) {
  const $ = cheerio.load(doc);
  const pages = $('a[aria-label^="Side"]');
  const lastPage = Math.max(
    ...pages.map((i, el) => parseInt($(el).text())).get()
  );
  return Array.from({ length: lastPage }, (_, i) => i + 1);
}

export async function scrapeAds(): Promise<Post[]> {
  const firstPage = await fetch(generateQuery(1));
  const html = await firstPage.text();

  const allPageNumbers = getLastPageNumber(html);
  const pages = await Promise.all(allPageNumbers.map(scrapeAdPage));
  const uniqueUrls = pages.flat().reduce<Post[]>((names, item) => {
    if (!names.find((it) => it.finnUrl === item.finnUrl)) {
      return [...names, item];
    }
    return names;
  }, []);

  return uniqueUrls;
}
