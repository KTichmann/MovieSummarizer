const natural = require("natural");
const stopwords = require("./stopwords.js");
////load & instantiate sentence tokenizer
const Tokenizer = require("sentence-tokenizer");
const sentenceTokenizer = new Tokenizer('Chuck');
//load & instantiate tfidf
const TfIdf = natural.TfIdf;
const testFrequency = new TfIdf();
//fs
const fs = require('fs')

//Load documents from folder
// let fileNames = fs.readdirSync("Corpus").map((file) => "Corpus/" + file)
// let n = fileNames.length
// //Add documents to the Corpus
// fileNames.forEach((file) => testFrequency.addFileSync(file))
// const data = JSON.stringify(testFrequency);
// fs.writeFile("test.txt", data, (err) => {
//   if (!err){
//     console.log("write complete")
//   }
// })

//Takes string to be summarized ==> returns 3-sentence summary
const setupSummarize = () => {
  testFrequency.addFileSync("test.txt");
}
const summarize = (inputStr) => {
    if (inputStr){
      testFrequency.addDocument(inputStr)
      let returnStr = "";
    //Takes input string, removes stopwords, returns string
    const removeStopWords = (str) => {
      str.split(" ").forEach((word) => {
        if(stopwords.indexOf(word)){
          returnStr+= " " + word;
        }
      })
      return returnStr;
    }
    //Splits input string up by sentence, returns array of sentences
    const tokenizeSentence = (str) => {
      newStr = str.replace(/\\n?/g, "");
      let sentences = newStr.match(/[^\.!\?]+[\.!\?]\s/g);
      let ans = []
      sentences = sentences.filter((sentence) => {
        if(ans.indexOf(sentence) > -1){
        } else{
          ans.push(sentence)
        }
      })
      return ans
    }
    //Tests frequency of string in the document compared to Corpus, returns numerical value
    const frequencyCheck = (str) => {
      return testFrequency.tfidf(str, 1)
    }
    //Takes array, returns an array of the relative weight of each sentence, as mapped from original sentence array
    const findSentenceFrequency = (sentenceArr) => {
      let measureArr = sentenceArr.map((sentence) => frequencyCheck(sentence))
      return measureArr;
    }
    let removeCappedWords = (arr) => {
      let newArr = arr.map((word) => {
        return word.replace(/[A-Z]+/g, "1")
      })
      return newArr
    }
    let sentenceDict = tokenizeSentence(inputStr);
    let noNamesDict = removeCappedWords(sentenceDict);
    let measureArray = findSentenceFrequency(noNamesDict);
    //Gets the sentence with the higest score, and returns it --> sets that value in the measure Array to zero to allow re-use with 2nd and 3rd highest
    let getSentence = () => {
      let highestMeasure = measureArray.reduce((acc, measure) => {return acc > measure ? acc : measure});
      let index = measureArray.indexOf(highestMeasure);
      let holdSentence = sentenceDict[index];
      measureArray[index] = 0;
      return {sentence: holdSentence, index: index};
    }
    let sentence1 = getSentence();
    let sentence2 = getSentence();
    let sentence3 = getSentence();
    let sentenceArr = [sentence1, sentence2, sentence3];
    sentenceArr.sort((a, b) => {
      return a.index - b.index
    })
    return [sentenceArr[0].sentence || "", sentenceArr[1].sentence || "", sentenceArr[2].sentence || ""]
  }
}

module.exports = {
  summarize: summarize,
  setupSummarize: setupSummarize
};
//Some things run when server starts / onload --> loading corpus into db, loading removeStopWords

//Some things rely on data passed in, so they start when data passed in --> everything else


//Scrape from ISMDB
//Using (?) Cheerio? Request!
//Create the landing Page
//Route the Landing Page with Express
//Connect landing page to server with asynchronous JS
