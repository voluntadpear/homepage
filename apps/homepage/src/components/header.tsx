import { component$, Slot, useContext, $ } from "@builder.io/qwik";
import { MenuContext } from "~/root";
import { Close, Hamburger } from "./icons/qwik";

export default component$(({ id, contentId }: { id?: string, contentId: string }) => {
  return (
    <header id={id}>
      <a href={`#${contentId}`} class="sr-only bg-white text-my-blue focus:px-8 focus:py-2 focus:not-sr-only focus:absolute focus:top-4 focus:left-4">Skip to content</a>
      <MobileMenu />
      <DesktopMenu />
      <div class="bg-my-orange-light pb-12 snap-start">
        <Slot />
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 69 1434 219.8"
        class="bg-white"
      >
        <path
          d="m 0 96 C 1224 545 783 69 1434 69 H 0 Z"
          fill="#FFBF69"
          stroke="#FFBF69"
        />
      </svg>
    </header>
  );
});

export const MobileMenu = component$(() => {
  const state = useContext(MenuContext);

  const hideMenu = $(() => {
    state.menuVisible = false;
  });

  return state.menuVisible ? (
    <div class="fixed inset-0 bg-white/80 backdrop-blur wk-backdrop-blur z-10">
      <button
        class="fixed w-12 h-12 right-8 top-6"
        type="button"
        onClick$={() => {
          state.menuVisible = !state.menuVisible;
        }}
      >
        <Close class="w-12 h-12" />
        <span class="sr-only">Close menu</span>
      </button>
      <nav class="mt-36 ml-8">
        <ul class="flex flex-col space-y-8 text-3xl text-my-blue">
          {menuItems.map((item) => (
            <li key={item.url}>
              <a href={item.url} onClick$={hideMenu} key={item.url}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  ) : (
    <button
      class="fixed w-12 h-12 right-8 top-6 md:hidden"
      type="button"
      onClick$={() => (state.menuVisible = !state.menuVisible)}
    >
      <Hamburger class="w-12 h-12" />
      <span class="sr-only">Menu</span>
    </button>
  );
});

export const DesktopMenu = component$(() => {
  return (
    <nav class="hidden md:block lg:max-w-5xl mx-auto">
      <ul class="flex justify-around pt-9 text-my-blue lg:text-lg lg:pt-16 lg:justify-between">
        {menuItems.map((item) => (
          <li key={item.url}>
            <a href={item.url} key={item.url}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
});

export const menuItems = [
  {
    label: (
      <span>
        Home <span aria-hidden="true">🏠</span>
      </span>
    ),
    url: "/#top",
  },
  {
    label: (
      <span>
        Latest Posts <span aria-hidden="true">✨</span>
      </span>
    ),
    url: "/#posts",
  },
  {
    label: (
      <span>
        About Me <span aria-hidden="true">👋</span>
      </span>
    ),
    url: "/#about",
  },
  {
    label: (
      <span>
        My Bookmarks <span aria-hidden="true">🔖</span>
      </span>
    ),
    url: "/#bookmarks",
  },
  {
    label: (
      <span>
        Speaking <span aria-hidden="true">🎙</span>
      </span>
    ),
    url: "/#speaking",
  },
  {
    label: (
      <span>
        Contact <span aria-hidden="true">✉️</span>
      </span>
    ),
    url: "/#contact",
  },
] as const;
