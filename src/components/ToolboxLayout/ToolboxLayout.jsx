import React from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import Chart from "../Chart";
import { C01 } from "../charts/RiskGauge";
import { T1 } from "../charts/SimpleStockChart";
import { T3 } from "../charts/Spline";
import './ToolboxLayout.css';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("layout")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "layout",
      JSON.stringify({
        [key]: value
      })
    );
  }
}

class ToolBoxItem extends React.Component {
  render() {
    return (
      <div
        className="toolbox__item"
        onClick={this.props.onTakeItem.bind(undefined, this.props.item)}
      >
        {this.props.item.title}
      </div>
    );
  }
}

class ToolBox extends React.Component {
  render() {
    return (
      <div className="toolbox">
        <span className="toolbox__title">Toolbox</span>
        <div className="toolbox__items-wrapper">
          {this.props.items.map(item => (
            <ToolBoxItem
              key={item.i}
              item={item}
              onTakeItem={this.props.onTakeItem}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default class ToolboxLayout extends React.Component {
  static defaultProps = {
    className: "layout",
    rowHeight: 40,
    onLayoutChange: function() {},
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    // initialLayout: generateLayout()
  };
  constructor(props) {
    super(props);

    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  state = {
    currentBreakpoint: "lg",
    compactType: "vertical",
    mounted: false,
    // layouts: { lg: this.props.initialLayout },
    toolbox: { lg: [{ i: "am", x: 0, y: 0, w: 3, h: 6, minW: 2, minH: 3, title:C01.title.text, chartType: "C01" }] },
    charts: [
      // { i: "a", x: 0, y: 0, w: 3, h: 6, minW: 2, minH: 3, title:C01.title.text, chartType: "C01" },
      { i: "b", x: 3, y: 0, w: 3, h: 6, minW: 2, minH: 3, title:T1.title.text, chartType: "T1" },
      { i: "c", x: 6, y: 0, w: 3, h: 6, minW: 2, minH: 3, title:C01.title.text, chartType: "C01" },
      { i: "d", x: 0, y: 0, w: 3, h: 6, minW: 2, minH: 3, title:T1.title.text, chartType: "T1" },
      { i: "e", x: 3, y: 0, w: 3, h: 6, minW: 2, minH: 3, title:T3.title.text, chartType: "T3" },
      { i: "f", x: 6, y: 0, w: 3, h: 6, minW: 2, minH: 3, title:T3.title.text, chartType: "T3" },
    ]
  };

  componentDidMount() {
    this.setState({ mounted: true });
    console.log('this.setState in componentDidMount ',this.state)
  }

  onBreakpointChange = breakpoint => {
    console.log("onBreakpointChange function")

    this.setState(prevState => ({
      currentBreakpoint: breakpoint,
      toolbox: {
        ...prevState.toolbox,
        [breakpoint]:
          prevState.toolbox[breakpoint] ||
          prevState.toolbox[prevState.currentBreakpoint] ||
          []
      }
    }));
  };

  onCompactTypeChange = () => {
    console.log("onCompactTypeChange function")

    const { compactType: oldCompactType } = this.state;
    const compactType =
      oldCompactType === "horizontal"
        ? "vertical"
        : oldCompactType === "vertical"
        ? null
        : "horizontal";
    this.setState({ compactType });
  };

  onTakeItem = currentItem => {
    this.setState(prevState => {
      return {
        ...prevState,
        charts: [...prevState.charts,currentItem],
        toolbox: {
            lg: prevState.toolbox.lg.filter((item)=>item!==currentItem)
          }
      }
    })
  };

  onLayoutChange(layout, layouts) {
    saveToLS("layouts", layouts);
    this.setState({ layouts });
  }


  
  onPutItem = item => {
    this.setState(prevState => {
      return {
        toolbox: {
          ...prevState.toolbox,
          [prevState.currentBreakpoint]: [
            ...(prevState.toolbox[prevState.currentBreakpoint] || []),
            item
          ]
        },
      };
    });
  };

  onLayoutChange = (clickedItem) => {
    this.setState( (prevState) =>{
      return {
      ...prevState,
      charts:prevState.charts.filter((item)=>item !== clickedItem)
      } 
    } );
  };

  onNewLayout = () => {
    console.log("onNewLayout function")
    this.setState({
    });
  };

  combinedFunction = (item) => {
    console.log('item in combinedFunction', item)
    this.onPutItem(item)
    this.onLayoutChange(item);
  } 

  render() {
    return (
      <div>
        <ToolBox
          items={this.state.toolbox[this.state.currentBreakpoint] || []}
          onTakeItem={this.onTakeItem}
        />

        <ResponsiveReactGridLayout
          {...this.props}
          // layouts={this.state.layouts}
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={this.onLayoutChange}
          measureBeforeMount={false}
          useCSSTransforms={this.state.mounted}
          compactType={this.state.compactType}
          preventCollision={!this.state.compactType}
        >
        {this.state.charts.map((item, index) => {
          let { i, chartType, ...dataGrid } = item;
          return (
            <div key={i} data-grid={{ ...dataGrid }}>
              <div className="hide-button"
                onClick={this.combinedFunction.bind(this,item)}>
                &times;
              </div>
              <Chart
                resizeDone={this.resizeChartDone}
                chartType={chartType}
              />
            </div>
          );
        })}  
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

