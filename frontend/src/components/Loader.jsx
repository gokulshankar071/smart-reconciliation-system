import "../styles/loader.css";

export default function Loader({ text = "Loading..." }) {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>{text}</p>
    </div>
  );
}
