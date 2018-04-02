import React from "react";
import {Link} from "react-router-dom";

class Search extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      titles: [(<p className="result_title" key="1">Loading...</p>)]
    }
  }
  componentDidMount(){
    const input = this.props.input;
    if(input){
      let q = input.replace(/\s/g, "+");
      let url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyCd6I37CDLA-P2Wbbh564zyeqU4NsGDBsk&cx=015450923932795620565:zv7wnuczoh4&q="
      url += q;
      fetch(url)
        .then(res => {
          return res.json()
      })
      .then(res => {
        let titles = [];
        if(!res.items){
          titles = <p className="result_title">Enter Error from stage right... Maybe your movie taste is too niche</p>
        } else{
          let titleArr = res.items.map((title) => {
            return(title.title.split("Script")[0])
          })
          let urlArr = res.items.map((title) => {
            return(title.link)
          })
          titles = titleArr.map((title) => {
            let id = urlArr[titleArr.indexOf(title)]
            return (<Link className="result_title" to="/result" id={id} key={id} onClick={(e) => {this.props.setURL(e)}}
            >{title}</Link>)
          });
        }
        this.setState(() => ({
          titles: titles
        })
        )
      })
      .then(() => {
        const getImage = () => {
          const randomTitleNumber = Math.floor(Math.random() * this.state.titles.length);
          const titleQuery = this.state.titles[randomTitleNumber].props.children;
          console.log(titleQuery)
          const url = "https://api.themoviedb.org/3/search/movie?api_key=16afd27c705a5828974cb28a2b19aaff&query=" + titleQuery;
          fetch(url)
            .then(res => res.json())
            .then(res => {
              const resTitle = res.results[0]
              if(res.results[0]){
                if ((resTitle.backdrop_path || resTitle.poster_path) && resTitle.adult === false) {
                  const imgURL = "https://image.tmdb.org/t/p/w780/" + (resTitle.backdrop_path || resTitle.poster_path);
                  document.body.style.background = `linear-gradient(rgba(209, 0, 0, 0.9), rgba(209, 0, 0, 0.6)), url(${imgURL}) center`;
                  document.body.style.backgroundSize = `cover`;
                } else {
                  getImage()
                }
              }
            });
        };
        getImage();
        this.interval = setInterval(getImage, 15000);
      })
      .catch(err => {
        let titles = <p className="result_header">Enter Error From stage Left... Maybe your movie taste is too niche</p>
        console.log(err)
        this.setState(() => ({
          titles: titles
        }))
      })
    }
  }
  componentWillUnmount(){
    clearInterval(this.interval);
    document.body.style.background = `linear-gradient(rgba(209,0,0,0.9), rgba(209, 0, 0, 0.6))`;
  }
  render(){
    return(
      <div className="result_main">
      <h1 className="result_header">Results</h1>
        {this.state.titles}
      </div>
    )
  }
}

export default Search;
