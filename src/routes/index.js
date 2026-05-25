const { Router } = require("express");

const router = Router();

/**
 * @swagger
 * /api:
 *   get:
 *     summary: API health check
 *     tags: [General]
 *     responses:
 *       200:
 *         description: API is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: API is running
 */
router.get("/", (_req, res) => {
  res.json({ message: "API is running" });
});

// TODO: import and register your feature routes here
// const exampleRoutes = require("./example.routes");
// router.use("/examples", exampleRoutes);

module.exports = router;
