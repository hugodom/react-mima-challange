import React from "react";
import { Button, Grid } from "@material-ui/core";
import { CartItemModel } from "../../shared/models/grocery";
import useStore, { GlobalState } from "../../state/items.state";
import { CartItem } from "../CartItem/CartItem";

export const Cart = () => {
  const { cartItems, totalCart, mobileView }: GlobalState = useStore();

  return (
    <>
      {!mobileView && <div>Cart</div>}
      <Grid
        container
        direction="column"
        alignItems="stretch"
        justifyContent="center"
      >
        {cartItems?.map((item: CartItemModel) => (
          <Grid key={item.id}>
            <CartItem item={item} />
          </Grid>
        ))}
        Total amount: {totalCart}
        <Button
          onClick={() => {
            console.log("clicked");
          }}
        >
          Checkout
        </Button>
      </Grid>
    </>
  );
};
