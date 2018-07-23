# MovieSummarizer
[Move Summarizer Demo](https://ktichmann.github.io/MovieSummarizer/#/)

## How it Works

Mv summarizer is a fun personal-project meant to condense a movie script into its three most important lines. This saves you time, shaving a 1h30min movie down into a bite-size chunk! Just kidding, it does provide some interesting results, though.

## The Back-End

The main working part of the app is the part that calculates the relative importance of each word and sentence in the text and returns a three-sentence summary of the most important sentences. Using a Node library called "Natural", I built a simple API hosted on Heroku that my front-end could call to and send through the link of the chosen script and receiving the summarized movie.

### TF-IDF
Term Frequency, Inverse Document Frequency is a method of calculating the uniqueness of a word in a text based on how often it shows up in that text compared to how often it shows up in a collection of similar documents or corpus. The idea is that, if a word is important in a document, it will show up a lot. However, it might just be a word that’s used a lot in general (like “the”, “and” or “a”), which is why you then check its uniqueness in a larger corpus. If a word is used a lot in a document, and not so much in the corpus, then it’s probably uniquely important to that document. My implementation of the TF-IDF used a method from the Natural library, along with a corpus of hundreds of movie scripts. It calculated the relative uniqueness of each sentence based on this calculation.

## The Front-End
The frontend is built in React, using React-Router for client-side routing through the different pages. The main search functionality is provided by a call to the Advanced Google Search API, using “site:imsdb.com/scripts” to search only the Internet Movie Script Database (IMSDB). The background images that cycle on the homepage are from a call to [The Movie Database](https://www.themoviedb.org/en), selecting a random id, checking to make sure it has an image, and that the image is appropriate, then rendering it to the screen. This was built using React lifecycle hooks, and setInterval to have the images cycle continuously.
