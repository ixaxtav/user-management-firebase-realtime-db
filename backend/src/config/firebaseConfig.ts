import admin from "firebase-admin";
import serviceAccount from "../../serviceAccountKey.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: "https://user-management-rr-default-rtdb.firebaseio.com",
});

const db = admin.database();

export default db;
