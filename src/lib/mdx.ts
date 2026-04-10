import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content", "games");

export interface GameFrontmatter {
  title: string;
  slug: string;
  version: string;
  fileSize: string;
  downloadUrl: string;
  rating: number;
  totalVotes: number;
  category: string;
  icon: string;
  osRequirements: string;
  downloadCount: number;
  isNew: boolean;
  isUpdated: boolean;
  /** Shown in home “Top Rated Apps” when true */
  isFeatured?: boolean;
  googlePlayUrl?: string;
  appStoreUrl?: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  publishedAt: string;
  updatedAt: string;
}

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export async function getGameContent(slug: string) {
  const filePath = path.join(contentDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    frontmatter: data as GameFrontmatter,
    content,
  };
}

export async function getAllGameSlugs(): Promise<string[]> {
  if (!fs.existsSync(contentDir)) return [];

  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function generateTOC(content: string): TOCItem[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const toc: TOCItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    toc.push({ id, text, level });
  }

  return toc;
}

export function extractFAQs(content: string): FAQItem[] {
  const faqSectionRegex =
    /##\s+(?:Frequently Asked Questions|FAQs?)\s*\n([\s\S]*?)(?=\n##\s|\n---|\Z)/i;
  const sectionMatch = faqSectionRegex.exec(content);

  if (!sectionMatch) return [];

  const section = sectionMatch[1];
  const qaRegex = /###\s+(.+?)\s*\n([\s\S]*?)(?=\n###\s|\Z)/g;
  const faqs: FAQItem[] = [];
  let qaMatch;

  while ((qaMatch = qaRegex.exec(section)) !== null) {
    faqs.push({
      question: qaMatch[1].trim(),
      answer: qaMatch[2].trim(),
    });
  }

  return faqs;
}

export async function getAllGameFrontmatters(): Promise<GameFrontmatter[]> {
  const slugs = await getAllGameSlugs();
  const frontmatters: GameFrontmatter[] = [];

  for (const slug of slugs) {
    const result = await getGameContent(slug);
    if (result) {
      frontmatters.push(result.frontmatter);
    }
  }

  return frontmatters;
}
