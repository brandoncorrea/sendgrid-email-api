/*
  Helper methods for XML/HTML objects
*/

const jsdom = require("jsdom");
const serializer = require('xmlserializer');

// Converts an XML object to a string
exports.xmlToString = xml => 
  serializer.serializeToString(xml);

// Converts a string to an HTML document
exports.stringToHtml = xmlString =>
  (new jsdom.JSDOM(xmlString)).window.document;
