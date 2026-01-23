import {
  extractSalaryRangesFromHtml,
  extractSalariesFromPage,
  extractNumbersFromSalaryRanges,
} from "../extractSalariesFromPage";
import { expect, test, describe } from "vitest";

const testcases = [
  `kr 700.000-kr 900 000`,
  "kr 700 000 (ltr 53) til kr 900 000",
  "kr. 700 000,- til kr. 900 000,-",
  "kr 700 000(ltr 68) til kr 900 000 ",
];

test.each(testcases)(".add(%i, %i)", (a, b, expected) => {
  const str = `<body>Du vil få en årslønn innenfor spennet ${a}/body>`;
  const res = extractSalariesFromPage(str);

  expect(res).toEqual([700000, 900000]);
});

test("exctracts the min and max from two salary ranges", () => {
  const str =
    "<body>Du vil få en årslønn innenfor spennet kr 630.000-860.000/body>";
  const res = extractSalariesFromPage(str);

  expect(res).toEqual([630000, 860000]);
});

describe("extractSalaryRangesFromHtml", () => {
  test("should extract all salary ranges from HTML", () => {
    const html = `
      <body>
        Here are two salary ranges: kr. 500 000 - 600 000 and kr. 700 000 - 800 000
      </body>
    `;
    const expected = ["kr. 500 000 - 600 000 ", "kr. 700 000 - 800 000"];
    const result = extractSalaryRangesFromHtml(html);
    expect(result).toEqual(expected);
  });
  test("should extract all salary ranges from HTML", () => {
    const html = `
      <body>
        Here are two salary ranges: kr 720.000 - kr 880.000
      </body>
    `;
    const expected = ["kr 720.000 - kr 880.000"];
    const result = extractSalaryRangesFromHtml(html);
    expect(result).toEqual(expected);
  });
  test("should extract all salary ranges from HTML", () => {
    const html = `
      <body>
        Here are two salary ranges: kr. 500 000 til 600 000 and kr. 700 000 til 800 000
      </body>
    `;
    const expected = ["kr. 500 000 til 600 000 ", "kr. 700 000 til 800 000"];
    const result = extractSalaryRangesFromHtml(html);
    expect(result).toEqual(expected);
  });
  test("should extract all salary ranges from HTML", () => {
    const html = `
      <body>
        Here are two salary ranges:  kr. 700 000 - 800 000
      </body>
    `;
    const expected = ["kr. 700 000 - 800 000"];
    const result = extractSalaryRangesFromHtml(html);
    expect(result).toEqual(expected);
  });
  test("should extract all salary ranges from HTML", () => {
    const html = `
      <body>
        Here are two salary ranges:  kr. 700 000 - 800 000
      </body>
    `;
    const expected = ["kr. 700 000 - 800 000"];
    const result = extractSalaryRangesFromHtml(html);
    expect(result).toEqual(expected);
  });
  test("should extract all salary ranges from HTML", () => {
    const html = `
      <body>
        Here are two salary ranges:  kr 700 000 - 800 000
      </body>
    `;
    const expected = ["kr 700 000 - 800 000"];
    const result = extractSalaryRangesFromHtml(html);
    expect(result).toEqual(expected);
  });
  test("should extract all salary ranges from HTML", () => {
    const html = `
      <body>
        Here are two salary ranges:  kr. 700 000,- til kr. 900 000,-"
      </body>
    `;
    const expected = ["kr. 700 000 - 900 000"];
    const result = extractSalaryRangesFromHtml(html);
    expect(result).toEqual(expected);
  });
  test("should extract all salary ranges from HTML", () => {
    const html = `
      <body>
        Here are two salary ranges:  kr. 700 000 – 800 000
      </body>
    `;
    const expected = ["kr. 700 000 – 800 000"];
    const result = extractSalaryRangesFromHtml(html);
    expect(result).toEqual(expected);
  });
  test("should extract all salary ranges from HTML", () => {
    const html = `
      <body>
        Here are two salary ranges: kr 648 700 til kr 994 200
      </body>
    `;
    const expected = ["kr 648 700 til kr 994 200"];
    const result = extractSalaryRangesFromHtml(html);
    expect(result).toEqual(expected);
  });
  test("should extract all salary ranges from HTML", () => {
    const html = `
      <body>
        Here are two salary ranges: kr. 648 700 til kr. 994 200
      </body>
    `;
    const expected = ["kr. 648 700 til kr. 994 200"];
    const result = extractSalaryRangesFromHtml(html);
    expect(result).toEqual(expected);
  });
  test("should extract all salary ranges from HTML", () => {
    const html = `
      <body>
        Here are two salary ranges: kr 630.000-860.000
      </body>
    `;
    const expected = ["kr 630.000-860.000"];
    const result = extractSalaryRangesFromHtml(html);
    expect(result).toEqual(expected);
  });
  test("should extract all salary ranges from HTML", () => {
    const html = `
      <body>
        Here are two salary ranges: 765 600 kr 1 024 200 kr.
      </body>
    `;
    const expected = [" 765 600 kr 1 024 200 kr"];
    const result = extractSalaryRangesFromHtml(html);
    expect(result).toEqual(expected);
  });
  test("prefixed kr, only on last number", () => {
    const html = `
      <body>
        Here are two salary ranges: 801 700 – 1 094 900 kr
      </body>
    `;
    const expected = [" 801 700 – 1 094 900 kr"];
    const result = extractSalaryRangesFromHtml(html);
    expect(result).toEqual(expected);
  });
  test("with dot in numbers", () => {
    const html = `
      <body>
        Here are two salary ranges: kr. 700.000 til 860.000
      </body>
    `;
    const expected = ["kr. 700.000 til 860.000"];
    const result = extractSalaryRangesFromHtml(html);
    expect(result).toEqual(expected);
  });
  test("with og separator", () => {
    const html = `
      <body>
        Salary range: kr 800 000 og 1 050 000
      </body>
    `;
    const expected = ["kr 800 000 og 1 050 000"];
    const result = extractSalaryRangesFromHtml(html);
    expect(result).toEqual(expected);
  });
});

