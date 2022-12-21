import styles from './footer.module.css';
import { withRouter } from 'react-router-dom';

function Footer() {
  return (
    <footer className={styles.container}>
      <div>
        <a href={'https://www.facebook.com/radiumrocket'} target={'_blank'} rel="noreferrer">
          <img
            className={styles.socialIcon}
            src={`${process.env.PUBLIC_URL}/assets/images/facebookIcon.svg`}
          />
        </a>
        <a href={'https://twitter.com/radiumrocket'} target={'_blank'} rel="noreferrer">
          <img
            className={styles.socialIcon}
            src={`${process.env.PUBLIC_URL}/assets/images/twitterIcon.svg`}
          />
        </a>
        <a href={'https://www.instagram.com/radium.rocket/'} target={'_blank'} rel="noreferrer">
          <img
            className={styles.socialIcon}
            src={`${process.env.PUBLIC_URL}/assets/images/instagramIcon.svg`}
          />
        </a>
        <a
          href={'https://www.linkedin.com/company/radium-rocket/'}
          target={'_blank'}
          rel="noreferrer"
        >
          <img
            className={styles.socialIcon}
            src={`${process.env.PUBLIC_URL}/assets/images/linkedinIcon.svg`}
          />
        </a>
        <a href={'https://github.com/radiumrocket/'} target={'_blank'} rel="noreferrer">
          <img
            className={styles.socialIcon}
            src={`${process.env.PUBLIC_URL}/assets/images/githubIcon.svg`}
          />
        </a>
      </div>
      <div className={styles.copyright}>
        Copyright © {new Date().getFullYear()} TrackGENIX Radium Rocket
      </div>
    </footer>
  );
}

export default withRouter(Footer);
