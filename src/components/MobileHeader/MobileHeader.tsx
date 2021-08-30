/* eslint-disable react/jsx-no-undef */

import React from 'react';
import { IconButton, Toolbar, Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import useStore, { GlobalState } from '../../state/items.state';

export const MobileHeader = () => {
  const { toggleCart, cartOpen }: GlobalState = useStore();
  return (
    <Toolbar data-testid="toolbar">
      <IconButton
        data-testid="change-menu"
        {...{
          edge: 'start',
          color: 'inherit',
          'aria-label': 'menu',
          'aria-haspopup': 'true'
        }}
        onClick={() => {
          toggleCart();
        }}
      >
        <ArrowBackIosIcon data-testid="arrow-header" />
      </IconButton>
      <Typography variant="h2" align="center">
        {cartOpen ? 'Cart' : 'Product List'}
      </Typography>
    </Toolbar>
  );
};
