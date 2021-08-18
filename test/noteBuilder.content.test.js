var expect = require("chai").expect;
var emailBuilder = require('../src/builders/noteBuilder');
var noteFormatter = require('../src/formatters/noteContentFormatter');

describe("Builder adds Content Nodes to email compatible HTML document", () => {
  // Returns all elements with the content class
  const getContentElements = request =>
    emailBuilder
      .build(request)
      .body
      .getElementsByClassName('content');

  describe("Content Element Not Created", () => {
    // Expects the request to generate 0 content elements
    const assertContentNotExists = request => 
      expect(getContentElements(request).length).to.equal(0);

    it("Does not add content if content is empty", () => 
      assertContentNotExists(''))
    it("Does not add content if content is single space", () => 
      assertContentNotExists(' '))
    it("Does not add content if content is undefined", () => 
      assertContentNotExists(undefined))
    it("Does not add content if content is null", () => 
      assertContentNotExists(null))
    it("Does not add content if content is empty textarea", () => 
      assertContentNotExists('<textarea></textarea>'))
    it("Does not add content if textarea and div are empty", () => 
      assertContentNotExists('<div><textarea></textarea></div>'))
    it("Does not add content for input with single space", () => 
      assertContentNotExists('<input type="text" value=" " />'))
    it("Does not add content div and input with single space", () => 
      assertContentNotExists('<div><input type="text" value=" " /></div>'))
  })

  describe("Content Element Created with Parsed HTML", () => {
    // Expects the content to generate properly formatted HTML
    const assertParsedContentNode = content => {
      var elements = getContentElements(content);
      expect(elements.length).to.equal(1);
      expect(
        elements[0].innerHTML
      ).to.equal(
        noteFormatter.format(content)
      )
    }

    it("Creates a single content node", () =>
      assertParsedContentNode('Some content'))
    it("Adds parsed HTML to div content", () => 
      assertParsedContentNode('<div>Some content</div>'))
    it("Adds parsed input to div content", () =>
      assertParsedContentNode('<input type="text" value="Message" />'))
    it("Adds parsed input within a div to div content", () => 
      assertParsedContentNode('<div><input type="text" value="Message" /></div>'))
    it("Adds parsed textarea by itself to div content", () => 
      assertParsedContentNode('<textarea>This is a textarea</textarea>'))
    it("Adds parsed textarea within a div to div content", () => 
      assertParsedContentNode('<div><textarea>This is a textarea</textarea></div>'))
  })
})
