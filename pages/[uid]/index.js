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
  let initialTasks = await getUserTasks(query.uid);
  const userId = query.uid;
  if (initialTasks && initialTasks.length === 0) {
    const data = '[{"message":"My First task!","id":"6m6hy","userId":"","columnId":0,"order":0}]';
    initialTasks = JSON.parse(data);
  }
  return { props: { initialTasks, userId } };
}
