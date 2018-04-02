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

setupSummarize();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("*", (req,res) => {
  const url = req.body.url

  request(url, (error, response, body) => {
    //Check for and handle errors
    if(error){
      const result = {summary: "Error Fetching Summary!"}
      res.json(JSON.stringify(result))
    }
    console.log(error);
    $ = cheerio.load(body, {ignoreWhitespace: true});
    $("b").remove();
    $("u").remove();
    let scriptText = $("pre").text();
    scriptText = scriptText.replace(/\s[\s\n]+/g, " ");
    const result = {summary: summarize(scriptText)};
    res.json(JSON.stringify(result))
  })
});

app.get("*", (req, res) => {
      res.sendFile("index.html", {"root": pathName})
  })



app.listen(3000, () => {console.log("test")})
