import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function SignUpForm() {
  const signUpWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={signUpWithGoogle}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Sign Up with Google
      </button>
    </div>
  );
}

export default SignUpForm;
