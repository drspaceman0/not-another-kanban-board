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
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const increment = firebase.firestore.FieldValue.increment;

// Storage exports
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

// export async function getUserWithUsername(username) {
//   const usersRef = firestore.collection('users');
//   const query = usersRef.where('username', '==', username).limit(1);
//   const userDoc = (await query.get()).docs[0];
//   return userDoc;
// }

export async function getUserDashboard(userId) {
  const query = await db.collection("columns").doc("4hFLYCHzqiMYbS1Zbus8");

  db.collection("columns")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
      });
    });

  return query;
}

/**`
 * Create a column
 * @param  {number} userId,
 * @param  {string} title,
 */
export async function createColumn(userId, title) {
  const userDoc = await db.collection("users").doc(uid).get();
  const data = userDoc.data();
  return data.columns;
}

export async function getUsersDash(uid) {
  console.log("getUsersDash()");
  const data = await db
    .collection("columns")
    .where("userId", "==", uid)
    .get()
    .then((results) => {
      return results.docs.map((doc) => {
        const d = doc.data();
        d.id = doc.id;
        return d;
      });
    });

  console.log(data);
  // return data.columns;
  return data;
}

export async function updateColumn(column) {
  console.log("%%%%%%%%%%%%%%%%%% updateColumn");
  console.log(JSON.stringify(column));
  db.collection("columns").doc(column.id).update(column);

  return null;
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
