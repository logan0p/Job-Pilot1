import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";
import JobTable from "../components/jobs/JobTable";
import SearchBar from "../components/jobs/SearchBar";
import StatusFilter from "../components/jobs/StatusFilter";
import AddJobModal from "../components/jobs/AddJobModal";
import EditJobModal from "../components/jobs/EditJobModal";
import DeleteJobModal from "../components/jobs/DeleteJobModal";

import toast from "react-hot-toast";

import {
  getJobs,
  deleteJob,
} from "../services/job.service";

import type { Job } from "../types/job";

const Jobs = () => {
  // =====================================================
  // JOBS
  // =====================================================

  const [jobs, setJobs] = useState<Job[]>([]);

  // =====================================================
  // FILTERS
  // =====================================================

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("newest");

  // =====================================================
  // ADD MODAL
  // =====================================================

  const [addOpen, setAddOpen] = useState(false);

  // =====================================================
  // EDIT MODAL
  // =====================================================

  const [editOpen, setEditOpen] = useState(false);

  const [selectedJob, setSelectedJob] =
    useState<Job | null>(null);

  // =====================================================
  // DELETE MODAL
  // =====================================================

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  // =====================================================
  // LOAD JOBS
  // =====================================================

  const loadJobs = async () => {
    try {
      const result = await getJobs();

      setJobs(result.jobs || []);
    } catch (error) {
      console.error("LOAD JOBS ERROR:", error);

      toast.error("Failed to load jobs");
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    loadJobs();
  }, []);

  // =====================================================
  // SEARCH + FILTER + SORT
  // =====================================================

  const filteredJobs = [...jobs]
    .filter((job) => {
      const searchValue =
        search.toLowerCase().trim();

      const matchesSearch =
        searchValue === "" ||
        job.company
          .toLowerCase()
          .includes(searchValue) ||
        job.position
          .toLowerCase()
          .includes(searchValue) ||
        (job.location || "")
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        status === "" ||
        job.status === status;

      return (
        matchesSearch &&
        matchesStatus
      );
    })

    .sort((a, b) => {
      // Company A-Z
      if (sort === "company") {
        return a.company.localeCompare(
          b.company
        );
      }

      // Position A-Z
      if (sort === "position") {
        return a.position.localeCompare(
          b.position
        );
      }

      // Status A-Z
      if (sort === "status") {
        return a.status.localeCompare(
          b.status
        );
      }

      // Newest
      if (sort === "newest") {
        const dateA = a.createdAt
          ? new Date(a.createdAt).getTime()
          : 0;

        const dateB = b.createdAt
          ? new Date(b.createdAt).getTime()
          : 0;

        return dateB - dateA;
      }

      return 0;
    });

  // =====================================================
  // EDIT JOB
  // =====================================================

  const handleEdit = (job: Job) => {
    setSelectedJob(job);
    setEditOpen(true);
  };

  // =====================================================
  // DELETE CLICK
  // =====================================================

  const handleDeleteClick = (job: Job) => {
    setSelectedJob(job);
    setDeleteOpen(true);
  };

  // =====================================================
  // DELETE JOB
  // =====================================================

  const handleDelete = async () => {
    if (!selectedJob) {
      return;
    }

    try {
      setDeleteLoading(true);

      await deleteJob(selectedJob.id);

      await loadJobs();

      setDeleteOpen(false);
      setSelectedJob(null);

      toast.success(
        "Job deleted successfully"
      );
    } catch (error) {
      console.error(
        "DELETE JOB ERROR:",
        error
      );

      toast.error(
        "Failed to delete job"
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  const clearFilters = () => {
    setSearch("");
    setStatus("");
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <Layout>
      <div className="space-y-8">

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            flex
            flex-col
            gap-6
            xl:flex-row
            xl:items-center
            xl:justify-between
          "
        >

          {/* TITLE */}

          <div>
            <h1 className="text-5xl font-bold text-white">
              🚀 Jobs
            </h1>

            <p className="mt-2 text-slate-400">
              Track and manage your complete
              job application journey.
            </p>
          </div>

          {/* =================================================
              CONTROLS
          ================================================= */}

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-4
            "
          >

            {/* SEARCH */}

            <SearchBar
              value={search}
              onChange={setSearch}
            />

            {/* STATUS */}

            <StatusFilter
              value={status}
              onChange={setStatus}
            />

            {/* SORT */}

            <select
              value={sort}
              onChange={(event) =>
                setSort(event.target.value)
              }
              className="
                rounded-xl
                border
                border-slate-700
                bg-slate-900
                px-4
                py-3
                text-white
                outline-none
                transition
                focus:border-cyan-500
                focus:ring-2
                focus:ring-cyan-500/20
              "
            >
              <option value="newest">
                Newest
              </option>

              <option value="company">
                Company A-Z
              </option>

              <option value="position">
                Position A-Z
              </option>

              <option value="status">
                Status
              </option>
            </select>

            {/* ADD JOB */}

            <button
              type="button"
              onClick={() =>
                setAddOpen(true)
              }
              className="
                rounded-xl
                bg-cyan-600
                px-6
                py-3
                font-semibold
                text-white
                transition
                hover:bg-cyan-500
                hover:shadow-lg
                hover:shadow-cyan-500/20
              "
            >
              + Add Job
            </button>

          </div>
        </div>

        {/* =================================================
            RESULTS INFO
        ================================================= */}

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <p className="text-sm text-slate-400">
            Showing{" "}

            <span className="font-semibold text-white">
              {filteredJobs.length}
            </span>

            {" "}of{" "}

            <span className="font-semibold text-white">
              {jobs.length}
            </span>

            {" "}jobs
          </p>

          {/* CLEAR FILTERS */}

          {(search || status) && (
            <button
              type="button"
              onClick={clearFilters}
              className="
                text-sm
                text-cyan-400
                transition
                hover:text-cyan-300
              "
            >
              Clear filters
            </button>
          )}

        </div>

        {/* =================================================
            JOB TABLE
        ================================================= */}

        <JobTable
          jobs={filteredJobs}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />

        {/* =================================================
            ADD JOB MODAL
        ================================================= */}

        <AddJobModal
          open={addOpen}
          onClose={() =>
            setAddOpen(false)
          }
          onJobAdded={loadJobs}
        />

        {/* =================================================
            EDIT JOB MODAL
        ================================================= */}

        <EditJobModal
          open={editOpen}
          job={selectedJob}
          onClose={() => {
            setEditOpen(false);
            setSelectedJob(null);
          }}
          onUpdated={loadJobs}
        />

        {/* =================================================
            DELETE JOB MODAL
        ================================================= */}

        <DeleteJobModal
          open={deleteOpen}
          company={
            selectedJob?.company || ""
          }
          loading={deleteLoading}
          onClose={() => {
            if (!deleteLoading) {
              setDeleteOpen(false);
              setSelectedJob(null);
            }
          }}
          onDelete={handleDelete}
        />

      </div>
    </Layout>
  );
};

export default Jobs;