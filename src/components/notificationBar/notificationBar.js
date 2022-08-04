import { Alert, Snackbar } from "@mui/material";
import { green } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";


const NotificationBar = () => {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  setNotify({
    isOpen: true,
    message: "",
    type: "success",
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotify({
      ...notify,
      isOpen: false,
    });
  };
  return (
    <>
    <Snackbar
      //   className={classes.root}
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      onClose={handleClose}
      >
      <Alert variant="filled" severity={notify.type} onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
      </>
  );
  // <Notification notify={notify} setNotify={setNotify} />;
};
export default NotificationBar;
