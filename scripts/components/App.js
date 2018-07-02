import React from "react";
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import Header from "./Header";
import Search from "./Search";
import Home from "./Home";
import About from "./About";
import Result from "./Result";

class App extends React.Component{

  constructor(props){
    super(props);
    //binding this to main component rather than the functions themselves
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.setURL = this.setURL.bind(this);
    //initialize state
    this.state = {
      input: "",
      url: "",
      title: ""
    };
  }
  //Handles search input from Home component -> updating this.state.input 
  handleSearchInput(e){
    let userInput = document.getElementById("searchInput").value;
    if (userInput){
      this.setState(() => {
        return {
          input: userInput
        }
      })
    } else{
      e.preventDefault();
    }
  }
  //handles choice from search component -> sets url and title in state
  setURL(e){
    let url = e.target.id
    let title = e.target.innerText
    if(url){
       this.setState(() => {
        return {
          url: url,
          title: title
         }
       })
     }
  }

  render(){
    return(
      <div>
        <Header search={this.handleSearchInput}/>
        <Switch>
          <Route path="/search" render={() => <Search input={this.state.input} setURL={this.setURL}/>} />
          <Route path="/about" render={() => <About />} />
          <Route path="/result" render={() => <Result url={this.state.url} title={this.state.title}/>} />
          <Route path="/" exact={true} render={() => <Home search={this.handleSearchInput} />} />
        </Switch>
      </div>
    )
  }
}

export default App;
