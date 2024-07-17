import React ,{useEffect} from 'react'
import { Link,Outlet,useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { dashboard, expenses,money,logout } from '../Utils/Icons'
import axios from 'axios'
const SideNavBar = () => {
    const API_URL=process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();
  const HandleLogout=()=>{
    axios.post(`${API_URL}/logout`,{token:Cookies.get("token")})
    .then((result)=>{
      if(result.data.Status === "ok")navigate("/")
    })
  .then((error)=> console.log("error"))
  }


  useEffect(() => {
    axios
      .post("http://localhost:8000/verify", { token: Cookies.get("token") })
      .then((result) => {
        console.log("status",result.data.Status)
        if (result.data.Status === "ok") navigate("/dashboard");
        if (result.data.Status === "not ok") navigate("/");
      })
      .then((err) => console.log(err));
  }, []);

  return (
    <div className="container-fluid">
    <div className="flex">
      {/* Side Navigation */}
      <div className="w-56 bg-blue-500">
        <div className="flex flex-col items-center sm:items-start px-3 pt-2 min-h-screen">
          <Link
            to="/dashboard"
            className="flex items-center pb-3 px-2 text-white text-decoration-none"
          >
            <span className="text-lg font-semibold hidden sm:inline">
              hello 
            </span>
          </Link>
          {/* Navigation Links */}
          <ul className="flex flex-col mb-auto sm:mb-0 items-start mt-3">
            <li className="w-full">
              <Link to="/dashboard/analytics" className="text-white px-4 py-2 flex items-center hover:bg-blue-600">
                {dashboard}
                <span className=" ml-2 hidden sm:inline">Dashboard</span>
              </Link>
            </li>
            <li className="w-full">
              <Link to="/dashboard/income" className="px-4 py-2 flex items-center text-white hover:bg-blue-600">
                {money}
                <span className=" ml-2 hidden sm:inline">Income</span>
              </Link>
            </li>
            <li className="w-full">
              <Link to="/dashboard/expense" className="px-4 py-2 flex items-center text-white hover:bg-blue-600">
                {expenses}
                <span className="ml-2 hidden sm:inline">Expense</span>
              </Link>
            </li>
            <li className="w-full">
              <div onClick={HandleLogout} className="px-4 py-2 flex items-center text-white hover:bg-blue-600 focus">
                {logout}
                <span className="ml-2 hidden sm:inline">Logout</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex flex-col w-full">
        {/* Header */}
        <div className="p-2 bg-gray-200 shadow">
          <h4 className="text-center text-lg font-semibold">Expense Tracker</h4>
        </div>
        <div className="flex-grow p-4 bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  </div>
  


  )
}

export default SideNavBar