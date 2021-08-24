import { Grid, Paper } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { ProductItem } from "../card/ProductItem";

export const ProductList: FunctionComponent<{}> = () => (
  <Grid
    container
    direction="row"
    justifyContent="flex-start"
    alignItems="baseline"
    spacing={2}
    data-testid="ProductList"
  >
    <Grid item xs={6} sm={3}>
      <ProductItem />
    </Grid>
    <Grid item xs={6} sm={3}>
      <Paper>It lives!</Paper>
    </Grid>
    <Grid item xs={6} sm={3}>
      <Paper>It lives!</Paper>
    </Grid>
    <Grid item xs={6} sm={3}>
      <Paper>It lives!</Paper>
    </Grid>
    <Grid item xs={6} sm={3}>
      <Paper>It lives!</Paper>
    </Grid>
    <Grid item xs={6} sm={3}>
      <Paper>It lives!</Paper>
    </Grid>
  </Grid>
);
