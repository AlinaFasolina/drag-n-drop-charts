import { render } from "react-dom";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
// Import all routes
import Layout from "../src/routes/Layout";
import Dashboard from "../src/routes/Dashboard";
import Wiki from "../src/routes/Wiki";
import FAQ from "../src/routes/FAQ";
import ContactUs from "../src/routes/Contact";
import Settings from "./routes/Settings";
import PageNotFound from "./routes/PageNotFound";
// Styling and utility imports
import './index.css'
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root')

// Routes nest inside one another. Nested route paths build upon
// parent route paths, and nested route elements render inside
// parent route elements. See the note about <Outlet> below.

render(
  <Auth0Provider
    domain=""
    clientId=""
    redirectUri={window.location.origin}>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<Dashboard />} />
          <Route path="wiki" element={<Wiki />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="settings" element={<Settings />} />

          {/* Using path="*" means "match anything", so catch any unwarranted URL that we dont have explicit routes */}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  </Auth0Provider>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
