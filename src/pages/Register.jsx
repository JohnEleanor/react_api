import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


function Register() {
    const [inputs, setInputs] = useState({});

    const navigate = useNavigate();
    const MySwal = withReactContent(Swal)

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "fname": inputs.fname,
            "lname": inputs.lname,
            "username": inputs.username,
            "password": inputs.password,
            "email": inputs.email,
            "avatar": inputs.avatar
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://127.0.0.1/WEB_DEV/Auth_api/API.php/v1/register", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status == 'ok') {
                    MySwal.fire({
                        title: result.message,
                        text: `ยินดีต้อนรับคุณ ${result.user.username} 🙏`,
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    }).then(() => {
                        localStorage.setItem('token', result.accessToken);
                        navigate("/");
                    })
                } else {
                    MySwal.fire({
                        title: result.message,
                        text: `เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง`,
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
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                รหัสผ่าน
                            </label>
                            <div className="mt-2">
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
                                    <input type="text" className="grow " placeholder="ชื่อผู้ใช้"
                                        id="password"
                                        name="password"
                                        required
                                        autoComplete="password"
                                        value={inputs.password || ""}
                                        onChange={handleChange} />
                                </label>
                            </div>
                        </div>



                        <div>
                            <label htmlFor="fname" className="block text-sm font-medium leading-6 text-gray-900">
                                ชื่อจริง
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
                                    <input type="text" className="grow " placeholder="ชื่อจริง"
                                        id="fname"
                                        name="fname"
                                        required
                                        autoComplete="fname"
                                        value={inputs.fname || ""}
                                        onChange={handleChange} />
                                </label>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="lname" className="block text-sm font-medium leading-6 text-gray-900">
                                นามสกุล
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
                                    <input type="text" className="grow " placeholder="นามมสกุล"
                                        id="lname"
                                        name="lname"
                                        required
                                        autoComplete="lname"
                                        value={inputs.lname || ""}
                                        onChange={handleChange} />
                                </label>
                            </div>
                        </div>



                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                อีเมลล์
                            </label>
                            <div className="mt-2">
                                <label className="input input-bordered input-sm flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70">
                                        <path
                                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                        <path
                                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                    </svg>
                                    <input type="text" className="grow " placeholder="ชื่อผู้ใช้"
                                        id="email"
                                        name="email"
                                        required
                                        autoComplete="email"
                                        value={inputs.email || ""}
                                        onChange={handleChange} />
                                </label>
                            </div>
                        </div>


                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                สมัครสมาชิก
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        ฉันมีบัญชีแล้ว
                        <Link to="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            เข้าสู่ระบบ
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Register