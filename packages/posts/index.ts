import path from "path";
import fs from "fs";
import fm from "front-matter";
import { fileURLToPath } from "url";
export {default as posts} from "./posts"

export function extractFrontmatter(url: string) {
  const filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(filename);

  const filePath = path.join(
    dirname,
    "..",
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

