// src/components/SEO/SEO.jsx
import { Helmet } from 'react-helmet-async';

const absUrl = (pathOrUrl) => {
  try {
    // যদি absolute হয় তাহলে 그대로
    const u = new URL(pathOrUrl);
    return u.toString();
  } catch {
    // না হলে origin + path
    const origin =
      (typeof window !== 'undefined' && window.location.origin) ||
      import.meta.env?.VITE_CLIENT_URL ||
      'https://www.mmfashionworld.com';
    const url = new URL(pathOrUrl || '/', origin);
    return url.toString();
  }
};

const SEO = ({
  title = 'MM Fashion World | Trendy Fashion Shop in Bangladesh',
  description = 'Shop trendy men’s, women’s & kids’ fashion in Bangladesh. Fast delivery, easy returns.',
  canonical,               // absolute বা relative path
  image,                   // absolute image URL
  type = 'website',        // website | product | article
  robots = 'index,follow',
  locale = 'bn_BD',
  siteName = 'MM Fashion World',
  twitterSite // e.g. '@mmfashionworld'
}) => {
  const url = canonical ? absUrl(canonical) :
    (typeof window !== 'undefined' ? window.location.href : 'https://www.mmfashionworld.com');
  const ogImage = image || 'https://res.cloudinary.com/dqokqca8p/image/upload/v1756744699/1756744696540_online-dress-shop-bangladesh.jpg';

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />

      {/* Canonical */}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="MM Fashion World" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEO;