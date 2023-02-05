import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);



  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setName("");
      setUsername("");
      setPassword("");
      setRoles("");
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onNameChanged = (e) => setName(e.target.value);
  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

 

  const onActiveChanged = () => setActive((prev) => !prev);

  const onSaveUserClicked = async (e) => {
    if (password) {
      await updateUser({
        id: user.id,
        name,
        username,
        password,
        roles,
        active,
      });
    } else {
      await updateUser({ id: user.id, name, username, roles, active });
    }
  };

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };

  const options = Object.values(ROLES).map((role) => {

    return (
      <option     key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  let canSave;
  if (password) {
    canSave =
      [roles, validUsername, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [roles, validUsername].every(Boolean) && !isLoading;
  }


  const errClass = isError
  ? "text-gray-900 sm:text-2xl dark:text-gray-200"
  : "offscreen";
const validUserClass = !validUsername
  ? "text-red-600 dark:text-red-600"
  : "text-blue-700 dark:text-blue-400";
const validPwdClass = !validPassword
  ? "text-red-600 dark:text-red-600"
  : "text-blue-700 dark:text-blue-400";

  // const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const content = (
    <>
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 ">
        <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-2xl dark:text-gray-200">
          New User
        </h1>
        <p className={errClass}>{error?.data?.message}</p>

        <div className="mt-5 md:col-span-2 md:mt-0">
          <form  onSubmit={(e) => e.preventDefault()}>
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-white dark:bg-slate-800 px-4 py-5 sm:p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1 ">
                    <label
                      className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      className={`w-full mt-1 px-3 py-2 text-sm font-normal text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md`}
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="off"
                      value={name}
                      onChange={onNameChanged}
                    />
                    <div className="mt-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Assign roles
                      </label>
                      <select
                        id="roles"
                        name="roles"
                        value={roles}
                        onChange={(e) => setRoles(e.target.value)}
                        className="mt-1 block w-full py-2 px-2 text-sm font-normal text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md"
                      >
                        
                        {options}
                      </select>
                    </div>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start">
                        <div className="mr-2 text-sm">
                          <label
                            htmlFor="user-active"
                            className="font-medium text-gray-700 dark:text-gray-300"
                          >
                            Active
                          </label>
                        </div>
                        <div className="flex h-5 items-center">
                          <input
                            id="user-active"
                            name="user-active"
                            type="checkbox"
                            checked={active}
                            onChange={onActiveChanged}
                            className="h-3 w-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
            </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      Username{" "}
                      <span className="nowrap text-[11px] text-red-600 dark:text-red-400">
                        {!validUsername ? "3-20 letters" : ""}
                      </span>
                    </label>

                    <input
                      className={`w-full mt-1 px-3 py-2 text-sm font-normal  border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md ${validUserClass}`}
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="off"
                      value={username}
                      onChange={onUsernameChanged}
                    />

                    <div className="mt-3">
                      <label
                        className="mt-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                        htmlFor="password"
                      >
                        Password{" "}
                        <span className="nowrap text-[11px] text-red-600 dark:text-red-400">
                          {!validPassword
                            ? "[empty = no change] 4-12 characters including !@#$%"
                            : ""}
                        </span>
                      </label>
                      <div className="relative w-full">
                        <div className="absolute inset-y-0 right-0 flex items-center px-2">
                          <input
                            className="hidden js-password-toggle"
                            id="toggle"
                            type="checkbox"
                            onClick={togglePasswordVisiblity}
                          />
                          <label
                            className=" bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 rounded-xl px-2 py-1 mt-1 text-lg text-gray-600 font-mono cursor-pointer js-password-label"
                            htmlFor="toggle"
                          >
                          {passwordShown ? <AiOutlineEye  /> :  <AiOutlineEyeInvisible  />}
                          </label>
                          
                        </div>
                        <input
                        className={`leading-tight w-full mt-1 px-3 py-2 text-sm font-normal border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md ${validPwdClass}`}
                        id="password"
                        name="password"
                        type={passwordShown ? "text" : "password"}
                        value={password}
                        autoComplete="off"
                        placeholder="Enter password"
                        onChange={onPasswordChanged}
                      />
                      </div>
                     </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between bg-gray-50 dark:bg-slate-800 px-4 py-3 text-right sm:px-6 dark:border-t dark:border-slate-700">
              
              <div>
              <p
                  title="Cancel"
                  onClick={()=>  navigate("/dash/users")}
                  className="cursor-pointer text-sm  px-4 py-2 text-white border dark:text-gray-300 font-medium border-gray-200 dark:border-slate-600 bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-md duration-150"
                     
                >
                  Cancel
                </p>
              </div>
              <div>

                <button
                  className={
                    canSave
                      ? `text-sm mr-6 px-4 py-2 text-white border dark:text-gray-300 font-medium border-gray-200 dark:border-slate-600 bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-md duration-150`
                      : "text-sm mr-6 px-4 py-2 text-white border dark:text-slate-600 font-medium border-gray-200 dark:border-slate-700 bg-gray-400 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-md duration-150"
                  }
                  title="Delete User"
                  disabled={!canSave}
                  onClick={onDeleteUserClicked}
                > 
                  <FontAwesomeIcon icon={faTrashCan}  className="pr-2"/>
                  Delete
                </button>
                <button
                  title="Save"
                  disabled={!canSave}
                  onClick={onSaveUserClicked}
                  className={
                    canSave
                      ? `text-sm  px-4 py-2 text-white border dark:text-gray-300 font-medium border-gray-200 dark:border-slate-600 bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-md duration-150`
                      : "text-sm   px-4 py-2 text-white border dark:text-slate-600 font-medium border-gray-200 dark:border-slate-700 bg-gray-400 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-md duration-150"
                  }
                >
                  <FontAwesomeIcon icon={faSave} className="pr-2" />
                  Save
                </button>
              </div>
               
              </div>
            </div>
          </form>
        </div>
      </div>

    </>
  );

  return content;
};
export default EditUserForm;
