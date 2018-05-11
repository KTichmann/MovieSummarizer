const express = require("express")
const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const summarize = require("./summarizer.js")
const url = "http://www.imsdb.com/scripts/Forrest-Gump.html"

const getSummary = (url) => {
  request(url, (error, response, body) => {
    //TODO: Add check and handling for errors
    console.log(error);
    $ = cheerio.load(body, {ignoreWhitespace: true});
    $("b").remove();
    $("u").remove();
    let scriptText = $("pre").text();
    scriptText = scriptText.replace(/\s[\s\n]+/g, " ")

  })
}

export default getSummary;
