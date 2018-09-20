import React, {Component} from "react";
import vegaEmbed from 'vega-embed';

class bar extends Component {

	componentDidMount()
	{


    var obj = {
     {
      "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
      "description": "A scatterplot showing horsepower and miles per gallons for various cars.",
      "data": {"url": "data/cars.json"},
      "mark": "point",
      "encoding": {
          "x": {"field": "Horsepower","type": "quantitative"},
          "y": {"field": "Miles_per_Gallon","type": "quantitative"}
      }
    }
  }

    }
    vegaEmbed('#vis', spec).then(function (result) {
      console.log(result);
    }).catch(console.error);
	}

	render() {
		return(
			<div></div>
			)
	}

}
}