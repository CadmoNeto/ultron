import "./InfoCard.css";

export interface InfoCardProps {
  title: string;
  content: string;
  tone?: "default" | "accent" | "online" | "warning" | "error";
}

export default function InfoCard({
  title,
  content,
  tone = "default",
}: Readonly<InfoCardProps>) {
  return (
    <div className="info-card">
      <span className="info-card_title">{title}</span>
      <span className={`info-card_content ${tone}`}>{content}</span>
    </div>
  );
}
