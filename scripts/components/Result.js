import React from "react";
import Summary from "./Summary";
import Loading from "./Loading"

class Result extends React.Component{
  constructor(props){
    super(props);
    //summary state to decide when summary has been received / when to stop loading and show response
    this.state = {
      summary: false
    }
  }
  componentDidMount(){
    //Get the url from parent (App)
    let data = {url: this.props.url}
    //handles any timeouts, by responding with an error if the promise doesn't resolve within the *time* argument
    const handleTimeout = (time, promise) => {
      return new Promise((res, rej) => {
        setTimeout(() => {
          rej(new Error("timeout"))
        }, time)
        promise.then(res, rej)
        })
      }
    //throws error if fetch request not resolved after 1 min
    //Make fetch request to backend API
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
      //if we get a response - set state to the summary to "exit" out of loading, and show response
      if(summary){
        this.setState(() => {
          return {
            summary: summary
          }
        })
      } else{ //if summary is empty, return error message
        this.setState(() => {
          return {
            summary: ["Error Fetching Summary, IMSDB Link May Be Broken"]
          }
        })
      }

    })
    .catch((err) => { //catch any errors with error message
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
