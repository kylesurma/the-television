import React, { useState, forwardRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "@react-spring/web"; // web.cjs is required for IE 11 support

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "800px",
    height: "800px",
    backgroundColor: "red",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 4, 3),
  },
}));

const Fade = forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const EntryScreen = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [firstTimeOn, setfirstTimeOn] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (firstTimeOn) {
      props.isReady(true);
      props.coldLoad()
      setfirstTimeOn(false)
    }
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        About
      </button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="spring-modal-title">Spring modal</h2>
            <p id="spring-modal-description">react-spring animates me.</p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default EntryScreen;