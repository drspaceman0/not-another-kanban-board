import { useEffect, useState } from "react";

import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

const COLUMNS = ["To Do", "In Progress", "Testing", "Done"];
const emptyTask = { message: "message", id: new Date().valueOf(), userId: "Asdasdasd", order: 1, column: 1 };

const randString = () => {
  return Math.random().toString(36).slice(2, 7);
};

export default function Test() {
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState("");

  const newTask = (columnId, message, order) => {
    const newId = randString();
    return { message: message, id: newId, userId: userId, columnId: columnId, order: order };
  };

  useEffect(() => {
    const initialTasks = [];
    for (let i = 0; i < COLUMNS.length; i++) {
      const nTasks = 1 + Math.floor(Math.random() * 3);
      for (let j = 0; j < nTasks; j++) initialTasks.push(newTask(i, "New Task", j));
    }
    setTasks(initialTasks);
  }, []);

  const addTask = (columnId, order) => {
    setTasks([...tasks, newTask(columnId, "New Task", order)]);
  };

  const editTask = (newMessage, task) => {
    console.log("editTask");
    console.log(task);
    const editedTask = Object.assign({}, task);
    editedTask.message = newMessage;
    setTasks([...tasks.filter((t) => t.id !== task.id), editedTask]);
  };
  const deleteTask = (task) => {
    console.log("deleteTask");
    console.log(task);
    setTasks(tasks.filter((t) => t.id !== task.id));
  };

  const columns = [];
  for (let i = 0; i < COLUMNS.length; i++) {
    const taskList = tasks.filter((t) => t.columnId === i);
    taskList.sort((a, b) => a.order - b.order);
    columns.push({
      title: COLUMNS[i],
      tasks: taskList,
      id: i,
    });
  }

  return (
    <Stack className="columns" direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ p: { xs: 1, sm: 1, md: 4 } }}>
      {columns &&
        columns.map((column) => {
          return <Column key={column.title} column={column} />;
        })}
    </Stack>
  );

  function Column({ column }) {
    return (
      <Paper className="column" sx={{ p: 1, pt: 2, flex: 1 }} elevation={4}>
        <Typography variant="h3" component="h3" align="center" sx={{ fontSize: "1rem", fontWeight: "bold", textTransform: "capitalize" }}>
          {column.title}
        </Typography>
        <Stack spacing={2} className="tasks" alignItems="center" sx={{ mt: 2 }}>
          {column.tasks && column.tasks.map((t) => <Task key={t.id} task={t} />)}
          <Fab
            sx={{ alignSelf: "center" }}
            size="small"
            color="primary"
            aria-label="add task"
            onClick={() => {
              addTask(column.id, column.tasks.length);
            }}
          >
            <AddIcon />
          </Fab>
        </Stack>
      </Paper>
    );
  }

  function Task({ task }) {
    return (
      <Card sx={{ maxWidth: 345, py: 0, display: "flex" }}>
        <CardContent sx={{}}>
          <TextField
            defaultValue={task.message}
            size="small"
            variant="outlined"
            multiline={true}
            sx={{ borderColor: "#fff" }}
            onBlur={(event) => {
              editTask(event.target.value, task);
            }}
          />
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end", py: 0 }}>
          <IconButton
            aria-label="delete"
            size="small"
            color="error"
            onClick={() => {
              deleteTask(task);
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}
