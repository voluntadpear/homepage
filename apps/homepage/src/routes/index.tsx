import { component$, useStylesScoped$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import { extractFrontmatter, posts } from "posts";
import Card from '~/components/card';
import CtaButton from '~/components/cta-button';
import Header from '~/components/header';
import { GitHub, LinkedIn, Twitter } from '~/components/icons/qwik';
import VideoThumbnail from '~/components/video-thumbnail';
import bookmarks from '~/content/bookmarks';
import talks from '~/content/talks';
import animation from "~/lib/animation.css?inline";

export default component$(() => {
  const latestPosts = [...posts]
  .reverse()
  .slice(0, 6)
  .map((post) => {
    try {
      new URL(post.url);
      return post;
    } catch (error) {
      return { ...extractFrontmatter(post.url), url: `/blog${post.url}` };
    }
  });

useStylesScoped$(animation);

return (
  <>
    <Header id="top" contentId="latest-posts">
      <div class="lg:max-w-5xl lg:mx-auto">
        <h1 class="text-3xl md:text-5xl text-my-blue text-center mt-36 md:mt-72 opacity-0 name motion-reduce:opacity-100">
          Guillermo Peralta Scura
        </h1>
        <p class="text-xl md:text-3xl text-my-blue text-center mt-3.5 md:mt-6 opacity-0 subtitle motion-reduce:opacity-100">
          Front-end Developer
        </p>
        <div class="flex items-center justify-center space-x-4 md:space-x-8 my-6">
          <a href="https://github.com/voluntadpear" class="icon-wrapper">
            <GitHub class="w-6 h-6 md:w-8 md:h-8" />
            <span class="sr-only">My GitHub</span>
          </a>
          <a href="https://twitter.com/voluntadpear" class="icon-wrapper">
            <Twitter class="w-6 h-6 md:w-8 md:h-8" />
            <span class="sr-only">My Twitter</span>
          </a>
          <a
            href="https://www.linkedin.com/in/guillermo-peralta-scura-00a852103/"
            class="icon-wrapper"
          >
            <LinkedIn class="w-6 h-6 md:w-8 md:h-8" />
            <span class="sr-only">My LinkedIn</span>
          </a>
        </div>
        <p class="text-lg text-my-blue-dark w-56 md:w-72 mt-14 lg:mt-24 ml-4 md:ml-14 lg:text-3xl lg:font-light lg:ml-0 lg:w-[26rem]">
          I like to overcome challenges, learn tremendously from them, write
          meticulously about them, and have fun in the process!
        </p>
      </div>
    </Header>
    <main>
      <section class="bg-white md:py-52" id="posts">
        <div class="lg:max-w-5xl lg:mx-auto flex flex-col space-y-6">
          <h2
            class="mt-24 md:my-24 ml-4 md:ml-10 text-3xl text-my-blue lg:text-4xl lg:ml-0"
            id="latest-posts"
            tabIndex={-1}
          >
            Latest posts <span aria-hidden="true">✨</span>
          </h2>
          <div class="mx-3 md:mx-6 space-y-6 md:grid md:grid-cols-2 md:space-y-0 md:gap-x-7 lg:gap-x-12 md:gap-y-12 lg:mx-0">
            {latestPosts.map((post) => (
              <Card
                title={post.title!}
                description={post.summary!}
                url={post.url}
                showCTA
                key={post.url}
              />
            ))}
            <p class="text-lg pl-4 md:pl-2 md:text-xl underline hover:no-underline text-my-blue md:col-span-full lg:text-2xl pb-8 md:pb-24 md:pt-8">
              <a href="/blog">View all blog posts</a>
            </p>
          </div>
        </div>
      </section>
      <section
        class="bg-my-orange-light px-4 md:px-10 py-8 md:py-52 text-my-blue-dark"
        id="about"
      >
        <div class="lg:max-w-5xl lg:mx-auto">
          <h2 class="text-3xl text-my-blue">
            About me <span aria-hidden="true">👋</span>
          </h2>
          <div class="md:flex lg:justify-between lg:pt-16 lg:max-w-4xl">
            <img
              loading="lazy"
              class="rounded-full w-32 h-32 lg:w-64 lg:h-64 object-cover float-right mt-2 md:float-none md:order-last"
              style="shape-outside: circle()"
              height="128"
              width="128"
              src="/pic1.webp"
              alt="Guille"
            />
            <div>
              <p class="pt-2 md:max-w-md">
                I’m a web developer who focuses on the front-end. I enjoy
                building UIs, and after some experience experimenting with
                different technologies, I’ve found the web as my platform of
                choice.
              </p>
              <p class="pt-4 md:max-w-md">
                I’m part of the Web team at{" "}
                <span class="font-semibold">PSPDFKit</span>, where I add new
                features to the SDK, coordinate with other teams, and mentor
                other co-workers across areas such as support, sales, and
                development.{" "}
                <a
                  href="https://pspdfkit.com/demo"
                  class="underline hover:no-underline"
                >
                  Take a look at the public demo
                </a>{" "}
                of this platform.
              </p>
              <p class="pt-4 md:max-w-md">
                The web can run on multiple devices and under a single
                codebase. You have competing engines and end-user browsers.
                Plus, it’s constantly evolving and has new features being
                added to it all the time. It never stops being an exciting
                area in which to be involved!
              </p>
            </div>
          </div>
          <h3 class="pt-8 text-2xl text-my-blue lg:text-3xl">
            Hobbies <span aria-hidden="true">🎸</span>
          </h3>
          <div class="md:flex lg:justify-between lg:pt-16 lg:max-w-4xl">
            <img
              loading="lazy"
              class="rounded-full w-32 h-32 lg:w-64 lg:h-64 object-cover float-left md:float-none mr-2"
              style="shape-outside: circle()"
              height="128"
              width="128"
              src="/pic2.webp"
              alt="Me playing guitar"
            />
            <p class="mt-6 md:max-w-md">
              Although my guitar skills are lacking ;), I enjoy attempting to
              play it in a somewhat acceptable way. Besides that, I like to
              watch a good movie or some series on Netflix.
            </p>
          </div>
          <CtaButton
            class="mt-6 md:mt-16 mx-auto"
            href="/resume.pdf"
            download
          >
            Download my resume
          </CtaButton>
        </div>
      </section>
      <section
        class="bg-white mt-4 text-my-blue-dark md:px-10 md:py-52"
        id="bookmarks"
      >
        <div class="lg:max-w-5xl lg:mx-auto flex flex-col space-y-8">
          <h2 class="mt-7 ml-4 md:ml-0 md:mt-0 text-3xl text-my-blue">
            My Bookmarks <span aria-hidden="true">🔖</span>
          </h2>
          <div class="ml-4 md:ml-0 md:max-w-md lg:max-w-lg">
            <p>
              Links from around the web that I find useful for work, or are
              interesting reads, or whatever else...
            </p>
            <p>
              These are all for personal use, but I’m deciding to make them
              public because why not! They may be useful for someone else. 🤷🏻‍♂️
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-3 md:gap-x-9 lg:gap-x-36 gap-y-6 md:gap-y-16 mx-2 md:mx-0">
            {[...bookmarks]
              .reverse()
              .slice(0, 4)
              .map((bookmark) => (
                <Card
                  title={bookmark.title}
                  url={bookmark.url}
                  showCTA={false}
                  key={bookmark.url}
                />
              ))}
          </div>
          <p class="pl-4 md:pl-0 underline hover:no-underline text-my-blue text-lg md:text-xl lg:text-2xl pb-8">
            <a href="/bookmarks">View all bookmarks</a>
          </p>
        </div>
      </section>
      <section
        class="bg-my-orange-light px-4 py-8 text-my-blue-dark md:px-10 md:py-52"
        id="speaking"
      >
        <div class="lg:max-w-5xl lg:mx-auto">
          <h2 class="text-3xl text-my-blue">
            Speaking <span aria-hidden="true">🎙</span>
          </h2>
          <div class="text-my-blue md:grid md:grid-cols-2 lg:gap-x-16">
            {[...talks]
              .reverse()
              .slice(0, 4)
              .map((talk) => (
                <VideoThumbnail
                  class="mt-8"
                  title={talk.title}
                  description={talk.description}
                  thumbnailSrc={talk.thumbnail}
                  url={talk.url}
                  lang={talk.lang}
                  key={talk.url}
                />
              ))}
          </div>
          <p>
            <a
              class="block mt-8 md:text-xl underline lg:text-2xl lg:mt-24 hover:no-underline"
              href="/talks"
            >
              View all talks
            </a>
          </p>
        </div>
      </section>
      <section
        class="bg-white py-14 mb-0 px-4 md:px-10 md:py-52 text-my-blue-dark"
        id="contact"
      >
        <div class="lg:max-w-5xl lg:mx-auto space-y-6 md:space-y-12">
          <h2 class="text-3xl text-my-blue">
            Contact <span aria-hidden="true">✉️</span>
          </h2>
          <div class="flex flex-col md:flex-row">
            <p class="md:max-w-md">
              You can send me an e-mail to{" "}
              <span class="font-semibold">gperaltascura[at]gmail.com</span> or
              follow me on Twitter at&nbsp;
              <span class="font-semibold">@voluntadpear</span>
            </p>
            <CtaButton
              class="mt-6 mx-auto md:mt-0"
              href="/resume.pdf"
              download
            >
              Download my resume
            </CtaButton>
          </div>
        </div>
      </section>
    </main>
  </>
);
});

export const head: DocumentHead = {
title: "Guillermo Peralta Scura",
meta: [
  {
    name: "description",
    content:
      "Web developer that likes to tackle challenges, learn from them, write about them, and have fun while in the process!",
  },
],
};
