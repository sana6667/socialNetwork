import { NavLink } from "react-router-dom";
import { CardTripItem } from "../../../assets/CardTripItem";
import { Header } from "../../../assets/HomeHeader";

export function Trips() {

  const trips = 4; //test data
  const trevelers = 123; //test data

  return (
    <main className="trips__main">
    <Header contry={'Berlin'} trevelers={trevelers}/>
      <section className="trips__tab">
        <div className="trips__section">
          <div className="trips__section__blank">
            <img src="/imgs/tabPeop.svg" alt="People Icon" className="trips__section__blank__icon" />
            <NavLink to="/" className="trips__section__blank__link">People nearby</NavLink>
          </div>
          <div className="trips__section__blank mainPageActive">
            <img src="/imgs/tabPlaneActive.svg" alt="Trips Icon" className="trips__section__blank__icon" />
            <NavLink to="/trips" className="trips__section__blank__link">Trips nearby</NavLink>
          </div>
        </div>

        <p className="trips__tab__subtitle">{trips} trips looking for buddies in tour area</p>
      </section>

      <section className="trips__content">
        <div className="trips__content__cardlist">
          <CardTripItem />
          <CardTripItem />
        </div>
      </section>

    </main>
  )
}