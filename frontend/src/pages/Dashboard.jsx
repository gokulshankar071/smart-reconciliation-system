import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import "../styles/dashboard.css";
const API = import.meta.env.VITE_API_BASE_URL;

export default function Dashboard() {
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    status: "all",
    uploadedBy: "all",
  });

  const [summary, setSummary] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://smart-reconciliation-backend-6cpj.onrender.com/api/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => setUsers([]));
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [filters]);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError("");

    try {
      const query = new URLSearchParams(filters).toString();

      const res = await fetch(
        `https://smart-reconciliation-backend-6cpj.onrender.com/api/dashboard/summary?${query}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (!res.ok) throw new Error();

      const data = await res.json();

      setSummary({
        total: data.total || 0,
        matched: data.matched || 0,
        unmatched: data.unmatched || 0,
        duplicate: data.duplicate || 0,
        accuracy: data.accuracy || 0,
      });
    } catch {
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader text="Loading dashboard..." />;
  if (error) return <p className="error">{error}</p>;
  if (!summary) return null;

  return (
    <div className="dashboard">
      <h2>Reconciliation Dashboard</h2>

      <div className="filters">
        <input
          type="date"
          value={filters.fromDate}
          onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
        />

        <input
          type="date"
          value={filters.toDate}
          onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
        />

        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="all">All Status</option>
          <option value="matched">Matched</option>
          <option value="unmatched">Unmatched</option>
          <option value="duplicate">Duplicate</option>
        </select>

        <select
          value={filters.uploadedBy}
          onChange={(e) =>
            setFilters({ ...filters, uploadedBy: e.target.value })
          }
        >
          <option value="all">All Users</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.role})
            </option>
          ))}
        </select>
      </div>

      <div className="cards">
        <Card title="Total Records" value={summary.total} />
        <Card title="Matched" value={summary.matched} />
        <Card title="Unmatched" value={summary.unmatched} />
        <Card title="Duplicates" value={summary.duplicate} />
        <Card title="Accuracy" value={`${summary.accuracy}%`} />
      </div>

      <div className="chart">
        <div className="bar matched" style={{ height: `${summary.matched}%` }}>
          Matched
        </div>
        <div
          className="bar unmatched"
          style={{ height: `${summary.unmatched}%` }}
        >
          Unmatched
        </div>
        <div
          className="bar duplicate"
          style={{ height: `${summary.duplicate}%` }}
        >
          Duplicate
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="card">
      <p className="card-title">{title}</p>
      <h3>{value}</h3>
    </div>
  );
}
