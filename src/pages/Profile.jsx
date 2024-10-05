import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


function Profile() {
  const MySwal = withReactContent(Swal)

  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const myHeaders = new Headers();
    const token = localStorage.getItem('token'); // Get Token Kub
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("https://www.melivecode.com/api/auth/user", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "ok") {
          setUser(result.user);
          setLoading(false);
        } else if (result.status === "forbidden") {
          console.log("forbidden");
          MySwal.fire({
            title: result.message,
            text: `กรุณา Login ก่อนเข้าใช้งาน`,
            icon: 'error',
            confirmButtonText: 'Cool'
          }).then((v) => {
            localStorage.removeItem('token');
            navigate("/");
          })
        } else {
          MySwal.fire({
            title: result.message,
            text: `ไม่พบ Token ของคุณ`,
            icon: 'error',
            confirmButtonText: 'Cool'
          }).then((v) => {
            localStorage.removeItem('token');
            navigate("/");
          })
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const Logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  if (loading) return (
    <>
   
      <div className=" hero bg-base-200 min-h-screen ">
          <div className="skeleton h-32 hero-content flex-col mx-3 lg:flex-row ">
            <img
              src={user.avatar}
              className="skeleton max-w-sm rounded-lg " />
            <div>
              <h1 className="skeleton h-4 w-full text-5xl font-bold">{user.username}</h1>
              <p className="skeleton h-4 w-full py-6">
                {user.email}
              </p>
              <button className="skeleton h-4 w-full btn btn-primary" onClick={Logout}>Log out</button>
            </div>
          </div>
        </div>

    </>
  )
  else {

    return (
      <>
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src={user.avatar}
              className="max-w-sm rounded-lg " />
            <div>
              <h1 className="text-5xl font-bold">{user.username}</h1>
              <p className="py-6">
                {user.email}
              </p>
              <button className="btn btn-primary" onClick={Logout}>Log out</button>
            </div>
          </div>
        </div>


      </>
    )
  }
}

export default Profile