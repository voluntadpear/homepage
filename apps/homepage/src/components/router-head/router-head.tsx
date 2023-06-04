import { component$ } from '@builder.io/qwik';
import { useDocumentHead, useLocation } from '@builder.io/qwik-city';

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();
  let description =
    head.meta.find((m) => m.name === "description")?.content ??
    "Web developer that likes to tackle challenges, learn from them, write about them, and have fun while in the process!";

    if (head.frontmatter?.summary) {
      description = head.frontmatter.summary;
    }

  return (
    <>
      <title>{head.title}</title>

      <link rel="canonical" href={loc.url.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="preload" href="/quicksand-v30-latin-ext_latin-regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/quicksand-v30-latin-ext_latin-300.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

      <meta property="og:type" content="website" />
      <meta name="twitter:site" content="Guillermo Peralta Scura" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="scura.dev" />
      <meta name="twitter:creator" content="@voluntadpear" />
      <meta property="og:title" content={head.title} />
      <meta name="twitter:title" content={head.title} />

      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />

      {!head.meta.some((m) => m.property === "og:image") ? (
        <>
          <meta
            property="og:image"
            content={
              head.frontmatter?.og_img
                ? `https://${process.env.DOMAIN}/og/${head.frontmatter.og_img}`
                : `https://${process.env.DOMAIN}/og-fallback.png`
            }
          />
          <meta
            property="og:image:alt"
            content={
              head.frontmatter?.og_img
                ? head.title
                : "Guillermo Peralta Scura, front-end developer"
            }
          />
          <meta property="og:image:width" content="1280" />
          <meta property="og:image:height" content="675" />
        </>
      ) : null}

      {!head.meta.some((m) => m.name === "twitter:image") ? (
        <meta
          name="twitter:image"
          content={
            head.frontmatter?.og_img
              ? `https://${process.env.DOMAIN}/og/${head.frontmatter.og_img}`
              : `https://${process.env.DOMAIN}/og-fallback.png`
          }
        />
      ) : null}

      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {head.styles.map((s) => (
        <style key={s.key} {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}
    </>
  );
});
