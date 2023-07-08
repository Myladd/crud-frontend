import { useState, useEffect } from "react";
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./noteApiSlice";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const EditNoteForm = ({ note, users }) => {
  const [updateNote, { isLoading, isSuccess, isError, error }] = useUpdateNoteMutation();

  const [deleteNote, { isSuccess: isDelSuccess, isError: isDelError, error: delerror }] = useDeleteNoteMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [completed, setCompleted] = useState(note.completed);
  const [userId, setUserId] = useState(note.user);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("");
      setText("");
      setUserId("");
      navigate("/dash/notes");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onCompletedChanged = (e) => setCompleted((prev) => !prev);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const onSaveNoteClicked = async (e) => {
    if (canSave) {
      await updateNote({ id: note.id, user: userId, title, text, completed });
    }
  };

  const onDeleteNoteClicked = async () => {
    await deleteNote({ id: note.id });
  };

  const created = new Date(note.createdAt).toLocaleString("en-US", { day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric" });
  const updated = new Date(note.updatedAt).toLocaleString("en-US", { day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric" });

  const options = users.map((user) => {
    return (
      <MenuItem key={user.id} value={user.id}>
        {" "}
        {user.username}
      </MenuItem>
    );
  });

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "form__input--incomplete" : "";
  const validTextClass = !text ? "form__input--incomplete" : "";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const content = (
    <>
      <p className={errClass}>{errContent}</p>
      <div className="edit-container w-full flex justify-center">
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="form__title-row mb-4">
            <h2 className="text-xl text-center">Edit Note #{note.ticket}</h2>
          </div>
          <div className="fields-container mb-4 flex flex-col items-center justify-center gap-4">
            <TextField className={`form__input w-full ${validTitleClass}`} id="note-title" label="Title" variant="outlined" name="title" type="text" autoComplete="off" value={title} onChange={onTitleChanged} />

            <TextField className={`form__input form__input--text w-full ${validTextClass}`} id="note-text" label="text" multiline rows={4} value={text} onChange={onTextChanged} />
          </div>
          <div className="user-container flex gap-4 items-center">
            <label className="form__label form__checkbox-container font-bold" htmlFor="note-username">
              ASSIGNED TO:
            </label>
            <Select className="form__select" labelId="note-username" name="username" id="note-username" value={userId} label="Assign to" onChange={onUserIdChanged}>
              {options}
            </Select>
          </div>
          <label className="form__label form__checkbox-container font-bold" htmlFor="note-completed">
            WORK COMPLETE:
            <Checkbox className="form__checkbox" id="note-completed" name="completed" type="checkbox" checked={completed} onChange={onCompletedChanged} />
          </label>
          <div className="form__divider mb-4">
            <p className="form__created">
              Created:
              <br />
              {created}
            </p>
            <p className="form__updated">
              Updated:
              <br />
              {updated}
            </p>
          </div>
          <div className="form__action-buttons flex justify-center gap-4">
            <Button className="icon-button w-full" variant="contained" color="success" title="Save" onClick={onSaveNoteClicked} disabled={!canSave}>
              save
            </Button>
            <Button className="icon-button w-full" variant="outlined" color="error" title="Delete" onClick={onDeleteNoteClicked}>
              trash
            </Button>
          </div>
        </form>
      </div>
    </>
  );

  return content;
};

export default EditNoteForm;
