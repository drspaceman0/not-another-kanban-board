import { auth } from "../lib/firebase";
import Router from "next/router";
import { useContext, useEffect } from "react";
import { UserContext } from "../lib/context";

export default function Logout(props) {
  const { user, username, email } = useContext(UserContext);

  useEffect(() => {
    console.log("logging out");
    auth.signOut();
  }, []);

  useEffect(() => {
    if (!user) {
      Router.push(`/`);
    }
  }, [user]);

  return <h2>Logging out...</h2>;
}
