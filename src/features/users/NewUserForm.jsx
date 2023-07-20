import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";
import { Button, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] = useAddNewUserMutation();

  const navigate = useNavigate();

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
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions, //HTMLCollection
      (option) => option.value
    );
    setRoles(values);
  };

  const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ username, password, roles });
    }
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <MenuItem key={role} value={role}>
        {" "}
        {role}
      </MenuItem>
    );
  });

  const errClass = isError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass = !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length) ? "form__input--incomplete" : "";

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>
      <div className="form-container w-full mt-12 flex flex-col items-center justify-center">
        <div className="form__title-row w-80 p-4 rounded-md bg-emerald-400 flex justify-center text-cyan-800">
          <h2 className="text-xl font-bold">New User</h2>
        </div>
        <form className="form mt-8 w-80 flex flex-col items-center gap-4" onSubmit={onSaveUserClicked}>
          <div className="username-field">
            <label className="form__label" htmlFor="username">
              Username: <span className="nowrap">[3-20 letters]</span>
            </label>
            <TextField label="Username" variant="filled" className={`form__input w-full ${validUserClass}`} id="username" name="username" type="text" autoComplete="off" value={username} onChange={onUsernameChanged} />
          </div>

          <div className="password-field">
            <label className="form__label" htmlFor="password">
              Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span>
            </label>
            <TextField label="Password" variant="filled" className={`form__input w-full ${validPwdClass}`} id="password" name="password" type="password" autoComplete="off" value={password} onChange={onPasswordChanged} />
          </div>
          <div className="select-container flex items-center gap-2">
            {/* <label className="form__label" htmlFor="roles">
              ASSIGNED ROLES:
            </label> */}
            <InputLabel id="roles">Role: </InputLabel>
            <Select className={`form__select ${validRolesClass}`} MenuProps={MenuProps} input={<OutlinedInput label="role" />} labelId="roles" id="roles" name="roles" value={roles} label="Role" multiple onChange={onRolesChanged}>
              {options}
            </Select>
            {/* <select id="roles" name="roles" className={`form__select ${validRolesClass}`} multiple={true} size="3" value={roles} onChange={onRolesChanged}>
              {options}
            </select> */}
          </div>
          <div className="form__action-buttons w-full">
            <Button className="icon-button w-full" variant="contained" color="success" title="Save" disabled={!canSave}>
              save
            </Button>
          </div>
        </form>
      </div>
    </>
  );

  return content;
};
export default NewUserForm;
