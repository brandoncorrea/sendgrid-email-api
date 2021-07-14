
var expect = require("chai").expect;
var NoteRequest = require('../src/models/NoteRequest');
var emailBuilder = require('../src/builders/emailBuilder');
var noteFormatter = require('../src/formatters/noteFormatter');

describe("Formats Note Request to email compatible HTML document", () => {
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

    it("Does not add content with new NoteRequest", () => 
      assertContentNotExists(new NoteRequest()))
    it("Does not add content if content is empty", () => 
      assertContentNotExists({ content: '' }))
    it("Does not add content if content is single space", () => 
      assertContentNotExists({ content: ' ' }))
    it("Does not add content if content is undefined", () => 
      assertContentNotExists({ content: undefined }))
    it("Does not add content if content is null", () => 
      assertContentNotExists({ content: null }))
    it("Does not add content if content is empty textarea", () => 
      assertContentNotExists({ content: '<textarea></textarea>' }))
    it("Does not add content if textarea and div are empty", () => 
      assertContentNotExists({ content: '<div><textarea></textarea></div>' }))
    it("Does not add content for input with single space", () => 
      assertContentNotExists({ content: '<input type="text" value=" " />' }))
    it("Does not add content div and input with single space", () => 
      assertContentNotExists({ content: '<div><input type="text" value=" " /></div>' }))
  })

  describe("Content Element Created with Parsed HTML", () => {
    // Expects the request to generate 1 content element with properly formatted HTML
    const assertParsedContentNode = request => {
      var elements = getContentElements(request);
      expect(elements.length).to.equal(1);
      expect(
        elements[0].innerHTML
      ).to.equal(
        noteFormatter.format(request.content)
      )
    }

    it("Creates a single content node", () =>
      assertParsedContentNode({ content: 'Some content' }))
    it("Adds parsed HTML to div content", () => 
      assertParsedContentNode({ content: '<div>Some content</div>' }))
    it("Adds parsed input to div content", () =>
      assertParsedContentNode({ content: '<input type="text" value="Message" />' }))
    it("Adds parsed input within a div to div content", () => 
      assertParsedContentNode({ content: '<div><input type="text" value="Message" /></div>' }))
    it("Adds parsed textarea by itself to div content", () => 
      assertParsedContentNode({ content: '<textarea>This is a textarea</textarea>' }))
    it("Adds parsed textarea within a div to div content", () => 
      assertParsedContentNode({ content: '<div><textarea>This is a textarea</textarea></div>' }))
  })
})
