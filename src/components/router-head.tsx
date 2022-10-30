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
      <meta property="og:site_name" content="Guillermo Peralta Scura" />
      <meta name="twitter:site" content="Guillermo Peralta Scura" />

      {head.meta.map((m) => (
        <meta {...m} />
      ))}

      {!head.meta.some((m) => m.property === "og:image") ? (
        <meta
          property="og:image"
          content={`https://${process.env.DOMAIN}/og-fallback.png`}
        />
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
