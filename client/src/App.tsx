import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/auth/ProtectedRoute";

import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Jobs from "./pages/jobs";
import JobDetails from "./pages/JobDetails";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <Routes>

      {/* =========================
          PUBLIC ROUTES
      ========================== */}

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />


      {/* =========================
          PROTECTED ROUTES
      ========================== */}

      <Route element={<ProtectedRoute />}>

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/jobs"
          element={<Jobs />}
        />

        {/* 🔥 JOB DETAILS */}
        <Route
          path="/jobs/:id"
          element={<JobDetails />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        {/* ⚙️ SETTINGS */}
        <Route
          path="/settings"
          element={<Settings />}
        />

      </Route>


      {/* =========================
          DEFAULT ROUTE
      ========================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />

    </Routes>
  );
};

export default App;