import "./InfoCard.css";

export default function InfoCard({ info }) {
  if (!info?.title) return null;

  return (
    <aside className="info-card">
      <h2>{info.title}</h2>
      <p>{info.description}</p>
    </aside>
  );
}
