"use client";

import { useEffect, useState } from "react";

const lines = [
  { type: "command", text: "whoami" },
  { type: "output", text: "Scott — software engineering student" },
  { type: "command", text: "cat interests.txt" },
  { type: "output", text: "→ full-stack development" },
  { type: "output", text: "→ secure APIs" },
  { type: "output", text: "→ always learning" },
  { type: "command", text: "echo $STATUS" },
  { type: "output", text: "✓ available for opportunities" },
];

const CHAR_DELAY = 40;   // ms per character
const LINE_DELAY = 200;  // ms pause between lines

export default function Terminal() {
  const [displayed, setDisplayed] = useState<{ type: string; text: string }[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (currentLine >= lines.length) {
      setDone(true);
      return;
    }

    const line = lines[currentLine];

    if (currentChar < line.text.length) {
      const timeout = setTimeout(() => {
        setCurrentChar((c) => c + 1);
      }, line.type === "command" ? CHAR_DELAY : CHAR_DELAY / 2);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => [...prev, line]);
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, LINE_DELAY);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, currentChar]);

  const activeLine = currentLine < lines.length ? lines[currentLine] : null;
  const activeText = activeLine ? activeLine.text.slice(0, currentChar) : "";

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-lg">
      {/* Title bar */}
      <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-red-400" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-400" />
        <span className="ml-2 text-xs text-slate-400 font-mono">~/scott</span>
      </div>

      {/* Body */}
      <div className="bg-slate-900 dark:bg-slate-950 px-5 py-5 font-mono text-sm leading-7 text-slate-300 min-h-64">
        {displayed.map((line, i) => (
          <p key={i} className={line.type === "output" ? "text-slate-400" : ""}>
            {line.type === "command" && (
              <><span className="text-indigo-400">$ </span><span className="text-green-400">{line.text}</span></>
            )}
            {line.type === "output" && line.text}
          </p>
        ))}

        {/* Currently typing line */}
        {activeLine && (
          <p className={activeLine.type === "output" ? "text-slate-400" : ""}>
            {activeLine.type === "command" && (
              <><span className="text-indigo-400">$ </span><span className="text-green-400">{activeText}</span></>
            )}
            {activeLine.type === "output" && activeText}
            <span className="inline-block w-2 h-4 bg-indigo-400 align-middle ml-0.5" style={{ animation: "blink 1s step-start infinite" }} />
          </p>
        )}

        {/* Idle cursor when done */}
        {done && (
          <p>
            <span className="text-indigo-400">$ </span>
            <span className="inline-block w-2 h-4 bg-indigo-400 align-middle" style={{ animation: "blink 1s step-start infinite" }} />
          </p>
        )}
      </div>
    </div>
  );
}
