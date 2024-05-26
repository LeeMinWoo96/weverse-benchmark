import * as artistService from "../services/artists.service.mjs"

export const getArtists = (req, res) => {
    artistService.getArtists()
        .then((result) => {
            res.status(200).json({
                message: "Users retrieved",
                data: result[0]
            })
        }).catch((err) => {
            res.status(500).send(err)
        })
};
export const getArtist = (req, res) => {
    const { id } = req.params;
    artistService.getArtist(id)
        .then((result) => {
            res.status(200).json({
                message: "User retrieved",
                data: result[0]
            })
        }).catch((err) => {
            res.status(500).send(err)
        })
};

export const getFollowArtists = (req, res) => {
    const { id } = req.params;
    artistService.getFollowArtists(id)
        .then((result) => {
            res.status(200).json({
                message: "User retrieved",
                data: result[0]
            })
        }).catch((err) => {
        res.status(500).send(err)
    })
};

export const createArtist = (req, res) => {
    const user = req.body;
    const thumbPath = req.files['thumbImg'] ? req.files['thumbImg'][0].path : null;
    const coverPath = req.files['coverImg'] ? req.files['coverImg'][0].path : null;
    user["thumbPath"] = thumbPath
    user["coverPath"] = coverPath
    artistService.createArtist(user)
        .then(() => {
            res.status(200).json({
                message: "User created",
                data: user
            })
        }).catch((err) => {
            res.status(500).send(err)
        })
};
export const updateArtist = (req, res) => {
    const user = req.body;
    const { id } = req.params;
    artistService.updateArtist(id, user)
        .then(() => {
            res.status(200).json({
                message: `User updated`,
                data: user
            })
        }).catch((err) => {
            res.status(500).send(err)
        })
};
export const deleteArtist = (req, res) => {
    const { id } = req.params;
    artistService.deleteArtist(id)
        .then(() => {
            res.status(200).json({
                message: "User deleted"
            })
        }).catch((err) => {
            res.status(500).send(err)
        })
};