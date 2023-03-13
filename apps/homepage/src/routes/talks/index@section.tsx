import { component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import VideoThumbnail from "~/components/video-thumbnail";
import talks from "~/content/talks";

export default component$(() => {
  return (
    <main class="bg-white py-24">
      <div class="mx-3 md:mx-6 space-y-6 md:grid md:grid-cols-2 md:space-y-0 md:gap-x-7 lg:gap-x-12 md:gap-y-12 lg:max-w-5xl lg:mx-auto">
        {talks.map((talk) => (
          <VideoThumbnail
            title={talk.title}
            description={talk.description}
            thumbnailSrc={talk.thumbnail}
            url={talk.url}
            lang={talk.lang}
            tag="h2"
            key={talk.url}
          />
        ))}
      </div>
    </main>
  );
});

export const head: DocumentHead = {
  title: "Talks",
};
