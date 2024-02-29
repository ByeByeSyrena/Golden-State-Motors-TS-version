import css from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <div className={css.wrapper}>
          <p>Created by</p>
          <a
            href="https://github.com/ByeByeSyrena"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={require("../../images/icons8-github-48.png")}
              alt="logo"
              className={css.logo}
            />
          </a>
          <p>ByeByeSyrena</p>
        </div>
      </div>
    </footer>
  );
};
