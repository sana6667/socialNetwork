import { Outlet } from "react-router-dom";
import { NavBar } from "../../../assets/NavBar";
import { TripsHeader } from "../../../assets/MainPage/TripsHeader";

export function Trips () {
  return (
    <section className="exp">
      <TripsHeader/>
      <Outlet/>
      <NavBar/>
    </section>
  );
};