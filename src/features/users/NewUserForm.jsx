import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";

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
  const [roles, setRoles] = useState(["Employee"]);

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
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const onNameChanged = (e) => setName(e.target.value);
  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions, //HTMLCollection
      (option) => option.value
    );
    setRoles(values);
  };

  const canSave =
    [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ name, username, password, roles });
    }
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  const errClass = isError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass = !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-sm w-full text-gray-600">
          <div className="text-center">
            {/* <img src="https://floatui.com/logo.svg" width={150} className="mx-auto" alt="logo"/> */}
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
               New User
              </h3>
            </div>
          </div>

          <p className={errClass}>{error?.data?.message}</p>

          <form className="form" onSubmit={onSaveUserClicked}>
            <div className="form__title-row">
              <div className="form__action-buttons">
                <button
                  className="text-lg p-1"
                  title="Save"
                  disabled={!canSave}
                >
                  <FontAwesomeIcon icon={faSave} />
                </button>
              </div>
            </div>

            <div className="mt-3">
            <label className="text-base font-medium" htmlFor="name">
              Name: 
            </label>
            <input
              className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg ${validUserClass}`}
              id="name"
              name="name"
              type="text"
             
              autoComplete="off"
              value={name}
              onChange={onNameChanged}
            />
            </div>
            <div className="mt-3">
            <label className="text-base font-medium" htmlFor="username">
              Username: <span className="nowrap">[3-20 letters]</span>
            </label>
            <input
              className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg ${validUserClass}`}
              id="username"
              name="username"
              type="text"
              autoComplete="off"
              value={username}
              onChange={onUsernameChanged}
            />
            </div>
            <div className="mt-3">

            <label className="text-base font-medium" htmlFor="password">
              Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span>
            </label>
            <input
              className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg ${validPwdClass}`}
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={onPasswordChanged}
            />
            </div>
            <div className="mt-3">
              <label htmlFor="roles" className="block text-sm font-medium text-gray-700">  ASSIGNED ROLES:</label>
              <div className="mt-1">
            <select
              id="roles"
              name="roles"
              className={`${validRolesClass}`}
              multiple={true}
              size="3"
              value={roles}
              onChange={onRolesChanged}
            >
              {options}
            </select>
            </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewUserForm;
