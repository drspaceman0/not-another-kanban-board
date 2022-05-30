import { useEffect, useState } from "react";
import Dash from "../components/Dash";
import { getUserTasks } from "../lib/firebase";

export default function Anonymous({ initialTasks }) {
  return <Dash initialTasks={initialTasks} />;
}
export async function getStaticProps({ query }) {
  const results = await getUserTasks();
  const data =
    '[{"message":"New Task","id":"6m6hy","userId":"","columnId":0,"order":0},{"message":"New Task","id":"qjgsa","userId":"","columnId":0,"order":1},{"message":"New Task","id":"350qb","userId":"","columnId":0,"order":2},{"message":"New Task","id":"lx9a7","userId":"","columnId":1,"order":0},{"message":"New Task","id":"fdf31","userId":"","columnId":2,"order":0},{"message":"New Task","id":"a9e7o","userId":"","columnId":2,"order":1},{"message":"New Task","id":"yo1zy","userId":"","columnId":3,"order":0},{"message":"New Task","id":"7qnd6","userId":"","columnId":3,"order":1}]';
  const initialTasks = await JSON.parse(data);

  console.log(initialTasks);
  return { props: { initialTasks } };
}
