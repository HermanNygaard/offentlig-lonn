import { expect, test } from "vitest";
import { getLastPageNumber } from "../scraper";

test("get all page numbers", () => {
  const html =
    '<div class="u-hide-lt768"><a aria-label="Side 1" href="?occupation=0.23&amp;q=kr&amp;sort=PUBLISHED_DESC" aria-current="page" class="pagination__page button button--pill">1</a><a aria-label="Side 2" href="?occupation=0.23&amp;q=kr&amp;sort=PUBLISHED_DESC&amp;page=2" class="pagination__page button button--pill">2</a><a aria-label="Side 3" href="?occupation=0.23&amp;q=kr&amp;sort=PUBLISHED_DESC&amp;page=3" class="pagination__page button button--pill">3</a></div>';

  const nPages = getLastPageNumber(html);
  expect(nPages).toEqual([1, 2, 3]);
});
