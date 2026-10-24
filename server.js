const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const port = Number(process.env.PORT) || 3000;
const host = "0.0.0.0";
const publicDir = __dirname;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8"
};

function safeFilePath(requestPath) {
  const decodedPath = decodeURIComponent(requestPath.split("?")[0]);
  const normalizedPath = path.normalize(decodedPath).replace(/^(\.\.[/\\])+/, "");
  return path.join(publicDir, normalizedPath === "/" ? "index.html" : normalizedPath);
}

const server = http.createServer((request, response) => {
  const requestUrl = url.parse(request.url || "/");
  let filePath;

  try {
    filePath = safeFilePath(requestUrl.pathname || "/");
  } catch {
    response.writeHead(400);
    response.end("Bad request");
    return;
  }

  fs.stat(filePath, (statError, stats) => {
    if (!statError && stats.isFile()) {
      const extension = path.extname(filePath).toLowerCase();
      response.writeHead(200, {
        "Content-Type": mimeTypes[extension] || "application/octet-stream",
        "Cache-Control": extension === ".html" ? "no-cache" : "public, max-age=3600"
      });
      fs.createReadStream(filePath).pipe(response);
      return;
    }

    // Let direct navigation to a frontend route still show the homepage.
    const fallback = path.join(publicDir, "index.html");
    fs.readFile(fallback, (fallbackError, content) => {
      if (fallbackError) {
        response.writeHead(500);
        response.end("Application failed to load");
        return;
      }
      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      response.end(content);
    });
  });
});

server.listen(port, host, () => {
  console.log(`Beta Bot Hub listening on http://${host}:${port}`);
});