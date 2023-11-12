import Cookies from "js-cookie";
import PropTypes from "prop-types";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AuthProps {
  children: ReactNode;
}

export default function Auth({ children }: AuthProps) {
  const tkn = Cookies.get("tkn");

  if (tkn) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

Auth.propTypes = {
  children: PropTypes.node,
};
