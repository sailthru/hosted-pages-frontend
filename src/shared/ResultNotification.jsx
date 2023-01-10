import React from "react";
import {Notification} from "@sailthru/stui-components";
import styles from "./styles.module.css"

function ResultNotification({ display, message, type }) {
  if (!display) {
    return null;
  }
  return (
    <Notification
      className={styles.notifier}
      type={type}
    >
      {message}
    </Notification>

  );
}

export { ResultNotification };
