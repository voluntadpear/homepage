import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  return (
    <>
      <title>{head.title}</title>

      <link rel="canonical" href={loc.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <meta property="og:type" content="website" />
      <meta name="twitter:site" content="Guillermo Peralta Scura" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="scura.dev" />
      <meta name="twitter:creator" content="@voluntadpear" />
      <meta property="og:title" content={head.title} />
      <meta name="twitter:title" content={head.title} />

      {head.meta.map((m) => (
        <meta {...m} />
      ))}

      {!head.meta.some((m) => m.name === "description") ? (
        <>
          <meta
            name="description"
            content="Web developer that likes to tackle challenges, learn from them, write about them, and have fun while in the process!"
          />
          <meta
            property="og:description"
            content="Web developer that likes to tackle challenges, learn from them, write about them, and have fun while in the process!"
          />
          <meta
            name="twitter:description"
            content="Web developer that likes to tackle challenges, learn from them, write about them, and have fun while in the process!"
          />
        </>
      ) : null}

      {!head.meta.some((m) => m.property === "og:image") ? (
        <>
          <meta
            property="og:image"
            content={`https://${process.env.DOMAIN}/og-fallback.png`}
          />
          <meta
            property="og:image:alt"
            content="Guillermo Peralta Scura, front-end developer"
          />
          <meta property="og:image:width" content="1280" />
          <meta property="og:image:height" content="675" />
        </>
      ) : null}

      {!head.meta.some((m) => m.name === "twitter:image") ? (
        <meta
          name="twitter:image"
          content={`https://${process.env.DOMAIN}/og-fallback.png`}
        />
      ) : null}

      {head.links.map((l) => (
        <link {...l} />
      ))}

      {head.styles.map((s) => (
        <style {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}
    </>
  );
});
