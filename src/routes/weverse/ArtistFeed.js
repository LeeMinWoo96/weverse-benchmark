import {Link, useLocation} from "react-router-dom";
import React, {useCallback, useEffect, useState} from 'react'
import {motion} from "framer-motion";
import "react-alice-carousel/lib/alice-carousel.css";
import HeroVideo from '../../assets/images/hero/hero-bg.mp4';
import ItemsCarousel from 'react-items-carousel';
import InfiniteScroll from 'react-infinite-scroller';
import Modal from 'react-modal';
import LoginModal from "../../components/login/LoginModal";
import InsertModal from "../../components/post/insertModal";



const ArtistFeed = ({currentUser}) => {
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const [numOfCards, setNumOfCards] = useState(3);
    const [gutter, setGutter] = useState(28);

    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [cursor, setCursor] = useState(0);
    const pageSize  = 10 ;
    const location = useLocation();

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const artistString = sessionStorage.getItem('artist');
    const artist = artistString ? JSON.parse(artistString) : null;

    const fetchPosts = useCallback(async () => {
        try {
            // console.log(artist)
            const response = await fetch(`${process.env.REACT_APP_ARTIST_POSTS_URL}/${artist.artist_id}?pageSize=10&cursor=${cursor}`);
            const body = await response.json();
            const newPosts = body.data || [];
            console.log(newPosts)

            setPosts([...posts, ...newPosts]);
            // setPosts([...newPosts]);


            if (newPosts.length === 0) {

                setHasMore(false);
                // const handleClick = () => {
                //     setHasMore(false);
                // }
                // handleClick()
            }else{
                setCursor( newPosts[newPosts.length - 1].post_id);
            }
            // console.log(hasMore)
        } catch (err) {
            console.error(err.message);
        }
    });

    const resize = () => { // window 사이즈 변경되었을 때 실행되는 함수
        const width = window.innerWidth * 0.8;
        if (width < 300) {
            setNumOfCards(1);
            setGutter(0);
        } else if (width < 500) {
            setNumOfCards(2);
        } else if (width < 768) {
            setGutter(14);
        } else if (width < 1024) {
            setNumOfCards(2);
        } else if (width < 1300) {
            setNumOfCards(3);
        } else {
            setNumOfCards(4);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
        };

    }, []);

    useEffect(() => {
        fetchPosts()

    }, []);


    const loadMore = () => {

        if (posts.length == 0){
            return;
        }

        fetchPosts()
    }

    const insertPopup = () =>{
        setModalIsOpen(true)
    }

    return (
        <div>
            <div style={{width: '80%', margin: "auto"}}>
                <ItemsCarousel
                    chevronWidth={30}
                    gutter={gutter}
                    numberOfCards={numOfCards}
                    slidesToScroll={numOfCards}
                    outsideChevron={true}
                    activeItemIndex={activeItemIndex}
                    requestToChangeActive={(value) => setActiveItemIndex(value)}
                    leftChevron={<button>{'<'}</button>}
                    rightChevron={<button>{'>'}</button>}
                >
                    <div style={{height: 200, background: '#EEE'}}>First card</div>
                    <div style={{height: 200, background: '#EEE'}}>Second card</div>
                    <div style={{height: 200, background: '#EEE'}}>Third card</div>
                    <div style={{height: 200, background: '#EEE'}}>Fourth card</div>

                </ItemsCarousel>
            </div>

            <div style={{display:"flex", justifyContent : "center"}}>
                <div data-client="FEED" data-testid="write" style={{ width: "50%", background : "white", textAlign : "center"}}>
                    <div style={{display:"flex"}}>
                        <div role="button" onClick={insertPopup} tabIndex="0" style={{width : "70%", cursor :"pointer"}}>
                            <em>위버스에 포스트를 남겨보세요.</em></div>
                        <div style={{width : "20%"}}>
                            <label htmlFor="apei"  data-testid="attach-photo">
                                <span className="blind">Attach photo</span>
                                <input className="blind" id="apei" type="file" multiple="" accept="image/*"/>
                            </label>
                            <label htmlFor="avei">
                                <span className="blind">Attach video</span>
                                <input className="blind" id="avei" type="file" multiple="" accept="video/mp4, video/*"/></label>
                        </div>
                    </div>
                </div>
            </div>


            <InsertModal
                setInsertModalWindow={setModalIsOpen}
                insertModalWindow={modalIsOpen}
                artist={artist}
                user={currentUser}
            />

            <div style={{height : "700px", overflow: "auto"}}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={loadMore}
                    useWindow={false}
                    hasMore={hasMore}
                    loader={
                    <div className="loader" key={0}>Loading ...</div>}
                >
                    {posts?.map((el) => (
                        <div style={{background : "bisque", padding : "5%", border : "1px solid blue"}} key={el.post_id}>
                            <strong style={{color : "blue"}}>{el.post_id}</strong>
                            <div style={{color : "black"}}>{el.caption}</div>
                            <div style={{color : "black"}}>{el.content}</div>
                        </div>
                    )) ?? <div></div>}

                </InfiniteScroll>
            </div>
        </div>


    );
}

export default ArtistFeed;