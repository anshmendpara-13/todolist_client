import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import landing from '../../assets/landing.jpg';
import { getUserDetails } from '../../util/GetUser';
import styles from './Landing.module.css';

function Landing() {
  const [user, setUser] = useState(null);
  console.log(user);

  useEffect(() => {
    const userDetails = getUserDetails();
    setUser(userDetails);
  }, []);

  return (
    <div>
      <Navbar active={"home"} />
      <div className={styles.landing__wrapper}>
        <div className={styles.landing__text}>
          <h1>Schedule Your Daily Tasks With <span className="primaryText">ToDo!</span></h1>
          {!user ? (
            <div className="btnWrapper">
              <Link to="/register" className="primaryBtn">Register</Link>
              <Link to="/login" className="secondaryBtn">Login</Link>
            </div>
          ) : (
            <p>Welcome back, {user.firstName + " " + user.lastName}!</p>
          )}
        </div>

        <div className={styles.landing__img}>
          <img src={landing} alt="landing" />
        </div>
      </div>
    </div>
  )
}

export default Landing
