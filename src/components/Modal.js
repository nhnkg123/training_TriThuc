import { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import ModelContext from "../store/ModelContext";
import { ColorRing } from 'react-loader-spinner'

export default function Modal({ onChangeUsername, openModal, CloseModal, username, setError }) {
    const dialog = useRef();
    const [email, setEmail] = useState("");
    const { openOTP, closeModel } = useContext(ModelContext);
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => {
        return String(email)
            .toLocaleLowerCase()
            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    }

    const fetchModal = async () => {
        setLoading(true);

        if (validateEmail(email)) {
            const result = await fetch(`${process.env.REACT_APP_BASE_URL}/Mail/SendMail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    username: username,
                })
            })
                .then(response => response.json())
                .catch(error => console.log(error));

            if (result.email === email) {
                setLoading(false);
                openOTP();
                closeModel();
            } else {
                setLoading(false);
                setError(result.message);
                closeModel();
            }
        } else {
            setError("Email không đúng");
            closeModel();
        }
    };

    useEffect(() => {
        const dialog2 = dialog.current;

        if (openModal && !CloseModal) {
            dialog2.showModal();
        } else {
            dialog2.close();
        }

        return () => dialog2.close();
    }, [openModal, CloseModal]);

    return (
        <>
            {loading ? (
                <div className="spinnerContainer" color="primary">
                    <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
                </div>
            ) : (
                <div>
                    {openModal && !CloseModal && <div className="background-model"></div>}
                    <dialog ref={dialog} className="modal">
                        <span onClick={() => closeModel()} className="delete-button">&times;</span>
                        <h3>Nhập thông tin: </h3>
                        <input
                            class="modal-input"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            class="modal-input"
                            placeholder="username"
                            value={username}
                            onChange={onChangeUsername}
                        />
                        <button onClick={() => fetchModal()} className="btnSend">Send</button>
                    </dialog>
                </div>)}
        </>
    );
}