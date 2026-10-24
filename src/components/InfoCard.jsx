import "./InfoCard.css";

export default function InfoCard({ scene }) {
  if (!scene) return null;
  
  return (
    <aside className="info-card">
      <h2>{scene.title || "No Title Yet"}</h2>
      <p>{scene.description || ""}</p>
    </aside>
  );

}
