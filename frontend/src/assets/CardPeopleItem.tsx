
export function CardPeopleItem() {
  return (
    <div className="card">
      <header className="card__header">
        <div className="card__header__avatars">
          <img src="/imgs/avatariTest.png" alt="Avatar" className="card__header__avatar" />
          <img src="/imgs/italia.svg" alt="Points Icon" className="card__header__country" />
        </div>
        <div className="card__header__block">
          <div className="card__header__block__up">
            <p className="card__header__block__up__name">John</p>
            <p className="card__header__block__up__online">about 2 hours ago</p>
          </div>

          <div className="card__header__block__down">
            <img className="card__header__block__down__icon" src="/imgs/spain.svg" alt="Arrow Icon" />
            <p className="card__header__block__down__range">Trip to Barselon, Spain</p>
          </div>
        </div>
      </header>
      <main className="card__main">
        <h1 className="card__main__title">
          Barcelona, Jul 20, 2026 - Jul 24, 2026
        </h1>
        <p className="card__main__description">
          Barcelona Adventure: Tapas, Sangria & Sun! Description: Hey everyone! I’m planning a trip to Barcelona this summer and I’m looking for a cool travel buddy to join me. My plan is simple: explore the Gothic Quarter by day, chill at Barceloneta Beach, and check out the local nightlife. I’m easy-going and love taking photos. If you want to split an Airbnb and eat the best Paella in town, send me a message! Let’s make some memories!
        </p>

        <img className="card__main__image" src="/imgs/screenone.png" alt="Barcelona Image" />
      </main>
      <footer className="card__footer">
        <div className="card__footer__actions">
          <button className="card__footer__actions__button__message">Send message</button>
          <button className="card__footer__actions__button">View profile <img src="/imgs/arrow_left.svg" alt="arrow left" /></button>
        </div>
        <div className="card__footer__stats">
          <div className="card__footer__stat">
            <img src="/imgs/like.svg" alt="Heart Icon" className="card__footer__likes__icon" />
            120
          </div>
          <div className="card__footer__stat">
            <img src="/imgs/comments.svg" alt="Comment Icon" className="card__footer__comments__icon" />
            45
          </div>
        </div>
      </footer>
    </div>
  );
}