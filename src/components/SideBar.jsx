import useDarkMode from '../hooks/useDarkMode';
import { BsGearFill } from 'react-icons/bs';
import { FaQuestion, FaMoon, FaSun } from 'react-icons/fa';
import { MdDashboard as DashboardIcon } from 'react-icons/md';
import { BiSupport as ContactIcon } from 'react-icons/bi';
import { GiBookCover as WikiIcon } from 'react-icons/gi'
import { Link } from 'react-router-dom';
import AuthenticationButton from './AuthenticationButton';

const SideBar = () => {
  return (
    <div className="z-10 fixed top-0 left-0 h-screen w-16 flex flex-col
                  bg-white dark:bg-gray-900 shadow-lg justify-between ">
        
        <div>
          <Link to="">
            <SideBarIcon icon={<DashboardIcon size="28" />} />
          </Link>

          <Divider />
          
          <Link to="wiki">
            <SideBarIcon icon={<WikiIcon size="27" />} />
          </Link>

          <Link to="faq">
            <SideBarIcon icon={<FaQuestion size="20" />} />
          </Link>

          <Divider />

          <Link to="contact" >
            <SideBarIcon icon={<ContactIcon size="32" />} />
          </Link>

          <Link to="settings">
            <SideBarIcon icon={<BsGearFill size="22" />} />
          </Link>        
          <Divider />
        </div>

        <div>
          <AuthenticationButton />
          <ThemeIcon />
        </div>

    </div>
  );
};

const SideBarIcon = ({ icon, text = 'Dashboard' }) => (
  <div className="sidebar-icon group">
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">
      {text}
    </span>
  </div>
);

const Divider = () => <hr className="sidebar-hr" />;

const ThemeIcon = () => {

    // Hook, darkTheme is current state, second thing in array is the function to update that state.
    const [darkTheme, setDarkTheme] = useDarkMode();

    // This function basically changes the current theme to the other one, as indicated by the !
    function handleMode() {
      setDarkTheme(!darkTheme);
    }

    return (
      <span onClick={handleMode}>
        {darkTheme ? (
          <FaSun size='24' className='top-navigation-icon' />
        ) : (
          <FaMoon size='24' className='top-navigation-icon' />
        )}
      </span>
    );
  };

export default SideBar;