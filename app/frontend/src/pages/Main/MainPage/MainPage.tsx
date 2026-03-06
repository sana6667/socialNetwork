/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CardItem } from "../../../assets/CardItem";
import { NavBar } from "../../../assets/NavBar";

export function MainPage() {
  const [contry, setCountry] = useState<string>('Berlin'); //test data
  const trevelers = 123; //test data
  const name = 'John'; //test data
  const range = '2km'; //test data
  const avatar = '/imgs/testAVA.svg'; //test data

  return (
    <section className="mainpage">
      <header className="mainpage__header">
        <div className="mainpage__notification">
          <Link to={"/notification"}><img src="/imgs/notification.svg" alt="Notification Icon" className="mainpage__notification__icon" /></Link>
          <Link to={"/comments"}><img src="/imgs/comments.svg" alt="Comments Icon" className="mainpage__notification__icon" /></Link>
          <Link to={"/points"}><img src="/imgs/points.svg" alt="Points Icon" className="mainpage__notification__icon" /></Link>
        </div>
        <div className="mainpage__search">
          <img src="/imgs/search.svg" alt="Search Icon" className="mainpage__search__icon" />
          <input type="text" className="mainpage__search__input" placeholder="Search destination, city or country" />
        </div>

        <div className="mainpage__country">
          <h1 className="mainpage__country__name">Around {contry}<img src="/imgs/Pin.svg" alt="" /></h1>
          <p className="mainpage__country__travelers">{trevelers} travelers nearby</p>
        </div>
      </header>

      <main className="mainpage__main">
        <section className="mainpage__tab">
          <div className="mainpage__section">
            <div className="mainpage__section__blank mainPageActive">
              <img src="/imgs/tabPeopActive.svg" alt="People Icon" className="mainpage__section__blank__icon" />
              <NavLink to="/home" className="mainpage__section__blank__link">People nearby</NavLink>
            </div>
            <div className="mainpage__section__blank">
              <img src="/imgs/tabPlane.svg" alt="Trips Icon" className="mainpage__section__blank__icon" />
              <NavLink to="/home/trips" className="mainpage__section__blank__link">Trips nearby</NavLink>
            </div>
          </div>
          <div className="mainpage__cards">
            <div className="mainpage__cards__card">
              <img src={avatar} alt="Card 1" className="mainpage__cards__card__img" />
              <p className="mainpage__cards__card__text">{name}, {range}</p>
            </div>
            <div className="mainpage__cards__card">
              <img src={avatar} alt="Card 1" className="mainpage__cards__card__img" />
              <p className="mainpage__cards__card__text">{name}, {range}</p>
            </div>
            <div className="mainpage__cards__card">
              <img src={avatar} alt="Card 1" className="mainpage__cards__card__img" />
              <p className="mainpage__cards__card__text">{name}, {range}</p>
            </div>
          </div>
        </section>

        <section className="mainpage__content">
          <div className="mainpage__content__filter">
            <button className="mainpage__content__filter__button">
              <img src="/imgs/filter.svg" alt="Filter Icon" />
              Filter
              <img src="/imgs/arrow.svg" alt="Arrow Down Icon" />
            </button>
          </div>

          <div className="mainpage__content__cardlist">
            <CardItem />
            <CardItem />
          </div>
        </section>

        <NavBar />
      </main>
    </section>
  );
}