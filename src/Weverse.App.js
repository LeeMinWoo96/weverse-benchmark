import React from 'react';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">Weverse</div>
            <nav className="nav">
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#community">Community</a></li>
                    <li><a href="#popular">Popular</a></li>
                    <li><a href="#profile">Profile</a></li>
                </ul>
            </nav>
            <div className="profile">
                <img src="profile-pic-url" alt="Profile" />
            </div>
        </header>
    );
};

const Banner = () => {
    return (
        <section className="banner">
            <img src="banner-image-url" alt="Banner" />
            <div className="banner-text">
                <h1>Welcome to Weverse</h1>
                <p>Join the community and connect with your favorite artists!</p>
            </div>
        </section>
    );
};

const CommunitySection = () => {
    return (
        <section className="community-section">
            <h2>Communities</h2>
            <div className="communities">
                <div className="community">
                    <img src="artist1-image-url" alt="Artist 1" />
                    <p>Artist 1</p>
                </div>
                <div className="community">
                    <img src="artist2-image-url" alt="Artist 2" />
                    <p>Artist 2</p>
                </div>
                <div className="community">
                    <img src="artist3-image-url" alt="Artist 3" />
                    <p>Artist 3</p>
                </div>
                {/* Add more communities as needed */}
            </div>
        </section>
    );
};

const PopularPosts = () => {
    return (
        <section className="popular-posts">
            <h2>Popular Posts</h2>
            <ul>
                <li>
                    <a href="#post1">Post Title 1</a>
                    <p>Author: User1</p>
                </li>
                <li>
                    <a href="#post2">Post Title 2</a>
                    <p>Author: User2</p>
                </li>
                <li>
                    <a href="#post3">Post Title 3</a>
                    <p>Author: User3</p>
                </li>
                {/* Add more posts as needed */}
            </ul>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; 2024 Weverse. All rights reserved.</p>
            <div className="social-media">
                <a href="#facebook">Facebook</a>
                <a href="#twitter">Twitter</a>
                <a href="#instagram">Instagram</a>
            </div>
        </footer>
    );
};

const WeverseApp = () => {
    return (
        <div className="app">
            <Header />
            <Banner />
            <CommunitySection />
            <PopularPosts />
            <Footer />
        </div>
    );
};

export default WeverseApp;
