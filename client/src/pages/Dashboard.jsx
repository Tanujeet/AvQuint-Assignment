import { useState, useEffect, useCallback } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTasks = useCallback(async () => {
    try {
      const { data } = await api.get("/tasks", {
        params: { search, status, page, limit: 6 },
      });
      setTasks(data.tasks);
      setTotalPages(data.pages);
    } catch (err) {
      console.error(err);
    }
  }, [search, status, page]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreate = async (form) => {
    await api.post("/tasks", form);
    setShowModal(false);
    fetchTasks();
  };

  const handleUpdate = async (form) => {
    await api.put(`/tasks/${editTask._id}`, form);
    setEditTask(null);
    setShowModal(false);
    fetchTasks();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const handleToggle = async (task) => {
    await api.put(`/tasks/${task._id}`, {
      status: task.status === "pending" ? "completed" : "pending",
    });
    fetchTasks();
  };

  const openEdit = (task) => {
    setEditTask(task);
    setShowModal(true);
  };
  const openCreate = () => {
    setEditTask(null);
    setShowModal(true);
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.heading}>My Tasks</h2>
          <button style={styles.addBtn} onClick={openCreate}>
            + Add Task
          </button>
        </div>

        {/* Filters */}
        <div style={styles.filters}>
          <input
            style={styles.search}
            placeholder="🔍 Search tasks..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <select
            style={styles.select}
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Tasks */}
        {tasks.length === 0 ? (
          <p style={styles.empty}>No tasks found. Add one!</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={openEdit}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          ))
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={styles.pagination}>
            <button
              style={styles.pageBtn}
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              ← Prev
            </button>
            <span style={styles.pageInfo}>
              Page {page} of {totalPages}
            </span>
            <button
              style={styles.pageBtn}
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <TaskModal
          onClose={() => {
            setShowModal(false);
            setEditTask(null);
          }}
          onSubmit={editTask ? handleUpdate : handleCreate}
          editTask={editTask}
        />
      )}
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#f0f2f5" },
  container: { maxWidth: "800px", margin: "0 auto", padding: "2rem 1rem" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  heading: { margin: 0, color: "#333" },
  addBtn: {
    padding: "0.6rem 1.2rem",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
  filters: { display: "flex", gap: "1rem", marginBottom: "1.5rem" },
  search: {
    flex: 1,
    padding: "0.65rem 1rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "0.95rem",
  },
  select: {
    padding: "0.65rem 1rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "0.95rem",
  },
  empty: {
    textAlign: "center",
    color: "#999",
    marginTop: "3rem",
    fontSize: "1.1rem",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    marginTop: "2rem",
  },
  pageBtn: {
    padding: "0.5rem 1rem",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  pageInfo: { color: "#555" },
};
