import React from "react";
import {Link} from "react-router-dom";

class Home extends React.Component{
  constructor(props){
    super(props)
  }
  componentWillMount() {
      this.randomContinuousImage();
    }
  randomContinuousImage() {
      const getImage = () => {
        const randomID = Math.floor(Math.random() * 509413);
      const url = "https://api.themoviedb.org/3/movie/" + randomID + "?api_key=16afd27c705a5828974cb28a2b19aaff";
        fetch(url)
        .then(res => res.json())
        .then(res => {
            if ((res.backdrop_path || res.poster_path) && res.adult === false) {
              const imgURL = "https://image.tmdb.org/t/p/w780/" + (res.backdrop_path || res.poster_path);
              document.body.style.background = `linear-gradient(rgba(209, 0, 0, 0.9), rgba(209, 0, 0, 0.6)), url(${imgURL}) center`;
              document.body.style.backgroundSize = 'cover';
            } else{getImage()}
          });
      };
      getImage();
      this.imgInterval = setInterval(getImage, 20000)
      return true;
    }
    componentWillUnmount(){
      clearInterval(this.imgInterval);
      document.body.style.background = `linear-gradient(rgba(209, 0, 0, 0.9), rgba(209, 0, 0, 0.6))`;
    }

    render(){
      return(
        <div>
          <div className="home_title">MOVIE SUMMARIZER</div>
          <div className="home_input">
            <input type="text" id="searchInput" />
            <Link className="home_link" to={process.env.PUBLIC_URL + "/search"} onClick={(e) => this.props.search(e)}>Search</Link>
          </div>
        </div>
      )
    }
}

export default Home;
