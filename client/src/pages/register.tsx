import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { registerUser } from "../services/auth.service";
import { toast } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);

      await registerUser({
        name,
        email,
        password,
      });

      toast.success("Account created successfully");

      navigate("/login");

    } catch (err: any) {
    toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center">

      <div className="bg-slate-900 p-10 rounded-xl w-[420px]">

        <h1 className="text-3xl font-bold text-white mb-8">
          Create Account
        </h1>

        <input
          className="w-full p-3 rounded mb-4"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-3 rounded mb-4"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-3 rounded mb-6"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="text-gray-400 mt-6 text-center">
          Already have an account?{" "}
          <Link
            className="text-cyan-400"
            to="/login"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Register;