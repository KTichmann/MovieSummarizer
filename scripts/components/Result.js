import React from "react";
import Summary from "./Summary";
import Loading from "./Loading"

class Result extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      summary: false
    }
  }
  componentDidMount(){
    let data = {url: this.props.url}
    const handleTimeout = (time, promise) => {
      return new Promise((res, rej) => {
        setTimeout(() => {
          rej(new Error("timeout"))
        }, time)
        promise.then(res, rej)
        })
      }
    handleTimeout(60000, fetch("https://movie-summary-api.herokuapp.com/", {
      body: JSON.stringify(data),
      method: "POST",
      mode: "cors",
      headers: new Headers({
         'Content-Type': 'application/json'
       }),
    }))
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      const summary = JSON.parse(res).summary;
      if(summary){
        this.setState(() => {
          return {
            summary: summary
          }
        })
      } else{
        this.setState(() => {
          return {
            summary: ["Error Fetching Summary, IMSDB Link May Be Broken"]
          }
        })
      }

    })
    .catch((err) => {
      this.setState(() => {
        return{
          summary: ["Error! Please Try Again"]
        }
      })
    })
  }

  render(){
    return (
      <div>
        {(this.state.summary && <Summary result={this.state.summary} title={this.props.title} />) || <Loading />}
      </div>
    )
  }
}

export default Result;
