import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "@firebase/firestore";
import { getAuth, signOut } from "@firebase/auth";
import app from "../firebase"; // Adjust the path accordingly
import { db } from "../firebase"; // Adjust the path to your firebase config file

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const auth = getAuth(app);
      const userRef = collection(db, "users");
      const q = query(userRef, where("createdBy", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);

      setUsers(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };

    fetchUsers();
  }, []);

  const createUser = async () => {
    const auth = getAuth(app);

    await addDoc(collection(db, "users"), {
      givenName,
      familyName,
      address,
      contact,
      createdBy: auth.currentUser.uid,
    });

    setGivenName("");
    setFamilyName("");
    setAddress("");
    setContact("");
    // Refresh user list after adding
    const userRef = collection(db, "users");
    const q = query(userRef, where("createdBy", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    setUsers(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const logout = () => {
    const auth = getAuth(app);
    signOut(auth).then(() => {
      router.push("/");
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Dashboard</h1>

      <button
        onClick={logout}
        className="mb-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>

      <div className="mb-4">
        <input
          value={givenName}
          onChange={(e) => setGivenName(e.target.value)}
          placeholder="Given Name"
          className="border p-2 rounded mr-2"
        />
        <input
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
          placeholder="Family Name"
          className="border p-2 rounded mr-2"
        />
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          className="border p-2 rounded mr-2"
        />
        <input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Contact"
          className="border p-2 rounded"
        />
        <button
          onClick={createUser}
          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create User
        </button>
      </div>

      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Given Name</th>
            <th className="px-4 py-2">Family Name</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Contact</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.givenName}</td>
              <td className="border px-4 py-2">{user.familyName}</td>
              <td className="border px-4 py-2">{user.address}</td>
              <td className="border px-4 py-2">{user.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
