const expect = require('chai').expect;
const formatter = require('../src/formatters/subjectFormatter');

describe("Tests the parser for the subject text", () => {
  const assertTransformation = (input, expected) =>
    expect(formatter.format(input)).to.equal(expected);

  describe("Newline Removal", () => {
    it("Returns empty for single newline", () => 
      assertTransformation('\n', ''))
    it("Returns word with newline after word", () =>
      assertTransformation('Hello\n', 'Hello'))
    it("Returns word with newline before word", () =>
      assertTransformation('\nHello', 'Hello'))
    it("Returns word with newline before and after word", () =>
      assertTransformation('\nHello\n', 'Hello'))
    it("Replaces with space when newline is between words", () =>
      assertTransformation('Another\nTest', 'Another Test'))
  })

  describe("Carriage Return Removal", () => {
    it("Returns empty for single carriage return", () => 
      assertTransformation('\r', ''))
    it("Returns word with carriage return after word", () =>
      assertTransformation('Hello\r', 'Hello'))
    it("Returns word with carriage return before word", () =>
      assertTransformation('\rHello', 'Hello'))
    it("Returns word with carriage return before and after word", () =>
      assertTransformation('\rHello\r', 'Hello'))
    it("Replaces with space when carriage return is between words", () =>
      assertTransformation('Another\rTest', 'Another Test'))
  })

  describe("Tab Removal", () => {
    it("Returns empty for single tab", () => 
      assertTransformation('\t', ''))
    it("Returns word with tab after word", () =>
      assertTransformation('Hello\r', 'Hello'))
    it("Returns word with tab before word", () =>
      assertTransformation('\tHello', 'Hello'))
    it("Returns word with tab before and after word", () =>
      assertTransformation('\tHello\t', 'Hello'))
    it("Replaces with space when tab is between words", () =>
      assertTransformation('Another\tTest', 'Another Test'))
  })

  describe("Extra WhiteSpace Removal", () => {
    it("Replaces two spaces with a single space", () =>
      assertTransformation('Expected  Text', 'Expected Text'))
    it("Replaces three spaces with a single space", () =>
      assertTransformation('Expected   Text', 'Expected Text'))
    it("Replaces adjacent whitespace characters with a single space", () =>
      assertTransformation('Expected \r \n \t Text', 'Expected Text'))
  })
})