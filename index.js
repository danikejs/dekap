// Vercel detecta e publica esta aplicação Express como função Node.js.
// A mesma aplicação atende o frontend e as rotas /api.
require("dotenv").config();
module.exports = require("./backend/src/app");
