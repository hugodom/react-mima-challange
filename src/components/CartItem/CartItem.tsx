import { Button, CardActionArea, CardContent } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { CartItemModel, Grocery } from "../../shared/models/grocery";
import useStore, { GlobalState } from "../../state/items.state";
import {
  CardMediaStyled,
  CardStyled,
} from "../ProductItem/ProductItems.styles";

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
    <CardStyled>
      <CardActionArea>
        <CardMediaStyled image={item.image_url} />
      </CardActionArea>
      <CardContent>
        <Button
          onClick={() => {
            removeFromCart(item.id);
            removeFromTotal(item.price);
            addToStock(item.id);
          }}
        >
          -
        </Button>
        {item.total}
        <Button
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
        <div>Total: {item.price * item.total} €</div>
      </CardContent>
    </CardStyled>
  );
};
