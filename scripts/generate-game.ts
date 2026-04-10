import fs from "fs";
import path from "path";

const gameName = process.argv[2];

if (!gameName) {
  console.error("Usage: npx tsx scripts/generate-game.ts <game-name>");
  process.exit(1);
}

const slug = gameName
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, "")
  .replace(/\s+/g, "-")
  + "-download-apk";

const today = new Date().toISOString().split("T")[0];

const template = `---
title: "${gameName} Download APK 2026 – Full Review & Guide"
slug: "${slug}"
version: "v1.0.0"
fileSize: "100 MB"
downloadUrl: "https://example.com/download/${slug}"
rating: 4.0
totalVotes: 0
category: "casino-games"
icon: "/images/games/${slug.replace("-download-apk", "")}-icon.webp"
osRequirements: "Android 7.0+ / iOS 12+"
downloadCount: 0
isNew: true
isUpdated: false
tags: ["${gameName.toLowerCase()}", "pakistan", "apk download"]
seoTitle: "${gameName} Download APK 2026 – Free App Pakistan"
seoDescription: "Download ${gameName} APK for Pakistan. Complete guide with features, installation steps, and safety review."
publishedAt: "${today}"
updatedAt: "${today}"
---

## About ${gameName}

[Write a comprehensive introduction about ${gameName}. Include what the app does, who it's for, and why it's popular in Pakistan. Aim for 200-300 words.]

## Key Features of ${gameName}

- **Feature 1** — Description
- **Feature 2** — Description
- **Feature 3** — Description
- **Feature 4** — Description
- **Feature 5** — Description

<ProsCons
  pros={[
    "Pro 1",
    "Pro 2",
    "Pro 3"
  ]}
  cons={[
    "Con 1",
    "Con 2"
  ]}
/>

## How to Download ${gameName} APK

<DownloadGuide
  steps={[
    {
      title: "Enable Unknown Sources",
      description: "Go to Settings > Security > Unknown Sources and toggle it on."
    },
    {
      title: "Download the APK File",
      description: "Click the download button on this page to get the latest APK file."
    },
    {
      title: "Install the Application",
      description: "Tap on the APK file and press Install when prompted."
    },
    {
      title: "Create Your Account",
      description: "Open the app and register with your phone number."
    }
  ]}
/>

## System Requirements

<SystemRequirements
  requirements={[
    { label: "Operating System", value: "Android 7.0+ / iOS 12+" },
    { label: "RAM", value: "2 GB minimum" },
    { label: "Storage Space", value: "100 MB" },
    { label: "Internet", value: "Stable 3G/4G or Wi-Fi" }
  ]}
/>

## Is ${gameName} Safe to Use?

[Write about safety and security aspects.]

## Frequently Asked Questions

### Is ${gameName} free to download?

[Answer here.]

### How do I withdraw money from ${gameName}?

[Answer here.]

### Can I use ${gameName} on iPhone?

[Answer here.]

## Final Verdict

[Write a summary verdict, 100-200 words.]
`;

const outPath = path.join(process.cwd(), "content", "games", `${slug}.mdx`);

if (fs.existsSync(outPath)) {
  console.error(`File already exists: ${outPath}`);
  process.exit(1);
}

fs.writeFileSync(outPath, template);
console.log(`Created: ${outPath}`);
