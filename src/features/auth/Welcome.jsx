import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Welcome = () => {
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "long" }).format(date);

  const content = (
    <section className="welcome">
      <div className="w-full flex justify-between p-6">
        <h1 className="text-3xl">Welcome!</h1>
        <p className="text-xl">{today}</p>
      </div>
      <div className="notes mt-10 w-full flex justify-center items-center gap-8">
        <Link to="/dash/notes">
          <Button variant="outlined">View "Plans"</Button>
        </Link>

        <Link to="/dash/notes/new">
          <Button variant="contained">Add New "Plan"</Button>
        </Link>
      </div>
      <div className="users mt-8 flex justify-center items-center gap-8">
        <Link to="/dash/users">
          <Button variant="outlined" color="secondary">
            View User Settings
          </Button>
        </Link>

        <Link to="/dash/users/new">
          <Button variant="contained" color="secondary">
            Add New User
          </Button>
        </Link>
      </div>
    </section>
  );

  return content;
};
export default Welcome;
