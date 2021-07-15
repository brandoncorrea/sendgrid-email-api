/*
  Tests for Sermon Note Formatter
*/

var expect = require("chai").expect;
var formatter = require("../src/formatters/sermonNoteContentFormatter");

/* Note Formatter helper methods */

// Asserts the formatted input is equal the expected conversion
const testInput = (input, expectedOutput) =>
  expect(formatter.format(input))
  .to.equal(expectedOutput);

// Asserts the formatted input is equal to an empty string
const assertReturnsEmptyString = input => 
  testInput(input, "");

/* Note Formatter Tests */

// Tests for the formatter
describe("Formats HTML to email-compatible content", () => {
  // Tests empty inputs
  describe("Test Empty Inputs", () => {
    it("Returns Empty String for Empty String", () =>
      assertReturnsEmptyString(""))
    it("Returns Empty String for Single Space", () =>
      assertReturnsEmptyString(" "))
    it("Returns Empty String for Null", () =>
      assertReturnsEmptyString(null))
    it("Returns Empty String for Undefined", () =>
      assertReturnsEmptyString(undefined))
  })

  // Tests Input tags
  describe("Replace Input tags with their values", () => {
    it("Handles input tag inside div", () =>
      testInput(
        '<div><input type="text" value="message" /></div>', 
        '<div>message</div>'))

    it("Handles input tag by itself", () =>
      testInput(
        '<input type="text" value="message" />',
        'message'))

    it("Handles input tag without a value", () =>
      testInput(
        '<input type="text" />',
        ''))

    it("Handles many input tags inside div", () =>
      testInput(
        '<div>' + 
          '<input type="text" value="message1" />' +
          '<input type="text" value="message2" />' +
          '<input type="text" value="message3" />' +
        '</div>',
        '<div>message1message2message3</div>'))

    it("Handles many input tags by themselves", () =>
      testInput(
        '<input type="text" value="message1" />' +
        '<input type="text" value="message2" />' +
        '<input type="text" value="message3" />',
        'message1message2message3'))
  })

  // Tests textarea tags
  describe("Replace TextArea tags with their innerHTML", () => {
    it("Handles Empty Elements", () =>
      testInput('<textarea></textarea>', ''))

    it("Handles elements with text only", () =>
      testInput('<textarea>Message</textarea>', 'Message'))
  })
})