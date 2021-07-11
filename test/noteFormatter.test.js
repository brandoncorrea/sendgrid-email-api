/*
  Tests for Sermon Note Formatter
*/

var expect = require("chai").expect;
var formatter = require("../src/formatters/noteFormatter");
var xmlHelper = require("../src/helpers/xmlHelper");

// Tests for the formatter
describe("Formats HTML to email-compatible content", () => {

  // Returns an HTML container from an HTML string
  const getExpectedString = expectedHtmlString =>
    xmlHelper.xmlToString(xmlHelper.stringToHtml(expectedHtmlString));

  describe("Test Empty Inputs", () => {

    const assertReturnsEmptyString = input => 
      expect(
        formatter.format(input)
      ).to.equal(
        getExpectedString(""));

    it("Returns Empty String for Empty String", () =>
      assertReturnsEmptyString(""))
    it("Returns Empty String for Single Space", () =>
      assertReturnsEmptyString(" "))
    it("Returns Empty String for Null", () =>
      assertReturnsEmptyString(null))
    it("Returns Empty String for Undefined", () =>
      assertReturnsEmptyString(undefined))
  })

  describe("Replace Input tags with their values", () => {
    it("Handles input tag inside div", () => {
      var input = '<div><input type="text" value="message" /></div>';
      var expected = getExpectedString('<div>message</div>');
      var actual = formatter.format(input);
      expect(actual).to.equal(expected);
    })

    it("Handles input tag by itself", () => {
      var input = '<input type="text" value="message" />';
      var expected = getExpectedString('message');
      var actual = formatter.format(input);
      expect(actual).to.equal(expected);
    })

    it ("Handles many input tags inside div", () => {
      var input = '<div>';
      input += '<input type="text" value="message1" />';
      input += '<input type="text" value="message2" />';
      input += '<input type="text" value="message3" />';
      input += '</div>';
      var expected = getExpectedString('<div>message1message2message3</div>');
      var actual = formatter.format(input);
      expect(actual).to.equal(expected);
    })

    it ("Handles many input tags by themselves", () => {
      var input = '<input type="text" value="message1" />'
      input += '<input type="text" value="message2" />'
      input += '<input type="text" value="message3" />'
      var expected = getExpectedString('message1message2message3');
      var actual = formatter.format(input);
      expect(actual).to.equal(expected);
    })
  })

})