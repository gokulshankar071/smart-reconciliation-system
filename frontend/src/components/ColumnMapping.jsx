const REQUIRED_FIELDS = [
  "transaction_id",
  "amount",
  "reference_number",
  "date",
];

export default function ColumnMapping({ columns, mapping, setMapping }) {
  return (
    <>
      <h3>Map Columns</h3>

      {REQUIRED_FIELDS.map((field) => (
        <div key={field}>
          <label>{field}</label>

          <select
            value={mapping[field] || ""}
            onChange={(e) =>
              setMapping({ ...mapping, [field]: e.target.value })
            }
          >
            <option value="">Select column</option>
            {columns.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>
      ))}
    </>
  );
}
