import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import AuditTimeline from "./AuditTimeline";
import "../styles/reconciliation.css";

export default function Reconciliation() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetch(
      "https://smart-reconciliation-backend-6cpj.onrender.com/api/results/results",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const saveCorrection = (id, updated) => {
    setData((prev) =>
      prev.map((row) => (row._id === id ? { ...row, ...updated } : row)),
    );
    setEditingId(null);
  };

  if (loading) return <Loader text="Loading reconciliation results..." />;

  return (
    <div className="recon-page">
      <h2>Reconciliation View</h2>

      <table className="recon-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Bank Amount</th>
            <th>Internal Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row) => {
            const isPartial =
              row.status === "PARTIAL_MATCH" || row.status === "MISMATCH";

            return (
              <>
                <tr key={row._id}>
                  <td>{row.transaction_id}</td>

                  <td
                    className={
                      isPartial && row.bankAmount !== row.internalAmount
                        ? "highlight"
                        : ""
                    }
                  >
                    {editingId === row._id ? (
                      <input
                        type="number"
                        defaultValue={row.bankAmount}
                        onBlur={(e) =>
                          saveCorrection(row._id, {
                            bankAmount: Number(e.target.value),
                          })
                        }
                      />
                    ) : (
                      row.bankAmount
                    )}
                  </td>

                  <td
                    className={
                      isPartial && row.bankAmount !== row.internalAmount
                        ? "highlight"
                        : ""
                    }
                  >
                    {editingId === row._id ? (
                      <input
                        type="number"
                        defaultValue={row.internalAmount}
                        onBlur={(e) =>
                          saveCorrection(row._id, {
                            internalAmount: Number(e.target.value),
                          })
                        }
                      />
                    ) : (
                      (row.internalAmount ?? "-")
                    )}
                  </td>

                  <td>
                    <span className={`badge ${row.status.toLowerCase()}`}>
                      {row.status}
                    </span>
                  </td>

                  <td>
                    {editingId === row._id ? (
                      <button
                        className="save-btn"
                        onClick={() => setEditingId(null)}
                      >
                        Done
                      </button>
                    ) : (
                      <>
                        <button
                          className="edit-btn"
                          onClick={() => setEditingId(row._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="timeline-btn"
                          onClick={() =>
                            setExpandedId(
                              expandedId === row._id ? null : row._id,
                            )
                          }
                        >
                          Timeline
                        </button>
                      </>
                    )}
                  </td>
                </tr>

                {expandedId === row._id && (
                  <tr className="timeline-row">
                    <td colSpan="5">
                      <AuditTimeline recordId={row._id} />
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
