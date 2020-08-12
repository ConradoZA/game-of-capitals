import React from "react";
import { Snackbar } from "@material-ui/core";

export const MySnackBar = ({ msg, openSnack, closeSnack }) => {
  return (
    <Snackbar
      open={openSnack}
      autoHideDuration={3000}
      onClose={closeSnack}
      message={msg}
      disableWindowBlurListener
    />
  );
};