describe("postfix kr", () => {
  test("should extract all salary ranges from HTML", () => {
    const html = `
      <body>
        Here are two salary ranges: 648 700 kr til 994 200 kr
      </body>
    `;
    const expected = [" 648 700 kr til 994 200 kr"];
    const result = extractSalaryRangesFromHtml(html);
    expect(result).toEqual(expected);
  });
  test("should extract all salary ranges from HTML", () => {
    const html = `
      <body>
        Here are two salary ranges: 648 700 kr. til 994 200 kr.
      </body>
    `;
    const expected = [" 648 700 kr. til 994 200 kr"];
    const result = extractSalaryRangesFromHtml(html);
    expect(result).toEqual(expected);
  });
});

describe("extract numbers", () => {
  test("extracts numbers from multiple strings", () => {
    const strings = ["kr 800 000 til 900 000", "kr 50 000 til 1 000 000"];
    expect(extractNumbersFromSalaryRanges(strings)).toEqual([
      800000, 900000, 50000, 1000000,
    ]);
  });
  test("postfix kr", () => {
    const strings = ["800 000 kr - 900 000 kr"];
    expect(extractNumbersFromSalaryRanges(strings)).toEqual([800000, 900000]);
  });
  test("dots", () => {
    const strings = ["kr. 700.000 til 860.000"];
    expect(extractNumbersFromSalaryRanges(strings)).toEqual([700000, 860000]);
  });
  test("dots", () => {
    const strings = ["kr 700.000-kr 900 000"];
    expect(extractNumbersFromSalaryRanges(strings)).toEqual([700000, 900000]);
  });
  test("dots", () => {
    const strings = ["kr 790.000 – 1.030.000"];
    expect(extractNumbersFromSalaryRanges(strings)).toEqual([790000, 1030000]);
  });
});
