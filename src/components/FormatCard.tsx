import React from "react";

type CodeRow = {
  oldNumber?: number | "";
  newNumber?: number | "";
  content: string;
  type?: "normal" | "add" | "remove";
};

type FormatCardProps = {
  fileName: string;
  title: string;
  rows: CodeRow[];
};

export function FormatCard({ fileName, title, rows }: FormatCardProps) {
  const handleCopy = async () => {
    const text = rows.map((row) => row.content).join("\n");

    try {
      await navigator.clipboard.writeText(text);
      alert("Copied!");
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <div style={fileNameStyle}>File Name: {fileName}</div>
        <div style={titleStyle}>{title}</div>
        <button style={copyButtonStyle} onClick={handleCopy}>
          Copy
        </button>
      </div>

      <div style={dividerStyle} />

      <div style={bodyStyle}>
        {rows.map((row, index) => {
          const rowBackground =
            row.type === "add"
              ? "#e6ffed"
              : row.type === "remove"
              ? "#ffeef0"
              : "transparent";

          return (
            <div
              key={index}
              style={{
                ...rowStyle,
                backgroundColor: rowBackground,
              }}
            >
              <div style={oldNumberStyle}>{row.oldNumber}</div>
              <div style={newNumberStyle}>{row.newNumber}</div>
              <div style={codeContentStyle}>{row.content}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "#d9d9d9",
  borderRadius: "24px",
  overflow: "hidden",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px 20px",
};

const fileNameStyle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: 500,
  minWidth: "180px",
};

const titleStyle: React.CSSProperties = {
  flex: 1,
  textAlign: "center",
  fontSize: "22px",
  fontWeight: 600,
};

const copyButtonStyle: React.CSSProperties = {
  border: "none",
  borderRadius: "14px",
  backgroundColor: "#f4f4f4",
  padding: "8px 20px",
  cursor: "pointer",
  fontSize: "15px",
};

const dividerStyle: React.CSSProperties = {
  height: "1px",
  backgroundColor: "#888",
};

const bodyStyle: React.CSSProperties = {
  padding: "12px 0",
  fontFamily: "monospace",
  fontSize: "15px",
};

const rowStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "80px 80px 1fr",
  alignItems: "start",
  minHeight: "32px",
};

const numberBaseStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#555",
  padding: "6px 8px",
  borderRight: "1px solid #aaa",
};

const oldNumberStyle: React.CSSProperties = {
  ...numberBaseStyle,
};

const newNumberStyle: React.CSSProperties = {
  ...numberBaseStyle,
};

const codeContentStyle: React.CSSProperties = {
  padding: "6px 12px",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  color: "#111",
};

