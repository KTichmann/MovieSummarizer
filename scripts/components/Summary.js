import React from "react";

class Summary extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      summary: ""
    }
  }
  componentDidMount(){
    const summary = <div id="summary"><h1 className = "summary_title">{this.props.result[0]}</h1> <br/> <h1 className = "summary_title">{this.props.result[1]}</h1> <br/> <h1 className = "summary_title">{this.props.result[2]}</h1> </div>
    this.setState(() => ({summary}))
    const setBackgroundImage = (input) => {
      const url = "https://api.themoviedb.org/3/search/movie?api_key=16afd27c705a5828974cb28a2b19aaff&query=" + input;
      fetch(url)
      .then( res => res.json() )
      .then(res => {
        const result = res.results[0]
          if(result){
            if ((result.backdrop_path || result.poster_path) && result.adult === false) {
              const imgURL = "https://image.tmdb.org/t/p/w780/" + (result.backdrop_path || result.poster_path);
              document.body.style.background = `linear-gradient(rgba(209, 0, 0, 0.9), rgba(209, 0, 0, 0.6)), url(${imgURL}) center`;
              document.body.style.backgroundSize = `cover`;
            }
          }
      })
    }
    setBackgroundImage(this.props.title)
  }
  componentWillUnmount(){
    document.body.style.background = `linear-gradient(rgba(209, 0, 0, 0.9), rgba(209, 0, 0, 0.6))`
  }
  render(){
    return(
      <div>
      <h1 className="summary_h1">{this.props.title} in 3 Lines:</h1>
        {this.state.summary}
      </div>
    )
  }
}

export default Summary;
