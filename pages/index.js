import { useEffect } from "react";
import { useRouter } from "next/router";
import app from "/firebase";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import LoginForm from "@/components/LoginForm";
import SignUpForm from "@/components/SignUpForm";

function Home() {
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen bg-green-100 flex flex-col justify-center items-center space-y-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-6">Lawn Management Portal</h1>
        <p className="text-lg mb-4">
          Empowering lawn entrepreneurs to manage their customers efficiently.
        </p>
      </div>

      <div className="flex space-x-12">
        <LoginForm />
        <SignUpForm />
      </div>

      <div className="mt-12 text-center text-sm text-gray-600">
        © 2023 Lawn Management Co. All rights reserved.
      </div>
    </div>
  );
}

export default Home;
