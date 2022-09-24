import { component$ } from "@builder.io/qwik";

type Props = {
  title: string;
  description: string;
  thumbnailSrc: string;
  url: string;
  class?: string;
};

export default component$((props: Props) => {
  return (
    <article class={props.class}>
      <a
        href={props.url}
        class="grid grid-cols-[8rem_1fr] lg:grid-cols-[13rem_1fr] text-my-blue-dark gap-x-4 lg:gap-y-12"
      >
        <img
          src={props.thumbnailSrc}
          alt=""
          height="72"
          width="137"
          class="w-32 lg:w-52 object-contain object-top"
        />
        <p class="text-lg font-semibold lg:text-3xl lg:font-normal">
          {props.title}
        </p>
        <p class="col-start-2 lg:col-start-1 lg:col-span-full">
          {props.description}
        </p>
      </a>
    </article>
  );
});
