#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchStudentResponses() {
  try {
    console.log("Fetching student responses from Google Sheet...");

    // Fetch data from the Google Sheet using OpenSheet API
    const response = await fetch(
      "https://opensheet.elk.sh/1Fcmcr1V_bsJZlHB8Z6TNhHzUvFxrArY_3jz0vamWpvA/1",
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawData = await response.json();
    console.log(`Fetched ${rawData.length} rows from the sheet`);

    // Process the data to extract only the columns we need
    const processedData = rawData
      .map((row) => ({
        email: row["Email Address"] || "",
        assignment: row["Which assignment is this for?"] || "",
        response:
          row[
            "What did you learn this week or what questions do you have? (this part will go on the site)"
          ] || "",
        timestamp: row["Timestamp"] || "",
      }))
      .filter((item) => item.email && item.assignment && item.response); // Only keep complete entries

    console.log(`Processed ${processedData.length} valid responses`);

    // Group responses by assignment/week
    const responsesByWeek = {};

    processedData.forEach((item) => {
      const week = item.assignment.toLowerCase();
      if (!responsesByWeek[week]) {
        responsesByWeek[week] = [];
      }
      responsesByWeek[week].push(item);
    });

    // Save the data
    const outputDir = path.join(path.dirname(__dirname), "src", "data");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Save raw responses
    const rawOutputPath = path.join(outputDir, "student-responses.json");
    fs.writeFileSync(rawOutputPath, JSON.stringify(processedData, null, 2));
    console.log(`Saved raw responses to ${rawOutputPath}`);

    // Save grouped by week
    const groupedOutputPath = path.join(outputDir, "responses-by-week.json");
    fs.writeFileSync(
      groupedOutputPath,
      JSON.stringify(responsesByWeek, null, 2),
    );
    console.log(`Saved grouped responses to ${groupedOutputPath}`);

    // Log summary
    console.log("\n=== Summary ===");
    console.log(`Total responses: ${processedData.length}`);
    console.log("Responses by week:");
    Object.keys(responsesByWeek).forEach((week) => {
      console.log(`  ${week}: ${responsesByWeek[week].length} responses`);
    });

    return { raw: processedData, byWeek: responsesByWeek };
  } catch (error) {
    console.error("Error fetching student responses:", error);
    throw error;
  }
}

// Run the script if called directly
if (process.argv[1] === __filename) {
  fetchStudentResponses()
    .then(() => {
      console.log("✅ Student responses fetched successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Failed to fetch student responses:", error);
      process.exit(1);
    });
}

export { fetchStudentResponses };
