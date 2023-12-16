const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/api/flashcards", async (req, res) => {
  const flashcards = await prisma.flashcard.findMany();
  res.json(flashcards);
});

app.get("/api/folders", async (req, res) => {
  const folders = await prisma.folder.findMany();
  res.json(folders);
});

app.post("/api/flashcards", async (req, res) => {
  const { title, content, folderId, isRevealed } = req.body;

  if (!title || !content) {
    return res.status(400).send("Both fields are required");
  }

  try {
    const flashcard = await prisma.flashcard.create({
      data: { title, content, folderId, isRevealed },
    });
    res.json(flashcard);
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

app.post("/api/folders", async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).send("Both fields are requireed");
  }

  try {
    const folder = await prisma.folder.create({
      data: { title, description },
    });
    res.json(folder);
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

app.put("/api/flashcards/:id", async (req, res) => {
  const { title, content } = req.body;
  const id = parseInt(req.params.id);

  if (!title || !content) {
    res.status(400).send("Both fields are required");
  }

  if (!id || isNaN(id)) {
    return res.status(400).send("ID must be valid");
  }

  try {
    const updatedFlashcard = await prisma.flashcard.update({
      where: { id },
      data: { title, content },
    });
    res.json(updatedFlashcard);
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

app.delete("/api/flashcards/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    res.status(400).send("ID must be valid");
  }

  try {
    await prisma.flashcard.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

app.delete("/api/folders/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    res.status(400).send("ID must be valid");
  }

  try {
    await prisma.folder.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

app.listen(5000, () => {
  console.log("running on server: 5000");
});
