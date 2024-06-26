import satori from "satori";
import fs from "fs/promises";
import React from "react";
import path from "path";
import { Resvg } from "@resvg/resvg-js";
import { extractFrontmatter, posts } from "posts";

// const quicksand = await fs.
async function generateSVG(title: string, ogImgPath: string) {
  const quicksand = await fs.readFile(
    path.join(__dirname, "..", "quicksand.otf")
  );

  const svg = await satori(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          color: "#34495e",
          backgroundColor: "#ffbf69",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          paddingTop: "80px",
          paddingBottom: "50px",
        }}
      >
        <span
          style={{
            fontSize: 72,
            paddingLeft: "100px",
            paddingTop: "20px",
            paddingRight: "100px",
            textAlign: "center",
            marginBottom: "50px",
          }}
        >
          {title}
        </span>
        <span style={{ fontSize: 44 }}>Guille Scura</span>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 69 1434 219.8"
        style={{ background: "white", display: "flex" }}
      >
        <path
          d="m 0 96 C 1224 545 783 69 1434 69 H 0 Z"
          fill="#FFBF69"
          stroke="#FFBF69"
        />
      </svg>
    </div>,
    {
      width: 1280,
      height: 675,
      fonts: [
        {
          name: "Roboto",
          // Use `fs` (Node.js only) or `fetch` to read the font as Buffer/ArrayBuffer and provide `data` here.
          data: quicksand,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );

  const resvg = new Resvg(svg, {
    background: "white",
    fitTo: {
      mode: "width",
      value: 3840,
    },
  });
  const pngData = resvg.render();
  const png = pngData.asPng();
  await fs.writeFile(
    path.join(__dirname, "..", "..", "homepage", "public", "og", ogImgPath),
    png
  );
}

// generateSVG("How to render text into an image using a Canvas");

console.log(
  posts
    .filter((post) => {
      try {
        new URL(post.url);
        return false;
      } catch (error) {
        return true;
      }
    })
    .map((post) => extractFrontmatter(post.url))
    .forEach((post) => {
      generateSVG(post.title, post.og_img);
    })
);
