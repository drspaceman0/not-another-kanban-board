import styles from "../styles/Dash.module.css";

import { useEffect, useState } from "react";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const emptyTask = { message: "message", id: new Date().valueOf(), userId: "Asdasdasd", order: 1 };

const emptyColumn = {
  title: "New Column",
  id: 1,
  order: 1,
  userId: "Asdasdasd",
  tasks: [emptyTask],
};

const nColumnsToStart = 3;
const nTasksToStart = 3;

export default function BoardWithVariableColumns() {
  const [columns, setColumns] = useState(null);

  useEffect(() => {
    const initialColumns = [];
    for (let i = 0; i < nColumnsToStart; i++) {
      const c = Object.assign({}, emptyColumn);
      c.title += " " + i;
      c.id = new Date().valueOf();
      c.order = i;
      c.tasks = [emptyTask, emptyTask, emptyTask];
      initialColumns.push(c);
    }

    setColumns(initialColumns);
  }, []);

  const addColumn = () => {
    setColumns([...columns, emptyColumn]);
  };

  const addTask = (id) => {
    // setColumns([...columns, emptyColumn]);

    for (let c of columns) {
      if (c.id === id) {
        const newColumn = Object.assign({}, c);
        newColumn.tasks = [newColumn.tasks, emptyTask];
      }
    }
  };

  return (
    <main>
      <Stack className="columns" direction="row" spacing={2} sx={{ justifyContent: "center", border: "1px solid black" }}>
        {columns &&
          columns.map((c) => {
            return (
              <>
                <Paper className="column" sx={{ p: 2 }} elevation={2} maxWidth="xs">
                  <Typography variant="h3" component="h3" align="center" sx={{ fontSize: "1rem", textTransform: "capitalize" }}>
                    {c.title}
                    {c.id}
                  </Typography>
                  <Stack spacing={2} className="tasks" alignItems="justify" sx={{ mt: 2 }}>
                    {c.tasks &&
                      c.tasks.map((t) => {
                        return (
                          <Paper elevation={4} sx={{ p: 2 }}>
                            <Typography variant="p" component="p" sx={{ fontSize: "1rem", alignSelf: "center" }}>
                              {t.message}
                            </Typography>
                          </Paper>
                        );
                      })}
                    <Fab
                      sx={{ alignSelf: "center" }}
                      size="small"
                      color="primary"
                      aria-label="add task"
                      onClick={() => {
                        addTask(c.id);
                      }}
                    >
                      <AddIcon />
                    </Fab>
                  </Stack>
                </Paper>
              </>
            );
          })}
        <Fab sx={{ alignSelf: "center" }} size="small" color="primary" aria-label="add column" onClick={addColumn}>
          <AddIcon />
        </Fab>
      </Stack>
    </main>
  );
}
