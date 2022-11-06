import { component$, Slot, useContext, $ } from "@builder.io/qwik";
import { MenuContext } from "~/root";
import { Close, Hamburger } from "./icons/qwik";

export default component$(({ id }: { id?: string }) => {
  return (
    <header id={id}>
      <MobileMenu />
      <DesktopMenu />
      <header class="bg-my-orange-light pb-12 snap-start">
        <Slot />
      </header>
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
            <li>
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
          <li>
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
    label: "Home 🏠",
    url: "/#top",
  },
  {
    label: "Latest Posts ✨",
    url: "/#posts",
  },
  {
    label: "About Me 👋",
    url: "/#about",
  },
  {
    label: "My Bookmarks 🔖",
    url: "/#bookmarks",
  },
  {
    label: "Speaking 🎙",
    url: "/#speaking",
  },
  {
    label: "Contact ✉️",
    url: "/#contact",
  },
] as const;
