import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import manPlanner from "../lotties/56438-man-with-task-list.json";

const Public = () => {
  const content = (
    <section className="public bg-slate-200 h-screen">
      <header className="flex justify-center bg-[#1D976C]">
        <h1 className="p-8 font-bold text-5xl text-[#FFFFFF]">Welcome to your planner application</h1>
      </header>
      <main className="public__main mt-4 flex flex-col justify-center items-center">
              <h2 className="text-4xl font-bold text-[#1D976C]">A platform built for a new way of working</h2>
              <p className="mt-4">What would you like to manage with "Planner"?</p>
        <div className="w-80">
          <Lottie animationData={manPlanner} loop={true} />
        </div>
        <Link to="/login">
          <Button variant="contained">Get Start</Button>
        </Link>
      </main>
      <footer className="absolute bottom-0 w-full p-4 flex justify-center items-center gap-8 bg-[#1D976C] text-[#FFFFFF]">
        <address className="public__addr">
          Milad zk
          <br />
          Tehran
          <br />
          lorem street
          <br />
          <a href="tel:+15555555555">(555) 555-5555</a>
        </address>
        <p>Owner: Milad ZK</p>
      </footer>
    </section>
  );
  return content;
};
export default Public;
