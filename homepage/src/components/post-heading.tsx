import { component$ } from "@builder.io/qwik";
import { extractFrontmatter } from "~/content/local-posts";

type Props = {
  url: string;
  class?: string;
};

export default component$((props: Props) => {
  const fm = extractFrontmatter(props.url);

  return (
    <header
      class={`border border-my-orange-dark rounded-lg text-my-blue-dark${
        props.class ? ` ${props.class}` : ""
      }`}
    >
      <h2 class="text-3xl md:text-4xl py-2 border-b border-my-orange-dark pl-4">
        {fm.title}
      </h2>
      <p class="pl-4 py-4">{fm.summary}</p>
    </header>
  );
});
