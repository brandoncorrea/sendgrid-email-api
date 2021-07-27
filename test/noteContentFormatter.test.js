/*
  Tests for Sermon Note Formatter
*/

var expect = require("chai").expect;
var formatter = require("../src/formatters/noteContentFormatter");

/* Note Formatter helper methods */

// Asserts the formatted input is equal the expected conversion
const testInput = (input, expectedOutput) =>
  expect(formatter.format(input))
  .to.equal(expectedOutput);

/* Note Formatter Tests */

// Tests for the formatter
describe("Formats HTML to email-compatible content", () => {

  // Tests empty inputs
  describe("Test Empty Inputs", () => {
    // Asserts the formatted input is equal to an empty string
    const assertReturnsEmptyString = input => 
      testInput(input, "");

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

  // Tests Button Tags
  describe("Remove all button tags", () => {
    it("Removes single button tag", () =>
      testInput('<button></button>', ''))
    it("Removes buttons with inner HTML", () =>
      testInput('<button>Test Button</button>', ''))
    it("Removes buttons with onclick attributes", () =>
      testInput('<button onclick="clickEvent()">Test Button</button>', ''))
    it("Removes buttons within a div", () =>
      testInput('<div><button onclick="clickEvent()">Test Button</button></div>', '<div></div>'))
    it("Removes buttons with sibling elements", () =>
      testInput('<button onclick="clickEvent()">Test Button</button><p>Test Text</p>', '<p>Test Text</p>'))
    it("Removes buttons with sibling elements inside a div", () =>
      testInput('<div><button onclick="clickEvent()">Test Button</button><p>Test Text</p></div>', '<div><p>Test Text</p></div>'))
  })

  // Tests Input Tags with type Button
  describe("Remove inputs with Button types", () => {
    it("Removes single button inputs", () => 
      testInput('<input type="button" />', ''))
    it("Does not replace button input with value", () => 
      testInput('<input type="button" value="Button Value" />', ''))
  })

  // Tests Select Tags
  describe("Replaces select tags with their values", () => {
    it("Replaces select tag with its selected value", () =>
      testInput('<select>' +
          '<option value="1">Option 1</option>' +
          '<option value="2" selected="selected">Option 2</option>' +
          '<option value="3">Option 3</option>' +
        '</select>', 'Option 2'))
    it("Replaces tag with first option when nothing is selected", () =>
      testInput('<select>' +
          '<option value="1">Option 1</option>' +
          '<option value="2">Option 2</option>' +
          '<option value="3">Option 3</option>' +
        '</select>', 'Option 1'))
  })

  describe('Filters out extra whitespace', () => {
    it('Removes return and newline pairs', () => {
      var content = '\r\n\r\n<div>\r\n\r\n\r\nHi\r\n\r\n</div>\r\n\r\n';
      var expected = '<div>\nHi\n</div>'
      expect(formatter.format(content)).to.equal(expected);
    })

    it('Removes carriage return pairs', () => {
      var content = '\r\r<div>\r\r\rHi\r\r</div>\r\r';
      var expected = '<div>\nHi\n</div>'
      expect(formatter.format(content)).to.equal(expected);
    })

    it('Removes newline pairs', () => {
      var content = '\n\n<div>\n\n\nHi\n\n</div>\n\n';
      var expected = '<div>\nHi\n</div>'
      expect(formatter.format(content)).to.equal(expected);
    })

    
  })
})