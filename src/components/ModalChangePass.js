import { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import ModelContext from "../store/ModelContext";

export default function ModalChangePass({ openModalChangePass, username, CloseModalChangePass, setError, setUsername }) {
    const dialog = useRef();
    const [confirmPassword, setconfirmPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const { closeModelChangePass } = useContext(ModelContext);

    const fetchChangeNewPassword = async () => {
        const result = await fetch(`${process.env.REACT_APP_BASE_URL}/User/ChangePassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                confirmPassword: confirmPassword,
                newPassword: newPassword,
                username: username,
            })
        })
            .then(response => response.json())
            .catch(error => console.log(error));

        console.log(result);
        closeModelChangePass();
        setError(result.message);

        //clear Input
        setUsername("");
    };

    useEffect(() => {
        const dialog2 = dialog.current;

        if (openModalChangePass && !CloseModalChangePass) {
            dialog2.showModal();
        } else {
            dialog2.close();
        }

        return () => dialog2.close();
    }, [openModalChangePass, closeModelChangePass]);

    return (
        <>
            {openModalChangePass && !CloseModalChangePass && <div className="background-model"></div>}
            <dialog ref={dialog} className="modal">
                <span onClick={() => closeModelChangePass()} className="delete-button">&times;</span>
                <h3>Nhập mật khẩu mới: </h3>
                <input
                    type="password"
                    class="modal-input"
                    placeholder="Mật khẩu mới"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                    type="password"
                    class="modal-input"
                    placeholder="Nhập lại mật khẩu"
                    value={confirmPassword}
                    onChange={(e) => setconfirmPassword(e.target.value)}
                />
                <button onClick={() => fetchChangeNewPassword()} className="btnSend">Submit</button>
            </dialog>
        </>
    );
}