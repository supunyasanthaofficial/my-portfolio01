"use client";

import React from "react";
import { Sandpack } from "@codesandbox/sandpack-react";
import { motion } from "framer-motion";
import { Code2, Sparkles } from "lucide-react";

const initialCode = `import React, { useState } from "react";

export default function InteractiveCard() {
  const [count, setCount] = useState(0);
  const [glowColor, setGlowColor] = useState("#3b82f6");

  const colors = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ec4899"];

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#09090b",
      color: "#ffffff",
      fontFamily: "sans-serif",
      padding: "20px"
    }}>
      <div style={{
        background: "rgba(24, 24, 27, 0.8)",
        border: \`1px solid \${glowColor}40\`,
        borderRadius: "20px",
        padding: "32px",
        maxWidth: "340px",
        width: "100%",
        boxShadow: \`0 0 35px \${glowColor}25\`,
        textAlign: "center",
        transition: "all 0.3s ease"
      }}>
        <div style={{
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "2px",
          color: glowColor,
          fontWeight: 700,
          marginBottom: "8px"
        }}>
          Live Demo Widget
        </div>
        
        <h3 style={{ margin: "0 0 8px 0", fontSize: "20px", fontWeight: 700 }}>
          Supun's Lab
        </h3>
        <p style={{ color: "#a1a1aa", fontSize: "13px", lineHeight: "1.5", margin: "0 0 20px 0" }}>
          Edit this code on the left to see live instant hot-reloading in action!
        </p>

        <div style={{
          fontSize: "36px",
          fontWeight: 800,
          color: glowColor,
          marginBottom: "16px"
        }}>
          {count}
        </div>

        <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "20px" }}>
          <button
            onClick={() => setCount(c => c + 1)}
            style={{
              background: glowColor,
              color: "#fff",
              border: "none",
              padding: "10px 18px",
              borderRadius: "10px",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Increment +
          </button>
          <button
            onClick={() => setCount(0)}
            style={{
              background: "#27272a",
              color: "#a1a1aa",
              border: "none",
              padding: "10px 14px",
              borderRadius: "10px",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Reset
          </button>
        </div>

        <div>
          <span style={{ fontSize: "11px", color: "#71717a", display: "block", marginBottom: "8px" }}>
            Select Accent Glow:
          </span>
          <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setGlowColor(c)}
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: c,
                  border: glowColor === c ? "2px solid #fff" : "none",
                  cursor: "pointer"
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
`;

export default function CodePlayground() {
  return (
    <section id="dev-lab" className="relative z-20 py-28 bg-black text-white px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-spin-slow" />
            Interactive Dev Lab
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase italic text-white">
            Live Code <span className="text-blue-500">Playground.</span>
          </h2>
          <p className="text-neutral-400 text-sm md:text-base font-mono uppercase tracking-wider mt-3 max-w-2xl flex items-center gap-2">
            <Code2 className="w-4 h-4 text-blue-500 shrink-0 inline" />
            Test, edit, and experiment with real code in real-time right here in the browser.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl border border-neutral-800 bg-neutral-950/80 backdrop-blur-xl shadow-2xl overflow-hidden p-2 sm:p-4"
        >
          <Sandpack
            template="react"
            theme="dark"
            files={{
              "/App.js": initialCode,
            }}
            options={{
              showNavigator: false,
              showTabs: true,
              showLineNumbers: true,
              editorHeight: 480,
              editorWidthPercentage: 55,
              resizablePanels: true,
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
