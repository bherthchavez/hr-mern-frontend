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
      {" "}
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-2xl dark:text-gray-200">
          New User
        </h1>

        <div className="mt-5 md:col-span-2 md:mt-0">
          <form action="#" method="POST">
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-white dark:bg-slate-800 px-4 py-5 sm:p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1 ">
                    <label
                      className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      htmlFor="name"
                    >
                      Name:
                    </label>
                    <input
                      className={`w-full mt-1 px-3 py-2 text-sm font-normal text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md ${validUserClass}`}
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="off"
                      value={name}
                      onChange={onNameChanged}
                    />
                    <div className="mt-2">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        autocomplete="country-name"
                        className="mt-1 block w-full py-2 px-2 text-sm font-normal text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>
                  </div>
                  <div className=" col-span-2 sm:col-span-1">
                   
                    <label
                      htmlFor="username"
                      className=" block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      Username
                    </label>

                    <input
                      className={`w-full mt-1 px-3 py-2 text-sm font-normal text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md ${validUserClass}`}
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
                        Password:{" "}
                        <span className="nowrap">[4-12 chars incl. !@#$%]</span>
                      </label>
                      <input
                        className={`w-full mt-1 px-3 py-2 text-sm font-normal text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md ${validPwdClass}`}
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={onPasswordChanged}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-slate-800 px-4 py-3 text-right sm:px-6 dark:border-t dark:border-slate-700">
                <button
                  type="submit"
                  className="text-sm px-4 py-2 text-white border dark:text-gray-300 font-medium border-gray-200 dark:border-slate-600 bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-md duration-150"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
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
                Password:{" "}
                <span className="nowrap">[4-12 chars incl. !@#$%]</span>
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
              <label
                htmlFor="roles"
                className="block text-sm font-medium text-gray-700"
              >
                {" "}
                ASSIGNED ROLES:
              </label>
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
