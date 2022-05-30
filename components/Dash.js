import Column from "./Column";
import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function Dash({ columns, handleStateChange }) {
  const [pendingChanges, setPendingChanges] = useState(null);

  const handleColumnChange = (changes) => {
    handleStateChange();
  };

  return (
    <section className="dash">
      <h3>Dash</h3>
      <div className={styles.columns}>
        {columns && columns.map((columnData) => <Column key={columnData.id} columnData={columnData} handleColumnChange={handleColumnChange} />)}
        <button className={styles.addColumn}>+</button>
      </div>
    </section>
  );
}

export function Task({ message }) {
  return (
    <div className="task">
      <p>{message}</p>
    </div>
  );
}
