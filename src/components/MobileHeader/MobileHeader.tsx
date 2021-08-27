/* eslint-disable react/jsx-no-undef */

import React from "react";
import { IconButton, Toolbar } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import useStore, { GlobalState } from "../../state/items.state";

export const MobileHeader = () => {
  const { toggleCart }: GlobalState = useStore();
  return (
    <Toolbar>
      <IconButton
        {...{
          edge: "start",
          color: "inherit",
          "aria-label": "menu",
          "aria-haspopup": "true",
        }}
        onClick={() => {
          toggleCart();
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      Mimacom
    </Toolbar>
  );
};
