type Needly = {
  id: number,
  name: string,
  avatarUrl : string,
}

const needly: Needly = {
  id: 1,
  name: 'Maxim',
  avatarUrl: '/smth/',
}

export function DrawerContent () {

  const data = needly;

  const iconPath = '/icons/drawer'
  
  return (
    <section className="drawcont">
      <div className="drawcont__top">
        <div className="drawcont__top__profile">
          <img className="drawcont__top__profile__avatar" src={iconPath + "/ava.svg"} alt="" />
          <div className="drawcont__top__profile__block">
            <h2 className="drawcont__top__profile__block__name">{data.name}</h2>

            <a className="drawcont__top__profile__block__link" >View profile</a>
          </div>
        </div>
        <div className="drawcont__top__settings">
          <img src={iconPath + "/settings.svg"} alt="" className="drawcont__top__settings__img" />
          <p className="drawcont__top__settings__text">Settings</p>
        </div>
      </div>

      <div className="drawcont__section">
        <h2 className="drawcont__section__title">My Activity</h2>
        <div className="drawcont__item">
          <div className="drawcont__item__left">
            <img src={iconPath + "/plane.svg"} alt="" className="drawcont__item__icon" />
            <h3 className="drawcont__item__text">My Trips</h3>
          </div>
          <img src={iconPath + "/arrow.svg"} alt="" />
        </div>
        <div className="drawcont__item">
          <div className="drawcont__item__left">
            <img src={iconPath + "/book.svg"} alt="" className="drawcont__item__icon" />
            <h3 className="drawcont__item__text">Bookmarks</h3>
          </div>
          <img src={iconPath + "/arrow.svg"} alt="" />
        </div>
        <div className="drawcont__item">
          <div className="drawcont__item__left">
            <img src={iconPath + "/pan.svg"} alt="" className="drawcont__item__icon" />
            <h3 className="drawcont__item__text">Drafts</h3>
          </div>
          <img src={iconPath + "/arrow.svg"} alt="" />
        </div>
        <div className="drawcont__item">
          <div className="drawcont__item__left">
            <img src={iconPath + "/ver.svg"} alt="" className="drawcont__item__icon" />
            <h3 className="drawcont__item__text">Verification</h3>
          </div>
          <img src={iconPath + "/arrow.svg"} alt="" />
        </div>
        <div className="drawcont__item">
          <div className="drawcont__item__left">
            <img src={iconPath + "/rew.svg"} alt="" className="drawcont__item__icon" />
            <h3 className="drawcont__item__text">Reviews</h3>
          </div>
          <img src={iconPath + "/arrow.svg"} alt="" />
        </div>
      </div>

      <div className="drawcont__section">
        <h2 className="drawcont__section__title">General</h2>
        <div className="drawcont__item">
          <div className="drawcont__item__left">
            <img src={iconPath + "/bell.svg"} alt="" className="drawcont__item__icon" />
            <h3 className="drawcont__item__text">Notifications</h3>
          </div>
          <img src={iconPath + "/arrow.svg"} alt="" />
        </div>
        <div className="drawcont__item">
          <div className="drawcont__item__left">
            <img src={iconPath + "/qest.svg"} alt="" className="drawcont__item__icon" />
            <h3 className="drawcont__item__text">Help & Support</h3>
          </div>
          <img src={iconPath + "/arrow.svg"} alt="" />
        </div>
      </div>

      <div className="drawcont__section">
        <h2 className="drawcont__section__title">Other</h2>
        <div className="drawcont__item">
          <div className="drawcont__item__left">
            <img src={iconPath + "/fr.svg"} alt="" className="drawcont__item__icon" />
            <h3 className="drawcont__item__text">Invite Friends</h3>
          </div>
          <img src={iconPath + "/arrow.svg"} alt="" />
        </div>
        <div className="drawcont__item">
          <div className="drawcont__item__left">
            <img src={iconPath + "/part.svg"} alt="" className="drawcont__item__icon" />
            <h3 className="drawcont__item__text">Community Guidelines</h3>
          </div>
          <img src={iconPath + "/arrow.svg"} alt="" />
        </div>
        <div className="drawcont__item">
          <div className="drawcont__item__left">
            <img src={iconPath + "/shield.svg"} alt="" className="drawcont__item__icon" />
            <h3 className="drawcont__item__text">Privacy Policy</h3>
          </div>
          <img src={iconPath + "/arrow.svg"} alt="" />
        </div>
      </div>

      <div className="drawcont__logout">
        <div className="drawcont__logout__left">
          <img src={iconPath + "/logout.svg"} alt="" className="drawcont__item__icon" />
          <h3 className="drawcont__logout__text">Log Out</h3>
        </div>
        <img src={iconPath + "/redArrow.svg"} alt="" />
      </div>
    </section>
  );
};