import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../lib/context";
import Dash from "../../components/Dash";
import { getUserTasks, addTask, editTask, deleteTask } from "../../lib/firebase";
import Router from "next/router";

export default function UserPage({ initialTasks, userId }) {
  return <Dash initialTasks={initialTasks} handleUpdate={handleUpdate} />;

  function handleUpdate(type, task) {
    task.userId = userId;
    if (type === "add") {
      addTask(task);
    } else if (type === "edit") {
      editTask(task);
    } else if (type === "delete") {
      deleteTask(task);
    }
  }
}

export async function getServerSideProps({ query }) {
  const initialTasks = await getUserTasks(query.uid);
  const userId = query.uid;
  console.log("getServerSideProps");
  console.log(initialTasks);
  return { props: { initialTasks, userId } };
}
