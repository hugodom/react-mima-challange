import { Button, Grid, Typography } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { CartItemModel } from "../../shared/models/grocery";
import useStore, { GlobalState } from "../../state/items.state";
import { CartItemWrapper } from "./CartItem.styles";

export type CartItemProp = {
  item: CartItemModel;
};

export const CartItem: FunctionComponent<CartItemProp> = ({ item }) => {
  const {
    removeFromCart,
    addToCart,
    addToStock,
    removeFromStock,
    addToTotal,
    removeFromTotal,
  }: GlobalState = useStore();
  return (
    <CartItemWrapper className="cartItem">
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid item xs>
          <img
            alt="productImage"
            src={item.image_url}
            height="108"
            width="108"
          />
        </Grid>
        <Grid item>
          <Typography align="center">{item.productName}</Typography>
          <Grid container alignItems="center">
            <Button
              size="small"
              color="secondary"
              data-testid="remove-from-cart"
              onClick={() => {
                removeFromCart(item.id);
                removeFromTotal(item.price);
                addToStock(item.id);
              }}
            >
              -
            </Button>
            <div data-testid="total-items">{item.total}</div>
            <Button
              size="small"
              color="secondary"
              data-testid="add-from-cart"
              onClick={() => {
                if (item.stock >= 1) {
                  addToCart(item);
                  addToTotal(item.price);
                  removeFromStock(item.id);
                }
              }}
            >
              +
            </Button>
          </Grid>
        </Grid>
        <Grid item xs>
          <Typography align="right">{item.price * item.total} €</Typography>
        </Grid>
      </Grid>
    </CartItemWrapper>
  );
};
