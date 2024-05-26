import { Router } from "express";
import { createArtist, deleteArtist, getArtist, getFollowArtists, getArtists, updateArtist } from "../controllers/aritsts.controller.mjs";
import {uploadMultipleFiles} from "../services/artists.service.mjs";

const artistsRouter = Router();

artistsRouter.get('/', getArtists);

artistsRouter.get('/:id', getArtist);

artistsRouter.get('/follow/:id', getFollowArtists);

// artistsRouter.post('/', uploadMultipleFiles, createArtist);

artistsRouter.post('/', uploadMultipleFiles, (req, res) => {
    // console.log(req.body); // 텍스트 데이터 확인
    // console.log(req.files); // 업로드된 파일 확인
    createArtist(req, res); // createArtist 라우트 핸들러 호출
});


artistsRouter.put('/:id', updateArtist);

artistsRouter.delete('/:id', deleteArtist);

export default artistsRouter;