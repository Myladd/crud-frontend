import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectNoteById } from "./noteApiSlice";
import EditNoteIcon from '@mui/icons-material/EditNote';

const Note = ({ noteId }) => {
  const note = useSelector((state) => selectNoteById(state, noteId));

  const navigate = useNavigate();

  if (note) {
    const created = new Date(note.createdAt).toLocaleString("en-US", { day: "numeric", month: "long" });

    const updated = new Date(note.updatedAt).toLocaleString("en-US", { day: "numeric", month: "long" });

    const handleEdit = () => navigate(`/dash/notes/${noteId}`);

    return (
      <tr className="border-b-2 border-green-400">
        <td className="p-2">{note.completed ? <span className="text-green-700">Completed</span> : <span className="text-blue-500">Open</span>}</td>
        <td className="p-2">{note.title}</td>
        <td className="p-2">{note.username}</td>
        <td className="p-2">{created}</td>
        <td className="p-2">{updated}</td>

        <td className="p-2">
          <button className="p-2 hover:bg-cyan-400 rounded-3xl" onClick={handleEdit}>
            <EditNoteIcon color="success"/>
          </button>
        </td>
      </tr>
    );
  } else return null;
};
export default Note;
