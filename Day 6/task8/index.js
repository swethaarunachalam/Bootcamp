const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Simple API",
      version: "1.0.0",
      description: "A simple API documentation using Swagger"
    },
    servers: [{ url: "http://localhost:6000" }]
  },
  apis: ["./index.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 */
app.get("/users", (req, res) => {
  res.json([{ id: 1, name: "padma" }, { id: 2, name: "ajay" }]);
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 */
app.post("/users", (req, res) => {
  const user = { id: Date.now(), name: req.body.name };
  res.status(201).json(user);
});

const PORT = 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));