import { component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import Card from "~/components/card";
import { extractFrontmatter } from "~/content/local-posts";
import posts from "~/content/posts";

export default component$(() => {
  const allPosts = [...posts].reverse().map((post) => {
    try {
      new URL(post.url);
      return post;
    } catch (error) {
      return extractFrontmatter(post.url);
    }
  });

  return (
    <main class="bg-white py-24">
      <div class="mx-3 md:mx-6 space-y-6 md:grid md:grid-cols-2 md:space-y-0 md:gap-x-7 lg:gap-x-12 md:gap-y-12 lg:max-w-5xl lg:mx-auto">
        {allPosts.map((post) => (
          // @ts-expect-error
          <Card
            title={post.title!}
            description={post.summary!}
            url={"url" in post ? post.url : undefined}
            showCTA
          />
        ))}
      </div>
    </main>
  );
});

export const head: DocumentHead = {
  title: "Blog",
};
