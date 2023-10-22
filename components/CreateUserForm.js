import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function CreateUserForm() {
  const createUser = async (e) => {
    e.preventDefault();

    const user = {
      name: e.target.name.value,
      address: e.target.address.value,
      phoneNumber: e.target.phone.value,
    };

    await addDoc(collection(db, "users"), user);
  };

  return (
    <form onSubmit={createUser} className="p-4 space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-500 text-white rounded"
      >
        Create User
      </button>
    </form>
  );
}

export default CreateUserForm;
