import React from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import Chart from "../Chart";
import { C01 } from "../charts/RiskGauge";
import { T1 } from "../charts/SimpleStockChart";
import { T3 } from "../charts/Spline";
import 'ui-neumorphism/dist/index.css'
import SlideToggle from "react-slide-toggle";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

// get layouts from LS
function getLayoutsFromLS(key) {
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

// save layouts to LS
function saveLayoutsToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "layout",
      JSON.stringify({
        [key]: value
      })
    );
  }
}

// get toolboxes from LS
function getToolboxFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("toolbox")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

// save toolboxes to LS
function saveToolboxToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "toolbox",
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
  };
  constructor(props) {
    super(props);

    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onResizeStop = this.onResizeStop.bind(this);
    this.resizeChartDone = this.resizeChartDone.bind(this);

  }

  state = {
    currentBreakpoint: "lg",
    isToolboxOpened: false,
    compactType: "vertical",
    mounted: false,
    tainted: null,
    layouts: JSON.parse(JSON.stringify(getLayoutsFromLS("layouts") || {lg:[
      { i: "a", x: 0, y: 0, w: 3, h: 6, minW: 2, minH: 3, title:C01.title.text, chartType: "C01", constructorType:"chart"},
      { i: "c", x: 3, y: 0, w: 3, h: 6, minW: 2, minH: 3, title:C01.title.text, chartType: "C01", constructorType:"chart" },
      { i: "d", x: 6, y: 0, w: 3, h: 6, minW: 2, minH: 3, title:T1.title.text, chartType: "T1", constructorType:"chart" },
      { i: "e", x: 0, y: 6, w: 3, h: 6, minW: 2, minH: 3, title:T3.title.text, chartType: "T3" , constructorType:"chart"},
      { i: "f", x: 3, y: 6, w: 3, h: 6, minW: 2, minH: 3, title:T3.title.text, chartType: "T3" , constructorType:"chart"},
      { i: "h", x: 6, y: 6, w: 3, h: 6, minW: 2, minH: 3, title:T3.title.text, chartType: "SC1" , constructorType:"stockChart"},
    ]})),
    toolbox: JSON.parse(JSON.stringify(getToolboxFromLS("toolbox") ||  { lg: [{ i: "g", x: 0, y: 12, w: 3, h: 6, minW: 2, minH: 3, title:C01.title.text, chartType: "C01", constructorType:"chart" }] })),

   //basicCharts array is not rendering. It's used only in "addChartTypeToArray" function to get proper "chartType" field. We render layouts and toolbox arrays.
    
   basicCharts: [
      { i: "a", x: 0, y: 0, w: 3, h: 6, minW: 2, minH: 3, title:C01.title.text, chartType: "C01", constructorType:"chart" },
      { i: "c", x: 3, y: 0, w: 3, h: 6, minW: 2, minH: 3, title:C01.title.text, chartType: "C01", constructorType:"chart" },
      { i: "d", x: 6, y: 0, w: 3, h: 6, minW: 2, minH: 3, title:T1.title.text, chartType: "T1", constructorType:"chart" },
      { i: "e", x: 0, y: 6, w: 3, h: 6, minW: 2, minH: 3, title:T3.title.text, chartType: "T3", constructorType:"chart" },
      { i: "f", x: 3, y: 6, w: 3, h: 6, minW: 2, minH: 3, title:T3.title.text, chartType: "T3" , constructorType:"chart"},
      { i: "h", x: 6, y: 6, w: 3, h: 6, minW: 2, minH: 3, title:T3.title.text, chartType: "SC1" , constructorType:"stockChart"},
      { i: "h", x: 6, y: 6, w: 3, h: 6, minW: 2, minH: 3, title:T3.title.text, chartType: "SC1" , constructorType:"stockChart"},
      { i: "g", x: 0, y: 9, w: 3, h: 6, minW: 2, minH: 3, title:C01.title.text, chartType: "C01", constructorType:"chart" },
    ]
  };

  resizeChartDone() {
    this.setState({ tainted: null });
  }
  
  onResizeStop(layout, oldItem, newItem, placeholder, e, element) {
    this.setState({ tainted: oldItem.i });
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  componentDidUpdate() {
    console.log('this.state.layouts.lg=',this.state.layouts.lg)

    // console.log('layouts in componentDidUpdate', JSON.parse(JSON.stringify(getLayoutsFromLS("layouts"))).lg);
    // const layoutsArray2 = JSON.parse(JSON.stringify(getLayoutsFromLS("layouts"))).lg;
    // const elementsOfFirstRow = layoutsArray2.filter((item)=> item.y===0);
    // const elementsOfSecondRow = layoutsArray2.filter((item)=> item.y===6);
    // const elementsOfThirdRow = layoutsArray2.filter((item)=> item.y===12);
    // console.log('elementsOfFirstRow',elementsOfFirstRow)
    // console.log('elementsOfSecondRow',elementsOfSecondRow)
    // console.log('elementsOfThirdRow',elementsOfThirdRow)
  }


  onBreakpointChange = breakpoint => {
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
    const { compactType: oldCompactType } = this.state;
    const compactType =
      oldCompactType === "horizontal"
        ? "vertical"
        : oldCompactType === "vertical"
        ? null
        : "horizontal";
    this.setState({ compactType });
  };

  // When user clicks on toolbox item
  onTakeItem = item => {


    
    

    console.log('layouts in onTakeItem', JSON.parse(JSON.stringify(getLayoutsFromLS("layouts"))).lg);
    const layoutsArray2 = JSON.parse(JSON.stringify(getLayoutsFromLS("layouts"))).lg ;
    const elementsOfFirstRow = layoutsArray2.filter((item)=> item.y===0);
    

    const elementsOfSecondRow = layoutsArray2.filter((item)=> item.y===6);

    const elementsOfThirdRow = layoutsArray2.filter((item)=> item.y===12);

    const elementsOfFourthRow = layoutsArray2.filter((item)=> item.y===18);


    // make an array with width of elements in first row
    const arrayOfWidthOfElementsInFirstRow = elementsOfFirstRow.map((item) => item.w);

    // count sum of width of elements in first row
    const summaryWidthofElementsInFirstRow = arrayOfWidthOfElementsInFirstRow.reduce((sum, current) => sum + current, 0);

    // make an array with width of elements in second row
    const arrayOfWidthOfElementsInSecondRow = elementsOfSecondRow.map((item) => item.w);

    // count sum of width of elements in second row
    const summaryWidthofElementsInSecondRow = arrayOfWidthOfElementsInSecondRow.reduce((sum, current) => sum + current, 0);

    // make an array with width of elements in third row
    const arrayOfWidthOfElementsInThirdRow = elementsOfThirdRow.map((item) => item.w);

    // count sum of width of elements in third row
    const summaryWidthofElementsInThirdRow = arrayOfWidthOfElementsInThirdRow.reduce((sum, current) => sum + current, 0);

    // make an array with width of elements in fourth row
    const arrayOfWidthOfElementsInFourthRow = elementsOfFourthRow.map((item) => item.w);

    // count sum of width of elements in fourth row
    const summaryWidthofElementsInFourthRow = arrayOfWidthOfElementsInFourthRow.reduce((sum, current) => sum + current, 0);
    

    let itemWithNewPosition = item;
    if (summaryWidthofElementsInFirstRow <=9) {
      itemWithNewPosition = {...item, x:summaryWidthofElementsInFirstRow, y:0, w:3}
    }

    else {
      if (summaryWidthofElementsInSecondRow <=9) {
        itemWithNewPosition = {...item, x:summaryWidthofElementsInSecondRow, y:0, w:3}
      }
      else {
        if (summaryWidthofElementsInThirdRow <=9) {
          itemWithNewPosition = {...item, x:summaryWidthofElementsInThirdRow, y:0, w:3}
        }
        else {
          if (summaryWidthofElementsInFourthRow <=9) {
            itemWithNewPosition = {...item, x:summaryWidthofElementsInFourthRow, y:0, w:3}
          }
        }
      }       
    }

    // console.log('elementsOfFirstRow',elementsOfFirstRow)
    // console.log('elementsOfSecondRow',elementsOfSecondRow)
    // console.log('elementsOfThirdRow',elementsOfThirdRow)







    const layoutsArray = this.state.layouts.lg;
    
    /*add clicked toolbox item to "layouts" array*/
    const newLayoutsArr = [...layoutsArray, itemWithNewPosition];

    /*add "chartType" field to "layouts" array*/
    let layoutsArrWithChartType= this.addChartTypeToArray(newLayoutsArr);

    /*filter "toolbox" array so it's doesn't contain clicked toolbox item*/
    const newToolboxArr = this.state.toolbox.lg.filter((chart)=> chart.i !== itemWithNewPosition.i);

    /*add "chartType" field to "toolbox" array*/
    let toolboxArrWithChartType= this.addChartTypeToArray(newToolboxArr);

    /*update "layouts" and "toolbox" array in state to cause new render*/ 
    this.setState(prevState => {
      return {
        ...prevState,
        toolbox: {
          lg: toolboxArrWithChartType
        },
        layouts: {
          lg: layoutsArrWithChartType          
        },
      };
    });

    /*set "toolbox" array with "chartType" field to localstorage*/
    saveToolboxToLS("toolbox", {lg:toolboxArrWithChartType});

    /*set "layouts" array with "chartType" field to localstorage*/
    saveLayoutsToLS("layouts", {lg:layoutsArrWithChartType});

  };

  // Function wich converts array with no "chartType" field to array with "chartType" field
  addChartTypeToArray = arr => {
    let newArr = [];
    arr.forEach((item)=> {
      const finded = this.state.basicCharts.find((chart)=> chart.i === item.i)
      newArr.push({...finded,...item})
    })
    return newArr
  }

  // Function which sets default width(3) and height(6) to card*/.
  setDefaultCardSize = arr => {
    let result = arr.map(item => true ? {...item, w:3, h:6} : item)
    return result
  }

  // When user clicks on cross inside card with chart
  onPutItem = item => {
    const layoutsArray = this.state.layouts.lg;

    /*filter layouts array so it's doesnt contain closed chart card*/
    const filteredLayoutsArray = layoutsArray.filter((chart)=>chart.i !== item.i)

    /*add "chartType" field to filtered layouts array*/
    let layoutsArrWithChartType= this.addChartTypeToArray(filteredLayoutsArray);

    /*add closed card to toolbox array*/
    let newToolboxArr = [...this.state.toolbox.lg,item];

    /*add "chartType" field to toolbox array*/
    let toolboxArrWithChartType= this.addChartTypeToArray(newToolboxArr);

    /*set default width(3) and height(6) to card*/
    let defaultSizeToolboxArr = this.setDefaultCardSize(toolboxArrWithChartType)

    /*update "layouts" and "toolbox" array in state to cause new render*/ 
    this.setState(prevState => {
      return {
        ...prevState,
        layouts: {
          lg: layoutsArrWithChartType          
        },
        toolbox: {
          lg: defaultSizeToolboxArr
        },
      };
    });

    /*set layouts array with "chartType" field to localstorage*/
    saveLayoutsToLS("layouts", {lg:layoutsArrWithChartType});

    /*set toolbox array with "chartType" field to localstorage*/
    saveToolboxToLS("toolbox", {lg:defaultSizeToolboxArr});

  };

  onLayoutChange = (layout, layouts) => {
    /*add "chartType" field to array with changed cards positions*/
    let arrWithChartType= this.addChartTypeToArray(layouts.lg);

    /*set array with "chartType" field to localstorage*/
    saveLayoutsToLS("layouts", {lg:arrWithChartType});

    /*update layouts array in state, when user resizes chart card(onLayoutChange function is called on resize)*/ 
    this.setState(prevState => {
      return {
        ...prevState,
        layouts: {
          lg: arrWithChartType          
        },
      };
    });
  };

  onNewLayout = () => {
    this.setState({
    });
  };

  render() {
    const { tainted } = this.state;
    const { toggleEvent } = this.props;
    return (
      <>
        <div className="toolbar-wrapper">
          <SlideToggle toggleEvent={toggleEvent} collapsed>
            {({ setCollapsibleElement }) => (
              <div className="my-collapsible">
                <div
                  className="my-collapsible__content"
                  ref={setCollapsibleElement}
                >
                  <div className="my-collapsible__content-inner">
                  <ToolBox
                items={this.state.toolbox[this.state.currentBreakpoint] || []}
              onTakeItem={this.onTakeItem}
              />
                  </div>
                </div>
              </div>
            )}
          </SlideToggle>

          <ResponsiveReactGridLayout
            {...this.props}
            layouts={this.state.layouts}
            onBreakpointChange={this.onBreakpointChange}
            onLayoutChange={this.onLayoutChange}
            measureBeforeMount={false}
            useCSSTransforms={this.state.mounted}
            compactType={this.state.compactType}
            preventCollision={!this.state.compactType}
            onResizeStop={this.onResizeStop}
          >
          {this.state.layouts.lg.map((item, index) => {
            let { i, chartType, constructorType, ...dataGrid } = item;
            return (
              <div charttype={chartType} key={i} data-grid={{ ...dataGrid }}>
                <div className="hide-button"
                  onClick={this.onPutItem.bind(this,item)}>
                  &times;
                </div>
                <Chart
                  index={i}
                  resizeDone={this.resizeChartDone}
                  chartType={chartType}
                  constructorType={constructorType}
                    resize={tainted === i || tainted === "all"}
                />
              </div>
            );
          })}  
          </ResponsiveReactGridLayout>
        </div>
      </>
    );
  }
}
