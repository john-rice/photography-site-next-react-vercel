import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Photography site template."
          />
          <meta property="og:site_name" content="photo-samples" />
          <meta
            property="og:description"
            content="Sample Photo Site."
          />
          <meta property="og:title" content="Sample Photos" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Sample Photos" />
          <meta
            name="twitter:description"
            content="See photos."
          />
        </Head>
        <body className="bg-black antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
