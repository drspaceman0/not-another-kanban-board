import { auth, getUser } from "../lib/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

// Custom hook to read auth record and user profile doc
export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
      getUser(user).then((data) => {
        setUsername(data.username);
        setEmail(data.email);
      });
    } else {
      setUsername(null);
      setEmail(null);
    }
  }, [user]);

  return { user, username, email };
}
