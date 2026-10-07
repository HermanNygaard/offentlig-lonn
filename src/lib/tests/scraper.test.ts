import { expect, test } from "vitest";
import { extractJobTitle, getLastPageNumber } from "../scraper";

test("get all page numbers", () => {
  const html =
    '<div class="u-hide-lt768"><a aria-label="Side 1" href="?occupation=0.23&amp;q=kr&amp;sort=PUBLISHED_DESC" aria-current="page" class="pagination__page button button--pill">1</a><a aria-label="Side 2" href="?occupation=0.23&amp;q=kr&amp;sort=PUBLISHED_DESC&amp;page=2" class="pagination__page button button--pill">2</a><a aria-label="Side 3" href="?occupation=0.23&amp;q=kr&amp;sort=PUBLISHED_DESC&amp;page=3" class="pagination__page button button--pill">3</a></div>';

  const nPages = getLastPageNumber(html);
  expect(nPages).toEqual([1, 2, 3]);
});

test("uses the first page when FINN does not render pagination", () => {
  const html = `
    <main>
      <article>
        <a href="https://www.finn.no/job/ad/477206214">Job advert</a>
      </article>
    </main>
  `;

  expect(getLastPageNumber(html)).toEqual([1]);
});

test("gets the job title from the current FINN structured data", () => {
  const html = `
    <main>
      <h2>FinOps-plattformingeniør</h2>
      <h2>Kortversjonen</h2>
      <h1>FinOps-plattformingeniør - optimaliser skyplattformen</h1>
    </main>
    <script type="application/ld+json">
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "JobPosting",
          "title": "FinOps-plattformingeniør"
        }
      }
    </script>
  `;

  expect(extractJobTitle(html)).toBe("FinOps-plattformingeniør");
});

test("falls back to the main heading when structured data is unavailable", () => {
  const html = `
    <header><h1>FINN Jobb</h1></header>
    <main><h1>Seniorutvikler</h1><h2>Om arbeidsgiveren</h2></main>
  `;

  expect(extractJobTitle(html)).toBe("Seniorutvikler");
});
