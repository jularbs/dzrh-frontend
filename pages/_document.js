import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="eng">
        <Head>
          {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
          <meta charSet="UTF-8" />
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          ></link>
          {/* <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css"
          ></link> */}
          <link rel="stylesheet" href="/static/css/styles.css"></link>
        </Head>
        <body style={{overflowAnchor: "none"}}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
