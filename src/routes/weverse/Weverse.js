import React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReactPaginate from 'react-paginate';
//data
// import allBlogPosts from '../../data/allBlogPosts'

//components
import ScrollBtn from "../../helpers/ScrollBtn";
import ResetLocation from "../../helpers/ResetLocation";
import WeverseArtist from "./WeverseArtist";
import allBlogPosts from "../../data/allBlogPosts";

const Weverse = ({currentUser, validLogin}) => {
    const [itemOffset, setItemOffset] = useState(0);
    const [endOffset, setEndOffset] = useState(itemOffset + 2);
    const [allArtists, setAllArtists] = useState([]);
    const [viewArtists, setViewArtists] = useState([]);
    const [followArtists, setFollowArtists] = useState([]);
    const [pageCountArtists, setpageCountArtists] = useState(Math.ceil(4 / 2));


    const getArtist = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_ARTISTS_URL);
            const body = await response.json();
            return body.data;
        }
        catch (err) {
            console.log(err.message)
        }
    }

    const getFollowArtist = async () => {
        try {
            console.log(currentUser)
            const response = await fetch(`${process.env.REACT_APP_FOLLOW_ARTISTS_URL}/${currentUser.id}`);
            const body = await response.json();
            return body.data;
        }
        catch (err) {
            console.log(err.message)
        }
    }
    const getArtists = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_ARTISTS_URL);
            const body = await response.json();
            return body.data;
        }
        catch (err) {
            console.log(err.message)
        }
    }

    const handlePageClick = (event) => {
        // const newOffset = (event.selected * itemsPerPage) % count;
        const newOffset = (event.selected * 2) % 4;
        console.log(newOffset)
        setItemOffset(newOffset);
        ResetLocation();
    };


    useEffect(() => {
        console.log(currentUser)
        console.log(validLogin)
        document.title = "Artist | Weverse";
        const fetchData = async () => {
            const all_artist_list = await getArtists();

            const follow_artist_list = await getFollowArtist(currentUser);
            console.log(follow_artist_list)
            setAllArtists([...all_artist_list]);
            setFollowArtists([...follow_artist_list]);
            setViewArtists([...all_artist_list].reverse().slice(itemOffset, endOffset));
            setpageCountArtists(Math.ceil(all_artist_list.length/2));
            setEndOffset(itemOffset + 2);
        };
        fetchData();
    }, []);

    useEffect(() => {
        setViewArtists([...allArtists].reverse().slice(itemOffset, endOffset));

        setEndOffset(itemOffset + 2);
        console.log(itemOffset)
        setpageCountArtists(Math.ceil(allArtists.length/2));
    }, [setEndOffset, endOffset, itemOffset]);

    return (
        <motion.main
            className="WeverseMain"
            initial={{ opacity: 0, translateX: -300 }}
            whileInView={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: -300 }}
            transition={{ duration: 1 }}
        >
            <section className="follow-artist">
                <h2 className="cap">나의 커뮤니티</h2>
                <div className="artist-grid">
                    {followArtists.map((artist, index) => (
                        <WeverseArtist key={index} artist={artist} />
                    ))}
                </div>
            </section>

            <section className="all_artist-grid">
                <h2 className="cap">새로운 아티스트를 만나보세요!</h2>
                <div className="artist-grid">
                    {viewArtists.map((artist, index) => (
                        <WeverseArtist key={index} artist={artist} />
                    ))}
                </div>
            </section>
            <ReactPaginate
                className="pagination artist-pagination"
                breakLabel="..."
                nextLabel=" &#62;"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCountArtists}
                previousLabel="&#60;"
                renderOnZeroPageCount={null}
            />
            <ScrollBtn />
        </motion.main>
    );
}
export default Weverse;