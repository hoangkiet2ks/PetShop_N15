import React from "react";
import styles from "./NotFound.module.css";
import lampSvg from "./lamp.svg"; // Đảm bảo lamp.svg có sẵn trong thư mục
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const NotFound = () => {
  return (
    <div
      className={`${styles.wrapper} ${styles.backgroundColor} ${styles.fontFamily} ${styles.white}`}
    >
      <div className={styles.background}>
        <div className={styles.ground}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.leftSection}>
          <div className={styles.innerContent}>
            <h1 className={styles.heading}>404</h1>
            <p className={styles.subheading}>
              Looks like the page you were looking for is no longer here.
            </p>
            <Link to={"/"} style={{}}>
              <Button
                variant="success"
                style={{ marginTop: "30px", width: "160px" }}
              >
                Back home
              </Button>
            </Link>
          </div>
        </div>

        <div className={styles.rightSection}>
          <img
            src={lampSvg}
            alt="Not Found Illustration"
            className={styles.image}
            style={{ width: "500px", height: "auto" }} // Kích thước nhỏ lại
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
