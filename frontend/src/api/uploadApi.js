export const uploadPreview = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(
    "https://smart-reconciliation-backend-6cpj.onrender.com/api/upload",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    },
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Upload failed");
  }

  return res.json();
};
