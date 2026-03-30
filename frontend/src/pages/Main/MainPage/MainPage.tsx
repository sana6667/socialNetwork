import { Outlet } from "react-router-dom";
import { NavBar } from "../../../assets/NavBar";

export function MainPage() {
  //const [contry, setCountry] = useState<string>('Berlin'); //test data

  return (
    <section className="mainpage">
      <Outlet/>
      <NavBar />
    </section>
  );
}