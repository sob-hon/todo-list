import { useContext } from "react";
import { AuthorizationContext } from "./../App";

export const useUserInfo = () => {
  const context = useContext(AuthorizationContext);
  if (!context) {
    throw new Error("useUserInfo must be used within a AuthorizationContext");
  }
  return context;
};
