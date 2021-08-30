import React, { FunctionComponent } from 'react';
import {
  Button,
  CardActionArea,
  CardContent,
  Typography,
  Grid,
  Hidden,
  Card
} from '@material-ui/core';
import { Grocery } from '../../shared/models/grocery';
import {
  BodyText,
  CardMediaStyled,
  FavoriteBorderStyled,
  FavoriteStyled
} from './ProductItems.styles';

type ProductItemProps = {
  grocery: Grocery;
  handleClick: (item: Grocery) => void;
  toggleItemFavorite: (item: Grocery) => void;
};

export const ProductItem: FunctionComponent<ProductItemProps> = ({
  grocery,
  handleClick,
  toggleItemFavorite
}) => (
  <Card data-testid="ProductItem">
    <CardActionArea
      data-testid="card-action-area"
      onClick={() => {
        handleClick(grocery);
      }}
    >
      <CardMediaStyled image={grocery.image_url} />
    </CardActionArea>
    <CardContent>
      {grocery.favorite ? (
        <FavoriteStyled
          aria-label="Favorited"
          onClick={() => {
            toggleItemFavorite(grocery);
          }}
        />
      ) : (
        <FavoriteBorderStyled
          aria-label="Not favorited"
          onClick={() => {
            toggleItemFavorite(grocery);
          }}
        />
      )}

      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="subtitle1">{grocery.productName}</Typography>
        <BodyText variant="body1">{grocery.price}€</BodyText>
      </Grid>
      <Hidden smDown>
        <BodyText variant="body1" truncated={{ value: true, amount: 2 }}>
          <b>Description:</b> {grocery.productDescription}
        </BodyText>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <BodyText variant="body1">Stock: {grocery.stock}</BodyText>
          <Button
            aria-label="Add button"
            data-testid="add-button"
            color="primary"
            variant="contained"
            onClick={() => {
              handleClick(grocery);
            }}
          >
            Add
          </Button>
        </Grid>
      </Hidden>
    </CardContent>
  </Card>
);
