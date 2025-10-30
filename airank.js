import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import dotenv from "dotenv"
dotenv.config()

// 🔑 Replace with your real OpenRouter API key
const API_KEY =process.env.API1_KEY;

// 🧠 Extract text from a single PDF
async function extractTextFromPDF(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    const dataBuffer = fs.readFileSync(filePath);
    const uint8Array = new Uint8Array(dataBuffer);
    
    const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
    const pdfDocument = await loadingTask.promise;
    
    let fullText = "";
    
    for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
      const page = await pdfDocument.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(" ");
      fullText += pageText + " ";
    }
    
    return fullText.replace(/\s+/g, " ").trim();
  } catch (error) {
    console.error(`❌ Error reading PDF ${filePath}:`, error.message);
    throw error;
  }
}

// 📁 Get all PDF files from the resumes folder
function getAllResumePDFs(folderPath = "./resumes") {
  if (!fs.existsSync(folderPath)) {
    throw new Error(`Folder not found: ${folderPath}`);
  }
  
  const files = fs.readdirSync(folderPath);
  const pdfFiles = files.filter(file => file.toLowerCase().endsWith(".pdf"));
  
  return pdfFiles.map(file => ({
    filename: file,
    path: path.join(folderPath, file)
  }));
}

// 🚀 Rank multiple resumes
async function rankResumes() {
  console.log("🔍 Finding all resumes...");
  
  const resumeFiles = getAllResumePDFs();
  
  if (resumeFiles.length === 0) {
    console.error("❌ No PDF files found in ./resumes folder");
    return;
  }
  
  console.log(`📋 Found ${resumeFiles.length} resume(s):`);
  resumeFiles.forEach((file, i) => console.log(`   ${i + 1}. ${file.filename}`));
  
  console.log("\n🔍 Extracting resume texts...");
  
  // Extract text from all resumes
  const resumes = [];
  for (let i = 0; i < resumeFiles.length; i++) {
    const file = resumeFiles[i];
    try {
      const text = await extractTextFromPDF(file.path);
      resumes.push({
        filename: file.filename,
        candidateNumber: i + 1,
        text: text
      });
      console.log(`✅ Resume ${i + 1} (${file.filename}): ${text.substring(0, 80)}...`);
    } catch (error) {
      console.error(`❌ Failed to extract ${file.filename}`);
    }
  }
  
  if (resumes.length === 0) {
    console.error("❌ No resumes could be processed");
    return;
  }

  const jobDescription = `
We are hiring a graphic designer
`;

  // Build the prompt dynamically
  let candidatesSection = "";
  resumes.forEach((resume, idx) => {
    candidatesSection += `\n--- Candidate ${resume.candidateNumber} (${resume.filename}) ---\n${resume.text}\n`;
  });

  const rankingsTemplate = resumes.map((resume, idx) => 
    `    { "candidate": "Candidate ${resume.candidateNumber}", "filename": "${resume.filename}", "score": <number 1-10>, "reason": "<detailed reason>" }`
  ).join(",\n");

  const prompt = `
You are a professional recruiter. Analyze and rank ALL ${resumes.length} candidates based on the job description.

Return result in this EXACT JSON format:
{
  "job_match_summary": "<overall analysis of all candidates>",
  "rankings": [
${rankingsTemplate}
  ],
  "best_candidate": "Candidate <number>",
  "best_candidate_filename": "<filename>"
}

IMPORTANT: 
- Score each candidate from 1-10 based on job fit
- Provide detailed reasons for each score
- Rank ALL ${resumes.length} candidates
- Choose the single best candidate

Job Description:
${jobDescription}

${candidatesSection}
`;

  console.log("\n🤖 Sending data to AI for analysis...");

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Resume Ranker"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.2-3b-instruct:free",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} ${response.statusText}\n${errorText}`);
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      throw new Error("Invalid API response format");
    }

    const aiResponse = data.choices[0].message.content;

    try {
      // Try to parse as JSON
      const result = JSON.parse(aiResponse);
      
      console.log("\n" + "=".repeat(60));
      console.log("🏆 RANKING RESULTS");
      console.log("=".repeat(60));
      console.log(`\n📊 Summary: ${result.job_match_summary}\n`);
      
      console.log("📈 Rankings (sorted by score):\n");
      
      // Sort by score descending
      const sortedRankings = result.rankings.sort((a, b) => b.score - a.score);
      
      sortedRankings.forEach((rank, idx) => {
        const medal = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : "  ";
        console.log(`${medal} Rank ${idx + 1}: ${rank.candidate} (${rank.filename || ""})`);
        console.log(`   Score: ${rank.score}/10`);
        console.log(`   Reason: ${rank.reason}\n`);
      });
      
      console.log("=".repeat(60));
      console.log(`\n🎯 Best Candidate: ${result.best_candidate} ${result.best_candidate_filename ? `(${result.best_candidate_filename})` : ""}`);
      console.log("=".repeat(60) + "\n");
      
      // Save results to file
      const outputFile = `ranking_results_${Date.now()}.json`;
      fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));
      console.log(`💾 Full results saved to: ${outputFile}\n`);
      
    } catch (err) {
      console.error("⚠️ Failed to parse AI response as JSON. Raw Output:");
      console.log("\n" + "=".repeat(60));
      console.log(aiResponse);
      console.log("=".repeat(60) + "\n");
      
      // Save raw output
      const outputFile = `ranking_results_raw_${Date.now()}.txt`;
      fs.writeFileSync(outputFile, aiResponse);
      console.log(`💾 Raw results saved to: ${outputFile}\n`);
    }
  } catch (error) {
    console.error("❌ API Error:", error.message);
  }
}

// 🏁 Run the analysis
rankResumes().catch(err => {
  console.error("❌ Fatal error:", err.message);
  process.exit(1);
});