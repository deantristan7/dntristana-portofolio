import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <title>Dean Tristan | Full-Stack Developer</title>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Dean Tristan's personal portfolio website. Explore my projects, skills, and experience in full-stack development." />
        <meta name="author" content="Dean Tristan" />
        <meta name="keywords" content="Dean Tristan, portfolio, full-stack developer, web development, projects" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Dean Tristan | Full-Stack Developer" />
        <meta property="og:description" content="Discover the projects, skills, and experience of Dean Tristan, a full-stack developer with a passion for coding and dark arts." />
        <meta property="og:image" content="/images/og-image.png" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dean Tristan | Full-Stack Developer" />
        <meta name="twitter:description" content="Explore the personal portfolio of Dean Tristan, a full-stack developer specializing in Go, PHP, and metal-themed projects." />
        <meta name="twitter:image" content="/images/og-image.png" />
        
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
