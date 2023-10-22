import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import MessageButton from "./MessageButton";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const userCollection = await getDocs(collection(db, "users"));
      setUsers(
        userCollection.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-4 space-y-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex justify-between items-center border p-2 rounded"
        >
          <div>
            <p>Name: {user.name}</p>
            <p>Address: {user.address}</p>
            <p>Phone: {user.phoneNumber}</p>
          </div>
          <MessageButton userId={user.id} />
        </div>
      ))}
    </div>
  );
}

export default UserList;
