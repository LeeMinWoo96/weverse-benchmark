import { Router } from "express";
import usersRouter from "./users.route.mjs";
import captchaRouter from "./captcha.route.mjs";
import artistsRouter from "./artists.route.mjs";
import postRouter from "./post.route.mjs";
import testRouter from "./test.route.mjs";

const indexRouter = Router();


indexRouter.get('/', (req, res) => {
    res.send('Server Deployed 🥳');
})
indexRouter.use('/users', usersRouter);

indexRouter.use('/artists', artistsRouter);

indexRouter.use('/posts', postRouter);

indexRouter.use('/test', testRouter);

indexRouter.use('/verify-recaptcha', captchaRouter);



export default indexRouter;