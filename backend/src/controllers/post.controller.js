import { Post } from "../models/post.model.js";

//create a post
const createPost = async (req, res) => {
    try {
        const { name, description, age } = req.body;

        //basic validation
        if (!name || !description || !age) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        // Create a new post
        const post = await Post.create({ name, description, age });
        res.status(201).json({ message: "Post created successfully", post });

    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Server error" });
    }
};
//get all posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, age } = req.body;

        //basic validation
        if (!name || !description || !age) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        // Find the post by ID and update it
        const updatedPost = await Post.findByIdAndUpdate(id, { name, description, age }, { new: true });

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ message: "Post updated successfully", post: updatedPost });

    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the post by ID and delete it
        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ message: "Post deleted successfully" });

    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export { createPost, getPosts, updatePost, deletePost };

 

