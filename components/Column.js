import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import TextArea from "./TextArea";
import Task from "./Task";
import { createColumn, updateColumn } from "../lib/firebase";

const NEW_TASK_ID = Infinity;
const Column = (props) => {
  const [pendingTask, setPendingTask] = useState(false);
  const columnId = props.id;

  const addTask = () => {
    setPendingTask(true);
  };

  const updateColumnTitle = async (title) => {
    // const newCol = Object.assign({}, columnData);
    // newCol.title = title;
    props.handleColumnChange(newCol);
  };

  const updateTask = (newTaskData) => {
    if (newTaskData.id === NEW_TASK_ID) {
      console.log("newTaskID");
      newTaskData.id = new Date().valueOf();
      props.handleColumnChange({ id: columnId, title: props.title, tasks: [...props.tasks, newTaskData] }); // add task to column
      setPendingTask(false);
    } else {
      for (let i = 0; i < columnData.tasks.length; i++) {}
      // task description changed
    }
  };

  const tasks = pendingTask ? [...columnData.tasks, { message: "", id: NEW_TASK_ID }] : columnData.tasks;

  return (
    <div className={styles.column}>
      <div className={styles.tasks}>
        <TextArea className={styles.columntitle} defaultText={props.title} onBlurCallback={updateColumnTitle} />
        {tasks && tasks.map((taskData) => <Task key={taskData.id} taskData={taskData} isPending={taskData.id === NEW_TASK_ID} handleTaskChange={updateTask} />)}
        <button className={styles.addTask} onClick={addTask}>
          +
        </button>
      </div>
    </div>
  );
};

export default Column;
