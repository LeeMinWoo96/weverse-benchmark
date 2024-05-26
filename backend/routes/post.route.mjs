import { Router } from "express";
import {createPost, getArtistPosts} from "../controllers/post.controller.mjs";

import usersRouter from "./users.route.mjs";

const postRouter = Router();

postRouter.get('/:id', getArtistPosts);

postRouter.post('/', createPost);

export default postRouter;