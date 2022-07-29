import React, { useState } from "react";
import "./notificationBar.css";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

const NotificationBar = (props) => {
  const [state, setState] = useState({
    open: props.note,
    Transition: Slide,
  });
  const handleClick = (Transition) => () => {
    setState({
      open: true,
      Transition,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };
  return (
    <div className="notificationBarWrapper">
      {/* <Button onClick={handleClick(SlideTransition)}>Slide Transition</Button> */}
      <Snackbar
        bodyStyle={{ backgroundColor: "green", color: "coral" }}
        open={state.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        message={props.message}
        key={state.Transition.name}
        transitionDuration={500}
        autoHideDuration={3000}
      />
    </div>
  );
};

export default NotificationBar;
