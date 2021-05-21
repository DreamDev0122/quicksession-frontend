import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import TextField from "@material-ui/core/TextField";

const constructText = ({ min, max, defaultText, prefix, surfix }) => {
  let text = "";
  if (!min && !max) {
    text = defaultText;
  } else if (!max) {
    text = "over " + (prefix || "") + min + (surfix ? " " + surfix : "");
  } else if (!min) {
    text = "under " + (prefix || "") + max + (surfix ? " " + surfix : "");
  } else {
    text = (prefix || "") + min + (surfix ? " " + surfix : "");
    text += " - ";
    text += (prefix || "") + max + (surfix ? " " + surfix : "");
  }

  return text;
};

const useStyles = makeStyles((theme) => ({
  dropdownButton: {
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#fff",
    },
    textTransform: "none",
    borderRadius: 0,
    marginRight: "10px",

    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
  popover: {
    padding: "10px",
    minWidth: "100px",
    textAlign: "center",
    marginTop: "2px",
  },
  input: {
    width: "60px",
    textAlign: "center",
  },
}));

export default function RangeSelectButton({
  min,
  max,
  onChange,
  defaultText,
  prefix,
  surfix,
}) {
  const classes = useStyles();
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    if (minValue !== min) {
      setMinValue(min);
    }
    if (maxValue !== max) {
      setMaxValue(max);
    }
  }, [min, max]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);

    if (onChange) {
      if (minValue !== min || maxValue !== max) {
        onChange(minValue, maxValue);
      }
    }
  };

  const buttonText = constructText({
    min,
    max,
    defaultText,
    prefix,
    surfix,
  });

  const open = Boolean(anchorEl);

  return (
    <React.Fragment>
      <Button className={classes.dropdownButton} onClick={handleClick}>
        {buttonText} {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}{" "}
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        classes={{ paper: classes.popover }}
      >
        <TextField
          type="number"
          shrink="true"
          placeholder="Min"
          value={minValue || ""}
          onChange={(e) => setMinValue(e.target.value)}
          inputProps={{ min: 0, style: { textAlign: "center" } }}
          className={classes.input}
        />
        &nbsp;to&nbsp;
        <TextField
          type="number"
          placeholder="Max"
          value={maxValue || ""}
          onChange={(e) => setMaxValue(e.target.value)}
          inputProps={{ min: 0, style: { textAlign: "center" } }}
          shrink="true"
          className={classes.input}
        />
      </Popover>
    </React.Fragment>
  );
}
