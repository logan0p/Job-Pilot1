import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/login";
import Register from "../pages/register";
import Dashboard from "../pages/dashboard";
import Jobs from "../pages/jobs";
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";
import JobDetails from "../pages/JobDetails";

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRouted";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* =====================================
            ROOT
        ====================================== */}

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* =====================================
            PUBLIC ROUTES
        ====================================== */}

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* =====================================
            PROTECTED ROUTES
        ====================================== */}

        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* JOB LIST */}

        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />

        {/* SINGLE JOB DETAILS */}

        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute>
              <JobDetails />
            </ProtectedRoute>
          }
        />

        {/* ANALYTICS */}

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        {/* SETTINGS */}

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* =====================================
            UNKNOWN ROUTES
        ====================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;