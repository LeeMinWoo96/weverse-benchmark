import sql from "../config/sql.mjs";
import multer from "multer";
import path from 'path';
// const multer = require('multer');


export const getArtists = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM artists';
        sql.execute(query)
            .then((result) => resolve(result))
            .catch((err) => reject(err))
    })
}

export const getArtist = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM artists WHERE id = ?';
        sql.execute(query, [id])
            .then((result) => resolve(result))
            .catch((err) => reject(err))
    })
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`);
    },
});

const upload = multer({ storage });

export const uploadMultipleFiles = (req, res, next) => {
    upload.fields([
        { name: 'thumbImg', maxCount: 1 },
        { name: 'coverImg', maxCount: 1 }
    ])(req, res, (err) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        next(); // 다음 미들웨어 또는 라우터로 제어를 전달
    });
};

export const createArtist = (user) => {
    return new Promise((resolve, reject) => {

            const {
                id, email, password, fullname, thumbPath, coverPath
            } = user;

            let query;
            let params;

            query = 'INSERT INTO artists (id, email, password, fullname , thumb_image_path, cover_image_path) VALUES(?, ?, ?, ?, ?, ?)';
            params = [id, email, password, fullname, thumbPath, coverPath];

            sql.execute(query, [...params])
                .then((result) => resolve(result))
                .catch((err) => reject(err))

    });
}


export const updateArtist = (id, user) => {
    return new Promise((resolve, reject) => {
        const { email, password, fullname, address, number } = user;
        let query;
        let params;
        params = [email, password, fullname, address, number];
        query = 'UPDATE artists SET email = ?, password = ?, fullname = ?, address = ?, number = ? WHERE id = ?';
        sql.execute(query, [...params, id])
            .then((result) => resolve(result))
            .catch((err) => reject(err))
    })
}




export const deleteArtist = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM artists WHERE id = ?';
        sql.execute(query, [id])
            .then((result) => resolve(result))
            .catch((err) => reject(err))
    })
}