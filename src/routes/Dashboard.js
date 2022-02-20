import { Helmet } from "react-helmet";
import ChartGrid from "../components/ChartGrid";
import ToolboxLayout from "../components/ToolboxLayout/ToolboxLayout";
import { useAuth0 } from "@auth0/auth0-react";
import HashLoader from "react-spinners/HashLoader";
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


        <div className="p-5 cursor-pointer" onClick={onToggle}>
          <div className="w-14 h-14 rounded-full shadow-[0_1px_1px_3px_rgba(23,26,42,1)] flex items-center justify-center">
            <span className="text-3xl text-light-300 dark:text-night-400">&#43;</span>
          </div>
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