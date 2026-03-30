import { Link } from "react-router-dom";

interface HeaderProps {
  contry: string;
  trevelers: number;
}

export function Header({ contry, trevelers }: HeaderProps) {
  return (
    <header className="header__header">
      <div className="header__notification">
        <Link to={"/notification"}><img src="/imgs/notification.svg" alt="Notification Icon" className="header__notification__icon" /></Link>
        <Link to={"/comments"}><img src="/imgs/comments.svg" alt="Comments Icon" className="header__notification__icon" /></Link>
        <Link to={"/points"}><img src="/imgs/points.svg" alt="Points Icon" className="header__notification__icon" /></Link>
      </div>
      <div className="header__search">
        <img src="/imgs/search.svg" alt="Search Icon" className="header__search__icon" />
        <input type="text" className="header__search__input" placeholder="Search destination, city or country" />
      </div>

      <div className="header__country">
        <h1 className="header__country__name">Around {contry}<img src="/imgs/Pin.svg" alt="" /></h1>
        <p className="header__country__travelers">{trevelers} travelers nearby</p>
      </div>
    </header>
  )
}