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

const Weverse = () => {
    const [itemOffset, setItemOffset] = useState(0);
    const [endOffset, setEndOffset] = useState(itemOffset + 2);
    const [allArtists, setAllArtists] = useState([]);
    const [currentArtists, setcurrentArtists] = useState([]);
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
        const newOffset = (event.selected * 4) % allArtists.length;
        console.log(event.selected)
        console.log(allArtists.length)
        setItemOffset(newOffset);
        ResetLocation();
    };

    useEffect(() => {
        document.title = "Artist | Weverse";
        // setEndOffset(itemOffset + 5);
        const fetchData = async () => {
            const data = await getArtists();
            console.log(data)
            setAllArtists([...data].reverse().slice(itemOffset, endOffset));
            setEndOffset(itemOffset + 2);
            console.log(itemOffset)
            setpageCountArtists(Math.ceil(data.length / 2));
        };
        fetchData();


    }, [setEndOffset, endOffset, itemOffset]);
    return (
        <motion.main
            className="blog"
            initial={{ opacity: 0, translateX: -300 }}
            whileInView={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: -300 }}
            transition={{ duration: 1 }}
        >
            <h2>Artists</h2>

            <section className="artist-grid" >
                {allArtists.map((artist, index) => (
                    <WeverseArtist key={index} artist={artist} />
                ))}
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