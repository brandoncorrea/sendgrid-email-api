var expect = require("chai").expect;
var formatter = require("../src/formatters/noteFormatter");

describe("Formats HTML to email-compatible content", () => {
  describe("Test Empty Inputs", () => {

    const assertReturnsEmptyString = input => 
      expect(formatter.format(input)).to.equal("");

    it("Returns Empty String for Empty String", () =>
      assertReturnsEmptyString(""))
    it("Returns Empty String for Null", () =>
      assertReturnsEmptyString(null))
    it("Returns Empty String for Undefined", () =>
      assertReturnsEmptyString(undefined))
    it("Returns Empty String for Single Space", () =>
      assertReturnsEmptyString(" "))
  })

  

})