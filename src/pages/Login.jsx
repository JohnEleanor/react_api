import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Login() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal)
  const [inputs, setInputs] = useState({});

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

    fetch("https://www.melivecode.com/api/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

     
        if (result.message === "Logged in" || result.status == 'ok') {
          MySwal.fire({
            title: result.message,
            text: `เข้าสู่ระบบสำเร็จ ยินดีต้อนรับคุณ ${result.user.username} 🙏`,
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
            showCancelButton: false,
            // confirmButtonText: 'Ok',
          }).then((v) => {
            // console.log('v', v);
            localStorage.setItem('token', result.accessToken);
            navigate("/profile");
          })

        } else {
          MySwal.fire({
            title: result.message,
            text: `Please Try Again`,
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
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoComplete="username"
                  value={inputs.username || ""}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                รหัสผ่าน
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="text"
                  required
                  value={inputs.password || ""}
                  onChange={handleChange}
                  autoComplete="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
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