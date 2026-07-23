import { ImageResponse } from "next/og";

export const alt = "CV Craft — Free online CV builder";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#fafafa",
          color: "#111827",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "flex-start",
            border: "1px solid #e5e7eb",
            background: "#ffffff",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
            padding: "64px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            CV Craft
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 68,
                fontWeight: 800,
                letterSpacing: "-0.05em",
                lineHeight: 1.05,
                maxWidth: 850,
              }}
            >
              Build a professional CV for free.
            </div>
            <div
              style={{
                color: "#6b7280",
                display: "flex",
                fontSize: 28,
                marginTop: 24,
              }}
            >
              Create · Preview · Download PDF
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
