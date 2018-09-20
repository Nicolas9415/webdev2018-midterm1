import React, { Component } from 'react';
import './App.css';


class App extends Component {
 
 state={
  
 }

  componentDidMount() {

    
  }

  render() {
    return (
      <div className="App">
     <textarea
     cols="40"
     rows='20'
     ref={(div)=>this.divTarget=div}>
     soy un div</textarea>
     <button onClick={() =>{

      var obj={
        "x": "jhon",
        "y": {"field": "Also Jhon", "type": "quantitative"}
      };
      this.divTarget.value=JSON.stringify(obj,null,2);
     }}>Cambialo</button>

      <div id='vis'>
        <data/>'
      </div>
     </div>
    );
  }
}

export default App;