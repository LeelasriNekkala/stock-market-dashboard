// public/js/admin.js

async function deleteStock(id) {
  if (!confirm("Are you sure you want to delete this stock?")) return;

  try {
    const res = await fetch(`/api/stocks/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Stock deleted successfully");
      location.reload();
    } else {
      alert("❌ " + (data.message || "Delete failed"));
    }
  } catch (err) {
    console.error("Delete error:", err);
    alert("❌ Something went wrong");
  }
}

// Attach click events to all delete buttons
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".btn-delete").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      deleteStock(id);
    });
  });
});
