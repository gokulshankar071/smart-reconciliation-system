import { uploadPreview } from "../../src/api/uploadApi";

export default function FileUploader({ setColumns, setPreview, setLoading }) {
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    try {
      const data = await uploadPreview(file);

      setColumns(data.columns || []);
      setPreview(data.preview || []);
    } catch (err) {
      alert(err.message || "File upload failed");
      setColumns([]);
      setPreview([]);
    } finally {
      setLoading(false); // 🔥 ALWAYS stop loader
    }
  };

  return <input type="file" accept=".csv,.xlsx" onChange={handleUpload} />;
}
