import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Image from "../../components/Image";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState("");
  const [image, setImage] = useState("");

  const [uploadImage, setUploadImage] = useState({image: ""});

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
    if (isSuccess) {
      setName("");
      setUsername("");
      setPassword("");
      setRoles("");
      setImage("");
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const onNameChanged = (e) => setName(e.target.value);
  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onImageChanged = (e) => {
    const value = e.target.files[0]
    setUploadImage({ ...uploadImage, "image": value })
  };
  


  const canSave =
    [roles, name, validUsername, validPassword].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('image', uploadImage);

    console.log(formData)

    if (canSave) {
      await addNewUser({ name, username, password, roles, formData })
     
    }
  };

  console.log(uploadImage);

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  const errClass = isError
    ? "text-gray-900 sm:text-2xl dark:text-gray-200"
    : "offscreen";
  const validUserClass = !validUsername
    ? "text-red-600 dark:text-red-600"
    : "text-blue-700 dark:text-blue-400";
  const validPwdClass = !validPassword
    ? "text-red-600 dark:text-red-600"
    : "text-blue-700 dark:text-blue-400";


    let imgURL 
    async function readImage(e, func) {
      const file = e.target.files[0];
      const reader = new FileReader();
      // console.log(file);
      reader.onload = function(e) {
        let binaryData = e.target.result;
        let base64String = window.btoa(binaryData);
        imgURL = reader.result
  
        func(base64String);
      };
  
      let image = reader.readAsBinaryString(file);
   
      console.log(reader);
      console.log(imgURL);
    
      return image;
    }
  

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 ">
        <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-2xl dark:text-gray-200">
          New User
        </h1>
        <p className={errClass}>{error?.data?.message}</p>

        <div className="mt-5 md:col-span-2 md:mt-0">
          <form className="form" encType='multipart/form-data' onSubmit={onSaveUserClicked} >
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-white dark:bg-slate-800 px-4 py-5 sm:p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1 ">
                    <div className="">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Photo
                      </label>
                      <div className="mt-1 flex items-center">
                      {image 
                      ? <Image data={image} />
                      :  <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                          <svg
                            className="h-full w-full text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                      }

                        <label
                              htmlFor="file-upload"
                              className="ml-5 cursor-pointer text-[10px]  px-2 py-1 text-white border dark:text-gray-300 font-medium border-gray-200 dark:border-slate-600 bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-md duration-150"
                            >

                              <span>Upload File</span>

                              <input
                                id="file-upload"
                                name="image"
                                type="file"
                                className="sr-only"
                                accept="image/png, image/jpeg"
                                onChange={event => {
                                  readImage(event, setImage)
                                  onImageChanged(event)
                                  }}
                              />
                            </label>
                            <p className="text-xs text-gray-500 ml-3">
                            JPG, JPEG, PNG up to 10MB
                          </p>
                      </div>
                    </div>


                    <div className="mt-3">
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
                        required
                        value={name}
                        onChange={onNameChanged}
                      />
                    </div>
                    <div className="mt-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Assigned Roles
                      </label>
                      <select
                        id="roles"
                        name="roles"
                        value={roles}
                        onChange={(e) => setRoles(e.target.value)}
                        className="mt-1 block w-full py-2 px-2 text-sm font-normal text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md"
                      >
                        <option defaultValue value={""}>
                          ---
                        </option>
                        {options}
                      </select>
                    </div>
                  </div>
                  <div className=" col-span-2 sm:col-span-1">
                    <label
                      htmlFor="username"
                      className={`block text-sm font-medium text-gray-700 dark:text-gray-200`}
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
                      autoComplete="false"
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
                            ? "4-12 characters including !@#$%"
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
                          required
                          onChange={onPasswordChanged}
                        />
                      </div>

                      {/* <i onClick={togglePasswordVisiblity}>{eye}</i>{" "} */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between bg-gray-50 dark:bg-slate-800 px-4 py-3 text-right sm:px-6 dark:border-t dark:border-slate-700">
                <div>
                  <p
                    title="Cancel"
                    onClick={() => navigate("/dash/users")}
                    className="cursor-pointer text-sm  px-4 py-2 text-white border dark:text-gray-300 font-medium border-gray-200 dark:border-slate-600 bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-md duration-150"
                  >
                    Cancel
                  </p>
                </div>
                <button
                  title="Save"
                  disabled={!canSave}
                  className={
                    canSave
                      ? `text-sm px-4 py-2 text-white border dark:text-gray-300 font-medium border-gray-200 dark:border-slate-600 bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-md duration-150`
                      : "text-sm px-4 py-2 text-white border dark:text-slate-600 font-medium border-gray-200 dark:border-slate-700 bg-gray-400 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-md duration-150"
                  }
                >
                  <FontAwesomeIcon icon={faSave} className="pr-2" />
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewUserForm;
