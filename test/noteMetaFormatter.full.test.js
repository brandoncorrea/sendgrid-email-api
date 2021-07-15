var expect = require('chai').expect;
var metaFormatter = require('../src/formatters/noteMetaFormatter');

describe("Tests for formatting Author and Date together", () => {
  const assertFormatEquals = (author, date, expected) =>
    expect(metaFormatter.format(author, date))
    .to.equal(expected);

  it("Adds pipe between date author and date", () => 
    assertFormatEquals(
      'Brandon Correa', 
      new Date(2021, 10, 12), 
      'Brandon Correa | November 12, 2021'))
})
