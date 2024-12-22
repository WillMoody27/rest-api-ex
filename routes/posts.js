import express from "express";
const router = express.Router();

let posts = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
  { id: 3, title: "Post 3" },
];

router.get("/", (req, res) => {
  // Setting limits to posts
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  // No limit then return all posts
  res.status(200).json(posts);
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    // Post not found
    return res.status(404).json({ message: `Post with id ${id} not found` });
  }
  // Post found
  res.status(200).json(post);
});

// Create a post
router.post("/", (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };

  if (!newPost.title) {
    return res.status(400).json({ message: "Title is required" });
  }
  posts.push(newPost); // Add new post (not really added to a database)
  res.status(201).json(newPost);
});

// Update a post
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res.status(404).json({ message: `Post with id ${id} not found` });
  }

  post.title = req.body.title;
  res.status(200).json(post);
});

// Delete a post
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res.status(404).json({ message: `Post with id ${id} not found` });
  }

  posts = posts.filter((post) => post.id !== id);
  res.status(200).json({ message: `Post with id ${id} deleted` });
});

export default router;
