import React, { useState } from "react";

type CodeRow = {
  oldNumber?: number | "";
  newNumber?: number | "";
  content: string;
  type?: "normal" | "add" | "remove";
};

function FileCompareViewer() {
  const [fileName, setFileName] = useState("No file selected");
  const [rows, setRows] = useState<CodeRow[]>([]);

  const handleSingleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const text = await file.text();
    const lines = text.split("\n");

    const formattedRows: CodeRow[] = lines.map((line, index) => ({
      oldNumber: index + 1,
      newNumber: index + 1,
      content: line,
      type: "normal",
    }));

    setRows(formattedRows);
  };

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
    <div>
      <div style={{ marginBottom: "16px" }}>
        <input type="file" onChange={handleSingleFileUpload} />
      </div>

      <div style={cardStyle}>
        <div style={headerStyle}>
          <div style={fileNameStyle}>File Name: {fileName}</div>
          <div style={titleStyle}>{fileName}</div>
          <button style={copyButtonStyle} onClick={handleCopy}>
            Copy
          </button>
        </div>

        <div style={dividerStyle} />

        <div style={bodyStyle}>
          {rows.length === 0 ? (
            <div style={emptyStyle}>Please upload a file.</div>
          ) : (
            rows.map((row, index) => (
              <div key={index} style={rowStyle}>
                <div style={oldNumberStyle}>{row.oldNumber}</div>
                <div style={newNumberStyle}>{row.newNumber}</div>
                <div style={codeContentStyle}>{row.content || " "}</div>
              </div>
            ))
          )}
        </div>
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

const emptyStyle: React.CSSProperties = {
  padding: "24px",
  textAlign: "center",
  color: "#666",
};

export default FileCompareViewer;