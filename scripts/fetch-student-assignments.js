#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { studentsByEmail } from "../src/data/students.ts";

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SHEET_ID = "1Fcmcr1V_bsJZlHB8Z6TNhHzUvFxrArY_3jz0vamWpvA";
const SHEET_NAME = "1"; // First sheet
const API_URL = `https://opensheet.elk.sh/${SHEET_ID}/${SHEET_NAME}`;

// Output paths
const OUTPUT_DIR = path.join(__dirname, "../src/data");
const ASSIGNMENTS_FILE = path.join(OUTPUT_DIR, "student-assignments.json");

// Configuration
const SHEET_ID = "1Fcmcr1V_bsJZlHB8Z6TNhHzUvFxrArY_3jz0vamWpvA";
const SHEET_NAME = "1"; // First sheet
const API_URL = `https://opensheet.elk.sh/${SHEET_ID}/${SHEET_NAME}`;

// Output paths
const OUTPUT_DIR = path.join(__dirname, "../src/data");
const ASSIGNMENTS_FILE = path.join(OUTPUT_DIR, "student-assignments.json");

// Student email to ID mapping (for URLs)
const studentEmailToId = {
  "blix21@pratt.edu": "binjia-li",
  "ckim109@pratt.edu": "lin-kim",
  "jlee413@pratt.edu": "lina-lee",
  "kchon351@pratt.edu": "kate-chon",
  "nscanl13@pratt.edu": "nancy-scanlon",
  "jfux34@pratt.edu": "richard-fu",
  "syadav4@pratt.edu": "sarena-yadav",
  "smahsin@pratt.edu": "sreya-mahsin",
  "yyang82@pratt.edu": "yiling-yang",
  "yliu124@pratt.edu": "zoe-liu",
  "zfang32@pratt.edu": "flora-fang",
  "ytsai13@pratt.edu": "bella-tsai",
};

async function fetchStudentAssignments() {
  try {
    console.log("Fetching student assignments from Google Sheet...");

    // Use dynamic import for node-fetch in Node.js environment
    let fetchFn;
    if (typeof fetch === "undefined") {
      const nodeFetch = await import("node-fetch");
      fetchFn = nodeFetch.default;
    } else {
      fetchFn = fetch;
    }

    // Fetch data from OpenSheet
    const response = await fetchFn(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Fetched ${data.length} rows from the sheet`);

    // Process the data
    const assignments = data
      .filter((row) => {
        // Filter out rows without essential data
        return (
          row.Timestamp &&
          row["Email Address"] &&
          row["Which assignment is this for?"]
        );
      })
      .map((row) => ({
        timestamp: row.Timestamp,
        studentEmail: row["Email Address"],
        assignmentTitle: row["Which assignment is this for?"],
        projectDescription: row["Project Description (max 500 words)"] || "",
        credit:
          row[
            "Credit (List out collaborators, tutorials, libraries, references, AI agents used)"
          ] || "",
        uploadedFiles: row["Upload Your Work"] || "",
        linkToWork: row["Link to Online Work (p5 sketch link)"] || "",
        certification:
          row[
            "I certify that this submission is my own work and adheres to the course's academic integrity and open"
          ] || "",
      }));

    console.log(`Processed ${assignments.length} valid assignments`);

    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Save the data
    fs.writeFileSync(ASSIGNMENTS_FILE, JSON.stringify(assignments, null, 2));
    console.log(`Saved assignments to ${ASSIGNMENTS_FILE}`);

    // Also save grouped by student for easier access
    const groupedFile = path.join(
      OUTPUT_DIR,
      "student-assignments-grouped.json",
    );
    const groupedAssignments = assignments.reduce((acc, assignment) => {
      const email = assignment.studentEmail;
      if (!acc[email]) acc[email] = [];
      acc[email].push(assignment);
      return acc;
    }, {});

    fs.writeFileSync(groupedFile, JSON.stringify(groupedAssignments, null, 2));
    console.log(`Saved grouped assignments to ${groupedFile}`);

    // Print summary
    console.log("\n=== Summary ===");
    console.log(`Total assignments: ${assignments.length}`);
    console.log("Assignments by student:");
    Object.entries(groupedAssignments).forEach(
      ([studentEmail, studentAssignments]) => {
        console.log(
          `  ${studentEmail}: ${studentAssignments.length} assignments`,
        );
      },
    );

    console.log("✅ Student assignments fetched successfully!");
  } catch (error) {
    console.error("❌ Error fetching assignments:", error);
    process.exit(1);
  }
}

// Main execution (ES module style)
if (import.meta.url === `file://${process.argv[1]}`) {
  fetchStudentAssignments();
}

// Export the function for potential use as a module
export { fetchStudentAssignments };
