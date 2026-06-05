import { useState, useEffect } from "react";

export default function TaskModal({ onClose, onSubmit, editTask }) {
  const [form, setForm] = useState({ title: "", description: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (editTask)
      setForm({
        title: editTask.title,
        description: editTask.description || "",
      });
  }, [editTask]);

  const handleSubmit = () => {
    if (!form.title.trim()) return setError("Title required");
    onSubmit(form);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>{editTask ? "Edit Task" : "New Task"}</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input
          style={styles.input}
          placeholder="Title *"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          style={styles.textarea}
          placeholder="Description (optional)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <div style={styles.btns}>
          <button style={styles.cancel} onClick={onClose}>
            Cancel
          </button>
          <button style={styles.submit} onClick={handleSubmit}>
            {editTask ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  modal: {
    background: "#fff",
    borderRadius: "12px",
    padding: "2rem",
    width: "100%",
    maxWidth: "480px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
  },
  title: { marginTop: 0, color: "#333" },
  input: {
    width: "100%",
    padding: "0.75rem",
    marginBottom: "1rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "0.75rem",
    marginBottom: "1rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    minHeight: "100px",
    boxSizing: "border-box",
    resize: "vertical",
  },
  btns: { display: "flex", gap: "1rem", justifyContent: "flex-end" },
  cancel: {
    padding: "0.6rem 1.2rem",
    background: "#f3f4f6",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  submit: {
    padding: "0.6rem 1.2rem",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  error: { color: "red", marginBottom: "1rem" },
};
