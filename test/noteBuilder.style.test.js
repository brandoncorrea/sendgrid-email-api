const expect = require('chai').expect;
const builder = require('../src/builders/noteBuilder')
const fs = require('fs');

describe("Note Builder adds notes css to head tag", () => {
  it('Copies notes content to head tag', () => {
    var result = builder.build({ content: 'Note Content' });
    var tags = result.head.getElementsByTagName('style');
    expect(tags.length).to.equal(1);
    var actualCss = tags[0].innerHTML;
    var expected = fs.readFileSync(__dirname + '/../src/styles/notes.css', 'utf8');
    expect(actualCss).to.equal(expected);
  })
})