import { component$ } from "@builder.io/qwik";

type Props = {
  title: string;
  description: string;
  thumbnailSrc: string;
  url: string;
  class?: string;
  tag?: "h2" | "h3";
  lang?: "es" | "en";
};

export default component$((props: Props) => {
  const { tag: Tag = "h3" } = props;

  return (
    <article class={props.class}>
      <a
        href={props.url}
        class="group grid grid-cols-[8rem_1fr] lg:grid-cols-[13rem_1fr] text-my-blue-dark gap-x-4 lg:gap-y-12"
      >
        <img
          src={props.thumbnailSrc}
          alt=""
          height="72"
          width="137"
          class="w-32 lg:w-52 object-contain object-top"
          loading="lazy"
        />
        <Tag
          class="text-lg font-semibold lg:text-3xl lg:font-normal group-hover:underline"
          lang={props.lang === "es" ? "es" : undefined}
        >
          {props.title}
        </Tag>
        <p class="col-start-2 lg:col-start-1 lg:col-span-full">
          {props.description}
        </p>
      </a>
    </article>
  );
});
