import path from "path";
import fs from "fs";
import fm from "front-matter";
export { default as posts } from "./posts";

export function extractFrontmatter(url: string) {
  const currentDir = process.cwd();

  let filePath = "";

  if (currentDir.includes("apps")) {
    filePath = path.join(
      process.cwd(),
      "..",
      "..",
      "apps",
      "homepage",
      "src",
      "routes",
      "blog",
      url.replace("/", ""),
      "index.mdx"
    );
  } else {
    filePath = path.join(
      process.cwd(),
      "apps",
      "homepage",
      "src",
      "routes",
      "blog",
      url.replace("/", ""),
      "index.mdx"
    );
  }

  const rawPost = fs.readFileSync(filePath, "utf-8");

  const frontMatter = fm<Frontmatter>(rawPost).attributes;

  return frontMatter;
}

type Frontmatter = {
  date: string;
  title: string;
  summary: string;
  og_img: string;
};
