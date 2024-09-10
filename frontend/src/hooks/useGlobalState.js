import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export const useGlobalState = () => {
  return useContext(GlobalContext);
};
