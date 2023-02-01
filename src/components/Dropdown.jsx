/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import { useNavigate, } from "react-router-dom";

import { useSendLogoutMutation } from "../features/auth/authApiSlice";


const Dropdown = () => {


  const navigate = useNavigate();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
  useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  if (isLoading) return <p>Logging Out...</p>;

  if (isError) return <p>Error: {error.data?.message}</p>;


  const content = (
    <div
   
    className="absolute right-0 z-10 w-40 mt-4 origin-top-right bg-white border border-gray-300 rounded-md shadow-md
     "
    
  >
    <div className="py-1">
      <a
        href="#"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900"
      >
        Account Setting
      </a>
      <a
        href="#"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900"
      >
        System Setup
      </a>
      <span
        onClick={sendLogout}
        className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900"
      >
        Sign out
      </span>
    </div>
  </div>
  )


  return content
};

export default Dropdown;
