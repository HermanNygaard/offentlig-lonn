import * as cheerio from "cheerio";

export const getNextDDTag = (
  cheerio: cheerio.CheerioAPI,
  dtTagName: string
) => {
  const dtTag = cheerio("dt")
    .filter(function () {
      return cheerio(this).text().trim() === dtTagName;
    })
    .first();

  // Find the value of the next <dd> tag
  return dtTag.next("dd").text().trim();
};
