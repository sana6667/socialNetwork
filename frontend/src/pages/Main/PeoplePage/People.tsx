import { NavLink } from "react-router-dom";
import { CardPeopleItem } from "../../../assets/CardPeopleItem";
import { Header } from "../../../assets/HomeHeader";

export function People() {

  const range = '2km'; //test data
  const avatar = '/imgs/testAVA.svg'; //test data
  const name = 'John'; //test data
  const trevelers = 123; //test data

  return (
    <main className="people__main">
      <Header contry={'Berlin'} trevelers={trevelers}/>
      <section className="people__tab">
        <div className="people__section">
          <div className="people__section__blank mainPageActive">
            <img src="/imgs/tabPeopActive.svg" alt="People Icon" className="people__section__blank__icon" />
            <NavLink to="/" className="people__section__blank__link">People nearby</NavLink>
          </div>
          <div className="people__section__blank">
            <img src="/imgs/tabPlane.svg" alt="Trips Icon" className="people__section__blank__icon" />
            <NavLink to="/trips" className="people__section__blank__link">Trips nearby</NavLink>
          </div>
        </div>
        <div className="people__cards">
          <div className="people__cards__card">
            <img src={avatar} alt="Card 1" className="people__cards__card__img" />
            <p className="people__cards__card__text">{name}, {range}</p>
          </div>
          <div className="people__cards__card">
            <img src={avatar} alt="Card 1" className="people__cards__card__img" />
            <p className="people__cards__card__text">{name}, {range}</p>
          </div>
          <div className="people__cards__card">
            <img src={avatar} alt="Card 1" className="people__cards__card__img" />
            <p className="people__cards__card__text">{name}, {range}</p>
          </div>
        </div>
      </section>

      <section className="people__content">
        <div className="people__content__filter">
          <button className="people__content__filter__button">
            <img src="/imgs/filter.svg" alt="Filter Icon" />
            Filter
            <img src="/imgs/arrow.svg" alt="Arrow Down Icon" />
          </button>
        </div>

        <div className="people__content__cardlist">
          <CardPeopleItem />
          <CardPeopleItem />
        </div>
      </section>

    </main>
  )
}