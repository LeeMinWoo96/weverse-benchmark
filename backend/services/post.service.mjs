import sql from "../config/sql.mjs";

export const getPosts = (id, pageSize, cursor) => {
    return new Promise((resolve, reject) => {
        let query;
        let params;

        if (cursor > 0) {
            query = 'SELECT * FROM POST p WHERE p.artist_id = ? AND p.post_id < ? ORDER BY p.post_id DESC LIMIT ?';
            // query = 'SELECT * FROM POST p WHERE p.artist_id = ? AND p.post_id < ? ORDER BY p.post_id DESC';
            params = [id, cursor, pageSize];
            // params = [id, cursor];
        } else {
            query = 'SELECT * FROM POST p WHERE p.artist_id = ? ORDER BY p.post_id DESC LIMIT ?';
            params = [id, pageSize];
        }

        sql.execute(query, params)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => reject(err));
    });
};
export const createPost = (post) => {
    return new Promise((resolve, reject) => {
        const { user_id, caption, content, artist_id
        } = post;
        let query;
        let params;
        const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // 현재 시각을 ISO 형식으로 가져옴


        query = 'INSERT INTO POST (user_id, caption, content, artist_id, reg_dt, update_dt) VALUES(?, ?, ?, ?, ?,?)';
        params = [user_id, caption, content, artist_id, currentDate, currentDate];

        sql.execute(query, [...params])
            .then((result) => resolve(result))
            // .catch((err) => reject(err))
    })
}