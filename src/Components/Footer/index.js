import styles from './footer.module.css';
import { withRouter } from 'react-router-dom';
import { rocket } from 'assets/index';

function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.main}>
        <div className={styles.appName}>
          Track<span>GENIX</span>
        </div>
        {/* <ul className={styles.rutes}>
          {props.routes.map((route) => (
            <li key={route.name}>
              <Link to={route.path}>{route.name}</Link>
            </li>
          ))}
        </ul> */}
        <img className={styles.rocketImg} src={rocket} alt="footerImg" />
      </div>
      {/* <div className={styles.license}> */}
      <div className={styles.copyright}>
        Copyright © {new Date().getFullYear()} TrackGENIX Radium Rocket
      </div>
      <div>
        <a href={'https://www.facebook.com/radiumrocket'} target={'_blank'} rel="noreferrer">
          <img
            className={styles.socialIcon}
            src={`${process.env.PUBLIC_URL}/assets/images/facebook.svg`}
          />
        </a>
        <a href={'https://twitter.com/radiumrocket'} target={'_blank'} rel="noreferrer">
          <img
            className={styles.socialIcon}
            src={`${process.env.PUBLIC_URL}/assets/images/twitter.svg`}
          />
        </a>
        <a href={'https://www.instagram.com/radium.rocket/'} target={'_blank'} rel="noreferrer">
          <img
            className={styles.socialIcon}
            src={`${process.env.PUBLIC_URL}/assets/images/instagram.svg`}
          />
        </a>
      </div>
      {/* </div> */}
    </footer>
  );
}

export default withRouter(Footer);
