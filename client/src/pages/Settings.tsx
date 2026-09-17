import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  ShieldCheck,
} from "lucide-react";

import Layout from "../components/layout/Layout";
import { useAuth } from "../components/hooks/useAuth";

import {
  getProfile,
  updateProfile,
  changePassword,
} from "../services/user.service";

const Settings = () => {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  // =====================================================
  // LOAD PROFILE
  // =====================================================

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const result = await getProfile();

        const profile = result.data.user;

        setName(profile.name || "");
        setEmail(profile.email || "");

        updateUser(profile);
      } catch (error: any) {
        console.error("PROFILE LOAD ERROR:", error);

        setName(user?.name || "");
        setEmail(user?.email || "");

        toast.error(
          error?.response?.data?.message ||
            "Failed to load profile"
        );
      } finally {
        setLoadingProfile(false);
      }
    };

    loadProfile();
  }, []);

  // =====================================================
  // SAVE PROFILE
  // =====================================================

  const handleSaveProfile = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    if (!email.trim()) {
      toast.error("Email cannot be empty");
      return;
    }

    try {
      setSavingProfile(true);

      const result = await updateProfile({
        name: name.trim(),
        email: email.trim(),
      });

      const updatedUser = result.data.user;

      updateUser(updatedUser);

      setName(updatedUser.name);
      setEmail(updatedUser.email);

      toast.success("Profile updated successfully!");
    } catch (error: any) {
      console.error("PROFILE UPDATE ERROR:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setSavingProfile(false);
    }
  };

  // =====================================================
  // CHANGE PASSWORD
  // =====================================================

  const handleChangePassword = async () => {
    if (!currentPassword) {
      toast.error("Enter your current password");
      return;
    }

    if (!newPassword) {
      toast.error("Enter a new password");
      return;
    }

    if (newPassword.length < 6) {
      toast.error(
        "New password must be at least 6 characters"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      setChangingPassword(true);

      await changePassword({
        currentPassword,
        newPassword,
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      toast.success(
        "Password changed successfully!"
      );
    } catch (error: any) {
      console.error(
        "PASSWORD CHANGE ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to change password"
      );
    } finally {
      setChangingPassword(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loadingProfile) {
    return (
      <Layout>
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-cyan-400" />

            <p className="text-slate-400">
              Loading your profile...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  const avatarLetter =
    name.charAt(0).toUpperCase() || "U";

  return (
    <Layout>
      <div className="space-y-8">

        {/* =================================================
            HEADER
        ================================================= */}

        <div>
          <h1 className="text-5xl font-bold text-white">
            ⚙️ Settings
          </h1>

          <p className="mt-2 text-lg text-slate-400">
            Manage your profile and account security.
          </p>
        </div>

        {/* =================================================
            PROFILE
        ================================================= */}

        <div className="max-w-4xl rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <div className="mb-8 flex items-center gap-5">

            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 text-3xl font-bold">
              {avatarLetter}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                Profile Information
              </h2>

              <p className="text-slate-400">
                Update your personal information.
              </p>
            </div>

          </div>

          {/* NAME */}

          <div className="mb-6">

            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
              <User size={16} />
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Enter your full name"
              className="
                w-full
                rounded-xl
                border
                border-slate-700
                bg-slate-800
                px-4
                py-3
                text-white
                outline-none
                placeholder:text-slate-500
                focus:border-cyan-500
                focus:ring-2
                focus:ring-cyan-500/20
              "
            />

          </div>

          {/* EMAIL */}

          <div className="mb-8">

            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
              <Mail size={16} />
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email address"
              className="
                w-full
                rounded-xl
                border
                border-slate-700
                bg-slate-800
                px-4
                py-3
                text-white
                outline-none
                placeholder:text-slate-500
                focus:border-cyan-500
                focus:ring-2
                focus:ring-cyan-500/20
              "
            />

          </div>

          {/* SAVE */}

          <button
            type="button"
            onClick={handleSaveProfile}
            disabled={savingProfile}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-cyan-600
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:bg-cyan-500
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >

            <Save size={18} />

            {savingProfile
              ? "Saving..."
              : "Save Changes"}

          </button>

        </div>

        {/* =================================================
            PASSWORD
        ================================================= */}

        <div className="max-w-4xl rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <div className="mb-8 flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10">
              <ShieldCheck
                size={30}
                className="text-violet-400"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                Change Password
              </h2>

              <p className="text-slate-400">
                Keep your JobPilot account secure.
              </p>
            </div>

          </div>

          {/* CURRENT PASSWORD */}

          <div className="mb-6">

            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
              <Lock size={16} />
              Current Password
            </label>

            <div className="relative">

              <input
                type={
                  showCurrent
                    ? "text"
                    : "password"
                }
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(
                    e.target.value
                  )
                }
                placeholder="Enter your current password"
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-800
                  px-4
                  py-3
                  pr-12
                  text-white
                  outline-none
                  placeholder:text-slate-500
                  focus:border-violet-500
                  focus:ring-2
                  focus:ring-violet-500/20
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowCurrent(!showCurrent)
                }
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                  hover:text-white
                "
              >
                {showCurrent ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          {/* NEW PASSWORD */}

          <div className="mb-6">

            <label className="mb-2 text-sm font-medium text-slate-300">
              New Password
            </label>

            <div className="relative">

              <input
                type={
                  showNew
                    ? "text"
                    : "password"
                }
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(
                    e.target.value
                  )
                }
                placeholder="Enter a new password"
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-800
                  px-4
                  py-3
                  pr-12
                  text-white
                  outline-none
                  placeholder:text-slate-500
                  focus:border-violet-500
                  focus:ring-2
                  focus:ring-violet-500/20
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowNew(!showNew)
                }
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                  hover:text-white
                "
              >
                {showNew ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          {/* CONFIRM PASSWORD */}

          <div className="mb-8">

            <label className="mb-2 text-sm font-medium text-slate-300">
              Confirm New Password
            </label>

            <div className="relative">

              <input
                type={
                  showConfirm
                    ? "text"
                    : "password"
                }
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                placeholder="Confirm your new password"
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-800
                  px-4
                  py-3
                  pr-12
                  text-white
                  outline-none
                  placeholder:text-slate-500
                  focus:border-violet-500
                  focus:ring-2
                  focus:ring-violet-500/20
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirm(!showConfirm)
                }
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                  hover:text-white
                "
              >
                {showConfirm ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          {/* CHANGE PASSWORD */}

          <button
            type="button"
            onClick={handleChangePassword}
            disabled={changingPassword}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-violet-600
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:bg-violet-500
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >

            <Lock size={18} />

            {changingPassword
              ? "Changing Password..."
              : "Change Password"}

          </button>

        </div>

      </div>
    </Layout>
  );
};

export default Settings;