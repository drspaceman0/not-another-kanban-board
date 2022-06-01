import { deleteAccount } from "../lib/firebase";
import { useContext } from "react";
import { UserContext } from "../lib/context";

export default function Account(props) {
  const { user, username, email } = useContext(UserContext);

  // Sign out button
  function DeleteAccountButton() {
    return <button onClick={() => deleteAccount(user.uid)}>Delete Account</button>;
  }

  return (
    <main>
      {user && (
        <>
          <label>
            Email
            <input type="text" disabled name="email" value={email} />
          </label>
          <DeleteAccountButton />
        </>
      )}
      {!user && <h2>No user found</h2>}
    </main>
  );
}
