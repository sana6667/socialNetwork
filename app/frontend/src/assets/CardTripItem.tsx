
export function CardTripItem() {
  return (
    <div className="cardTrip">
      <header className="cardTrip__header">
        <div className="cardTrip__header__avatars">
          <img src="/imgs/avatariTest.png" alt="Avatar" className="cardTrip__header__avatar" />
          <img src="/imgs/italia.svg" alt="Points Icon" className="cardTrip__header__country" />
        </div>
        <div className="cardTrip__header__block">
          <div className="cardTrip__header__block__up">
            <p className="cardTrip__header__block__up__name">John</p>
          </div>

          <div className="cardTrip__header__block__down">
            <img className="cardTrip__header__block__down__icon" src="/imgs/spain.svg" alt="Arrow Icon" />
            <p className="cardTrip__header__block__down__range">Barselon, Spain</p>
          </div>
        </div>

        <button className="cardTrip__header__button">Quick message</button>
      </header>
      <main className="cardTrip__main">
        <h1 className="cardTrip__main__title">
          Rome, Jul 20, 2026 - Jul 24, 2026
        </h1>
      </main>
      <footer className="cardTrip__footer">
        <p className="cardTrip__main__description">
          Hi i’m Maddy. Looking for a guy who enjoy say food, history, & good wine!
        </p>

        <img className="cardTrip__main__image" src="/imgs/screenone.png" alt="Barcelona Image" />
      </footer>
    </div>
  );
}