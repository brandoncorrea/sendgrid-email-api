const expect = require('chai').expect;
const noteBuilder = require('../src/builders/noteBuilder');
const subjectBuilder = require('../src/builders/subjectBuilder')

describe("Retrieves the subject from HTML content", () => {
  const assertHtmlSubject = (content, expected) => {
    var doc = noteBuilder.build(content);
    var actual = subjectBuilder.build(doc);
    expect(actual).to.equal(expected);
  }

  it("Returns default for null content", () => 
    assertHtmlSubject(null, 'Sermon Notes'))
  it("Returns default for undefined content", () => 
    assertHtmlSubject(undefined, 'Sermon Notes'))
  it("Returns H1 when available", () =>
    assertHtmlSubject("<h1>Another Title</h1>", "Another Title"))
  it("Returns H2 when H1 not available", () =>
    assertHtmlSubject("<h2>An H2 element</h2>", "An H2 element"))
  it("Returns H3 when H2 not available", () =>
    assertHtmlSubject("<h3>H3 element thang</h3>", "H3 element thang"))
  it("Returns H6 when no other header elements available", () => 
    assertHtmlSubject("<h6>Last Header Element</h6>", "Last Header Element"))
  it("Returns default for H7 elements", () => 
    assertHtmlSubject("<h7>This header doesn't exist</h7>", "Sermon Notes"))
  it("Returns H1 when H2 also exists", () => 
    assertHtmlSubject("<div><h1>This should return</h1><h2>This isn't gonna return</h2></div>", "This should return"))
})