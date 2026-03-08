/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Header } from "../../../assets/HomeHeader"
import { Link, NavLink, Outlet } from "react-router-dom";
import { NavBar } from "../../../assets/NavBar";

export function MainPage() {
  //const [contry, setCountry] = useState<string>('Berlin'); //test data
  const trevelers = 123; //test data

  return (
    <section className="mainpage">
      <Header contry={'Berlin'} trevelers={trevelers}/>
      <Outlet/>
      <NavBar />
    </section>
  );
}