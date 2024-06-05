import { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import ModelContext from "../store/ModelContext";

export default function ModalOTP({ username, openOTP, CloseOTP, setError }) {
    const dialog = useRef();
    const [otp, setOtp] = useState();
    const { openModelChangePass, closeModel, closeOTP } = useContext(ModelContext);

    const fetchSendOTP = async () => {
        const result = await fetch(`${process.env.REACT_APP_BASE_URL}/Mail/SendOTP`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                otp: otp,
                username: username,
            })
        })
            .then(response => response.json())
            .catch(error => console.log(error));

        if (result.resetPass) {
            openModelChangePass();
            closeModel();
            closeOTP();
        } else {
            setError(result.message);
            closeOTP();
        }
    };

    useEffect(() => {
        const dialog2 = dialog.current;

        if (openOTP && !CloseOTP) {
            dialog2.showModal();
        } else {
            dialog2.close();
        }

        return () => dialog2.close();
    }, [openOTP, CloseOTP]);

    return (
        <>
            {openOTP && !CloseOTP && <div className="background-model"></div>}
            <dialog ref={dialog} className="modal">
                <span onClick={() => closeOTP()} className="delete-button">&times;</span>
                <h3>Nhập OTP: </h3>
                <p>Mã OTP đã được gửi về email.</p>
                <input
                    class="modal-input"
                    placeholder="OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />
                <button onClick={() => fetchSendOTP()} className="btnSend">Send</button>
            </dialog>
        </>
    );
}