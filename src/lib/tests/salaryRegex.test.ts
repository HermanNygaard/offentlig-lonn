import { expect, test, describe, it } from "vitest";
const regex = /kr\.?\s?([\d,. ]+)\s*(?:-|–|til)\s*([\d,. ]+)/i;

const possibleSalaryFormats = [
  "kr. 701 300 - kr. 864 500",
  "kr. 701 300 - 864 500",
  "kr 701 300 - kr 864 500",
  "kr 750.000-900.000",
  "kr. 750 000 – 950 000",
  "kr 750.000 – 920.000",
  "kr 765 000 – kr 920 000",
  "kr 500 000 til 565 000",
  "kr 648 700 til kr 994 200",
];

describe("Regular expression to extract two numbers from string", () => {
  it('matches "kr. 701 300 - kr. 864 500"', () => {
    const str = "kr. 701 300 - kr. 864 500";
    const matches = str.match(regex);

    expect(matches).toEqual(
      expect.arrayContaining([
        "kr. 701 300 - kr. 864 500",
        "701 300",
        "864 500",
      ]),
    );
  });

  it('matches "kr 500 000 til 565 000"', () => {
    const str = "kr 500 000 til 565 000";
    const result = regex.exec(str).map((e) => e.trim());
    expect(result).toEqual(
      expect.arrayContaining(["kr 500 000 til 565 000", "500 000", "565 000"]),
    );
  });

  it('matches "kr.701 300–kr.864 500"', () => {
    const str = "kr.701 300–kr.864 500";
    const result = regex.exec(str).map((e) => e.trim());
    expect(result).toEqual(
      expect.arrayContaining(["kr.701 300–kr.864 500", "701 300", "864 500"]),
    );
  });

  it('matches "kr 500 000 - 565 000"', () => {
    const str = "kr 500 000 - 565 000";
    const result = regex.exec(str).map((e) => e.trim());
    expect(result).toEqual(
      expect.arrayContaining(["kr 500 000 - 565 000", "500 000", "565 000"]),
    );
  });

  it('matches "kr. 701 300 - 864 500"', () => {
    const str = "kr. 701 300 - 864 500";
    const result = regex.exec(str).map((e) => e.trim());
    expect(result).toEqual(
      expect.arrayContaining(["kr. 701 300 - 864 500", "701 300", "864 500"]),
    );
  });

  it('matches "kr 500 000-565 000"', () => {
    const str = "kr 500 000-565 000";
    const result = regex.exec(str).map((e) => e.trim());
    expect(result).toEqual(
      expect.arrayContaining(["kr 500 000-565 000", "500 000", "565 000"]),
    );
  });
  it('matches "kr 500 000-565 000"', () => {
    const str = "kr 750.000 – 920.000";
    const result = regex.exec(str).map((e) => e.trim());
    expect(result).toEqual(
      expect.arrayContaining(["kr 750.000 – 920.000", "750.000", "920.000"]),
    );
  });
  it("matches kr. 750 000 – 950 000", () => {
    const str = "kr. 750 000 – 950 000";
    const result = regex.exec(str).map((e) => e.trim());
    expect(result).toEqual(
      expect.arrayContaining(["kr. 750 000 – 950 000", "750 000", "950 000"]),
    );
  });
});
