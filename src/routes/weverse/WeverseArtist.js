import Attribute from "../menu/Attribute";
import React from "react";

// 두개로 나누기 하나는 route 에 연결된 곳하고 하나는 거기서 호출되서 그리는 포스트 blog랑 blogPost 처럼
//

const WeverseArtist = ({artist}) => {
    return (
        <div>
            <title>Weverse - Official for All Fans</title>
            <div id="root">
                <div className="App">
                    <a className="HomeArtistListSlotView_artist_link__Mjm6r" href={artist.feed_link}>
                        <div
                            className="HomeArtistListSlotView_artist_cover_wrap__TGsNP">
                            <img
                                src={artist.cover_image_path}
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
                                            src={artist.thumb_image_path}
                                            className="ProfileThumbnailView_thumbnail__8W3E7"
                                            width={43} height={43} alt=""/></div>
                                </div>
                            </div>
                        </div>
                        <div className="HomeArtistListSlotView_artist_text_wrap__6GDpJ">
                            <strong
                                className="HomeArtistListSlotView_artist_name__RFLuB">
                                <div className="MarqueeView_container__l4V1r"><span
                                    className="MarqueeView_content__2Qs2H">{artist.fullname}</span>
                                </div>
                            </strong></div>
                    </a>
                </div>
            </div>

        </div>
    )
}
export default WeverseArtist;


