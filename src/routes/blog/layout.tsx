import { component$, Slot } from "@builder.io/qwik";
import { DesktopMenu, MobileMenu } from "~/components/header";
import { GitHub, LinkedIn, Twitter } from "~/components/icons/qwik";

export default component$(() => {
  return (
    <>
      <header class="bg-my-orange-light">
        <div class="lg:max-w-5xl mx-auto">
          <MobileMenu />
          <DesktopMenu />
          <h1 class="text-base md:text-2xl text-my-blue pt-16 pb-4 ml-4 md:ml-8 md:pt-28 lg:ml-0">
            Blog Posts
          </h1>
        </div>
      </header>
      <main class="bg-white pt-16 pb-24 px-3">
        <article class="prose md:prose-lg lg:prose-xl md:max-w-xl lg:max-w-2xl md:mx-auto">
          <Slot />
        </article>
      </main>
      <footer class="bg-my-orange-light">
        <div class="pt-8 pb-12 pl-4 md:pl-9 lg:pl-0 lg:pt-20 lg:pb-28 lg:max-w-5xl lg:mx-auto">
          <p class="text-my-blue underline md:text-2xl">
            <a href="/">Go back home</a>
          </p>
          <div class="flex items-center space-x-4 md:space-x-8 my-6">
            <a href="https://github.com/voluntadpear">
              <GitHub class="w-6 h-6 md:w-8 md:h-8" />
            </a>
            <a href="https://twitter.com/voluntadpear">
              <Twitter class="w-6 h-6 md:w-8 md:h-8" />
            </a>
            <a href="https://www.linkedin.com/in/guillermo-peralta-scura-00a852103/">
              <LinkedIn class="w-6 h-6 md:w-8 md:h-8" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
});
