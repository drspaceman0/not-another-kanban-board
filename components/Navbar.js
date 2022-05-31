import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import LogoImage from "../public/logo.png";

export default function Navbar() {
  const { user, username } = useContext(UserContext);
  console.log(LogoImage);
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
              <Link href={`/${username}`}>
                <img className="profile-pic" src={user?.photoURL || "/userimage.png"} />
              </Link>
            </li>
            <li className="logout-button">
              <Link href="/logout">
                <button className="btn-gray">Logout</button>
              </Link>
            </li>
          </>
        )}

        {/* user is not logged in */}
        {!user && (
          <li>
            <Link href="/enter">
              <button className="btn-blue">Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
