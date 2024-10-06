import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


function Login() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal)
  const [inputs, setInputs] = useState({});
  const LOGIN_PATH = 'http://127.0.0.1/WEB_DEV/Auth_api/API.php/v1/login';

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const raw = JSON.stringify({
      "username": inputs.username,
      "password": inputs.password,
      "expiresIn": "1d"
    });

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: raw,

    };

    fetch('http://127.0.0.1/WEB_DEV/Auth_api/API.php/v1/login', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);


        if (result.message === "เข้าสู่ระบบสำเร็จ" || result.status == 'ok') {
          MySwal.fire({
            title: result.message,
            text: `เข้าสู่ระบบสำเร็จ ยินดีต้อนรับคุณ ${result.user.name} 🙏`,
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
            showCancelButton: false,
          }).then((v) => {
            localStorage.setItem('token', result.token);
            navigate("/profile");
          })

        } else {
          MySwal.fire({
            title: result.message,
            text: `อีเมลหรือรหัสผ่านไม่ถูกต้อง`,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }



      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="https://cdn-icons-png.flaticon.com/512/164/164379.png" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">เข้าสู่ระบบ</h2>
        </div>



        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>

            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                ชื่อผู้ใช้
              </label>
              <div className="mt-2">
                <label className="input input-bordered input-sm flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                  </svg>
                  <input type="text" className="grow " placeholder="ชื่อผู้ใช้"
                    id="username"
                    name="username"
                    required
                    autoComplete="username"
                    value={inputs.username || ""}
                    onChange={handleChange} />
                </label>
              </div>
            </div>


            <div>
              <label className="input input-bordered input-sm flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70">
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd" />
                </svg>
                <input type="password" className="grow" 
                id="password"
                name="password"
                required
                value={inputs.password || ""}
                placeholder='รหัสผ่าน'
                onChange={handleChange}
                autoComplete="password" />
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                เข้าสู่ระบบ
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            ฉันยังไม่มีบัญชีผู้ใช้
            <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              สมัครสมาชิก
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login