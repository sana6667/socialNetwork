import { ExploreHeader } from "../../../assets/MainPage/ExploreHeader/ExploreHeader";
import { Outlet } from "react-router-dom";
import { NavBar } from "../../../assets/NavBar";

export function Explore () {
  return (
    <section className="exp">
      <ExploreHeader/>
      <Outlet/>
      <NavBar/>
    </section>
  );
};