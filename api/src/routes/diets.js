const { Router } = require("express");
const router = Router();
const { Diet } = require("../db");

router.get("/", async (req, res) => {
  let diets = await Diet.findAll({ attributers: ["name"] });
  res.json(diets);
});

module.exports = router;
