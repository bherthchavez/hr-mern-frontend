import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";

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

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    console.log(isSuccess);
    if (isSuccess || isDelSuccess) {
      setName("");
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onNameChanged = (e) => setName(e.target.value);
  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };

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
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  let canSave;
  if (password) {
    canSave =
      [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading;
  }

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass =
    password && !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const content = (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-sm w-full text-gray-600">
          <div className="text-center">
            {/* <img src="https://floatui.com/logo.svg" width={150} className="mx-auto" alt="logo"/> */}
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                Edit User
              </h3>
            </div>
          </div>

          <p className={errClass}>{errContent}</p>

          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <div className="form__title-row">
              <div className="form__action-buttons">
                <button
                  className="text-lg p-1 "
                  title="Save"
                  onClick={onSaveUserClicked}
                  disabled={!canSave}
                >
                  <FontAwesomeIcon icon={faSave} />
                </button>
                <button
                  className="text-lg p-1"
                  title="Delete"
                  onClick={onDeleteUserClicked}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
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
                placeholder="Enter Name"
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
                placeholder="Enter Username"
                autoComplete="off"
                value={username}
                onChange={onUsernameChanged}
              />
            </div>

            <div className="mt-3">
              <label className="text-base font-medium" htmlFor="password">
                Password: <span className="nowrap">[empty = no change]</span>{" "}
                <span className="nowrap">[4-12 chars incl. !@#$%]</span>
              </label>
              <input
                className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg ${validPwdClass}`}
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={onPasswordChanged}
              />
            </div>
            <div className="mt-4 space-y-4">
              <div className="flex items-start">
                <div className="mr-3 text-sm">
                  <label
                    htmlFor="user-active"
                    className="font-medium text-gray-700"
                  >
                    ACTIVE
                  </label>
                </div>
                <div className="flex h-5 items-center">
                  <input
                    id="user-active"
                    name="user-active"
                    type="checkbox"
                    checked={active}
                    onChange={onActiveChanged}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
              </div>
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
                  className={` ${validRolesClass}`}
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

  return content;
};
export default EditUserForm;
