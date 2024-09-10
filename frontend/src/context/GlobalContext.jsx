import { createContext } from "react";
import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const { user, login, logout } = useAuth();

  return (
    <GlobalContext.Provider value={{ user, login, logout }}>
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { GlobalContext };
