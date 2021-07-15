var expect = require('chai').expect;
var NoteRequest = require('../src/models/NoteRequest');
var emailBuilder = require('../src/builders/sermonNoteBuilder');

describe("Builder adds Meta Nodes to email compatible HTML document", () => {
  const getMetaElements = request => 
    emailBuilder.build(request).getElementsByClassName('meta');

  describe("Meta Element not Created", () => {
    const assertMetaNotExists = request =>
      expect(getMetaElements(request).length).to.equal(0);

    it("New NoteRequest()", () =>
      assertMetaNotExists(new NoteRequest()))
    it("Undefined Author and Undefined Date", () => 
      assertMetaNotExists({ author: undefined, date: undefined }))
    it("Undefined Author and Null Date", () => 
      assertMetaNotExists({ author: undefined, date: null }))
    it("Null Author and Undefined Date", () => 
      assertMetaNotExists({ author: null, date: undefined }))
    it("Null Author and Null Date", () => 
      assertMetaNotExists({ author: null, date: null }))
    it("Empty Author and Undefined Date", () => 
      assertMetaNotExists({ author: '', date: undefined }))
    it("Empty Author and Null Date", () => 
      assertMetaNotExists({ author: '', date: null }))
    it("WhiteSpace Author and Undefined Date", () => 
      assertMetaNotExists({ author: ' ', date: undefined }))
    it("WhiteSpace Author and Null Date", () => 
      assertMetaNotExists({ author: ' ', date: null }))
  })

  describe("Meta Element contains Meta Content", () => {
    const assertMetaCreated = (request, expectedContent) => {
      var metas = getMetaElements(request);
      expect(metas.length).to.equal(1);
      expect(metas[0].innerHTML).to.equal(expectedContent);
    }

    it("Contains Author Only", () =>
      assertMetaCreated({ author: 'Brandon Correa' }, 'Brandon Correa'))
    it("Contains Date Only", () =>
      assertMetaCreated({ date: new Date(2021, 0, 1) }, 'January 1, 2021'))
    it("Conatins Author without extra Whitespace", () =>
      assertMetaCreated({ author: '   brandon   correa   ' }, 'Brandon Correa'))
    it("Contains both Author and Date", () => 
      assertMetaCreated(
        { author: 'Brandon Correa', date: new Date(2021, 1, 14) }, 
        'Brandon Correa | February 14, 2021'))
    it("Contains author and date without extra Whitespace", () =>
      assertMetaCreated(
        { author: '  Brandon  a  correa  ', date: new Date(1990, 11, 25) }, 
        'Brandon A Correa | December 25, 1990'))

  })
})