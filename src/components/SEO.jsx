import { Helmet } from "react-helmet-async";

// TODO: replace with your real production domain once deployed.
const SITE_URL = "https://www.budgetbasic.app";
const SITE_NAME = "Budget Basic";
// Swap this for a proper 1200×630 social-preview image once you have one;
// logo.png works as a fallback in the meantime.
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;

/**
 * Drop this at the top of any page to give it a unique, crawlable
 * <title>, meta description, canonical URL, and social preview tags.
 * Every route in App.jsx should render its own <SEO> with content
 * specific to that page — duplicate/missing titles & descriptions
 * are the #1 reason SPA sites lose SEO score.
 */
export default function SEO({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  noindex = false,
  type = "website",
  children,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const canonicalUrl = `${SITE_URL}${path === "/" ? "" : path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow"}
      />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {children}
    </Helmet>
  );
}

export { SITE_URL, SITE_NAME };
