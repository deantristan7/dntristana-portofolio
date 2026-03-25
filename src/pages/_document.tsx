import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;

  return (
    <Html lang="en" className="dark" suppressHydrationWarning>
      <title>Dean Tristan | Full Stack Engineer</title>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Backend engineer — Golang, PHP, distributed systems. 5+ years building internal platforms at scale. Based in Jakarta." />
        <meta name="author" content="Dean Tristan" />
        <meta name="keywords" content="Dean Tristan, portfolio, full-stack developer, web development, projects" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Dean Tristan | Full Stack Engineer" />
        <meta property="og:description" content="Backend engineer — Golang, PHP, distributed systems. 5+ years building internal platforms at scale." />
        <meta property="og:image" content={`https://${vercelUrl}/images/og-image.jpg`} />
        <meta property="og:url" content={`https://${vercelUrl}`} />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dean Tristan | Full Stack Engineer" />
        <meta name="twitter:description" content="Backend engineer — Golang, PHP, distributed systems. 5+ years building internal platforms at scale." />
        <meta name="twitter:image" content={`https://${vercelUrl}/images/og-image.jpg`} />

        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.svg" />

      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
