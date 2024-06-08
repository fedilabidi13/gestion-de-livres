const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors middleware
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes


// Create a new book
app.post('/books', async (req, res) => {
  const { title, author, publishedAt } = req.body;
  try {
    const book = await prisma.book.create({
      data: {
        title,
        author,
        publishedAt: new Date()
      },
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all books
app.get('/books', async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single book by id
app.get('/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book = await prisma.book.findUnique({
      where: { id: Number(id) },
    });
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a book by id
app.put('/books/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, publishedAt } = req.body;
  try {
    const book = await prisma.book.update({
      where: { id: Number(id) },
      data: {
        title,
        author,
        publishedAt: new Date(),
      },
    });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a book by id
app.delete('/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Check if the book exists
    const book = await prisma.book.findUnique({
      where: { id: Number(id) },
    });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Delete the book if it exists
    await prisma.book.delete({
      where: { id: Number(id) },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});