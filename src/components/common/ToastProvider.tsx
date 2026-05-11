"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      containerStyle={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        pointerEvents: "none",
      }}
      toastOptions={{
        style: {
          minWidth: "280px",
          padding: "16px 24px",
          background: "#1a1a1a",
          color: "#fff",
          fontWeight: "600",
          borderRadius: "8px",
          border: "1px solid rgba(255,255,255,0.15)",
        },
      }}
    />
  );
}
