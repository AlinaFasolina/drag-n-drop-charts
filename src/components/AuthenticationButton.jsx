import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BsPersonBoundingBox as LoginIcon } from 'react-icons/bs'

const AuthenticationButton = () => {
    const { isAuthenticated } = useAuth0();

    return isAuthenticated ? <LogoutButton /> : <LoginButton />;
}

const LoginButton =  () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="sidebar-icon group" onClick={() => loginWithRedirect()}>
      <LoginIcon size="22" />
      <span className="sidebar-tooltip group-hover:scale-100">
        Log In
      </span>
    </div>
  );
};

const LogoutButton = () => {
    const { user, logout } = useAuth0();
  
    return (
      <div className="sidebar-icon group"
          onClick={() =>
              logout({
                  returnTo: window.location.origin,
              })}>
          <img src={user.picture} />
          <span className="sidebar-tooltip group-hover:scale-100">
          Log Out
          </span>
      </div>
    );
};

export default AuthenticationButton;