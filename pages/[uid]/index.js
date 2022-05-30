import { useEffect, useState } from "react";
import Dash from "../../components/Dash";
import { getUserTasks, addTask, editTask, deleteTask } from "../../lib/firebase";

export default function UserPage({ initialTasks, userId }) {
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

  return <Dash initialTasks={initialTasks} handleUpdate={handleUpdate} />;
}

export async function getServerSideProps({ query }) {
  const initialTasks = await getUserTasks(query.uid);
  const userId = query.uid;
  console.log("getServerSideProps");
  console.log(initialTasks);
  return { props: { initialTasks, userId } };
}
