import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineSave } from "react-icons/ai";
import Image from "../../components/Image";
import Spenner from "../../components/Spenner";
import useAuth from "../../hooks/useAuth";
import { AiOutlineUserDelete } from 'react-icons/ai';
import { BsArrowLeftShort } from 'react-icons/bs';

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = ({ user }) => {

  const { id } = useAuth(); //current user id


  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [department, setDepartment] = useState(user.department);
  const [position, setPosition] = useState(user.position);
  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);

  const [imageView, setImage] = useState("");
  const [image, setDataImage] = useState();

  const [spin, setSpin] = useState(false);
  const [spinText, setSpinText] = useState('');

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
      setEmail("");
      setDepartment("");
      setPosition("");
      setUsername("");
      setPassword("");
      setRoles("");
      setDataImage();
      setSpin(false);
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onNameChanged = (e) => setName(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value)
  const onDepartmentChanged = (e) => setDepartment(e.target.value)
  const onPositionChanged = (e) => setPosition(e.target.value)
  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onActiveChanged = () => setActive((prev) => !prev);

  const onImageChanged = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setDataImage(reader.result);
    };
  };

  const onSaveUserClicked = async (e) => {
    if (password) {
      setSpinText('Saving...')
      setSpin(true);
      await updateUser({
        id: user.id,
        name, 
        email, 
        department, 
        position,
        username,
        password,
        roles,
        active,
        image,
      });
    } else {
      setSpinText('Saving...')
      setSpin(true);
      await updateUser({ id: user.id, name, email, department, position, username, roles, active, image });
    }
  };

  const onDeleteUserClicked = async () => {
    setSpinText('Deleting...')
    setSpin(true);
    await deleteUser({ id: user.id });
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
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

  async function readImage(e, func) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      let binaryData = e.target.result;
      let base64String = window.btoa(binaryData);
      func(base64String);
    };

    let image = reader.readAsBinaryString(file);

    return image;
  }

  const btnClass = id !== user._id ? 'flex justify-between' : null;


  const content = (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 ">
        <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-2xl dark:text-gray-200 ">
         {id === user._id  ? 'Account Setting' : 'Edit User' } 
        </h1>
        
        <p className={errClass}>{error?.data?.message}</p>

        <div className="mt-5 md:col-span-2 ">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="shadow overflow-hidden rounded-md">
              <div className="space-y-6 bg-white dark:bg-slate-800 px-4 py-5 sm:p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1 ">
                    <div className="">
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
                    </div>

                    <div className="mt-3">
                      <label
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        className={`w-full mt-1 px-3 py-2 text-sm font-normal text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md`}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="off"
                        required
                        value={email}
                        onChange={onEmailChanged}
                      />
                    </div>
                    <div className="mt-3">
                      <label
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                        htmlFor="department"
                      >
                        Department
                      </label>
                      <input
                        className={`w-full mt-1 px-3 py-2 text-sm font-normal text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md`}
                        id="department"
                        name="department"
                        type="text"
                        autoComplete="off"
                        required
                        value={department}
                        onChange={onDepartmentChanged}
                      />
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Photo
                      </label>
                      <div className="mt-1 flex items-center">
                        {imageView ? (
                          <Image
                            data={imageView}
                            size="h-16 w-16"
                            rounded="rounded-md"
                          />
                        ) : (
                          <span className="inline-block h-16 w-16 overflow-hidden rounded-md bg-gray-100">
                            <img
                              alt="Man"
                              src={user.avatar}
                              className="h-16 w-16 rounded-md object-cover border border-slate-300  dark:border-slate-600"
                            />
                          </span>
                        )}

                        <label
                          htmlFor="file-upload"
                          className="ml-5 cursor-pointer text-[10px]  px-2 py-1 text-white border dark:text-gray-300 font-medium border-gray-200 dark:border-slate-600 bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-md duration-150"
                        >
                          <span className="whitespace-nowrap">Replace Photo</span>

                          <input
                            id="file-upload"
                            name="image"
                            type="file"
                            className="sr-only"
                            accept="image/png, image/jpeg"
                            onChange={(event) => {
                              readImage(event, setImage);
                              onImageChanged(event);
                            }}
                          />
                        </label>
                        <p className="text-xs text-gray-500 ml-3">
                          JPG, JPEG, PNG up to 10MB
                        </p>
                      </div>
                    </div>

                    
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <div className="">
                      <label
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                        htmlFor="position"
                      >
                        Position
                      </label>
                      <input
                        className={`w-full mt-1 px-3 py-2 text-sm font-normal text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md`}
                        id="position"
                        name="position"
                        type="text"
                        autoComplete="off"
                        required
                        value={position}
                        onChange={onPositionChanged}
                      />
                    </div>
                    <div className="mt-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        roles
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
                    <div className="mt-3">
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
                    </div>

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
                            {passwordShown ? (
                              <AiOutlineEye />
                            ) : (
                              <AiOutlineEyeInvisible />
                            )}
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
                    { id !== user._id
                    && <div className="mt-4 space-y-4">
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
                    }
               
                {spin 
                && 
                  <div className="mt-6 flex text-gray-400 justify-end"> 
                <Spenner />
                <p>{spinText} </p>
                </div> 
                }


                  </div>
                </div>
              </div>
              <div className={ `flex justify-end text-sm bg-gray-50 dark:bg-slate-800 px-4 py-3 text-right sm:px-6 dark:border-t dark:border-slate-700 ${btnClass}`}>
              
                
                   { id !== user._id
                    &&  <span
                    className={
                      canSave
                        ? `cursor-pointer flex  px-3 sm:px-4 py-2 text-white border dark:text-gray-300 border-gray-200 dark:border-slate-600 bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-md duration-150`
                        : "flex  px-3 sm:px-4 py-2 text-white border dark:text-slate-600 border-gray-200 dark:border-slate-700 bg-gray-400 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-md duration-150"
                    }
                    title="Delete User"
                    disabled={!canSave}
                    onClick={onDeleteUserClicked}
                  >
                    <AiOutlineUserDelete size={20} className='mr-1 sm:mr-2' />
                    Delete
                  </span>
                   }           

                <div className="flex items-center ">
                   <div>
                  <span
                    title="Cancel"
                    disabled={!canSave}
                    onClick={() => canSave && navigate("/dash/users")}
                    className={
                      canSave
                        ? `cursor-pointer flex mr-6 px-3 sm:px-4 py-2 text-white border dark:text-gray-300 border-gray-200 dark:border-slate-600 bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-md duration-150`
                        : `flex mx-6 px-3 sm:px-4 py-2 text-white border dark:text-slate-600 border-gray-200 dark:border-slate-700 bg-gray-400 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-md duration-150`
                    } >
                  <BsArrowLeftShort size={20} className='mr-1 sm:mr-2' />
                    Cancel
                  </span>
                </div>

                  <span
                    title="Save"
                    disabled={!canSave}
                    onClick={onSaveUserClicked}
                    className={
                      canSave
                        ? `cursor-pointer flex px-3 sm:px-4 py-2 text-white border dark:text-gray-300 border-gray-200 dark:border-slate-600 bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-md duration-150`
                        : `flex px-3 sm:px-4 py-2 text-white border dark:text-slate-600 border-gray-200 dark:border-slate-700 bg-gray-400 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-md duration-150`
                    }
                  >
                    <AiOutlineSave size={20} className="mr-1 sm:mr-2" />
                    Save
                  </span>
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
