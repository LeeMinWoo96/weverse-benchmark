import React, {useEffect, useState} from "react";
import LinkButton from "../Button";
import "./insertModal.css";
import { useNavigate } from "react-router-dom";
import validateForm from "../validateForm";


const InsertModal = ({ setInsertModalWindow, insertModalWindow, artist, user}) => {
    const navigate = useNavigate();
    const [formValue, setFormValue] = useState({ user_id : '', content : '',caption: '', artist_id  : ''});
    const [formError, setFormError] = useState({});
    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [verificationError, setVerificationError] = useState('');

    const createPost = async (post) =>{
        try {

            const response = await fetch(`${process.env.REACT_APP_ARTIST_POSTS_URL}`, {
                method: 'POST',
                body: JSON.stringify(post),
                headers: {
                    "Content-type": "application/json"
                }
            });
            if (response.status === 200) {
                return true;
            } else {
                console.log('error with server')
                return false;
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }
    const hideLoginModal = () => {
        setInsertModalWindow(false);
        setSubmit(false);
    }
    const insertPost = async () => {
        formValue.user_id = user.id
        formValue.artist_id = artist.artist_id
        formValue.caption = "Test"
        const body = JSON.stringify(formValue)
        console.log(body)
        const accCreation = await createPost(formValue);
    }

    const handleValidation = (e) => {

        const { name, value } = e.target;
        setFormValue((prevFormValue) => ({
            ...prevFormValue,
            [name]: value,
        }));

    };

    useEffect(() => {
        console.log(user)
        console.log(artist)
    }, []);


    return (
        <article className={`modal ${insertModalWindow ? 'active-modal' : null}`}>
            <section className="modal-main">
                <button
                    className="close-modal-btn"
                    type="button"
                    onClick={() => {
                        hideLoginModal();
                    }}
                >
                    X
                </button>
                <section className="modal-content">
                    <h2>포스트 쓰기</h2>
                    {loading ?
                        <div role="status" className="loader">
                            <p>Almost there...</p>
                            <img alt="Processing request" src="https://media0.giphy.com/media/L05HgB2h6qICDs5Sms/giphy.gif?cid=ecf05e472hf2wk1f2jou3s5fcnx1vek6ggnfcvhsjbeh7v5u&ep=v1_stickers_search&rid=giphy.gif&ct=s" />
                        </div> :
                        <form onSubmit={insertPost}>
                            {/*<p>{artist.fullname}</p>*/}
                            {/*{verificationError.length === 0 ? null : <p className="login-input-err">{verificationError}</p>}*/}
                            <input onChange={handleValidation} value={formValue.content} name="content" type="text" placeholder="위버스에 글을 남겨보세용~" />
                            <section className="submit">
                                <button type="submit" className="modal-submit-btn">등록</button>
                            </section>
                        </form>
                    }
                </section>
            </section>
        </article>
    );
}

export default InsertModal;