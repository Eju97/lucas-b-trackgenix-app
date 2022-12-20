import styles from './landing.module.css';
// import { Button } from 'Components/Shared';
// import { useDispatch } from 'react-redux';
// import { logout } from 'redux/auth/thunks';
// import { useHistory } from 'react-router-dom';
import welcomeImg from 'assets/welcomeImg.png';
// import clockImg from 'assets/functionClockImg.png';
import {
  functionClockImg,
  functionRolesImg,
  functionReportImg,
  functionManagementImg,
  reasonsClockImg,
  reasonsDecisionImg,
  reasonsGraphicImg,
  reasonsManagementImg
} from 'assets/index';

function LandingHome() {
  //   const dispatch = useDispatch();
  //   const history = useHistory();
  return (
    <section className={styles.container}>
      <div className={styles.welcome}>
        <div>
          <h2>Time tracker for teams</h2>
          <p>
            Trackgenix software provides businesses with a number of advantages and benefits. One of
            the most significant advantages of using Trackgenix is that it helps businesses to save
            time and increase productivity. By tracking employee time and project progress,
            businesses can identify areas where improvements can be made.
          </p>
        </div>
        <img src={welcomeImg} alt="Trackgenix" />
      </div>
      <div className={styles.functionalities}>
        <div className={styles.subFunctionalities}>
          <img src={functionReportImg} alt="Reports" />
          <h3>Reports</h3>
          <p>
            Our solution has several reports that can be generated, including a report on the work
            hours of each employee in each project and work team. This report can be used to track
            employee productivity and to identify any areas where employees may be slacking off.
          </p>
        </div>
        <div className={styles.subFunctionalities}>
          <img src={functionClockImg} alt="Time_Tracking" />
          <h3>Time Tracking</h3>
          <p>
            Trackgenix has a time-tracking feature that allows employees to log their work hours for
            each project and work team. This feature is useful for businesses to track the work
            hours of their employees and to ensure that they are being used efficiently.
          </p>
        </div>
      </div>
      <div className={styles.functionalities}>
        <div className={styles.subFunctionalities}>
          <img src={functionManagementImg} alt="Resource_Management" />
          <h3>Resource Management</h3>
          <p>
            Our software has helped us to improve our resource management by allowing employees to
            log their work hours in a central location. This has made it easier for managers to
            track employee productivity and identify areas where improvements can be made.
          </p>
        </div>
        <div className={styles.subFunctionalities}>
          <img src={functionRolesImg} alt="Multple_Roles" />
          <h3>Multiple roles</h3>
          <p>
            The app will allow each employee to log in and select the project they are working on
            and the work team they are part of. They will then be able to select the hours they
            worked and submit them. The app will then calculate the total hours worked for each
            employee and project.
          </p>
        </div>
      </div>
      <div className={styles.reasons}>
        <h2>Why use Trackgenix?</h2>
        <div className={styles.reasonsContainer}>
          <div className="reasons-subcontainer">
            <div className={styles.reasonsDiv}>
              <div>
                <h4>Boost Productivity</h4>
                <img src={reasonsClockImg} alt="reasonsClockImg" />
              </div>
              <p>
                The strict way of working and performing the jobs allow a good insertion in the
                labor world.
              </p>
            </div>
            <div className={styles.reasonsDiv}>
              <div>
                <h4>Work traceability</h4>
                <img src={reasonsGraphicImg} alt="reasonsGraphicImg" />
              </div>
              <p>These processes facilitate and improve the management of work.</p>
            </div>
          </div>
          <div className="reasons-subcontainer">
            <div className={styles.reasonsDiv}>
              <div>
                <h4>Team management</h4>
                <img src={reasonsManagementImg} alt="reasonsManagementImg" />
              </div>
              <p>
                Team Management is essential to establish a good quality of life at work and ensure
                good Project Management.
              </p>
            </div>
            <div className={styles.reasonsDiv}>
              <div>
                <h4>Decision making</h4>
                <img src={reasonsDecisionImg} alt="reasonsDecisionImg" />
              </div>
              <p>
                Is the process by which a choice is made between alternatives or ways to solve
                different life situations.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.about}>
        <h2>ABOUT US</h2>
        <div className="about-container">
          <p>
            Gigatech was founded in Silicon Valley in 2006. It is a privately held company that
            provides software development services to other businesses.
          </p>
          <img src="assets/img/Trackgenix2.jpg" alt="Trackgenix_AboutUs" />
        </div>
        <p className="about-p">
          The companys primary focus is on providing high quality software development services.
          However, they also offer other services such as project management, consulting, and
          training.
        </p>
      </div>
    </section>
  );
}

export default LandingHome;
