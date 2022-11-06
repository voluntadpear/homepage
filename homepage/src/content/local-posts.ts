import path from "path";
import fs from "fs";
import fm from "front-matter";

export function extractFrontmatter(url: string) {
  const filePath = path.join(
    process.cwd(),
    "src",
    "routes",
    "blog",
    url.replace("/", ""),
    "index.mdx"
  );

  const rawPost = fs.readFileSync(filePath, "utf-8");

  const frontMatter = fm<Frontmatter>(rawPost).attributes;

  return frontMatter;
}

type Frontmatter = {
  date: string;
  title: string;
  summary: string;
};
