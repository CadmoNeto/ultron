import type React from "react";
import "./InfoCard.css";

export type Tone = "default" | "accent" | "online" | "warning" | "error";

interface InfoCardProps {
  title: string;
  content: string;
  tone?: Tone;
  children?: React.ReactNode;
}

export function InfoCard({
  title,
  content,
  tone = "default",
  children,
}: Readonly<InfoCardProps>) {
  return (
    <div className="info-card">
      <span className="info-card_title">{title}</span>
      <span className={`info-card_content ${tone}`}>{content}</span>
      <div style={{ margin: "auto" }}>{children}</div>
    </div>
  );
}
