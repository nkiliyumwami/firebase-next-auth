import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function LoginForm() {
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={loginWithGoogle}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Login with Google
      </button>
    </div>
  );
}

export default LoginForm;
