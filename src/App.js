import { useEffect, useState } from 'react'
import ErrorMessage from './components/ErrorMessage'
import Button from './components/Button'
import Nav from './components/Nav'
import Modal from './components/Modal'
import ModalOTP from './components/ModalOTP'
import ModalChangePass from './components/ModalChangePass'

import { useContext } from 'react'
import ModelContext from './store/ModelContext'

const BaseURL = "https://localhost:44306/api";

function App() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [confirmRegistPass, setConfirmRegistPass] = useState("");

  const { currentOpenModel, currentCloseModel, openModel, clearCloseModel } = useContext(ModelContext);

  const fetchLogin = async () => {
    setIsRegister(false);
    setError("");

    //check if has username and password => fetch URL
    if (username !== "" || password !== "") {
      const result = await fetch(`${process.env.REACT_APP_BASE_URL}/User/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username,
          password: password
        })
      }).then(response => response.json()).catch(error => {
        console.log(error)
        return null
      })
      setError(result.message)

      if (result.user) {
        console.log(result.user);
      }
    }

    //clear input
    setUsername("");
    setPassword("");
  }

  const fetchRegister = async () => {
    setIsRegister(true);
    setError("");

    //clear input
    setUsername("");
    setPassword("");

    //check if has confirmRegistPass and confirmRegistPass = password => fetch URL
    if (confirmRegistPass !== "" && confirmRegistPass === password) {
      const result = await fetch(`${BaseURL}/User/Register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        })
      })
        .then(result => result.json())
        .catch(error => console.log(error));
      console.log(result);

      setError(result.message);
    } else if ((confirmRegistPass !== "" && confirmRegistPass !== password)) {
      setError("Mật khẩu và mật khẩu xác nhận không trùng nhau");
    }
  };

  const onClickResetBtn = () => {
    clearCloseModel();
    openModel();
    setError("");
  };

  return (
    <div className='h-screen w-screen'>
      <Nav className='bg-emerald-600 text-white h-10 text-lg content-center ps-3' />
      <div className="main h-full">
        <ModalChangePass
          openModalChangePass={currentOpenModel === 'modelChangePass'}
          CloseModalChangePass={currentCloseModel === 'closeModelChangePass'}
          username={username}
          setError={setError}
          setUsername={setUsername}
        />

        <ModalOTP
          username={username}
          openOTP={currentOpenModel === 'OTP'}
          CloseOTP={currentCloseModel === 'closeOTP'}
          setError={setError}
        />
        <Modal
          setUsername={setUsername}
          username={username}
          onChangeUsername={(e) => setUsername(e.target.value)}
          openModal={currentOpenModel === 'modal'}
          CloseModal={currentCloseModel === 'closeModal'}
          setError={setError}
        />

        <div className="login flex justify-center content-center h-full bg-emerald-400">
          <div className='bg-gray-300 w-2/5 h-auto self-center p-5 rounded-md'>
            <div className='header py-2 uppercase text-lg text-blue-600 font-bold text-center'>{isRegister ? 'Đăng ký' : 'Đăng nhập'}</div>
            <ErrorMessage message={error} />
            <input
              type='text'
              className='form-control py-2 block w-full rounded-md border-0 my-2'
              name='txtUserName'
              id='txtUserName'
              placeholder='Tên đăng nhập'
              min='3'
              max='50'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type='password'
              className='form-control py-2 block w-full rounded-md border-0 my-2'
              name='txtPassword'
              id='txtPassword'
              placeholder='Mật khẩu'
              min='8'
              max='50'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isRegister && (<input
              type='password'
              className='form-control py-2'
              name='txtConfirmRegistPass'
              id='txtConfirmRegistPass'
              placeholder='Nhập lại mật khẩu'
              min='8'
              max='50'
              value={confirmRegistPass}
              onChange={(e) => setConfirmRegistPass(e.target.value)}
            />)}
            <Button
              id='btnLogin'
              className='btnLogin py-2 w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md focus:bg-blue-200 focus:ring-blue-600'
              onClick={() => fetchLogin()}>
              Đăng nhập
            </Button>
            <div className='or text-center my-2'>hoặc</div>
            <Button
              id='btnRegist'
              className='btnRegist py-2 w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md'
              onClick={() => fetchRegister()}
            >
              Tạo tài khoản
            </Button>
            <a className='forgot-password text-center italic text-blue-600 mt-3' href='#' onClick={onClickResetBtn}>Quên mật khẩu?</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
