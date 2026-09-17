import { useRef, useState } from "react";

import {
  Upload,
  FileText,
  Eye,
  Download,
  Trash2,
  RefreshCcw,
  Loader2,
} from "lucide-react";

import {
  uploadResume,
  deleteResume,
} from "../../services/resume.service";

type Props = {
  jobId: string;
  resume?: string | null;
};

const ResumeUpload = ({
  jobId,
  resume,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  // ======================================================
  // UPLOAD / REPLACE
  // ======================================================

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // PDF validation
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }

    setLoading(true);

    try {
      await uploadResume(
        jobId,
        file
      );

      window.location.reload();
    } catch (error) {
      console.error(
        "Resume upload error:",
        error
      );

      alert("Failed to upload resume.");
    } finally {
      setLoading(false);

      // Allow selecting the same file again
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  // ======================================================
  // DELETE
  // ======================================================

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmed) return;

    setDeleting(true);

    try {
      await deleteResume(jobId);

      window.location.reload();
    } catch (error) {
      console.error(
        "Resume delete error:",
        error
      );

      alert("Failed to delete resume.");
    } finally {
      setDeleting(false);
    }
  };

  // ======================================================
  // RESUME URL
  // ======================================================

  const resumeUrl = resume
    ? `http://localhost:5000${resume}`
    : "";

  // ======================================================
  // UI
  // ======================================================

  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-700
        bg-slate-900/80
        p-4
        backdrop-blur-sm
      "
    >
      {/* Hidden file input */}

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        hidden
        onChange={handleUpload}
      />

      {/* ==================================================
          RESUME EXISTS
      ================================================== */}

      {resume ? (
        <>
          {/* Resume information */}

          <div className="mb-4 flex items-center gap-3">
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-red-500/20
              "
            >
              <FileText
                size={24}
                className="text-red-400"
              />
            </div>

            <div className="min-w-0">
              <h3 className="font-semibold text-white">
                Resume Uploaded
              </h3>

              <p className="truncate text-sm text-slate-400">
                {resume
                  .split("/")
                  .pop()}
              </p>
            </div>
          </div>

          {/* ==================================================
              ACTION BUTTONS
          ================================================== */}

          <div className="flex flex-wrap gap-3">

            {/* PREVIEW */}

            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-cyan-600
                px-4
                py-2
                text-sm
                font-medium
                text-white
                transition
                hover:bg-cyan-500
              "
            >
              <Eye size={16} />

              Preview
            </a>

            {/* DOWNLOAD */}

            <a
              href={resumeUrl}
              download
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-green-600
                px-4
                py-2
                text-sm
                font-medium
                text-white
                transition
                hover:bg-green-500
              "
            >
              <Download size={16} />

              Download
            </a>

            {/* REPLACE */}

            <button
              type="button"
              disabled={
                loading ||
                deleting
              }
              onClick={() =>
                inputRef.current?.click()
              }
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-yellow-500
                px-4
                py-2
                text-sm
                font-medium
                text-black
                transition
                hover:bg-yellow-400
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {loading ? (
                <Loader2
                  size={16}
                  className="animate-spin"
                />
              ) : (
                <RefreshCcw size={16} />
              )}

              {loading
                ? "Replacing..."
                : "Replace"}
            </button>

            {/* DELETE */}

            <button
              type="button"
              disabled={
                deleting ||
                loading
              }
              onClick={handleDelete}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-red-600
                px-4
                py-2
                text-sm
                font-medium
                text-white
                transition
                hover:bg-red-500
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {deleting ? (
                <Loader2
                  size={16}
                  className="animate-spin"
                />
              ) : (
                <Trash2 size={16} />
              )}

              {deleting
                ? "Deleting..."
                : "Delete"}
            </button>
          </div>
        </>
      ) : (

        /* ==================================================
           NO RESUME
        ================================================== */

        <button
          type="button"
          disabled={loading}
          onClick={() =>
            inputRef.current?.click()
          }
          className="
            flex
            w-full
            items-center
            justify-center
            gap-3
            rounded-2xl
            border-2
            border-dashed
            border-cyan-500
            py-6
            text-cyan-400
            transition
            hover:bg-cyan-500/10
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading ? (
            <Loader2
              className="animate-spin"
              size={22}
            />
          ) : (
            <Upload size={22} />
          )}

          <span className="font-semibold">
            {loading
              ? "Uploading..."
              : "Upload Resume (PDF)"}
          </span>
        </button>
      )}
    </div>
  );
};

export default ResumeUpload;

