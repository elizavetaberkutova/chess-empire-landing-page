import { useEffect, useState, type FormEvent } from "react";
import { Chess, type Color, type PieceSymbol, type Square } from "chess.js";

type Language = "ru" | "uk";

const translations = {
  ru: {
    navApproach: "О школе",
    navBoard: "Сыграть",
    navJoin: "Вступить",
    languageLabel: "Выбрать язык",
    wordmarkFirst: "ШАХМАТНАЯ",
    wordmarkSecond: "ИМПЕРИЯ",
    heroEyebrow: "ОНЛАЙН-ШКОЛА ШАХМАТ",
    heroFirst: "Шахматная",
    heroSecond: "Империя",
    heroDescription:
      "Где рождаются короли доски. Стратегия как искусство власти — одна доска, 64 клетки и бесконечная империя мысли.",
    heroCta: "Вступить в Империю",
    heroLink: "Узнать о школе",
    approachEyebrow: "ФИЛОСОФИЯ ИГРЫ",
    approachFirst: "Умение видеть",
    approachSecond: "на несколько ходов вперёд.",
    approachBody:
      "Мы учим не угадывать следующий ход, а понимать игру. Для тех, кто только знакомится с шахматами, и тех, кто готов выйти на новый уровень.",
    statStudents: "УЧЕНИКОВ",
    statLessons: "ЗАНЯТИЯ ОНЛАЙН",
    statExperience: "СТАЖ В ИГРЕ",
    joinEyebrow: "ВАШ СЛЕДУЮЩИЙ ХОД",
    joinTitle: "Вступить в Империю.",
    joinBody:
      "Формат занятий — онлайн в Zoom, из любой точки мира. Оставьте контакты, и мы подскажем, с чего начать.",
    formTitle: "Расскажите о себе",
    nameLabel: "Имя",
    namePlaceholder: "Как к вам обращаться",
    emailLabel: "Почта",
    emailPlaceholder: "name@example.com",
    phoneLabel: "Телефон",
    phonePlaceholder: "+380 00 000 00 00",
    countryLabel: "Страна",
    countryPlaceholder: "Где вы сейчас?",
    formNote: "Заявка будет отправлена на sahovaimperia@gmail.com.",
    submit: "Отправить заявку",
    submitting: "Отправляем...",
    formSuccess: "Спасибо! Заявка отправлена. Скоро свяжемся с вами.",
    formError: "Не получилось отправить заявку. Попробуйте ещё раз или напишите нам.",
    mailFallback: "Написать на почту",
    boardEyebrow: "ПРАКТИКА",
    boardTitle: "Партия открыта.",
    boardDescription:
      "Сделайте первый ход. Выберите фигуру, затем клетку, на которую хотите её переместить.",
    boardWhiteTurn: "Ход белых",
    boardBlackTurn: "Ход чёрных",
    boardCheck: "Шах!",
    boardWhiteWon: "Мат. Победили белые.",
    boardBlackWon: "Мат. Победили чёрные.",
    boardStalemate: "Пат. Ничья.",
    boardDraw: "Ничья.",
    boardHistory: "ХОДЫ",
    boardEmpty: "Здесь появятся ваши ходы",
    boardUndo: "Отменить ход",
    boardReset: "Новая партия",
    boardChoosePromotion: "Превратить пешку в",
    pieceQueen: "Ферзя",
    pieceRook: "Ладью",
    pieceBishop: "Слона",
    pieceKnight: "Коня",
    boardSquare: "клетка",
    boardEmptySquare: "пустая",
    boardWhitePiece: "белая фигура",
    boardBlackPiece: "чёрная фигура",
    footerLine: "Стратегия начинается с первого хода.",
    footerLocation: "Онлайн — из любой точки мира",
  },
  uk: {
    navApproach: "Про школу",
    navBoard: "Зіграти",
    navJoin: "Приєднатися",
    languageLabel: "Обрати мову",
    wordmarkFirst: "ШАХОВА",
    wordmarkSecond: "ІМПЕРІЯ",
    heroEyebrow: "ОНЛАЙН-ШКОЛА ШАХІВ",
    heroFirst: "Шахова",
    heroSecond: "Імперія",
    heroDescription:
      "Де народжуються королі дошки. Стратегія як мистецтво влади — одна дошка, 64 клітини й безмежна імперія думки.",
    heroCta: "Вступити до Імперії",
    heroLink: "Дізнатися про школу",
    approachEyebrow: "ФІЛОСОФІЯ ГРИ",
    approachFirst: "Уміння бачити",
    approachSecond: "на кілька ходів уперед.",
    approachBody:
      "Ми вчимо не вгадувати наступний хід, а розуміти гру. Для тих, хто лише знайомиться з шахами, і тих, хто готовий перейти на новий рівень.",
    statStudents: "УЧНІВ",
    statLessons: "ЗАНЯТТЯ ОНЛАЙН",
    statExperience: "СТАЖ У ГРІ",
    joinEyebrow: "ВАШ НАСТУПНИЙ ХІД",
    joinTitle: "Вступити до Імперії.",
    joinBody:
      "Формат занять — онлайн у Zoom, з будь-якої точки світу. Залиште контакти, і ми підкажемо, з чого почати.",
    formTitle: "Розкажіть про себе",
    nameLabel: "Ім'я",
    namePlaceholder: "Як до вас звертатися",
    emailLabel: "Пошта",
    emailPlaceholder: "name@example.com",
    phoneLabel: "Телефон",
    phonePlaceholder: "+380 00 000 00 00",
    countryLabel: "Країна",
    countryPlaceholder: "Де ви зараз?",
    formNote: "Заявка надійде на sahovaimperia@gmail.com.",
    submit: "Надіслати заявку",
    submitting: "Надсилаємо...",
    formSuccess: "Дякуємо! Заявку надіслано. Скоро зв'яжемося з вами.",
    formError: "Не вдалося надіслати заявку. Спробуйте ще раз або напишіть нам.",
    mailFallback: "Написати на пошту",
    boardEyebrow: "ПРАКТИКА",
    boardTitle: "Партію відкрито.",
    boardDescription:
      "Зробіть перший хід. Оберіть фігуру, а потім клітинку, на яку хочете її перемістити.",
    boardWhiteTurn: "Хід білих",
    boardBlackTurn: "Хід чорних",
    boardCheck: "Шах!",
    boardWhiteWon: "Мат. Перемогли білі.",
    boardBlackWon: "Мат. Перемогли чорні.",
    boardStalemate: "Пат. Нічия.",
    boardDraw: "Нічия.",
    boardHistory: "ХОДИ",
    boardEmpty: "Тут з'являтимуться ваші ходи",
    boardUndo: "Скасувати хід",
    boardReset: "Нова партія",
    boardChoosePromotion: "Перетворити пішака на",
    pieceQueen: "Ферзя",
    pieceRook: "Туру",
    pieceBishop: "Слона",
    pieceKnight: "Коня",
    boardSquare: "клітинка",
    boardEmptySquare: "порожня",
    boardWhitePiece: "біла фігура",
    boardBlackPiece: "чорна фігура",
    footerLine: "Стратегія починається з першого ходу.",
    footerLocation: "Онлайн — з будь-якої точки світу",
  },
} as const;

