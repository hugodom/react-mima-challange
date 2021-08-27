import { Button, CardActionArea, CardContent } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { Grocery } from "../../shared/models/grocery";
import { CardMediaStyled, CardStyled } from "./ProductItems.styles";

type ProductItemProps = {
  grocery: Grocery;
  handleClick: (item: Grocery) => void;
};

export const ProductItem: FunctionComponent<ProductItemProps> = ({
  grocery,
  handleClick,
}) => (
  <CardStyled data-testid="ProductItem">
    <CardActionArea>
      <CardMediaStyled image={grocery.image_url} />
    </CardActionArea>
    <CardContent>
      <div>Product Name: {grocery.productName}</div>
      <div>Price: {grocery.price}</div>
      <div>Description: {grocery.productDescription}</div>
      <div>Stock: {grocery.stock}</div>
      <Button
        onClick={() => {
          handleClick(grocery);
        }}
      >
        Add
      </Button>
    </CardContent>
  </CardStyled>
);
