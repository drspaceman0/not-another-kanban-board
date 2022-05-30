import TextArea from "./TextArea";
import styles from "../styles/Home.module.css";

const Task = ({ taskData, isPending = false, handleTaskChange }) => {
  const handleTextAreaChange = (newText) => {
    console.log("handleTextAreaChange");
    const taskId = taskData.id;
    handleTaskChange({ id: taskId, message: newText });
  };

  return (
    <div className={styles.task}>
      <TextArea className={styles.tasktitle} defaultText={taskData.message} startFocused={isPending} onBlurCallback={handleTextAreaChange} />
    </div>
  );
};

export default Task;
