import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  Building2,
  Briefcase,
  Calendar,
  DollarSign,
  ExternalLink,
  FileText,
  Loader2,
  MapPin,
  Pencil,
  Trash2,
  Upload,
  Eye,
} from "lucide-react";

import Layout from "../components/layout/Layout";
import EditJobModal from "../components/jobs/EditJobModal";
import DeleteJobModal from "../components/jobs/DeleteJobModal";

import {
  getJobById,
  deleteJob,
} from "../services/job.service";

import api from "../services/api";


// ======================================================
// JOB TYPE
// ======================================================

type Job = {
  id: string;
  company: string;
  position: string;
  location?: string;
  salary?: string;
  status: string;
  jobLink?: string;
  notes?: string;
  resume?: string;
  appliedDate?: string;
  createdAt?: string;
  updatedAt?: string;
};


// ======================================================
// COMPONENT
// ======================================================

const JobDetails = () => {

  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement | null>(null);


  // ====================================================
  // STATE
  // ====================================================

  const [job, setJob] = useState<Job | null>(null);

  const [loading, setLoading] = useState(true);

  const [uploading, setUploading] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);


  // ====================================================
  // LOAD JOB
  // ====================================================

  const loadJob = async () => {

    if (!id) {
      toast.error("Job ID is missing.");
      navigate("/jobs");
      return;
    }

    try {

      setLoading(true);

      const result = await getJobById(id);

      setJob(result.data);

    } catch (error: any) {

      console.error("GET JOB ERROR:", error);

      toast.error(
        error?.response?.data?.message ||
        "Failed to load job."
      );

      navigate("/jobs");

    } finally {

      setLoading(false);

    }

  };


  // ====================================================
  // INITIAL LOAD
  // ====================================================

  useEffect(() => {

    loadJob();

  }, [id]);


  // ====================================================
  // EDIT JOB
  // ====================================================

  const handleEdit = () => {

    setEditOpen(true);

  };


  // ====================================================
  // AFTER EDIT
  // ====================================================

  const handleUpdated = async () => {

    await loadJob();

  };


  // ====================================================
  // DELETE JOB
  // ====================================================

  const handleDelete = async () => {

    if (!job) return;

    try {

      setDeleteLoading(true);

      await deleteJob(job.id);

      toast.success(
        "Job deleted successfully."
      );

      setDeleteOpen(false);

      navigate("/jobs");

    } catch (error: any) {

      console.error(
        "DELETE JOB ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
        "Failed to delete job."
      );

    } finally {

      setDeleteLoading(false);

    }

  };


  // ====================================================
  // RESUME UPLOAD
  // ====================================================

  const handleResumeUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = event.target.files?.[0];

    if (!file || !id) {
      return;
    }


    // --------------------------------------------------
    // PDF CHECK
    // --------------------------------------------------

    if (file.type !== "application/pdf") {

      toast.error(
        "Only PDF resumes are allowed."
      );

      event.target.value = "";

      return;

    }


    // --------------------------------------------------
    // SIZE CHECK
    // --------------------------------------------------

    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {

      toast.error(
        "Resume must be smaller than 5 MB."
      );

      event.target.value = "";

      return;

    }


    try {

      setUploading(true);


      const formData = new FormData();

      formData.append(
        "resume",
        file
      );


      const response = await api.post(
        `/resume/${id}`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );


      if (response.data?.success) {

        toast.success(
          "Resume uploaded successfully!"
        );

        await loadJob();

      } else {

        toast.error(
          response.data?.message ||
          "Resume upload failed."
        );

      }

    } catch (error: any) {

      console.error(
        "RESUME UPLOAD ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
        "Failed to upload resume."
      );

    } finally {

      setUploading(false);

      event.target.value = "";

    }

  };


  // ====================================================
  // OPEN FILE SELECTOR
  // ====================================================

  const openFileSelector = () => {

    if (uploading) {
      return;
    }

    fileInputRef.current?.click();

  };


  // ====================================================
  // RESUME URL
  // ====================================================

  const getResumeUrl = () => {

    if (!job?.resume) {
      return null;
    }

    if (
      job.resume.startsWith("http://") ||
      job.resume.startsWith("https://")
    ) {
      return job.resume;
    }

    return `http://localhost:5000${job.resume}`;

  };


  const resumeUrl = getResumeUrl();


  // ====================================================
  // FORMAT DATE
  // ====================================================

  const formatDate = (
    date?: string
  ) => {

    if (!date) {
      return "Not specified";
    }

    const parsedDate =
      new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return "Not specified";
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

  };


  // ====================================================
  // STATUS STYLE
  // ====================================================

  const getStatusColor = (
    status: string
  ) => {

    switch (status) {

      case "Applied":
        return `
          border-blue-500/30
          bg-blue-500/10
          text-blue-400
        `;

      case "Interview":
        return `
          border-yellow-500/30
          bg-yellow-500/10
          text-yellow-400
        `;

      case "Offer":
        return `
          border-green-500/30
          bg-green-500/10
          text-green-400
        `;

      case "Rejected":
        return `
          border-red-500/30
          bg-red-500/10
          text-red-400
        `;

      default:
        return `
          border-slate-700
          bg-slate-800
          text-slate-300
        `;

    }

  };


  // ====================================================
  // LOADING
  // ====================================================

  if (loading) {

    return (

      <Layout>

        <div
          className="
            flex
            min-h-[70vh]
            items-center
            justify-center
          "
        >

          <Loader2
            size={42}
            className="
              animate-spin
              text-cyan-400
            "
          />

        </div>

      </Layout>

    );

  }


  // ====================================================
  // JOB NOT FOUND
  // ====================================================

  if (!job) {

    return (

      <Layout>

        <div
          className="
            flex
            min-h-[70vh]
            flex-col
            items-center
            justify-center
          "
        >

          <h1 className="text-3xl font-bold">
            Job not found
          </h1>

          <button
            onClick={() =>
              navigate("/jobs")
            }
            className="
              mt-6
              rounded-xl
              bg-cyan-600
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:bg-cyan-500
            "
          >
            ← Back to Jobs
          </button>

        </div>

      </Layout>

    );

  }


  // ====================================================
  // MAIN UI
  // ====================================================

  return (

    <Layout>

      <div className="space-y-8">


        {/* ==================================================
            BACK
        ================================================== */}

        <button
          onClick={() =>
            navigate("/jobs")
          }
          className="
            flex
            items-center
            gap-2
            text-slate-400
            transition
            hover:text-cyan-400
          "
        >

          <ArrowLeft size={20} />

          Back to Jobs

        </button>


        {/* ==================================================
            HEADER
        ================================================== */}

        <div
          className="
            flex
            flex-col
            gap-6
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          <div className="flex items-center gap-5">


            {/* COMPANY ICON */}

            <div
              className="
                flex
                h-20
                w-20
                shrink-0
                items-center
                justify-center
                rounded-3xl
                border
                border-cyan-500/20
                bg-cyan-500/10
              "
            >

              <Building2
                size={38}
                className="text-cyan-400"
              />

            </div>


            {/* COMPANY + POSITION */}

            <div>

              <h1
                className="
                  text-4xl
                  font-bold
                  text-white
                "
              >
                {job.company}
              </h1>

              <p
                className="
                  mt-2
                  text-lg
                  text-slate-400
                "
              >
                {job.position}
              </p>

            </div>

          </div>


          {/* ACTION BUTTONS */}

          <div className="flex gap-3">

            <button
              onClick={handleEdit}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-slate-700
                bg-slate-900
                px-5
                py-3
                font-semibold
                text-white
                transition
                hover:border-cyan-500/40
                hover:bg-slate-800
              "
            >

              <Pencil size={18} />

              Edit

            </button>


            <button
              onClick={() =>
                setDeleteOpen(true)
              }
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-red-500/20
                bg-red-500/10
                px-5
                py-3
                font-semibold
                text-red-400
                transition
                hover:bg-red-500/20
              "
            >

              <Trash2 size={18} />

              Delete

            </button>

          </div>

        </div>


        {/* ==================================================
            STATUS
        ================================================== */}

        <span
          className={`
            inline-flex
            rounded-full
            border
            px-5
            py-2
            text-sm
            font-semibold
            ${getStatusColor(job.status)}
          `}
        >
          {job.status}
        </span>


        {/* ==================================================
            INFORMATION CARDS
        ================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-5
            md:grid-cols-2
            xl:grid-cols-4
          "
        >


          {/* LOCATION */}

          <div
            className="
              rounded-2xl
              border
              border-slate-800
              bg-slate-900
              p-5
            "
          >

            <div
              className="
                mb-3
                flex
                items-center
                gap-3
              "
            >

              <MapPin
                size={20}
                className="text-cyan-400"
              />

              <span className="text-sm text-slate-400">
                Location
              </span>

            </div>

            <p className="font-semibold text-white">
              {job.location || "Not specified"}
            </p>

          </div>


          {/* POSITION */}

          <div
            className="
              rounded-2xl
              border
              border-slate-800
              bg-slate-900
              p-5
            "
          >

            <div
              className="
                mb-3
                flex
                items-center
                gap-3
              "
            >

              <Briefcase
                size={20}
                className="text-cyan-400"
              />

              <span className="text-sm text-slate-400">
                Position
              </span>

            </div>

            <p className="font-semibold text-white">
              {job.position}
            </p>

          </div>


          {/* SALARY */}

          <div
            className="
              rounded-2xl
              border
              border-slate-800
              bg-slate-900
              p-5
            "
          >

            <div
              className="
                mb-3
                flex
                items-center
                gap-3
              "
            >

              <DollarSign
                size={20}
                className="text-cyan-400"
              />

              <span className="text-sm text-slate-400">
                Salary
              </span>

            </div>

            <p className="font-semibold text-white">
              {job.salary || "Not specified"}
            </p>

          </div>


          {/* APPLIED DATE */}

          <div
            className="
              rounded-2xl
              border
              border-slate-800
              bg-slate-900
              p-5
            "
          >

            <div
              className="
                mb-3
                flex
                items-center
                gap-3
              "
            >

              <Calendar
                size={20}
                className="text-cyan-400"
              />

              <span className="text-sm text-slate-400">
                Applied Date
              </span>

            </div>

            <p className="font-semibold text-white">
              {formatDate(job.appliedDate)}
            </p>

          </div>

        </div>


        {/* ==================================================
            CONTENT GRID
        ================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-8
            xl:grid-cols-3
          "
        >


          {/* =================================================
              LEFT
          ================================================= */}

          <div
            className="
              space-y-8
              xl:col-span-2
            "
          >


            {/* =================================================
                NOTES
            ================================================= */}

            <div
              className="
                rounded-3xl
                border
                border-slate-800
                bg-slate-900
                p-7
              "
            >

              <div
                className="
                  mb-5
                  flex
                  items-center
                  gap-3
                "
              >

                <FileText
                  size={22}
                  className="text-cyan-400"
                />

                <h2 className="text-2xl font-bold">
                  Notes
                </h2>

              </div>


              {job.notes ? (

                <p
                  className="
                    whitespace-pre-wrap
                    leading-7
                    text-slate-300
                  "
                >
                  {job.notes}
                </p>

              ) : (

                <p className="text-slate-500">
                  No notes added for this application.
                </p>

              )}

            </div>


            {/* =================================================
                JOB LINK
            ================================================= */}

            {job.jobLink && (

              <div
                className="
                  rounded-3xl
                  border
                  border-slate-800
                  bg-slate-900
                  p-7
                "
              >

                <div
                  className="
                    mb-5
                    flex
                    items-center
                    gap-3
                  "
                >

                  <ExternalLink
                    size={22}
                    className="text-cyan-400"
                  />

                  <h2 className="text-2xl font-bold">
                    Job Posting
                  </h2>

                </div>


                <a
                  href={job.jobLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-cyan-600
                    px-5
                    py-3
                    font-semibold
                    text-white
                    transition
                    hover:bg-cyan-500
                  "
                >

                  Open Job Posting

                  <ExternalLink size={17} />

                </a>

              </div>

            )}

          </div>


          {/* =================================================
              RIGHT — RESUME
          ================================================= */}

          <div className="space-y-8">


            <div
              className="
                rounded-3xl
                border
                border-slate-800
                bg-slate-900
                p-7
              "
            >

              {/* RESUME HEADER */}

              <div
                className="
                  mb-6
                  flex
                  items-center
                  gap-3
                "
              >

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-cyan-500/10
                  "
                >

                  <FileText
                    size={25}
                    className="text-cyan-400"
                  />

                </div>


                <div>

                  <h2 className="text-2xl font-bold">
                    Resume
                  </h2>

                  <p className="text-sm text-slate-400">
                    PDF document
                  </p>

                </div>

              </div>


              {/* HIDDEN FILE INPUT */}

              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf,.pdf"
                onChange={handleResumeUpload}
                className="hidden"
              />


              {/* EXISTING RESUME */}

              {resumeUrl ? (

                <div className="space-y-4">


                  <div
                    className="
                      rounded-2xl
                      border
                      border-green-500/20
                      bg-green-500/5
                      p-5
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >

                      <div
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-lg
                          bg-green-500/10
                        "
                      >

                        <FileText
                          size={20}
                          className="text-green-400"
                        />

                      </div>


                      <div>

                        <p className="font-semibold text-white">
                          Resume uploaded
                        </p>

                        <p className="text-xs text-slate-400">
                          PDF resume available
                        </p>

                      </div>

                    </div>

                  </div>


                  {/* OPEN */}

                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-cyan-600
                      px-5
                      py-3
                      font-semibold
                      text-white
                      transition
                      hover:bg-cyan-500
                    "
                  >

                    <Eye size={18} />

                    Open Resume

                  </a>


                  {/* REPLACE */}

                  <button
                    type="button"
                    onClick={openFileSelector}
                    disabled={uploading}
                    className="
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-slate-700
                      bg-slate-800
                      px-5
                      py-3
                      font-semibold
                      text-white
                      transition
                      hover:bg-slate-700
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >

                    {uploading ? (

                      <>
                        <Loader2
                          size={18}
                          className="animate-spin"
                        />

                        Uploading...

                      </>

                    ) : (

                      <>

                        <Upload size={18} />

                        Replace Resume

                      </>

                    )}

                  </button>

                </div>

              ) : (

                /* =================================================
                   NO RESUME
                ================================================= */

                <div className="space-y-5">


                  <div
                    className="
                      rounded-2xl
                      border
                      border-dashed
                      border-slate-700
                      bg-slate-800/40
                      p-8
                      text-center
                    "
                  >

                    <FileText
                      size={40}
                      className="
                        mx-auto
                        mb-4
                        text-slate-500
                      "
                    />

                    <p className="font-semibold text-white">
                      No resume uploaded
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                      Upload a PDF resume for this application.
                    </p>

                  </div>


                  <button
                    type="button"
                    onClick={openFileSelector}
                    disabled={uploading}
                    className="
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-cyan-600
                      px-5
                      py-3
                      font-semibold
                      text-white
                      transition
                      hover:bg-cyan-500
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >

                    {uploading ? (

                      <>
                        <Loader2
                          size={18}
                          className="animate-spin"
                        />

                        Uploading...

                      </>

                    ) : (

                      <>

                        <Upload size={18} />

                        Upload Resume

                      </>

                    )}

                  </button>


                  <p
                    className="
                      text-center
                      text-xs
                      text-slate-500
                    "
                  >
                    PDF only • Maximum 5 MB
                  </p>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>


      {/* ==================================================
          EDIT MODAL
      ================================================== */}

      <EditJobModal
        open={editOpen}
        job={{
          id: job.id,
          company: job.company,
          position: job.position,
          location: job.location || "",
          salary: job.salary || "",
          status: job.status,
          notes: job.notes || "",
        }}
        onClose={() =>
          setEditOpen(false)
        }
        onUpdated={handleUpdated}
      />


      {/* ==================================================
          DELETE MODAL
      ================================================== */}

      <DeleteJobModal
        open={deleteOpen}
        company={job.company}
        loading={deleteLoading}
        onClose={() => {

          if (!deleteLoading) {
            setDeleteOpen(false);
          }

        }}
        onDelete={handleDelete}
      />

    </Layout>

  );

};


export default JobDetails;