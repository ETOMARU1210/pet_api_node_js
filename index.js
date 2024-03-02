const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const port = 3000;
const prisma = new PrismaClient();
const include_init = { category: true, photoUrls: true, tags: true };
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/pet", async (req, res) => {
  const pets = await prisma.pet.findMany({ include: include_init });
  if (pets.length === 0) {
    return res.status(405).json({ description: "Invalid Value" });
  }
  return res.status(200).json(pets);
});

app.get("/pet/status/:findByStatus", async (req, res) => {
  const findBystatus = req.params.findByStatus;
  const status = findBystatus.split(",");
  const pets = await prisma.pet.findMany({
    where: {
      status: {
        in: status,
      },
    },
  });
  if (pets.length === 0) {
    return res.status(400).json({ description: "Invalid Value" });
  }
  return res.status(200).json(pets);
});

app.get("/pet/tags/:findBytags", async (req, res) => {
  const findBytags = req.params.findBytags;
  const tags = findBytags.split(",");
  const pets = await prisma.pet.findMany({
    where: {
      tags: {
        some: {
          name: {
            in: tags,
          },
        },
      },
    },
    include: { tags: true, category: true, photoUrls: true },
  });
  if (pets.length === 0) {
    return res.status(400).json({ description: "Invalid Value" });
  }
  return res.status(200).json(pets);
});

app.get("/pet/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const pet = await prisma.pet.findUniqueOrThrow({
      where: { id },
    });
    return res.json(pet);
  } catch (e) {
    if (e.code === "P2025") {
      // Prisma error code for record not found
      return res.status(404).json({ desciption: "Invalid ID supplied" });
    } else {
      return res.status(400).json({ desciption: "Pet not found" });
    }
  }
});

app.post("/pet", async (req, res) => {
  const { category, name, photoUrls, tags, status } = req.body;
  try {
    const pet = await prisma.pet.create({
      data: {
        category: {
          create: {
            name: category.name,
          },
        },
        name,
        photoUrls: {
          create: photoUrls,
        },
        tags: {
          create: tags,
        },
        status,
      },
    });
    return res.json(pet);
  } catch (e) {
    res.status(405).json(e);
  }
});

app.post("/pet/:id", async (req, res) => {
  const id = Number(req.params.id);
  console.log(req.body);
  const { name, status } = req.body;
  try {
    const pet = await prisma.pet.update({
      where: { id },
      data: {
        name,
        status,
      },
    });
    return res.status(200).json(pet);
  } catch (e) {
    if (e.code === "P2025") {
      return res.status(405).json({ description: "Invalid Value" });
    }
  }
});

app.delete("/pet/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const pet = await prisma.pet.delete({
      where: { id },
    });
    return res.json(pet);
  } catch (e) {
    if (e.code === "P2025") {
      return res.status(404).json({ desciption: "Invalid ID supplied" });
    } else {
      return res.status(400).json({ desciption: "Pet not found" });
    }
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
