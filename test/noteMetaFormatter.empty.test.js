var expect = require('chai').expect;
var metaFormatter = require('../src/formatters/noteMetaFormatter');

describe("Tests when Note Meta Content Formatter returns empty", () => {
  describe("Test when Author and Date are empty", () => {
    const assertCreatesEmptyString = (author, date) =>
      expect(
        metaFormatter.format(author, date)
      ).to.equal('')

    it("Is empty: undefined author and undefined date", () => 
      assertCreatesEmptyString(undefined, undefined))
    it("Is empty: undefined author and null date", () => 
      assertCreatesEmptyString(undefined, null))
    it("Is empty: null author and undefined date", () => 
      assertCreatesEmptyString(null, undefined))
    it("Is empty: null author and null date", () => 
      assertCreatesEmptyString(null, null))
    it("Is empty: empty author and null date", () => 
      assertCreatesEmptyString('', null))
    it("Is empty: whitespace author and null date", () => 
      assertCreatesEmptyString(' ', null))
    it("Is empty: empty author and undefined date", () => 
      assertCreatesEmptyString('', undefined))
    it("Is empty: whitespace author and undefined date", () => 
      assertCreatesEmptyString(' ', undefined))
  })
})