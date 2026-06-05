export default function TaskCard({ task, onEdit, onDelete, onToggle }) {
  return (
    <div
      style={{
        ...styles.card,
        borderLeft:
          task.status === "completed"
            ? "4px solid #22c55e"
            : "4px solid #f59e0b",
      }}
    >
      <div style={styles.top}>
        <h3
          style={{
            ...styles.title,
            textDecoration:
              task.status === "completed" ? "line-through" : "none",
            color: task.status === "completed" ? "#999" : "#333",
          }}
        >
          {task.title}
        </h3>
        <span
          style={{
            ...styles.badge,
            background: task.status === "completed" ? "#dcfce7" : "#fef9c3",
            color: task.status === "completed" ? "#16a34a" : "#b45309",
          }}
        >
          {task.status}
        </span>
      </div>
      {task.description && <p style={styles.desc}>{task.description}</p>}
      <div style={styles.actions}>
        <button style={styles.toggleBtn} onClick={() => onToggle(task)}>
          {task.status === "pending" ? "✅ Complete" : "↩ Undo"}
        </button>
        <button style={styles.editBtn} onClick={() => onEdit(task)}>
          ✏️ Edit
        </button>
        <button style={styles.deleteBtn} onClick={() => onDelete(task._id)}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    borderRadius: "10px",
    padding: "1.25rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    marginBottom: "1rem",
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.5rem",
  },
  title: { margin: 0, fontSize: "1rem" },
  badge: {
    padding: "0.2rem 0.6rem",
    borderRadius: "999px",
    fontSize: "0.75rem",
    fontWeight: "600",
  },
  desc: { color: "#666", fontSize: "0.875rem", margin: "0.5rem 0" },
  actions: { display: "flex", gap: "0.5rem", marginTop: "0.75rem" },
  toggleBtn: {
    padding: "0.3rem 0.75rem",
    background: "#ede9fe",
    color: "#4f46e5",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.8rem",
  },
  editBtn: {
    padding: "0.3rem 0.75rem",
    background: "#dbeafe",
    color: "#1d4ed8",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.8rem",
  },
  deleteBtn: {
    padding: "0.3rem 0.75rem",
    background: "#fee2e2",
    color: "#dc2626",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.8rem",
  },
};
