import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";
import { Button, Checkbox, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] = useUpdateUserMutation();

  const [deleteUser, { isSuccess: isDelSuccess, isError: isDelError, error: delerror }] = useDeleteUserMutation();

  const navigate = useNavigate();

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
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value);
    setRoles(values);
  };

  const onActiveChanged = () => setActive((prev) => !prev);

  const onSaveUserClicked = async (e) => {
    if (password) {
      await updateUser({ id: user.id, username, password, roles, active });
    } else {
      await updateUser({ id: user.id, username, roles, active });
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
    canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading;
  }

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass = password && !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length) ? "form__input--incomplete" : "";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const content = (
    <>
      <p className={errClass}>{errContent}</p>
      <div className="form-container w-full mt-12 flex flex-col items-center justify-center">
        <form className="form mt-8 w-96 flex flex-col items-center gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="form__title-row w-96 p-4 rounded-md bg-emerald-400 flex justify-center text-cyan-800">
            <h2 className="text-xl font-bold">Edit User</h2>
          </div>
          <div className="username-field w-full">
            <label className="form__label" htmlFor="username">
              Username: <span className="nowrap">[3-20 letters]</span>
            </label>
            <TextField className={`form__input w-full ${validUserClass}`} id="username" name="username" type="text" autoComplete="off" value={username} onChange={onUsernameChanged} />
          </div>

          <div className="password-field">
            <label className="form__label" htmlFor="password">
              Password: <span className="nowrap">[empty = no change]</span>
              <br />
              <span className="nowrap">[4-12 chars incl. !@#$%]</span>
            </label>
            <TextField className={`form__input w-full ${validPwdClass}`} id="password" name="password" type="password" value={password} onChange={onPasswordChanged} />
          </div>

          <label className="form__label form__checkbox-container" htmlFor="user-active">
            ACTIVE:
            <Checkbox className="form__checkbox" id="user-active" name="user-active" type="checkbox" checked={active} onChange={onActiveChanged} defaultChecked />
          </label>

          <div className="select-container flex items-center gap-2">
            <label className="form__label" htmlFor="roles">
              ASSIGNED ROLES:
            </label>
            <select id="roles" name="roles" className={`form__select ${validRolesClass}`} multiple={true} size="3" value={roles} onChange={onRolesChanged}>
              {options}
            </select>
          </div>
          <div className="form__action-buttons w-full flex gap-2">
            <Button className="icon-button w-full" variant="contained" color="success" title="Save" disabled={!canSave}>
              save
            </Button>
            <Button className="icon-button w-full" variant="contained" color="error" title="Delete" onClick={onDeleteUserClicked}>
              trash
            </Button>
          </div>
        </form>
      </div>
    </>
  );

  return content;
};
export default EditUserForm;
