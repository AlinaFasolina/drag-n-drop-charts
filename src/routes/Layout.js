import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

// A "layout route" is a good place to put markup you want to
// share across all the pages on your site, like navigation. */}

export default function Layout() {

  return (
    <div className='flex'>
      
      <SideBar />

      {/* An <Outlet> renders whatever child route is currently active,
      so you can think about this <Outlet> as a placeholder for
      the child routes we defined above. */}
      <Outlet />
    
    </div>
  );
};