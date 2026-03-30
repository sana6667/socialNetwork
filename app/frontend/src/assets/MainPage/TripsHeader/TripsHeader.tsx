import { Link } from "react-router-dom";
import cn from 'classnames';
import { useState } from "react";
import { useDrawer } from "../../../context/DrawerProvider";


export function TripsHeader () {

  const [active, setActive] = useState('trips');

  const { open } = useDrawer();

  return (
    <header className="exphead">
      <nav className="exphead__nav">
        <Link
          className={cn('exphead__nav__link', { active: active === 'trips' })}
          to={'./'}
          onClick={() => setActive('trips')}
        >
          Trips
        </Link>
        <Link
          className={cn('exphead__nav__link', { active: active === 'memories' })}
          to={'./memories'}
          onClick={() => setActive('memories')}
        >
          Memories
        </Link>
      </nav>
      <div className="exphead__dots">
        <button className="dots__button" onClick={open}>
          <img src="/icons/mainpage/exploreHeader/dots.svg" alt="" />
        </button>
      </div>
    </header>
  );
};