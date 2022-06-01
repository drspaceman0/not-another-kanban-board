import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import toast from "react-hot-toast";
import Dash from "../components/Dash";
import Router from "next/router";

import { useEffect, useState, useContext } from "react";
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";

export default function Home({ initialTasks }) {
  const [column, setColumns] = useState([]);
  const { user, username } = useContext(UserContext);

  if (user) {
    Router.push(`/${user.uid}`);
  }
  return (
    <main>
      <div className="card">
        <h2>Hello! Feel free to try out this kanban board web application. If you want to save your data, you can sign in with google and it will save your changes. </h2>
      </div>
      <Dash initialTasks={initialTasks} handleUpdate={null} />
    </main>
  );
}

export async function getStaticProps({ query }) {
  const data = '[{"message":"My First task!","id":"6m6hy","userId":"","columnId":0,"order":0}]';
  const initialTasks = JSON.parse(data);
  return { props: { initialTasks } };
}
