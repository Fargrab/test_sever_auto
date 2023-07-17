
import React from "react";
import classnames from "classnames";

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import { XCircleIcon } from "@heroicons/react/24/outline";

import { ToastType } from "./types";

import styles from "./toast.module.css";

export function Toast({
  toast: { status, message, category },
  onClose,
  appearTime,
  hideGroup,
}: Props) {
  const [isOnHide, setIsOnHide] = React.useState(false);
  const [width, setWidth] = React.useState<number>(0);

  const Icon = statusMapper[status].icon;
  const color = statusMapper[status].color;

  React.useEffect(() => {
    const currentTime = appearTime + 1000
    const timerId = setTimeout(() => {
      handleClose();
    }, currentTime);

    const intervalStep = currentTime / 50;

    const intervalId = setInterval(() => {
      setWidth(width => width + 7);
    }, intervalStep);

    return () => {
      clearTimeout(timerId);
      clearInterval(intervalId);
    };
  }, [appearTime]);

  function handleHideCategory() {
    handleClose(() => hideGroup(category));
  }

  function handleClose(callback?: () => void) {
    setIsOnHide(true);
    setTimeout(() => {
      onClose();
      if (callback) {
        callback();
      }
    }, 400);
  }

  return (
    <div
      className={classnames(styles.toast, isOnHide ? styles.toast_hide : "")}
    >
      <div className={styles.content}>
        {Icon ? (
          <Icon style={{ color: color }} className={styles.icon} />
        ) : null}
        <div>
          <div className={styles.category}>{category}</div>
          <div>{message}</div>
        </div>
      </div>

      <XCircleIcon onClick={() => handleClose()} className={styles.close} />

      <button className={styles.button} onClick={handleHideCategory}>
        Больше не показывать
      </button>

      <div className={styles.progress_bar}>
        <span
          className={styles.progress_bar_element}
          style={{
            backgroundColor: color,
            width: `${width}px`,
          }}
        ></span>
      </div>
    </div>
  );
}

const statusMapper = {
  success: {
    icon: CheckCircleIcon,
    color: "#07bc0c",
  },
  error: {
    icon: ExclamationCircleIcon,
    color: "#e74c3c",
  },
  warning: {
    icon: ExclamationTriangleIcon,
    color: "#f1c40f",
  },
};

type Props = {
  toast: ToastType.Toast;
  appearTime: number;
  onClose: () => void;
  hideGroup: (category: ToastType.Toast["category"]) => void;
};

export * from "./types";
