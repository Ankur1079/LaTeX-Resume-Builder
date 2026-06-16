/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

/**
 * Parses double-asterisk **bold** and single-asterisk *italic* markdown-like syntax
 * into styled React components.
 */
export function renderFormattedText(text: string): React.ReactNode[] {
  if (!text) return [];

  // Match:
  // - Group 1: **bold** (double asterisks)
  // - Group 2: *italic* (single asterisk)
  const regex = /(\*\*.*?\*\*|\*.*?\*)/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const inner = part.slice(2, -2);
      return (
        <strong key={index} className="font-bold text-slate-900">
          {inner}
        </strong>
      );
    } else if (part.startsWith("*") && part.endsWith("*")) {
      const inner = part.slice(1, -1);
      return (
        <em key={index} className="italic text-slate-850">
          {inner}
        </em>
      );
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}
