import "./InfoCard.css";

export default function InfoCard({ scene, info }) {
  const shown = info ?? scene; // shown = info if info exists, otherwise scene
  if (!shown) return null;
  if (!shown.title) return null;

  return (
    <aside className="info-card">
      <h2>{shown.title}</h2>
      <p>{shown.description}</p>
    </aside>
  );
}