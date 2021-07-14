const { expect } = require('chai');
var builder = require('../src/builders/emailBuilder');

describe("Tests the order in which elements are added", () => {
  describe("Elements added in order: Title, Meta, Content", () => {
    const assertOrdinal = (request, ordinals) => {
      var doc = builder.build(request);
      expect(doc.body.children.length).to.equal(ordinals.length);
      for (var i = 0; i < ordinals.length; i++)
        expect(doc.body.children[i].getAttribute('class')).to.equal(ordinals[i]);
    }

    // One Value
    it("Follows Order: Title Only", () => 
      assertOrdinal({ title: 'Some title' }, ['title']))
    it("Follows Order: Author Only", () => 
      assertOrdinal({ author: 'Brandon Correa' }, ['meta']))
    it("Follows Order: Date Only", () =>
      assertOrdinal({ date: new Date() }, ['meta']))
    it("Follows Order: Content Only", () => 
      assertOrdinal({ content: 'Some text content' }, ['content']))

    // Two values
    it("Follows Order: Title and Author", () => 
      assertOrdinal({
        title: 'Some Title',
        author: 'Brandon Correa'
      }, ['title', 'meta']))
    it("Follows Order: Title and Date", () => 
      assertOrdinal({
        title: 'Some Title',
        date: new Date()
      }, ['title', 'meta']))
    it("Follows Order: Title and Content", () => 
      assertOrdinal({
        title: 'Some Title',
        content: 'Some Text Content'
      }, ['title', 'content']))
    it("Follows Order: Author and Date", () => 
      assertOrdinal({
        author: 'Brandon Correa',
        date: new Date()
      }, ['meta']))
    it("Follows Order: Author and Content", () => 
      assertOrdinal({
        content: 'Some text content',
        author: 'Brandon Correa'
      }, ['meta', 'content']))
    it("Follows Order: Date and Content", () => 
      assertOrdinal({
        content: 'Some text content',
        date: new Date()
      }, ['meta', 'content']))

    // Three Values
    it("Follows Order: Title, Author and Date", () => 
      assertOrdinal({
        title: 'Some Title',
        author: 'Brandon Correa',
        date: new Date()
      }, ['title', 'meta']))
    it("Follows Order: Title, Author and Content", () => 
      assertOrdinal({
        title: 'Some Title',
        author: 'Brandon Correa',
        content: 'Some Text Content'
      }, ['title', 'meta', 'content']))
    it("Follows Order: Title, Date and Content", () => 
      assertOrdinal({
        title: 'Some Title',
        date: new Date(),
        content: 'Some Text Content'
      }, ['title', 'meta', 'content']))
    it("Follows Order: Author, Date and Content", () => 
      assertOrdinal({
        author: 'Brandon Correa',
        date: new Date(),
        content: 'Some Text Content'
      }, ['meta', 'content']))
    
    // Four Values
    it("Follows Order: Title, Author, Date and Content", () => 
      assertOrdinal({
        title: 'Some Title',
        author: 'Brandon Correa',
        date: new Date(),
        content: 'Some Text Content'
      }, ['title', 'meta', 'content']))
  })
})