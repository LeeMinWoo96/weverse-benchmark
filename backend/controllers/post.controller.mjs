import * as postService from "../services/post.service.mjs";
import * as userServices from "../services/users.service.mjs";

export const getArtistPosts = async (req, res) => {
    try {
        const { id } = req.params;
        const { pageSize, cursor } = req.query;

        const result = await postService.getPosts(id, "10",cursor);
        // const result = await postService.getPosts(id, 10,10,parseInt(pageSize), parseInt(cursor));

        res.status(200).json({
            message: "Get Posts",
            data: result[0],
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message || "Internal Server Error");
    }
};

export const createPost = (req, res) => {
    const post = req.body;
    postService.createPost(post)
        .then(() => {
            res.status(200).json({
                message: "post created",
                data: post
            })
        }).catch((err) => {
        res.status(500).send(err)
    })
};