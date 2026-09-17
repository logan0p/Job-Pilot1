import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginUser } from "../services/auth.service";
import { useAuth } from "../components/hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const result = await loginUser({
        email,
        password,
      });

      // Get token and user from backend response
      const token = result.data.token;
      const user = result.data.user;

      // Store both in AuthContext
      login(token, user);

      toast.success("Welcome back!");

      navigate("/dashboard");

    } catch (err: any) {
      console.error(err);

      toast.error(
        err?.response?.data?.message ||
        "Invalid email or password"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

      <div className="w-full max-w-[400px] rounded-2xl bg-slate-900 p-10 shadow-2xl">

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-white">
            Welcome Back 🚀
          </h1>

          <p className="mt-2 text-slate-400">
            Login to your JobPilot account
          </p>

        </div>

        {/* Email */}

        <div className="mb-4">

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Email
          </label>

          <input
            type="email"
            className="
              w-full
              rounded-xl
              border
              border-slate-700
              bg-slate-800
              p-3
              text-white
              outline-none
              transition
              focus:border-cyan-500
              focus:ring-2
              focus:ring-cyan-500/20
            "
            placeholder="you@example.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

        </div>

        {/* Password */}

        <div className="mb-6">

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Password
          </label>

          <input
            type="password"
            className="
              w-full
              rounded-xl
              border
              border-slate-700
              bg-slate-800
              p-3
              text-white
              outline-none
              transition
              focus:border-cyan-500
              focus:ring-2
              focus:ring-cyan-500/20
            "
            placeholder="••••••••"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />

        </div>

        {/* Login Button */}

        <button
          type="button"
          onClick={handleLogin}
          disabled={loading}
          className="
            w-full
            rounded-xl
            bg-cyan-600
            p-3
            font-semibold
            text-white
            transition
            hover:bg-cyan-500
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

      </div>

    </div>
  );
};

export default Login;