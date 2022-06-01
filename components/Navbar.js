import Link from "next/link";
import { auth, googleAuthProvider, addUser } from "../lib/firebase";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import LogoImage from "../public/logo.png";

export default function Navbar() {
  const { user, username } = useContext(UserContext);

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
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <p className="logo">
              Not Another<br></br>Kanban Board!!!
            </p>
          </Link>
        </li>

        {/* user is signed in */}
        {user && (
          <>
            <li className="push-left">
              <Link href={`/account`}>
                <img className="profile-pic" src={user?.photoURL || "/userimage.png"} />
              </Link>
            </li>
            <li className="logout-button">
              <Link href="/Logout">
                <button className="btn-gray">Logout</button>
              </Link>
            </li>
          </>
        )}

        {/* user is not logged in */}
        {!user && (
          <li>
            <SignInButton />
          </li>
        )}
      </ul>
    </nav>
  );
}
