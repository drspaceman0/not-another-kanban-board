import { auth, googleAuthProvider, addUser } from "../lib/firebase";
import { useContext } from "react";
import { UserContext } from "../lib/context";

export default function Enter(props) {
  const { user, username, email } = useContext(UserContext);

  return (
    <main>
      {user && (
        <>
          <label>
            User Name:
            <input type="text" name="username" value={username} />
          </label>
          <label>
            Email
            <input type="text" name="email" value={email} />
          </label>
          <SignOutButton />
        </>
      )}
      {!user && <SignInButton />}
    </main>
  );
}

// Sign in with Google button
function SignInButton() {
  const signInWithGoogle = async () => {
    const { user } = await auth.signInWithPopup(googleAuthProvider);
  };

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src={"/google.png"} /> Sign in with Google
    </button>
  );
}

// Sign out button
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}
