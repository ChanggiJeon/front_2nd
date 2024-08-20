// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from "react";
import express from "express";
import ReactDOMServer from "react-dom/server";
import { App } from "./App.tsx";

/**
 * @NOTE
 * 방법 1. 자주 사용되는 url을 미리 만들어 캐싱해두고 제공한다.
 * 방법 2. 한번 들어온 페이지는 캐싱하여 제공한다.
 */
const app = express();
const port = 3333;

const cache = new Map();

const urlsToPreCache = ["/", "/2", "/3", "/4"];

const preCacheUrls = async () => {
  for (const url of urlsToPreCache) {
    const rendered = ReactDOMServer.renderToString(<App url={url} />);
    cache.set(url, rendered);
  }
};

preCacheUrls();

app.get("*", (req, res) => {
  const url = req.url;

  if (cache.has(url)) {
    console.log(`Serving from cache for ${url}`);
    return res.send(cache.get(url));
  }

  const appContent = ReactDOMServer.renderToString(<App url={url} />);

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Simple SSR</title>
    </head>
    <body>
      <div id="root">${appContent}</div>
    </body>
    </html>
  `;

  cache.set(url, html);

  res.send(html);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
