export const uploadPreview = async (file) => {
  const formData = new FormData();
  formData.append("file", file); // 🔥 MUST be "file"

  const res = await fetch("http://localhost:5000/api/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Upload failed");
  }

  return res.json();
};
