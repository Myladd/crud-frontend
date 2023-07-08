import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewNoteMutation } from "./noteApiSlice";
import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const NewNoteForm = ({ users }) => {
  const [addNewNote, { isLoading, isSuccess, isError, error }] = useAddNewNoteMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [userId, setUserId] = useState(users[0].id);
  console.log(userId);

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setText("");
      setUserId("");
      navigate("/dash/notes");
    }
  }, [isSuccess, navigate]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const onSaveNoteClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewNote({ user: userId, title, text });
    }
  };

  const options = users.map((user) => {
    return (
      <MenuItem key={user.id} value={user.id}>
        {" "}
        {user.username}
      </MenuItem>
    );
  });

  const errClass = isError ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "form__input--incomplete" : "";
  const validTextClass = !text ? "form__input--incomplete" : "";

  const content = (
    <div className="form-content w-full flex flex-col gap-8 items-center">
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form w-80 mt-10 flex flex-col items-center justify-center gap-4" onSubmit={onSaveNoteClicked}>
        <div className="form__title-row">
          <h2 className="text-2xl mb-8">Add Your New Plan &#127919;</h2>
        </div>
        <TextField className={`form__input w-full ${validTitleClass}`} id="title" label="Title" variant="outlined" name="title" type="text" autoComplete="off" value={title} onChange={onTitleChanged} />

        <TextField className={`form__input form__input--text w-full ${validTextClass}`} id="text" label="Text" variant="outlined" name="text" type="text" autoComplete="off" value={text} onChange={onTextChanged} />

        <div className="user-select w-full flex justify-center items-center gap-2">
          <InputLabel id="username-lab">Assigned To:</InputLabel>
          <Select
            className="form__select"
            labelId="username-lab"
            id="username"
            name="username"
            value={userId}
            label="Assigned"
            onChange={onUserIdChanged}
          >
            {options}
          </Select>
        </div>
        <div className="form__action-buttons w-full">
          <Button className="w-full" title="Save" variant="contained" color="success" disabled={!canSave}>
            save
          </Button>
        </div>
      </form>
    </div>
  );

  return content;
};

export default NewNoteForm;
