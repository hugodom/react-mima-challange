import React from "react";
import { Button, Grid, Hidden, Typography } from "@material-ui/core";
import { CartItemModel } from "../../shared/models/grocery";
import useStore, { GlobalState } from "../../state/items.state";
import { CartItem } from "../CartItem/CartItem";
import { GridCart } from "./Cart.styles";

export const Cart = () => {
  const { cartItems, totalCart }: GlobalState = useStore();

  return (
    <>
      <Hidden only="xs">
        <Typography variant="h4" align="center">
          Cart
        </Typography>
      </Hidden>
      <Grid
        container
        direction="column"
        alignItems="stretch"
        justifyContent="space-between"
      >
        <GridCart container direction="column" alignItems="stretch">
          {cartItems?.map((item: CartItemModel) => (
            <CartItem key={item.id} item={item} />
          ))}
        </GridCart>
        <Grid container justifyContent="space-evenly" alignItems="center">
          <Button
            size="large"
            variant="contained"
            color="secondary"
            onClick={() => {
              //  console.log("clicked");
            }}
          >
            Checkout
          </Button>
          <Typography variant="subtitle1">{totalCart} €</Typography>
        </Grid>
      </Grid>
    </>
  );
};
