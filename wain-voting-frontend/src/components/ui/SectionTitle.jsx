import React from "react";

export default function SectionTitle({ children }) {
  return (
    <h1 className="my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-semibold">
      {children}
    </h1>
  );
}
