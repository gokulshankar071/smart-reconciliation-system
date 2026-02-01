import { useState } from "react";
import FileUploader from "../components/FileUpload";
import ColumnMapping from "../components/ColumnMapping";
import PreviewTable from "../components/PreviewTable";
import Loader from "../components/Loader";
import "../styles/upload.css";

export default function Upload() {
  const [columns, setColumns] = useState([]);
  const [preview, setPreview] = useState([]);
  const [mapping, setMapping] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <div className="upload-page">
      <h2>Upload Transactions</h2>

      {/* ================= FILE UPLOAD ================= */}
      <div className="file-upload">
        <FileUploader
          setColumns={setColumns}
          setPreview={setPreview}
          setLoading={setLoading}
        />
        <p>
          Supported formats: <b>CSV</b>, <b>Excel</b> (Max 50,000 records)
        </p>
      </div>

      {/* ================= LOADER ================= */}
      {loading && <Loader text="Processing file..." />}

      {/* ================= COLUMN MAPPING ================= */}
      {columns.length > 0 && (
        <div className="mapping-container">
          <h3>Column Mapping</h3>
          <ColumnMapping
            columns={columns}
            mapping={mapping}
            setMapping={setMapping}
          />
        </div>
      )}

      {/* ================= PREVIEW TABLE ================= */}
      {preview.length > 0 && (
        <div className="preview-table">
          <h3>Preview (First 20 Rows)</h3>
          <PreviewTable columns={columns} preview={preview} />
        </div>
      )}
    </div>
  );
}
