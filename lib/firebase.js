import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDdFeygd-zYAB9Ke0Yi18wsbClEMtYAO4c",
  authDomain: "notanotherkanbanboard.firebaseapp.com",
  projectId: "notanotherkanbanboard",
  storageBucket: "notanotherkanbanboard.appspot.com",
  messagingSenderId: "550640027762",
  appId: "1:550640027762:web:a8582a4ee9ce58de9a9aeb",
  measurementId: "G-N84JMZ1BWE",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Auth exports
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Firestore exports
export const db = firebase.firestore();

export async function deleteAccount(uid) {
  await db
    .collection("tasks")
    .where("userId", "==", uid)
    .get()
    .then((results) => {
      results.docs.map((doc) => {
        // doc.delete();
        doc.ref.delete();
      });
    });

  auth.currentUser.delete().then(() => console.log("User deleted"));
}

export async function addTask(task) {
  const data = await db.collection("tasks").add(task);
  return;
}
export async function editTask(task) {
  const data = await db.collection("tasks").doc(task.id).set(task);
  return;
}
export async function deleteTask(task) {
  const data = await db.collection("tasks").doc(task.id).delete();
  return;
}

export async function getUserTasks(uid) {
  console.log("getUserTasks()");
  const data = await db
    .collection("tasks")
    .where("userId", "==", uid)
    .get()
    .then((results) => {
      return results.docs.map((doc) => {
        const d = doc.data();
        d.id = doc.id;
        return d;
      });
    });

  return data;
}

export async function getUser(user) {
  if (!user) return null;

  const uid = user.uid;
  const userDoc = await db.collection("users").doc(uid).get();

  if (userDoc && userDoc.exists) {
    console.log("Sucess! user exists");
    return userDoc.data();
  } else {
    console.log("User doesnt exist in table. adding them...");

    const newUserData = await createUser(user);
    return newUserData;
  }
}

export async function createUser(user) {
  const uid = user.uid;
  const email = user.email;
  db.collection("users").doc(uid).set({
    uid: uid,
    email: email,
    username: email, //username is the email by default
  });

  db.collection("columns").add({
    userId: uid,
    title: "Todo list",
    order: 1,
    tasks: [{ id: 1, message: "My first task", order: 1 }],
  });
  return true;
}
