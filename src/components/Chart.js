import React from "react";
// import Highcharts from "highcharts";
import Highcharts from 'highcharts/highstock'
import solidGauge from "highcharts/modules/solid-gauge.js";
import HC_data from "highcharts/modules/data";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more.js"
import { C01 } from "./charts/RiskGauge";
import { T1 } from "./charts/SimpleStockChart";
import { T3 } from "./charts/Spline";
import { SC1 } from "./charts/MyStockChart";

highchartsMore(Highcharts);
solidGauge(Highcharts);
HC_data(Highcharts);

const options = { C01, T1, T3, SC1 };

class Chart extends React.Component {
  intervalId;
  constructor(props) {
    super(props);
    this.setChartInstance = this.setChartInstance.bind(this);
    this.setSize = this.setSize.bind(this);
  }
  componentDidUpdate() {
    if (this.props.resize) {
      this.setSize();
      this.props.resizeDone();
    }
  }

  setChartInstance(chart) {
    this.chart = chart;
  }

  setSize() {
    this.chart.setSize(null, null);
  }

  /*function is executed when user changes date in date slider inside card. It stops drag and drop event of card*/ 
  stopCardDrag(event) {
    console.log('mousedown on highcharts-background')
    event.preventDefault();
    event.stopPropagation();
  }

  componentDidMount() {
    /*we check with interval when slider element is mounted in DOM , then call "stopCardDrag" function, and stop checking. */
    this.intervalId = setInterval(()=>{ 
      const chartWithSlider = document.querySelectorAll('[charttype="SC1"]')[0] ;
      if (chartWithSlider) {
        let sliderBlock = chartWithSlider.querySelectorAll('.highcharts-root')[0]
        sliderBlock.addEventListener('mousedown', this.stopCardDrag); 
        clearInterval(this.intervalId);
      }
    },1000)
  }
  
  // render() {
  //   return (
  //     <div>
  //      <p>{this.props.index}</p> 
  //       <HighchartsReact
  //         options={options[this.props.chartType]}
  //         highcharts={Highcharts}
  //         allowChartUpdate = { true }
  //         callback={this.setChartInstance}
  //         constructorType = {this.props.constructorType}
  //       />
  //     </div>
  //   );
  // }

  render() {
    return (
      <HighchartsReact
        options={options[this.props.chartType]}
        highcharts={Highcharts}
        allowChartUpdate = { true }
        callback={this.setChartInstance}
        constructorType = {this.props.constructorType}
      />
    );
  }
}
export default Chart;
