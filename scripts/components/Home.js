import React from "react";
import {Link} from "react-router-dom";

class Home extends React.Component{
  constructor(props){
    super(props)
  }
  componentWillMount() {
      this.randomContinuousImage();
    }
  //Gets and sets a random image as page background
  randomContinuousImage() {
      const getImage = () => {
      //Select a random number from 0 to number of movies in database
      const randomID = Math.floor(Math.random() * 509413);
      const url = "https://api.themoviedb.org/3/movie/" + randomID + "?api_key=16afd27c705a5828974cb28a2b19aaff";
      //Make a call to themoviedb to request the random image
      fetch(url)
        .then(res => res.json())
        .then(res => {
            //Check if either images are on response, and that the movie is not an adult film
            if ((res.backdrop_path || res.poster_path) && res.adult === false) {
              const imgURL = "https://image.tmdb.org/t/p/w780/" + (res.backdrop_path || res.poster_path);
              //Add the image to the page background
              document.body.style.background = `linear-gradient(rgba(209, 0, 0, 0.9), rgba(209, 0, 0, 0.6)), url(${imgURL}) center`;
              document.body.style.backgroundSize = 'cover';
            } else{
              // if there's no image, call getImage again to get another random film
              getImage()
            }
          });
      };
      //Cycle through images every 20 seconds
      getImage();
      this.imgInterval = setInterval(getImage, 20000)
      return true;
    }
    componentWillUnmount(){
      //remove cycling image interval
      clearInterval(this.imgInterval);
      document.body.style.background = `linear-gradient(rgba(209, 0, 0, 0.9), rgba(209, 0, 0, 0.6))`;
    }

    render(){
      return(
        <div>
          <div className="home_title">MOVIE SUMMARIZER</div>
          <div className="home_input">
            <input type="text" id="searchInput" />
            <Link className="home_link" to="/search" onClick={(e) => this.props.search(e)}>Search</Link>
          </div>
        </div>
      )
    }
}

export default Home;
