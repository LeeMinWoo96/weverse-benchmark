import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddToCartButton from '../cart/AddToCartButton';
import Attribute from './Attribute';
import ResetLocation from "../../helpers/ResetLocation";

const ArtistItem = () => {
    return (
        <ul className="HomeArtistListSlotView_artist_list__3fPzz">
            <li className="HomeArtistListSlotView_artist_item__a6gAX"><a
                className="HomeArtistListSlotView_artist_link__Mjm6r"
                href="/ftisland/feed">
                <div
                    className="HomeArtistListSlotView_artist_cover_wrap__TGsNP">
                    <img
                        src="https://phinf.wevpstatic.net/MjAyMzA5MDRfMjQy/MDAxNjkzNzk1ODA0NzU1.wKRKgRzHJR9IWYPJQ8BGkWOR_H8QgoQjFMoK4tTxMk8g.yYHYj3PhuUlErkeCEgWvVOj6caXDfGQBY5Ov4Cs1cNkg.PNG/7828067477171831868c27dd3-e821-4cb0-ac4a-5c0200fe3868.png?type=f416_416"
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
                                    src="https://phinf.wevpstatic.net/MjAyMzA5MDdfMTQ0/MDAxNjk0MDc5MzM3NjA1.F-Mm0SePT5N2m1uFD4UXcuod3eisRFSNHiMCquzo-NUg.wGZS4UYCNETANHfUBcwhkoW1PRV9ToLXKibhwTP89xQg.JPEG/01622fd9-6864-4a1c-96ae-28f3c85d594f.jpeg?type=s86"
                                    className="ProfileThumbnailView_thumbnail__8W3E7"
                                    width={43} height={43} alt=""/></div>
                        </div>
                    </div>
                </div>
                <div className="HomeArtistListSlotView_artist_text_wrap__6GDpJ">
                    <strong
                        className="HomeArtistListSlotView_artist_name__RFLuB">
                        <div className="MarqueeView_container__l4V1r"><span
                            className="MarqueeView_content__2Qs2H">FTISLAND</span>
                        </div>
                    </strong></div>
            </a></li>
        </ul>
    );
};

export default ArtistItem;
