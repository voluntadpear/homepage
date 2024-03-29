import { component$ } from "@builder.io/qwik";
import Card from "~/components/card";
import bookmarks from "~/content/bookmarks";

import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <main class="bg-white py-24">
      <div class="mx-3 md:mx-6 space-y-6 md:grid md:grid-cols-2 md:space-y-0 md:gap-x-7 lg:gap-x-12 md:gap-y-12 lg:max-w-5xl lg:mx-auto">
        {[...bookmarks].reverse().map((bookmark) => (
          <Card title={bookmark.title} url={bookmark.url} showCTA={false} tag="h2" key={bookmark.url} />
        ))}
      </div>
    </main>
  );
});

export const head: DocumentHead = {
  title: "Bookmarks",
};
