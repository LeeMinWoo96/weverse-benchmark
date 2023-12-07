import Attribute from "../menu/Attribute";
import React from "react";

// 두개로 나누기 하나는 route 에 연결된 곳하고 하나는 거기서 호출되서 그리는 포스트 blog랑 blogPost 처럼
//

const Weverse = ({artist}) => {
    return (
        <div>
            <canvas style={{inset: '0px', pointerEvents: 'none', position: 'fixed', zIndex: 1000000000}} width={1470}
                    height={834}/>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width,initial-scale=1"/>
            <meta name="theme-color" content="#fff"/>
            <meta name="title" content="Weverse - Official for All Fans"/>
            <meta name="description" content="Enjoy every moment with artists on global fandom life platform Weverse."/>
            <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
            <meta property="og:type" content="website"/>
            <meta property="og:title" content="Weverse - Official for All Fans"/>
            <meta property="og:url" content="https://weverse.io"/>
            <meta property="og:image"
                  content="https://ssl.pstatic.net/static/wevweb/assets/seo/weverse_bi.png?type=w1414"/>
            <meta property="og:description"
                  content="Enjoy every moment with artists on global fandom life platform Weverse."/>
            <link rel="preconnect" href="https://cdn-v2pstatic.weverse.io/wev_web_fe/p/2_12_0/public"/>
            <link rel="preload" fetchpriority="high"
                  href="https://cdn-v2pstatic.weverse.io/wev_web_fe/assets/fonts/pretendard/woff2-subset/Pretendard-Black.subset.woff2"
                  as="font" type="font/woff2" crossOrigin="anonymous"/>
            <link rel="preload" fetchpriority="high"
                  href="https://cdn-v2pstatic.weverse.io/wev_web_fe/assets/fonts/pretendard/woff2-subset/Pretendard-Bold.subset.woff2"
                  as="font" type="font/woff2" crossOrigin="anonymous"/>
            <link rel="preload" fetchpriority="high"
                  href="https://cdn-v2pstatic.weverse.io/wev_web_fe/assets/fonts/pretendard/woff2-subset/Pretendard-Medium.subset.woff2"
                  as="font" type="font/woff2" crossOrigin="anonymous"/>
            <link rel="preload" fetchpriority="high"
                  href="https://cdn-v2pstatic.weverse.io/wev_web_fe/assets/fonts/pretendard/woff2-subset/Pretendard-Regular.subset.woff2"
                  as="font" type="font/woff2" crossOrigin="anonymous"/>
            <link rel="icon" fetchpriority="low"
                  href="https://cdn-v2pstatic.weverse.io/wev_web_fe/assets/1.0.0/icons/favicon.ico"/>
            <link rel="apple-touch-icon" fetchpriority="low"
                  href="https://cdn-v2pstatic.weverse.io/wev_web_fe/assets/1.0.0/icons/logo192.png"/>
            <link rel="manifest" fetchpriority="low"
                  href="https://cdn-v2pstatic.weverse.io/wev_web_fe/p/2_12_0/public/manifest.json"/>
            <link rel="canonical" href="https://weverse.io"/>
            <link rel="alternate" hrefLang="x-default" href="https://weverse.io"/>
            <link rel="alternate" hrefLang="en" href="https://weverse.io"/>
            <link rel="alternate" hrefLang="ko" href="https://weverse.io?hl=ko"/>
            <link rel="alternate" hrefLang="ja" href="https://weverse.io?hl=ja"/>
            <link rel="alternate" href="android-app://co.benx.weverse"/>
            <link rel="alternate" href="ios-app://1456559188"/>
            <title>Weverse - Official for All Fans</title>
            {/*    */}
            <link href="https://cdn-v2pstatic.weverse.io/wev_web_fe/p/2_12_0/public/static/css/main.6d1be02a.css"
                  rel="stylesheet"/>
            <link rel="stylesheet" type="text/css"
                  href="https://cdn-v2pstatic.weverse.io/wev_web_fe/p/2_12_0/public/static/css/9690.2f77e890.chunk.css"/>
            <link rel="stylesheet" type="text/css"
                  href="https://cdn-v2pstatic.weverse.io/wev_web_fe/p/2_12_0/public/static/css/5352.dc8ff8db.chunk.css"/>
            <link rel="stylesheet" type="text/css"
                  href="https://cdn-v2pstatic.weverse.io/wev_web_fe/p/2_12_0/public/static/css/3334.ffaa66f0.chunk.css"/>
            <link rel="stylesheet" type="text/css"
                  href="https://cdn-v2pstatic.weverse.io/wev_web_fe/p/2_12_0/public/static/css/639.9372a020.chunk.css"/>
            <style type="text/css"
                   dangerouslySetInnerHTML={{__html: ".marquee-container {\n        overflow-x: hidden !important;\n        display: flex !important;\n        flex-direction: row !important;\n        position: relative;\n        width: 100%;\n    }\n\n    .marquee-container:hover div {\n        animation-play-state: var(--pause-on-hover);\n    }\n\n    .marquee-container:active div {\n        animation-play-state: var(--pause-on-click);\n    }\n\n    .overlay {\n        position: absolute;\n        width: 100%;\n        height: 100%;\n    }\n\n    .overlay::before, .overlay::after {\n        /*background: linear-gradient(to right, var(--gradient-color));*/\n        content: \"\";\n        height: 100%;\n        position: absolute;\n        /*width: var(--gradient-width);*/\n        z-index: 2;\n    }\n\n    .overlay::after {\n        right: 0;\n        top: 0;\n        transform: rotateZ(180deg);\n    }\n\n    .overlay::before {\n        left: 0;\n        top: 0;\n    }\n\n    .marquee {\n        flex: 0 0 auto;\n        min-width: 100%;\n        z-index: 1;\n        display: flex;\n        flex-direction: row;\n        align-items: center;\n        animation: scroll var(--duration) linear var(--delay) var(--iteration-count);\n        animation-play-state: var(--play);\n        animation-delay: var(--delay);\n        animation-direction: var(--direction);\n    }\n\n    @keyframes scroll {\n        0% {\n            transform: translateX(0%);\n        }\n        100% {\n            transform: translateX(-100%);\n        }\n    }"}}/>
            <link rel="stylesheet" type="text/css"
                  href="https://cdn-v2pstatic.weverse.io/wev_web_fe/p/2_12_0/public/static/css/610.31fe4339.chunk.css"/>
            <meta name="title" content="Weverse - Official for All Fans" data-react-helmet="true"/>
            <meta name="description" content="아티스트와 함께하는 모든 순간을 위버스에서 즐겨보세요." data-react-helmet="true"/>

            <div id="root">
                <div className="Toastify"/>
                <div className="App">
                <div>
                    <ul className="HomeArtistListSlotView_artist_list__3fPzz">
                    {artist.map((artist) =>
                        <li className="HomeArtistListSlotView_artist_item__a6gAX">
                            <a className="HomeArtistListSlotView_artist_link__Mjm6r" href={artist.href}>
                                <div
                                    className="HomeArtistListSlotView_artist_cover_wrap__TGsNP">
                                    <img
                                        src={artist.coverImg}
                                        width={208} height={208}
                                        className="HomeArtistListSlotView_cover_img__a2krk"
                                        alt=""/></div>
                                <div
                                    className="HomeArtistListSlotView_artist_thumb_wrap__du30B">
                                    <div
                                        className="ProfileThumbnailView_thumbnail_area__u25Uf ProfileThumbnailView_-community__+PkFD"
                                        style={{width: '43px', height: '43px'}}>
                                        <div
                                            className="ProfileThumbnailView_thumbnail_wrap__ZgeTf">
                                            <div style={{
                                                aspectRatio: 'auto 43 / 43',
                                                contentVisibility: 'auto',
                                                containIntrinsicSize: '43px',
                                                width: '100%',
                                                height: '100%'
                                            }}>
                                                <img
                                                    src={artist.thumbImg}
                                                    className="ProfileThumbnailView_thumbnail__8W3E7"
                                                    width={43} height={43} alt=""/></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="HomeArtistListSlotView_artist_text_wrap__6GDpJ">
                                    <strong
                                        className="HomeArtistListSlotView_artist_name__RFLuB">
                                        <div className="MarqueeView_container__l4V1r"><span
                                            className="MarqueeView_content__2Qs2H">{artist.name}</span>
                                        </div>
                                    </strong></div>
                            </a>
                        </li>
                    )
                    }
                    </ul>
                </div>
                </div>
            </div>
        </div>
    )
}
export default Weverse;


