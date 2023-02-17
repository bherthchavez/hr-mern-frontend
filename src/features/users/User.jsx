import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";

const User = ({ userId, search }) => {

  const { username } = useAuth();

  const user = useSelector((state) => selectUserById(state, userId));


  const navigate = useNavigate();

  

  if (user && user.username !== username) {

    if (user.name.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
         user.email.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
         user.position.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
         user.department.toLowerCase().indexOf(search.toLowerCase()) > -1 
    ){

      const handleEdit = () => navigate(`/dash/users/${userId}`);
  
      return (
        <tr>
          <td
            className={`sm:flex gap-4 whitespace-nowrap px-4 py-4 font-medium text-gray-900 dark:text-gray-300`}
          >
         
  
            <img
              alt="Man"
              src={
                user.avatar
                  ? user.avatar
                  : `https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80`
              }
              className="flex-nowrap h-12 w-12 rounded-full border border-slate-300  dark:border-slate-600 object-cover"
            />
            <div className="flex-nowrap">
              <p className="capitalize">{user.name} </p>
              <p className="font-normal text-gray-700 dark:text-gray-500">
                {user.email}
              </p>
            </div>
  
          </td>
  
          <td
            className={`whitespace-nowrap px-4 py-4 font-medium text-gray-900 dark:text-gray-300`}
          >
            <div className="flex-nowrap">
              <p className="capitalize">{user.position} </p>
              <p className="font-normal text-gray-700 dark:text-gray-500">
                {user.department}
              </p>
            </div>
          </td>
  
          <td
            className={`whitespace-nowrap px-4 py-4 font-medium text-gray-900 dark:text-gray-300 `}
          >
            <span
              className={` ${
                user.active
                  ? "bg-green-200 text-green-900 font-semibold dark:bg-green-900 dark:text-green-200"
                  : "bg-red-200 text-red-900 font-semibold dark:bg-red-900 dark:text-red-200"
              }  inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-normal leading-none  rounded-full`}
            >
              {user.active ? "Active" : "Inactive"}
            </span>
          </td>
  
          <td
            className={`whitespace-nowrap px-4 py-4 font-medium text-gray-600 dark:text-gray-500 `}
          >
            {user.roles}
          </td>
  
          <td
            className={`whitespace-nowrap px-2 py-4 font-medium text-gray-900 dark:text-gray-300 `}
          >
            <button
              title="Edit User"
              className="text-lg p-1 hover:text-slate-500"
              onClick={handleEdit}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
        
          </td>
          
        </tr>
      );
    }
    


  } else return null;


};
export default User;
