const expect = require('chai').expect;
const noteBuilder = require('../src/builders/noteBuilder');
const subjectBuilder = require('../src/builders/subjectBuilder');

describe("Tests the parser for the subject text", () => {
  // const assertTransformation = (input, expected) =>
  //   expect(builder.build(input)).to.equal(expected);

  const assertTransformation = (content, expected) => {
    var doc = noteBuilder.build(content);
    var actual = subjectBuilder.build(doc);
    expect(actual).to.equal(expected);
  }

  describe("Newline Removal", () => {
    it("Returns empty for single newline", () => 
      assertTransformation('<h1>\n</h1>', 'Sermon Notes'))
    it("Returns word with newline after word", () =>
      assertTransformation('<h1>Hello\n</h1>', 'Hello'))
    it("Returns word with newline before word", () =>
      assertTransformation('<h1>\nHello</h1>', 'Hello'))
    it("Returns word with newline before and after word", () =>
      assertTransformation('<h1>\nHello\n</h1>', 'Hello'))
    // it("Replaces with space when newline is between words", () =>
    //   assertTransformation('<h1>Another\nTest</h1>', 'Another Test'))
  })

  describe("Carriage Return Removal", () => {
    it("Returns empty for single carriage return", () => 
      assertTransformation('<h1>\r</h1>', 'Sermon Notes'))
    it("Returns word with carriage return after word", () =>
      assertTransformation('<h1>Hello\r</h1>', 'Hello'))
    it("Returns word with carriage return before word", () =>
      assertTransformation('<h1>\rHello</h1>', 'Hello'))
    it("Returns word with carriage return before and after word", () =>
      assertTransformation('<h1>\rHello\r</h1>', 'Hello'))
  //   it("Replaces with space when carriage return is between words", () =>
  //     assertTransformation('<h1>Another\rTest</h1>', 'Another Test'))
  })

  describe("Tab Removal", () => {
    it("Returns empty for single tab", () => 
      assertTransformation('<h1>\t</h1>', 'Sermon Notes'))
    it("Returns word with tab after word", () =>
      assertTransformation('<h1>Hello\r</h1>', 'Hello'))
    it("Returns word with tab before word", () =>
      assertTransformation('<h1>\tHello</h1>', 'Hello'))
    it("Returns word with tab before and after word", () =>
      assertTransformation('<h1>\tHello\t</h1>', 'Hello'))
  //   it("Replaces with space when tab is between words", () =>
  //     assertTransformation('<h1>Another\tTest</h1>', 'Another Test'))
  })

  describe("Extra WhiteSpace Removal", () => {
    it("Replaces two spaces with a single space", () =>
      assertTransformation('<h1>Expected  Text</h1>', 'Expected Text'))
    it("Replaces three spaces with a single space", () =>
      assertTransformation('<h1>Expected   Text</h1>', 'Expected Text'))
    it("Replaces adjacent whitespace characters with a single space", () =>
      assertTransformation('<h1>Expected \r \n \t Text</h1>', 'Expected Text'))
  })

  describe("Grabs first header", () => {
    it("Returns default for null content", () => 
      assertTransformation(null, 'Sermon Notes'))
    it("Returns default for undefined content", () => 
      assertTransformation(undefined, 'Sermon Notes'))
    it("Returns H1 when available", () =>
      assertTransformation("<h1>Another Title</h1>", "Another Title"))
    it("Returns H2 when H1 not available", () =>
      assertTransformation("<h2>An H2 element</h2>", "An H2 element"))
    it("Returns H3 when H2 not available", () =>
      assertTransformation("<h3>H3 element thang</h3>", "H3 element thang"))
    it("Returns H6 when no other header elements available", () => 
      assertTransformation("<h6>Last Header Element</h6>", "Last Header Element"))
    it("Returns default for H7 elements", () => 
      assertTransformation("<h7>This header doesn't exist</h7>", "Sermon Notes"))
    it("Returns H1 when H2 also exists", () => 
      assertTransformation("<div><h1>This should return</h1><h2>This isn't gonna return</h2></div>", "This should return"))
  })
})