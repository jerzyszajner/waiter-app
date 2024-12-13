import jsonServer from "json-server";
import cors from "cors"; // Import cors

const server = jsonServer.create();
const router = jsonServer.router("public/db/app.json");

// Use CORS middleware
server.use(cors()); // Add CORS middleware to allow requests from different origins

const middlewares = jsonServer.defaults({
  static: "public",
});

const port = process.env.PORT || 3131;

server.use(middlewares);
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);

server.use(router);
server.listen(port, () => {
  console.log(`JSON Server is running on http://localhost:${port}`);
});
