import { Link } from "react-router-dom";

export default function PageNotFound() {
    return (
        <div className="h-screen w-full pl-16 bg-light-100 dark:bg-night-100
                        flex items-center">
            <div className="container flex md:flex-row items-center pl-16 justify-center
                            text-light-400 dark:text-night-400">
            <div className="max-w-md p5">
                <h1 className="text-9xl font-dark font-bold">404</h1>
                <p className="text-2xl md:text-3xl font-light leading-normal">Oops! Page not found.</p>
                <p className="mb-8">Sorry, we can't find the page you're looking for.</p>

                <Link to="/">
                <button
                className="px-4 inline py-2 text-sm font-medium leading-5 shadow 
                text-light-200 hover:text-light-400 dark:text-night-200 hover:dark:text-night-400
                bg-light-400 hover:bg-light-200 dark:bg-night-400 dark:hover:bg-night-200
                transition-colors duration-150 
                border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue">
                Go back home
                </button>
                </Link>
            </div>
            <div>
                <img src={require("../img/error404.png")} width={920} alt="404"/>
            </div>   
        </div>
        </div>
    );
  };
  