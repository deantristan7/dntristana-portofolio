import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;

  return (
    <Html lang="en">
      <title>Dean Tristan | Architect of Dark Code & Logic</title>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="The personal domain of Dean Tristan. A space where logic meets chaos, fueled by the raw energy of metal, deep thought, and the solitude of high places." />
        <meta name="author" content="Dean Tristan" />
        <meta name="keywords" content="Dean Tristan, portfolio, full-stack developer, web development, projects" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Dean Tristan | Software Engineer" />
        <meta property="og:description" content="Explore Dean's world. Building logic by day, creating chaos with a metal band by night, and finding inspiration on the mountain trails." />
        <meta property="og:image" content={`${vercelUrl}/images/pentagram.png`} />
        <meta property="og:url" content={vercelUrl} />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dean Tristan | Software Engineer" />
        <meta name="twitter:description" content="Explore Dean's world. Building logic by day, creating chaos with a metal band by night, and finding inspiration on the mountain trails." />
        <meta name="twitter:image" content={`${vercelUrl}/images/pentagram.png`} />

        <link rel="icon" type="image/x-icon" href="/images/pentagram.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
