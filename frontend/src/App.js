import React, {Component} from 'react';
import './App.css';
import vegaEmbed from 'vega-embed';
import Papa from 'papaparse';

class App extends Component {
  constructor() {
    super();
    this.vizDiv = null;
    this.textArea =null;
    this.fileInput=null;
     this.state = {
      json: {
        "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
        "description": "some text.",

        "data": {
          "values": [
            {
              "a": "A",
              "b": 28
            }, {
              "a": "B",
              "b": 55
            }, {
              "a": "C",
              "b": 43
            }, {
              "a": "D",
              "b": 91
            }, {
              "a": "E",
              "b": 81
            }, {
              "a": "F",
              "b": 53
            }, {
              "a": "G",
              "b": 19
            }, {
              "a": "H",
              "b": 87
            }, {
              "a": "I",
              "b": 52
            }
          ]
        },
        "mark": "rect",
        "encoding": {
          "x": {
            "field": "a",
            "type": "ordinal"
          },
          "y": {
            "field": "b",
            "type": "quantitative"
          }
        }
      },
      csv: null,
    };
  }

  componentDidMount() {
    vegaEmbed(this.vizDiv, this.state.json);
  }

  updateViz() {
    try {
      var x = JSON.parse(this.textArea.value,null, 2);
      vegaEmbed(this.vizDiv, x);
    } catch (err)
    {
      alert("Error en el JSON")
    }
  }

  handleFiles()
  {
    Papa.parse(this.fileInput.files[0], {
    	complete: (objResults) => {
        const results = Object.values(objResults)[0];
        const keys = results[0];
        const values = results.slice(1).map((data) => {
          const finalObj = {};
          for(let i = 0; i < keys.length; i++) {
            finalObj[keys[i]] = data[i];
          }
          return finalObj;
        });
        this.setState({csv: results});
        let json  = JSON.parse(this.textArea.value);
        json.data.values=values;
        json.encoding.x.field=keys[0];
        json.encoding.y.field=keys[1];
        this.textArea.value = JSON.stringify(json);
        vegaEmbed(this.vizDiv,json);
    	}
    });
  }

  render() {
    return (<div className="App">

      <button onClick={() => this.updateViz()}>Cambiar json</button>
      <textarea ref={(div) => this.textArea = div} cols="40" rows="15" defaultValue={JSON.stringify(this.state.json, null, 2)}></textarea>

      <input ref={(input) =>this.fileInput=input} onChange={()=> this.handleFiles()} type="file"></input>
      <div ref={(div) => this.vizDiv = div}></div>
    </div>);
  }
}

export default App;
