import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Chart from "./Chart";

const ResponsiveGridLayout = WidthProvider(Responsive);

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("report-rgl")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}
function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "report-rgl",
      JSON.stringify({
        [key]: value
      })
    );
  }
}
class Dashboard extends React.Component {
  static defaultProps = {
    className: "layout",
    isDraggable: true,
    isResizable: true,
    items: 50,
    cols: 12,
    rowHeight: 30
  };
  constructor(props) {
    super(props);
    this.state = {
      layouts: JSON.parse(JSON.stringify(getFromLS("layouts") || {})),
      items: [
        { i: "a", x: 0, y: 0, w: 3, h: 6, minW: 2, minH: 3, chartType: "C01" },
        { i: "b", x: 3, y: 0, w: 3, h: 6, minW: 2, minH: 3, chartType: "T1" },
        { i: "c", x: 6, y: 0, w: 3, h: 6, minW: 2, minH: 3, chartType: "C01" },
        { i: "d", x: 0, y: 0, w: 3, h: 6, minW: 2, minH: 3, chartType: "T1" },
        { i: "e", x: 3, y: 0, w: 3, h: 6, minW: 2, minH: 3, chartType: "T3" },
        { i: "f", x: 6, y: 0, w: 3, h: 6, minW: 2, minH: 3, chartType: "T3" }
      ],
      tainted: null
    };
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onResizeStop = this.onResizeStop.bind(this);
    // this.onDragStop = this.onDragStop.bind(this);
    this.resizeChartDone = this.resizeChartDone.bind(this);
    this.onWidthChange = this.onWidthChange.bind(this);
  }
  onLayoutChange(layout, layouts) {
    // console.log(layout, layouts);
    saveToLS("layouts", layouts);
    this.setState({ layouts });
  }

  onResizeStop(layout, oldItem, newItem, placeholder, e, element) {
    console.log(
      `${JSON.stringify(oldItem)} resized to ${JSON.stringify(newItem)} `
    );
    this.setState({ tainted: oldItem.i });
  }
  // onDragStop(layout, oldItem, newItem, placeholder, e, element) {
  //   console.log(
  //     `${JSON.stringify(oldItem)} dragged to ${JSON.stringify(newItem)}`
  //   );
  // }
  resizeChartDone() {
    this.setState({ tainted: null });
  }
  onWidthChange(containerWidth, margin, cols, containerPadding) {
    console.log(`width of container changed to ${containerWidth}`);
    this.setState({ tainted: "all" });
  }
  render() {
    const { items, tainted } = this.state;
    return (
      <ResponsiveGridLayout
        className="layout bg-base"
        layouts={this.state.layouts}
        // breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 9, sm: 6, xs: 4, xxs: 2 }}
        // width={1200}
        margin={[10,13]}
        rowHeight={50}
        onLayoutChange={this.onLayoutChange}
        autoSize={false}
        onResizeStop={this.onResizeStop}
        onWidthChange={this.onWidthChange}
        // onDragStop={this.onDragStop}
      >
        {items.map((item, index) => {
          let { i, chartType, ...dataGrid } = item;
          return (
            <div key={i} data-grid={{ ...dataGrid }}>
              <Chart
                resize={tainted === i || tainted === "all"}
                resizeDone={this.resizeChartDone}
                chartType={chartType}
              />
            </div>
          );
        })}
      </ResponsiveGridLayout>
    );
  }
}
export default Dashboard;
