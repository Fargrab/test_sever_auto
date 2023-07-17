import React from "react";

import type { ToastType } from "components";
import { Toast } from "components";

import styles from "./toast-manager.module.css";

function ToastManagerComp({ toasts, appearTime = 5000 }: Props) {
  const [curToasts, setCurrentToasts] = React.useState<ToastType.Toast[]>(toasts.reverse());
  const [curToast, setCurrentToast] = React.useState<ToastType.Toast | null>(
    null
  );

  React.useEffect(() => {
    if (!curToast && curToasts.length) {
      const toast = curToasts[curToasts.length - 1]
      setCurrentToast(toast);
    }
  }, [curToasts])

  function handleClose() {
    const newToasts = curToasts.slice(0, curToasts.length - 1);
    setCurrentToasts(newToasts);

    if (newToasts.length) {
      const toast = curToasts[curToasts.length]
      setCurrentToast(toast)
      return
    }
    setCurrentToast(null)
  }

  function hideGroup(category: ToastType.Toast["category"]) {
    setCurrentToasts(toasts => toasts.filter(toast => toast.category !== category))
  }

  return (
    <div className={styles.toasts}>
      {curToast ? (
        <Toast toast={curToast} onClose={handleClose} appearTime={appearTime} hideGroup={hideGroup} />
      ) : null}
    </div>
  );
}

export const ToastManager = React.memo(ToastManagerComp)

type Props = {
  toasts: ToastType.Toast[];
  appearTime?: number;
};
