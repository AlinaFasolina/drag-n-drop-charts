import React from "react";
import Highcharts from "highcharts";
import solidGauge from "highcharts/modules/solid-gauge.js";
import HC_data from "highcharts/modules/data";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more.js"
import { C01 } from "./charts/RiskGauge";
import { T1 } from "./charts/SimpleStockChart";
import { T3 } from "./charts/Spline";

highchartsMore(Highcharts);
solidGauge(Highcharts);
HC_data(Highcharts);

const options = { C01, T1, T3 };

class Chart extends React.Component {
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
    console.log(chart);
    this.chart = chart;
  }

  setSize() {
    this.chart.setSize(null, null);
  }

  render() {
    return (
      <HighchartsReact
        options={options[this.props.chartType]}
        highcharts={Highcharts}
        constructorType={"chart"}
        allowChartUpdate = { true }
        callback={this.setChartInstance}
      />
    );
  }
}
export default Chart;
