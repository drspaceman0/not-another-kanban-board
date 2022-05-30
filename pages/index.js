import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import toast from "react-hot-toast";
import Dash from "../components/Dash";
import Router from "next/router";

import { useEffect, useState, useContext } from "react";
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";

export default function Home({ columns = [] }) {
  const { user, username } = useContext(UserContext);

  const saveChanges = async (newState) => {};

  if (user) {
    Router.push(`/${user.uid}`);
  }
  return (
    <main>
      <div className="card">
        <h2>Hi! Feel free to demo out this Kanban Board web app! If you would like to save your data, feel free to create an account </h2>
      </div>
      <Dash columns={columns} handleStateChange={saveChanges} />
    </main>
  );
}
