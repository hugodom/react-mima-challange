import React, {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { useMutation, useQuery } from "react-query";
import {
  CircularProgress,
  Grid,
  Typography,
  Hidden,
  Switch,
} from "@material-ui/core";
import { CartItemModel, Grocery } from "../../shared/models/grocery";
import {
  fetchFavoriteGroceries,
  fetchGroceries,
} from "../../shared/queries/fetchGroceries";
import { ProductItem } from "../ProductItem/ProductItem";
import useStore, { GlobalState } from "../../state/items.state";

export const ProductList: FunctionComponent<{}> = () => {
  const {
    groceries,
    firstLoadGroceries,
    removeFromStock,
    addToCart,
    addToTotal,
    toggleFavorite,
  }: GlobalState = useStore();

  const [showOnlyFavorites, setshowOnlyFavorites] = useState(false);

  useEffect(() => {}, [showOnlyFavorites]);

  const { status, refetch } = useQuery<Grocery[]>("groceries", fetchGroceries, {
    onSuccess: (loadedData) => {
      firstLoadGroceries(loadedData);
    },
  });

  const favoriteMutation = useMutation((item: Grocery) =>
    fetch(`http://localhost:3000/grocery/${item.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        favorite: item.favorite,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
  );

  const loadFavorites = useMutation(fetchFavoriteGroceries, {
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

  const toggleItemFavorite = (item: Grocery) => {
    toggleFavorite(item.id);
    favoriteMutation.mutate(item);
    // loadFavorites.mutate();
  };

  return (
    <>
      <Hidden only="xs">
        <Typography variant="h4" align="center">
          Product List
        </Typography>
      </Hidden>
      <Switch
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          if (event.target.checked) setshowOnlyFavorites(true);
          else setshowOnlyFavorites(false);
        }}
        name="checkedA"
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
      Show only favorites
      {status === "loading" && <CircularProgress />}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" && (
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          spacing={2}
          data-testid="ProductList"
          style={{
            margin: 0,
            width: "100%",
          }}
        >
          {!showOnlyFavorites &&
            groceries?.map((grocery: Grocery) => (
              <Grid key={grocery.id} item xs={6} sm={4} md={3}>
                <ProductItem
                  grocery={grocery}
                  handleClick={handleClick}
                  toggleItemFavorite={toggleItemFavorite}
                />
              </Grid>
            ))}

          {showOnlyFavorites &&
            groceries?.map((grocery: Grocery) => (
              <React.Fragment key={grocery.id}>
                {grocery.favorite === 1 && (
                  <Grid item xs={6} sm={4} md={3}>
                    <ProductItem
                      grocery={grocery}
                      handleClick={handleClick}
                      toggleItemFavorite={toggleItemFavorite}
                    />
                  </Grid>
                )}
              </React.Fragment>
            ))}
        </Grid>
      )}
    </>
  );
};
