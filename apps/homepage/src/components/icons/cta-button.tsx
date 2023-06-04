import { component$, Slot } from "@builder.io/qwik";

type Props = {
  class?: string;
  href: string;
  download?: boolean;
};

export default component$((props: Props) => {
  return (
    <a
      class={`block w-fit font-semibold border-my-blue border rounded py-2 px-3 md:text-lg lg:text-xl ${
        props.class ? ` ${props.class}` : ""
      }`}
      href={props.href}
      download={props.download}
    >
      <Slot />
    </a>
  );
});
