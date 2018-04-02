import React from "react";

class Loading extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      loadingQuip: ""
    }
  }
  componentDidMount(){
    const handleBackgroundGif = () => {
      const gifArr = ["https://upload.wikimedia.org/wikipedia/commons/1/12/Phenakistoscope_3g07692a.gif", "https://upload.wikimedia.org/wikipedia/commons/a/a2/Phenakistoscope_3g07690a.gif", "https://upload.wikimedia.org/wikipedia/commons/9/9c/Optical_illusion_disc_with_man_pumping_water.gif", "https://upload.wikimedia.org/wikipedia/commons/7/7e/Afraid_of_nobody.gif", "https://upload.wikimedia.org/wikipedia/commons/1/17/Optical_illusion_disc_with_somersaults_and_horseback_riding.gif", "https://upload.wikimedia.org/wikipedia/commons/4/49/Optical_illusion_disc_with_man_and_frog.gif", "https://upload.wikimedia.org/wikipedia/commons/8/84/Optical_illusion_disc_with_birds%2C_butterflies%2C_and_a_man_jumping.gif"]
      const randomGif = gifArr[Math.floor(Math.random() * gifArr.length)];
      console.log(randomGif)
      document.body.style.background = `linear-gradient(rgba(209, 0, 0, 0.9), rgba(209, 0, 0, 0.6)), url(${randomGif})`
      document.body.style.backgroundSize = `cover`;
    }
    const handleLoadingQuip = () => {
      const quipArray = ["Watching the Movie", "Discussing With the Director", "Becoming Sentient", "Engaging With the Futility of My Existence", "Taking a Break", "Suspending Disbelief", "Suppressing Wilhelm Scream", "Taking a Film Course", "Procrastinating", "Breaking the Problem Down into Manageable Chunks", "Managing Chunks", "Consulting Deep Thought", "I'm Sorry Dave, I'm Afraid... Oh Wait, I Can Do That"]
      const loadingQuip = quipArray[Math.floor(Math.random() * quipArray.length)]
      this.setState(() => ({ loadingQuip: loadingQuip }))
    }

    this.intervalQuip = setInterval(handleLoadingQuip, 3000);
    
    handleBackgroundGif();

  }
  componentWillUnmount(){
    document.body.style.background = `linear-gradient(rgba(209, 0, 0, 0.9), rgba(209, 0, 0, 0.6))`
    clearInterval(this.intervalQuip);
  }
  render(){
    return(
      <h1 id="loading_header">
        {this.state.loadingQuip}
      </h1>
    )
  }
}

export default Loading;
