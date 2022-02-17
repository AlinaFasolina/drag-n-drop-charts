import { Helmet } from "react-helmet";
import ChartGrid from "../components/ChartGrid";
import ToolboxLayout from "../components/ToolboxLayout/ToolboxLayout";
import Disclaimer from "../components/Disclaimer"
import { useAuth0 } from "@auth0/auth0-react";
import HashLoader from "react-spinners/HashLoader";
import { Fab } from 'ui-neumorphism'
import { useState } from "react";

// Move the "good morning satoshi" code here.

let today = new Date();
let currHr = today.getHours();
let greeting = "";
if (currHr < 12) {
  greeting += "morning"
} else if (currHr < 18) {
  greeting += "afternoon"
} else {
  greeting += "evening"
}



export default function Dashboard({ text = 'satoshi' }) {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [toggleEvent, setToggleEvent] = useState(null); 

  const onToggle = () => {
    setToggleEvent( Date.now() );
  };

  if (isLoading) {
    return (
      <>
      <div className='flex flex-col bg-light-100 dark:bg-night-100 min-h-screen w-full pl-16
    transition-all duration-150 ease-linear justify-center items-center'>
      <HashLoader color={"#25DAB6"} size={100} />
    </div>
      </>
    )
  }

  return (
    <>
    <Helmet>
      <title>Dashboard</title>
    </Helmet>
    <div className='flex flex-col bg-light-100 dark:bg-night-100 min-h-screen w-full pl-16
    transition-all duration-150 ease-linear'>

      <section className="flex justify-between">

        <h1 className="flex items-center font-sans font-extrabold text-5xl p-5 text-light-400 dark:text-night-400
              transition-all duration-150 ease-linear">
          good {greeting}, { isAuthenticated ? user.given_name.toLowerCase() : text}
        </h1>


        <div className="p-5">
          <Fab onClick={onToggle} style={{ margin: '20px' }}>
            <span style={{ fontSize: '30px', margin: '2px 0px 0px 2px' }}>&#43;</span>
          </Fab>
          {/* <Disclaimer /> */}
        </div>

      </section>


      <section className="flex flex-auto flex-col h-full overflow-hidden px-1">
        {/* <ChartGrid />  */}
        <ToolboxLayout toggleEvent={toggleEvent} />
      </section>

    </div>



    </>
  );
};