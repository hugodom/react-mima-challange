import React, { FunctionComponent } from "react";
import { useQuery } from "react-query";
import { CircularProgress, Grid } from "@material-ui/core";
import { CartItemModel, Grocery } from "../../shared/models/grocery";
import { fetchGroceries } from "../../shared/queries/fetchGroceries";
import { ProductItem } from "../ProductItem/ProductItem";
import useStore, { GlobalState } from "../../state/items.state";

export const ProductList: FunctionComponent<{}> = () => {
  const {
    groceries,
    mobileView,
    firstLoadGroceries,
    removeFromStock,
    addToCart,
    addToTotal,
  }: GlobalState = useStore();

  const { status } = useQuery<Grocery[]>("groceries", fetchGroceries, {
    onSuccess: (loadedData) => {
      firstLoadGroceries(loadedData);
    },
  });

  const handleClick = (item: Grocery) => {
    if (item.stock >= 1) {
      addToCart(item as CartItemModel);
      addToTotal(item.price);
      removeFromStock(item.id);
    }
  };

  return (
    <>
      {!mobileView && <div>Product List</div>}
      {status === "loading" && <CircularProgress />}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" && (
        <div>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            spacing={2}
            data-testid="ProductList"
          >
            {groceries?.map((grocery: Grocery) => (
              <Grid key={grocery.id} item xs={6} sm={3}>
                <ProductItem grocery={grocery} handleClick={handleClick} />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </>
  );
};
