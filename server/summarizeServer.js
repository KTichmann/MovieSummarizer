const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const summarizer = require("./summarizer.js");
const summarize = summarizer.summarize;
const setupSummarize = summarizer.setupSummarize;
const pathName = path.join(__dirname, "/public");

//Sets up the summarizer - loading the corpus into the tf-idf library
setupSummarize();
//Set up Express
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
//Accept all post requests, and respond with the three sentence summary
app.post("*", (req,res) => {
  const url = req.body.url

  request(url, (error, response, body) => {
    //Check for and handle errors
    if(error){
      const result = {summary: "Error Fetching Summary!"}
      res.json(JSON.stringify(result))
    }
    //Load the page html into cheerio
    $ = cheerio.load(body, {ignoreWhitespace: true});
    //Remove all b and u tags (stage directions & character names)
    $("b").remove();
    $("u").remove();
    //Use text within pre tag as script text
    let scriptText = $("pre").text();
    //Replace all multiple spaces and new lines with single spaces
    scriptText = scriptText.replace(/\s[\s\n]+/g, " ");
    //call Summarize on the sanitized script text to receive 3 sentence summary
    const result = {summary: summarize(scriptText)};
    res.json(JSON.stringify(result))
  })
});

app.get("*", (req, res) => {
      res.json({"response": 404})
  })


app.listen(3000, () => {console.log("test")})
