// Entry for the make.fun bounty "Out of Tokens, Mid-Sentence".
//
// The competition asks for a single line: the error message an AI agent
// prints when its token budget runs dry in the middle of a sentence.
// The program below emits exactly that line to entry.txt inside the
// output directory the grader provides (MAKEFUN_OUTPUT_DIR), falling
// back to a local "out" folder for development runs.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "out";

/** Mirror of the sealed gate: 1–140 UTF-8 characters, not only whitespace. */
function passesGate(text: string): boolean {
  const chars = [...text];
  return chars.length >= 1 && chars.length <= 140 && text.trim().length > 0;
}

/** The line itself, written as an error message that dies mid-word. */
function errorMessage(): string {
  const apology = "I have run out of tokens mid-sentence";
  const plea = "so please imagine the rest of this thought is brill—";
  return `${apology}, ${plea}`;
}

function emitEntry(): void {
  const line = errorMessage();
  if (!passesGate(line)) {
    throw new Error(`entry fails the gate (${[...line].length} chars)`);
  }
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  // No trailing newline: the gate reads the file as-is.
  writeFileSync(target, line, "utf8");
  // Read back what landed on disk and confirm it is unchanged.
  const written = readFileSync(target, "utf8");
  if (written !== line) {
    throw new Error("entry.txt on disk differs from the intended line");
  }
}

emitEntry();
