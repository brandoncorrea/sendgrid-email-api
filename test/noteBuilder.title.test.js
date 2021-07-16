var expect = require('chai').expect;
var NoteRequest = require('../src/models/NoteRequest');
var builder = require('../src/builders/noteBuilder');

describe("Builder adds Title Nodes to email compatible HTML document", () => {
  const getTitleElements = request =>
    builder.build(request).getElementsByClassName('title');

  describe("Title Element not Created", () => {
    const assertTitleNotCreated = request => 
      expect(getTitleElements(request).length).to.equal(0);

    it("Does not create title with new NoteRequest", () =>
      assertTitleNotCreated(new NoteRequest()))
    it("Does not create title when request is undefined", () =>
      assertTitleNotCreated(undefined))
    it("Does not create title when request is null", () =>
      assertTitleNotCreated(null))
    it("Does not create title when title is undefined", () =>
      assertTitleNotCreated({ title: undefined }))
    it("Does not create title when title is null", () =>
      assertTitleNotCreated({ title: null }))
    it("Does not create title when title is empty", () =>
      assertTitleNotCreated({ title: '' }))
    it("Does not create title when title is single space", () =>
      assertTitleNotCreated({ title: ' ' }))
  })

  describe("Title Element Created with Title Text", () => {
    const assertTitleContainsText = request => {
      var titles = getTitleElements(request);
      expect(titles.length).to.equal(1);
      expect(titles[0].innerHTML).to.equal(request.title.toUpperCase());
    }

    it("Creates title with text", () =>
      assertTitleContainsText({ title: 'Title Text' }))
  })
})