const pieceGlyphs: Record<Color, Record<PieceSymbol, string>> = {
  w: { p: "♙", n: "♘", b: "♗", r: "♖", q: "♕", k: "♔" },
  b: { p: "♟", n: "♞", b: "♝", r: "♜", q: "♛", k: "♚" },
};

const promotionChoices: PieceSymbol[] = ["q", "r", "b", "n"];

function ImperialMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 44 44" fill="none">
      <path d="M22 4.5v7M18.5 8h7" />
      <path d="m12 15-2-4 8 4 4-5 4 5 8-4-2 4-1.5 14h-17L12 15Z" />
      <path d="M15 29h14M13 34h18M17 38h10" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M4 16 16 4M6 4h10v10" />
    </svg>
  );
}

export default function App() {
  const [language, setLanguage] = useState<Language>("ru");
  const copy = translations[language];
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [fallbackUrl, setFallbackUrl] = useState("");

  const [game] = useState(() => new Chess());
  const [, setPosition] = useState(game.fen());
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalMoves, setLegalMoves] = useState<ReturnType<Chess["moves"]>>([]);
  const [promotion, setPromotion] = useState<{ from: Square; to: Square } | null>(null);

  useEffect(() => {
    document.documentElement.lang = language === "ru" ? "ru" : "uk";
    document.title =
      language === "ru"
        ? "Шахматная Империя — онлайн-школа шахмат"
        : "Шахова Імперія — онлайн-школа шахів";
  }, [language]);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            entry.target.classList.remove("is-pending");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    elements.forEach((element) => {
      element.classList.add("is-pending");
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const name = String(values.get("name") ?? "");
    const email = String(values.get("email") ?? "");
    const phone = String(values.get("phone") ?? "");
    const country = String(values.get("country") ?? "");
    const subject = language === "ru" ? "Новая заявка — Шахматная Империя" : "Нова заявка — Шахова Імперія";
    const mailBody = [
      `${copy.nameLabel}: ${name}`,
      `${copy.emailLabel}: ${email}`,
      `${copy.phoneLabel}: ${phone}`,
      `${copy.countryLabel}: ${country}`,
    ].join("\n");

    setFallbackUrl(
      `mailto:sahovaimperia@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`
    );
    setFormStatus("submitting");

    try {
      const response = await fetch("https://formsubmit.co/ajax/sahovaimperia@gmail.com", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          country,
          _subject: subject,
          _replyto: email,
          _template: "table",
          _captcha: "false",
        }),
      });
      const result = (await response.json().catch(() => null)) as
        | { success?: boolean | string }
        | null;

      if (!response.ok || result?.success === false || result?.success === "false") {
        throw new Error("The form service did not accept the request.");
      }

      setFormStatus("success");
      form.reset();
    } catch {
      setFormStatus("error");
    }
  }

  function selectSquare(square: Square) {
    if (game.isGameOver() || promotion) return;

    const piece = game.get(square);
    const matchingMove = legalMoves.find((move) => move.to === square);

    if (selectedSquare && matchingMove) {
      if (matchingMove.isPromotion()) {
        setPromotion({ from: selectedSquare, to: square });
      } else {
        playMove(selectedSquare, square);
      }
      return;
    }

    if (piece && piece.color === game.turn()) {
      setSelectedSquare(square);
      setLegalMoves(game.moves({ square, verbose: true }));
      return;
    }

    setSelectedSquare(null);
    setLegalMoves([]);
  }

  function playMove(from: Square, to: Square, promoteTo?: PieceSymbol) {
    game.move({ from, to, ...(promoteTo ? { promotion: promoteTo } : {}) });
    setPosition(game.fen());
    setSelectedSquare(null);
    setLegalMoves([]);
    setPromotion(null);
  }

  function undoMove() {
    if (!game.undo()) return;
    setPosition(game.fen());
    setSelectedSquare(null);
    setLegalMoves([]);
    setPromotion(null);
  }

  function resetGame() {
    game.reset();
    setPosition(game.fen());
    setSelectedSquare(null);
    setLegalMoves([]);
    setPromotion(null);
  }

  const board = game.board();
  const moveHistory = game.history();
  const verboseHistory = game.history({ verbose: true });
  const lastMove = verboseHistory[verboseHistory.length - 1];
  const checkedKing = game.isCheck() ? game.findPiece({ type: "k", color: game.turn() })[0] : null;
  const currentTurn = game.turn() === "w" ? copy.boardWhiteTurn : copy.boardBlackTurn;
  const gameStatus = game.isCheckmate()
    ? game.turn() === "w"
      ? copy.boardBlackWon
      : copy.boardWhiteWon
    : game.isStalemate()
      ? copy.boardStalemate
      : game.isDraw()
        ? copy.boardDraw
        : `${currentTurn}${game.isCheck() ? ` — ${copy.boardCheck}` : ""}`;
  const moveRows = Array.from({ length: Math.ceil(moveHistory.length / 2) }, (_, index) => ({
    number: index + 1,
    white: moveHistory[index * 2],
    black: moveHistory[index * 2 + 1],
  }));

  return (
    <div className="site-shell" id="top">
      <header className="site-header">
        <div className="site-header__inner">
          <a className="wordmark" href="#top" aria-label={copy.wordmarkFirst + " " + copy.wordmarkSecond}>
            <span className="wordmark__mark">
              <ImperialMark />
            </span>
            <span className="wordmark__text">
              <span>{copy.wordmarkFirst}</span>
              <strong>{copy.wordmarkSecond}</strong>
            </span>
          </a>

          <nav className="header-nav" aria-label={language === "ru" ? "Навигация" : "Навігація"}>
            <a href="#approach">{copy.navApproach}</a>
            <a href="#board">{copy.navBoard}</a>
          </nav>

          <div className="header-actions">
            <div className="language-switch" role="group" aria-label={copy.languageLabel}>
              <button
                type="button"
                className={language === "ru" ? "is-active" : ""}
                aria-pressed={language === "ru"}
                onClick={() => setLanguage("ru")}
              >
                RU
              </button>
              <span aria-hidden="true">/</span>
              <button
                type="button"
                className={language === "uk" ? "is-active" : ""}
                aria-pressed={language === "uk"}
                onClick={() => setLanguage("uk")}
              >
                UA
              </button>
            </div>
            <a className="header-join" href="#join">
              {copy.navJoin}
              <ArrowIcon />
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <video
            className="hero__image"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/imperiya-hero.jpg"
            aria-hidden="true"
          >
            <source src="/chess-video.mp4" type="video/mp4" />
          </video>
          <div className="hero__shade" aria-hidden="true" />
          <div className="hero__content">
            <p className="hero__eyebrow hero-enter hero-enter--one">
              <span />
              {copy.heroEyebrow}
            </p>
            <h1 id="hero-title" className="hero__title hero-enter hero-enter--two">
              <span>{copy.heroFirst}</span>
              <em>{copy.heroSecond}</em>
            </h1>
            <p className="hero__description hero-enter hero-enter--three">{copy.heroDescription}</p>
            <div className="hero__actions hero-enter hero-enter--four">
              <a className="button button--light" href="#join">
                {copy.heroCta}
                <ArrowIcon />
              </a>
              <a className="text-link text-link--light" href="#approach">
                {copy.heroLink}
              </a>
            </div>
          </div>
        </section>

        <section className="approach section-shell" id="approach">
          <div className="approach__copy" data-reveal>
            <p className="eyebrow"><span>01</span>{copy.approachEyebrow}</p>
            <h2>
              {copy.approachFirst}
              <br />
              <em>{copy.approachSecond}</em>
            </h2>
            <p className="body-copy">{copy.approachBody}</p>
          </div>

          <div className="stat-area" data-reveal>
            <div className="stat-grid" aria-label={language === "ru" ? "О школе в цифрах" : "Про школу в цифрах"}>
              <div className="stat-square">
                <strong>500+</strong>
                <span>{copy.statStudents}</span>
              </div>
              <div className="stat-square">
                <strong className="stat-square__zoom">ZOOM</strong>
                <span>{copy.statLessons}</span>
              </div>
              <div className="stat-square">
                <strong>15 <small>{language === "ru" ? "лет" : "років"}</small></strong>
                <span>{copy.statExperience}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="join-section" id="join">
          <div className="join-section__inner section-shell">
            <div className="join-copy" data-reveal>
              <p className="eyebrow"><span>02</span>{copy.joinEyebrow}</p>
              <h2>{copy.joinTitle}</h2>
              <p className="body-copy">{copy.joinBody}</p>
              <a className="join-email" href="mailto:sahovaimperia@gmail.com">
                sahovaimperia@gmail.com
                <ArrowIcon />
              </a>
            </div>

            <div className="form-panel" data-reveal>
              <h3>{copy.formTitle}</h3>
              <form className="join-form" onSubmit={handleSubmit}>
                <div className="field-grid">
                  <label className="form-field" htmlFor="lead-name">
                    <span>{copy.nameLabel}</span>
                    <input
                      id="lead-name"
                      name="name"
                      type="text"
                      placeholder={copy.namePlaceholder}
                      autoComplete="name"
                      required
                    />
                  </label>
                  <label className="form-field" htmlFor="lead-email">
                    <span>{copy.emailLabel}</span>
                    <input
                      id="lead-email"
                      name="email"
                      type="email"
                      placeholder={copy.emailPlaceholder}
                      autoComplete="email"
                      required
                    />
                  </label>
                  <label className="form-field" htmlFor="lead-phone">
                    <span>{copy.phoneLabel}</span>
                    <input
                      id="lead-phone"
                      name="phone"
                      type="tel"
                      placeholder={copy.phonePlaceholder}
                      autoComplete="tel"
                      required
                    />
                  </label>
                  <label className="form-field" htmlFor="lead-country">
                    <span>{copy.countryLabel}</span>
                    <input
                      id="lead-country"
                      name="country"
                      type="text"
                      placeholder={copy.countryPlaceholder}
                      autoComplete="country-name"
                      required
                    />
                  </label>
                </div>

                <div className="form-bottom">
                  <button className="button button--dark" type="submit" disabled={formStatus === "submitting"}>
                    {formStatus === "submitting" ? copy.submitting : copy.submit}
                    <ArrowIcon />
                  </button>
                  <p className="form-note">{copy.formNote}</p>
                </div>

                <div className="form-feedback" aria-live="polite" aria-atomic="true">
                  {formStatus === "success" && <p className="form-feedback__success">{copy.formSuccess}</p>}
                  {formStatus === "error" && (
                    <p className="form-feedback__error">
                      {copy.formError} {fallbackUrl && <a href={fallbackUrl}>{copy.mailFallback}</a>}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>

        <section className="board-section section-shell" id="board">
          <div className="board-section__heading" data-reveal>
            <p className="eyebrow"><span>03</span>{copy.boardEyebrow}</p>
            <div className="board-section__title-row">
              <h2>{copy.boardTitle}</h2>
              <p className="body-copy">{copy.boardDescription}</p>
            </div>
          </div>

          <div className="game-layout" data-reveal>
            <div className="board-column">
              <div
                className="chess-board"
                role="grid"
                aria-label={language === "ru" ? "Игровая шахматная доска" : "Ігрова шахова дошка"}
                data-position={game.fen()}
              >
                {board.map((row, rowIndex) =>
                  row.map((piece, columnIndex) => {
                    const files = "abcdefgh";
                    const square = `${files[columnIndex]}${8 - rowIndex}` as Square;
                    const isSelected = selectedSquare === square;
                    const targetMove = legalMoves.find((move) => move.to === square);
                    const isLastMove = lastMove?.from === square || lastMove?.to === square;
                    const isCheckedKing = checkedKing === square;
                    const squareColor = (rowIndex + columnIndex) % 2 === 0 ? "dark" : "light";
                    const pieceName = piece
                      ? `${piece.color === "w" ? copy.boardWhitePiece : copy.boardBlackPiece} ${piece.type.toUpperCase()}`
                      : copy.boardEmptySquare;

                    return (
                      <button
                        className={[
                          "board-square",
                          `board-square--${squareColor}`,
                          isSelected ? "is-selected" : "",
                          isLastMove ? "is-last-move" : "",
                          targetMove ? (targetMove.isCapture() ? "is-capture-target" : "is-legal-target") : "",
                          isCheckedKing ? "is-in-check" : "",
                        ].filter(Boolean).join(" ")}
                        key={square}
                        type="button"
                        role="gridcell"
                        aria-label={`${copy.boardSquare} ${square}, ${pieceName}`}
                        aria-pressed={isSelected}
                        onClick={() => selectSquare(square)}
                      >
                        {columnIndex === 0 && <span className="square-coordinate square-coordinate--rank">{8 - rowIndex}</span>}
                        {rowIndex === 7 && <span className="square-coordinate square-coordinate--file">{files[columnIndex]}</span>}
                        {piece && (
                          <span className={`chess-piece chess-piece--${piece.color}`} aria-hidden="true">
                            {pieceGlyphs[piece.color][piece.type]}
                          </span>
                        )}
                        {targetMove && <span className="legal-dot" aria-hidden="true" />}
                      </button>
                    );
                  }),
                )}
              </div>
              <p className="board-caption">
                <span className="board-caption__dot" />
                {language === "ru" ? "Классические правила шахмат" : "Класичні правила шахів"}
              </p>
            </div>

            <aside className="game-panel" aria-label={language === "ru" ? "Управление партией" : "Керування партією"}>
              <div className={`turn-indicator ${game.isGameOver() ? "is-finished" : ""}`} aria-live="polite">
                <span className="turn-indicator__dot" />
                <strong>{gameStatus}</strong>
              </div>

              <div className="move-history">
                <div className="move-history__heading">
                  <span>{copy.boardHistory}</span>
                  <span>{moveHistory.length ? String(moveHistory.length).padStart(2, "0") : "00"}</span>
                </div>
                {moveRows.length === 0 ? (
                  <p className="move-history__empty">{copy.boardEmpty}</p>
                ) : (
                  <ol className="move-list">
                    {moveRows.map((row) => (
                      <li className="move-row" key={row.number}>
                        <span className="move-row__number">{row.number}.</span>
                        <span>{row.white}</span>
                        <span>{row.black ?? ""}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </div>

              {promotion && (
                <div className="promotion-picker" role="group" aria-label={copy.boardChoosePromotion}>
                  <span>{copy.boardChoosePromotion}</span>
                  <div>
                    {promotionChoices.map((choice) => {
                      const currentColor = game.turn();
                      const choiceName = {
                        q: copy.pieceQueen,
                        r: copy.pieceRook,
                        b: copy.pieceBishop,
                        n: copy.pieceKnight,
                        p: "",
                        k: "",
                      }[choice];

                      return (
                        <button
                          type="button"
                          key={choice}
                          onClick={() => playMove(promotion.from, promotion.to, choice)}
                          aria-label={choiceName}
                        >
                          {pieceGlyphs[currentColor][choice]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="game-controls">
                <button type="button" onClick={undoMove} disabled={moveHistory.length === 0}>
                  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
                    <path d="M7 5 3.5 8.5 7 12M4 8.5h7a5 5 0 1 1 0 10" />
                  </svg>
                  {copy.boardUndo}
                </button>
                <button type="button" onClick={resetGame}>
                  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
                    <path d="M16 7V3m0 4h-4M16 7a7 7 0 1 0 1 5" />
                  </svg>
                  {copy.boardReset}
                </button>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer__inner section-shell">
          <a className="wordmark wordmark--footer" href="#top">
            <span className="wordmark__mark"><ImperialMark /></span>
            <span className="wordmark__text">
              <span>{copy.wordmarkFirst}</span>
              <strong>{copy.wordmarkSecond}</strong>
            </span>
          </a>
          <p>{copy.footerLine}</p>
          <a className="footer-email" href="mailto:sahovaimperia@gmail.com">sahovaimperia@gmail.com</a>
          <span className="footer-location">{copy.footerLocation}</span>
        </div>
      </footer>
    </div>
  );
}
