import { useNavigate } from "react-router-dom";
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import { Button } from "@mui/material";

const User = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));

  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`);

    const userRolesString = user.roles.toString().replaceAll(",", ", ");

    const cellStatus = user.active ? "" : "table__cell--inactive";

    return (
      <tr className="w-[50%] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="px-6 py-4">{user.username}</td>
        <td className="px-6 py-4">{userRolesString}</td>
        <td className="px-6 py-4">
          <Button variant="outlined" onClick={handleEdit}>
            <EditNoteRoundedIcon/>
          </Button>
        </td>
      </tr>
    );
  } else return null;
};
export default User;
