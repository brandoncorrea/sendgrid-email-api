var expect = require('chai').expect;
var metaFormatter = require('../src/formatters/metaFormatter');

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

const getDateString = date => 
  `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

const range = (size) => [... Array(size).keys()];

describe("Tests when MetaFormatter receives only a Date", () => {
  const assertDateEquals = (date, expected) => 
    expect(metaFormatter.format(null, date))
    .to.equal(expected)

  it("Formats new Date()", () =>
    assertDateEquals(new Date(), getDateString(new Date())))
  it("Formats Every Month Properly", () => 
    range(12).map(i => 
      assertDateEquals(new Date(2021, i, 1), `${months[i]} 1, 2021`)))
  it("Handles December 31st Properly", () => 
    assertDateEquals(new Date(2021, 11, 31), 'December 31, 2021'));
})
