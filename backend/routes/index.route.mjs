import { Router } from "express";
import usersRouter from "./users.route.mjs";
import captchaRouter from "./captcha.route.mjs";
import artistsRouter from "./artists.route.mjs";

const indexRouter = Router();


indexRouter.get('/', (req, res) => {
    res.send('Server Deployed 🥳');
})
indexRouter.use('/users', usersRouter);

indexRouter.use('/artists', artistsRouter);

indexRouter.use('/verify-recaptcha', captchaRouter);



export default indexRouter;