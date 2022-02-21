import { Router } from "express";
import { Blog_posts } from "../entity/post";

const router = Router();

// Create blog post
router.post("/post", async (req, res) => {
  try {
    const { title, blog } = req.body;
    const post = Blog_posts.create({
      title,
      blog,
    });
    await post.save();
    return res.status(201).json({ post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Blog_posts.find();
    return res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get post by id
router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Blog_posts.findOne({
      where: { id: req.params.id },
    });

    if (!post) {
      return res
        .status(404)
        .json({ message: "the post with the given id was not found" });
    }

    return res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update post
router.patch("/posts/:id", async (req, res) => {
  try {
    const { title, blog } = req.body;
    const posts = await Blog_posts.update(
      { title, blog },

      { id: +req.params.id }
    );

    if (posts[0] === 0)
      return res
        .status(404)
        .json({ message: "The post with the given id was not found" });

    const post = posts[1][0].dataValues;

    return res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete post
router.delete("/posts/:id", async (req, res) => {
  try {
    const post = await Blog_posts.delete(parseInt(req.params.id));
    if (!post)
      return res
        .status(404)
        .json({ message: "The post with the given id was not found" });

    return res
      .status(200)
      .json({ message: "The post was deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
