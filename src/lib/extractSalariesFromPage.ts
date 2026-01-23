export function extractSalaryRangesFromHtml(doc: string) {
  const prefixKrRegex =
    /kr\.?\s*([\d,. ]+)\s*(?:-|–|til)\s*(?:kr)?\s*([\d,. ]+)/gi;
  const postFixKrRegex = /([\d. ]+)kr\.?\s*(?: -|–|til)\s*([\d,. ]+)(kr)?/gi;
  const krAtLast = /([\d. ]+)(kr)?\.?\s*(?: -|–|til|)\s*([\d,. ]+)(kr)/gi;
  const prefixMatches = doc.match(prefixKrRegex);
  const postfixMatches = doc.match(postFixKrRegex);
  const lastMatches = doc.match(krAtLast);

  if (extractNumbersFromSalaryRanges(prefixMatches).length >= 2) {
    return prefixMatches;
  } else if (extractNumbersFromSalaryRanges(postfixMatches).length >= 2) {
    return postfixMatches;
  }
  return lastMatches;
}

/**
 * Returns all salaries from the salary ranges string array.
 * @example
 * input: ["kr 400 - 500", "kr 600 - 700"]
 * returns: [400, 500, 600, 700]
 */
export function extractNumbersFromSalaryRanges(salaries: string[] = []) {
  const regex = /\d+(?:[\s.]\d+)*/g;

  const numbers = salaries?.flatMap((str) =>
    str.match(regex)?.map((num) => parseInt(num.replace(/[\s.]/g, ""))),
  );

  return numbers ?? [];
}

/**
 *
 * @param document The whole document as string
 * @returns array of salaries in numbers
 *
 */
export function extractSalariesFromPage(document: string) {
  // ["kr. 4 - 4400". "kr. 400 - 500"]
  const salariesStrings = extractSalaryRangesFromHtml(document);
  const allSalaries = extractNumbersFromSalaryRanges(salariesStrings);
  return allSalaries;
}
