import { PistonLanguage } from "./types";

export type PistonResult = {
  outputs: string[];   // per-case actual output string
  results: boolean[];  // per-case pass/fail
  error?: string;
};

const PISTON_API = "https://emkc.org/api/v2/piston/execute";

const LANGUAGE_VERSIONS: Record<PistonLanguage, { language: string; version: string }> = {
  python: { language: "python", version: "3.10.0" },
  cpp:    { language: "c++",    version: "10.2.0" },
  java:   { language: "java",   version: "15.0.2" },
};

/** Normalize output for loose comparison (handles true/True, spacing in arrays) */
function normalizeOutput(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")   // remove all spaces
    .replace(/'/g, '"');   // normalize quotes
}

/**
 * Run `fullCode` on Piston and compare each output line to `expectedOutputs`.
 * fullCode should already have {{USER_CODE}} replaced with user's actual code.
 */
export async function runOnPiston(
  lang: PistonLanguage,
  fullCode: string,
  expectedOutputs: string[]
): Promise<PistonResult> {
  const { language, version } = LANGUAGE_VERSIONS[lang];

  let rawStdout = "";
  let rawStderr = "";

  try {
    const response = await fetch(PISTON_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language,
        version,
        files: [{ content: fullCode }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Piston API error: ${response.status}`);
    }

    const data = await response.json();
    rawStdout = data?.run?.stdout ?? "";
    rawStderr = data?.run?.stderr ?? "";

    if (data?.run?.code !== 0 && rawStdout === "") {
      // Compilation or runtime error
      return {
        outputs: expectedOutputs.map(() => "Error"),
        results: expectedOutputs.map(() => false),
        error: rawStderr || "Runtime error",
      };
    }
  } catch (e: any) {
    return {
      outputs: expectedOutputs.map(() => "Error"),
      results: expectedOutputs.map(() => false),
      error: e.message || "Network error",
    };
  }

  // Each test case prints one line
  const lines = rawStdout
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l !== "");

  const outputs: string[] = [];
  const results: boolean[] = [];

  for (let i = 0; i < expectedOutputs.length; i++) {
    const actual = lines[i] ?? "N/A";
    outputs.push(actual);
    results.push(normalizeOutput(actual) === normalizeOutput(expectedOutputs[i]));
  }

  return { outputs, results };
}
