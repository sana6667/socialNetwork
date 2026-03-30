import { Link } from "react-router-dom";
import cn from 'classnames';
import { useState } from "react";
import { useDrawer } from "../../../context/DrawerProvider";


export function ExploreHeader () {

  const [active, setActive] = useState('hangouts');

  const { open } = useDrawer();

  return (
    <header className="exphead">
      <nav className="exphead__nav">
        <Link
          className={cn('exphead__nav__link', { active: active === 'hangouts' })}
          to={'./hangouts'}
          onClick={() => setActive('hangouts')}
        >
          Hangouts
        </Link>
        <Link
          className={cn('exphead__nav__link', { active: active === 'hosts' })}
          to={'./hosts'}
          onClick={() => setActive('hosts')}
        >
          Hosts
        </Link>
        <Link
          className={cn('exphead__nav__link', { active: active === 'discussions' })}
          to={'./discussions'}
          onClick={() => setActive('discussions')}
        >
          Discussions
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