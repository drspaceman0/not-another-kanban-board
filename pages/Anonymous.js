import styles from "../styles/Home.module.css";

import { useEffect, useState } from "react";

import Column from "../components/Column";

export default function Anonymous({ initialColumns }) {
  const [columns, setColumns] = useState(initialColumns);

  useEffect(() => {
    if (initialColumns) return;

    // const data = [
    //   {
    //     tasks: [{ message: "first", id: 1 }],
    //     order: 1,
    //     id: "rQ7DIjzKEk71GwbX2MYj",
    //     // userId: "1cZ8Ou9sRXRbO0PxoulnpgGcvNo1",
    //     title: "Tosasddssso lisdaaaasdadt",
    //   },
    // ];
    const data = [];
    data.push({
      tasks: [{ message: "first", id: 1 }],
      order: 1,
      id: "rQ7DIjzKEk71GwbX2MYj",
      title: "Tosasddssso lisdaaaasdadt",
    });

    setColumns(data);
  }, []);

  const handleColumnChange = (changedColumn) => {
    const changedId = changedColumn.id;
    console.log("handleColumnChange");
    const newState = Object.assign([], columns);
    console.log(columns);
    const c = newState.find((c) => c.id === changedId);
    if (c) {
      c.title = changedColumn.title;
      c.order = changedColumn.order;
      c.tasks = changedColumn.tasks;
    }
    console.log(newState);
    // setColumns(newState);
  };

  return (
    <section className="columns">
      <h3>columns</h3>
      <div className={styles.columns}>
        {columns && columns.map((columnData) => <Column key={columnData.id} columnData={columnData} handleColumnChange={handleColumnChange} />)}
        <button className={styles.addColumn}>+</button>
      </div>
    </section>
  );
}
