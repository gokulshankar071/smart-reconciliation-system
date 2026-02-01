import "../styles/auditTimeline.css";

export default function AuditTimeline({ logs }) {
  if (!logs || logs.length === 0) {
    return <p className="no-audit">No audit history available</p>;
  }

  return (
    <div className="timeline">
      {logs.map((log, index) => (
        <div className="timeline-item" key={index}>
          <div className="timeline-dot"></div>

          <div className="timeline-content">
            <p className="timeline-action">{log.action}</p>

            <p className="timeline-meta">
              <strong>User:</strong> {log.performedBy?.name || "System"}
            </p>

            <p className="timeline-meta">
              <strong>Changed:</strong> {JSON.stringify(log.newValue, null, 2)}
            </p>

            <span className="timeline-time">
              {new Date(log.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
