var expect = require('chai').expect;
var metaFormatter = require('../src/formatters/noteMetaFormatter');

describe("Tests when Meta Content Formatter Receives only Author", () => {
  describe("Test when Author has value and Date is empty", () => {
    const assertCreatesAuthorString = (author, date) => 
      expect(metaFormatter.format(author, date)
    ).to.equal(author)

    it("Is 'FirstName' Author and null Date", () =>
      assertCreatesAuthorString("FirstName", null))
    it("Is 'FirstName' Author and undefined Date", () =>
      assertCreatesAuthorString("FirstName", undefined))
    it("Is 'First Last' Author and null Date", () => 
      assertCreatesAuthorString("First Last", null))
    it("Is 'First Last' Author and undefined Date", () => 
      assertCreatesAuthorString("First Last", undefined))
  })

  describe("Test author name Formatting", () => {
    const assertAuthorEquals = (author, expected) =>
      expect(
        metaFormatter.format(author, null)
      ).to.equal(expected)

    it("Capitalizes first character", () =>
      assertAuthorEquals('firstName', 'FirstName'))
    it("Capitalizes All Names", () =>
      assertAuthorEquals('funny little bunny', 'Funny Little Bunny'))
    it("Capitalizes Single Character Words", () =>
      assertAuthorEquals('first s third', 'First S Third'))
    it("Capitalizes Single Character", () =>
      assertAuthorEquals('a', 'A'))
    it("Capitalizes Names that are already Capitalized", () =>
      assertAuthorEquals('This Is Capitalized', 'This Is Capitalized'))
    it("Retains capitalization in the middle of a name", () =>
      assertAuthorEquals('mcFarley mcGregor macBeth', 'McFarley McGregor MacBeth'))
    it("Excludes extra spacing", () =>
      assertAuthorEquals('  Brandon   Armon   Correa  ', 'Brandon Armon Correa'))
  })
})
