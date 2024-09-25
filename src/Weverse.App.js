import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import InfiniteScroll from 'react-infinite-scroller';
import './App.css';

// Header Component
const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                {/*<img src="%PUBLIC_URL%/weverse/main_logo.png/150x50?text=Weverse" alt="Weverse Logo" />*/}
                <img src={process.env.PUBLIC_URL + '/weverse/main_logo.png'} alt="Weverse Logo" width="150" height="50" />


            </div>
            <div className="header-right">
                <button className="signin-btn">Sign in</button>
                <img src={process.env.PUBLIC_URL + '/weverse/jelly.png'} alt="Badge Logo" width="30" height="30" />
                <img src={process.env.PUBLIC_URL + '/weverse/shop.png'} alt="shop Logo" width="30" height="30" />
                {/*<img src="https://via.placeholder.com/30" alt="Badge Icon" className="icon" />*/}
                {/*<img src="https://via.placeholder.com/30" alt="User Icon" className="icon" />*/}
            </div>
        </header>
    );
};

// Carousel for KKOTI and other promotions
const KKOTICarousel = () => {
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const gutter = 12;
    const numOfCards = 2;

    return (
        <div style={{ padding: '0 40px', maxWidth: '100%', marginTop: '20px' }}>
            <ItemsCarousel
                chevronWidth={30}
                gutter={gutter}
                numberOfCards={numOfCards}
                slidesToScroll={numOfCards}
                outsideChevron={true}
                activeItemIndex={activeItemIndex}
                requestToChangeActive={setActiveItemIndex}
                leftChevron={<button>{'<'}</button>}
                rightChevron={<button>{'>'}</button>}
            >
                <div className="carousel-card" style={{ background: '#f9e5e5' }}>
                    <h3>KKOTI가 되어보세요!</h3>
                    <p>KKOTI MEMBERSHIP & KIT OPEN</p>
                    <img src="https://via.placeholder.com/150x100?text=KKOTI+Image" alt="KKOTI Banner" />
                </div>
                <div className="carousel-card" style={{ background: '#e6e5f9' }}>
                    <h3>[RIGHT HERE] WORLD TOUR</h3>
                    <p>IN GOYANG<br />오프라인 공연 상세 안내</p>
                    <img src="https://via.placeholder.com/150x100?text=Seventeen+Tour" alt="Seventeen Banner" />
                </div>
                <div className="carousel-card" style={{ background: '#e6e5f9' }}>
                    <h3>[RIGHT HERE] WORLD TOUR</h3>
                    <p>IN GOYANG<br />오프라인 공연 상세 안내</p>
                    <img src="https://via.placeholder.com/150x100?text=Seventeen+Tour" alt="Seventeen Banner" />
                </div>
            </ItemsCarousel>
        </div>
    );
};

// "아티스트와 DM을 나눠보세요" Section
const DMSection = () => {
    const artists = [
        { name: 'LEE JIN HYUK', imgSrc: 'https://via.placeholder.com/80?text=Jin+Hyuk' },
        { name: 'AHN HYO SEOP', imgSrc: 'https://via.placeholder.com/80?text=Hyo+Seop' },
        { name: 'HONG SEOK', imgSrc: 'https://via.placeholder.com/80?text=Hong+Seok' },
        { name: 'KATSEYE', imgSrc: 'https://via.placeholder.com/80?text=Katseye' },
        { name: 'AKB48', imgSrc: 'https://via.placeholder.com/80?text=AKB48' },
        { name: 'KIM MYUNGSOO', imgSrc: 'https://via.placeholder.com/80?text=Myungsoo' },
        { name: 'BANG YEDAM', imgSrc: 'https://via.placeholder.com/80?text=Bang+Yedam' },
        { name: 'ILLIT', imgSrc: 'https://via.placeholder.com/80?text=ILLIT' },
    ];

    return (
        <section className="dm-section">
            <h2>아티스트와 DM을 나눠 보세요!</h2>
            <div className="dm-artist-list">
                {artists.map((artist, index) => (
                    <div key={index} className="dm-artist-item">
                        <img src={artist.imgSrc} alt={artist.name} />
                        <p>{artist.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

// Infinite scroll for artist section
const InfiniteArtistScroll = () => {
    const [artists, setArtists] = useState([
        { name: 'TOMORROW X TOGETHER', imgSrc: 'https://via.placeholder.com/150?text=TXT' },
        { name: '&TEAM', imgSrc: 'https://via.placeholder.com/150?text=&TEAM' },
        { name: 'ILLIT', imgSrc: 'https://via.placeholder.com/150?text=ILLIT' },
        { name: 'TWS', imgSrc: 'https://via.placeholder.com/150?text=TWS' },
        { name: 'ONEUS', imgSrc: 'https://via.placeholder.com/150?text=ONEUS' },
        { name: 'ATBO', imgSrc: 'https://via.placeholder.com/150?text=ATBO' },
    ]);

    const [hasMore, setHasMore] = useState(true);

    const loadMore = () => {
        setTimeout(() => {
            setArtists(prev => [
                ...prev,
                { name: 'New Artist 1', imgSrc: 'https://via.placeholder.com/150?text=New+Artist+1' },
                { name: 'New Artist 2', imgSrc: 'https://via.placeholder.com/150?text=New+Artist+2' },
                { name: 'New Artist 3', imgSrc: 'https://via.placeholder.com/150?text=New+Artist+3' },
            ]);

            if (artists.length >= 50) {
                setHasMore(false);
            }
        }, 1500);
    };

    return (
        <div style={{ height: '700px', overflow: 'auto', padding: '20px' }}>
            <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={hasMore}
                loader={<div className="loader" key={0}>Loading...</div>}
                useWindow={false}
            >
                <div className="artist-list">
                    {artists.map((artist, index) => (
                        <div key={index} className="artist-item">
                            <img src={artist.imgSrc} alt={artist.name} />
                            <p>{artist.name}</p>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

function App() {
    return (
        <div className="App">
            <Header />
            <KKOTICarousel />
            <DMSection />
            <h2>새로운 아티스트를 만나보세요!</h2>
            <InfiniteArtistScroll />
        </div>
    );
}

export default App;
