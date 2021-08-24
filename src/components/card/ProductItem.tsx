import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
} from "@material-ui/core";
import React, { FunctionComponent } from "react";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export const ProductItem: FunctionComponent<{}> = () => {
  const classes = useStyles();
  return (
    <Card data-testid="ProductItem" className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://picsum.photos/100/140"
        />
      </CardActionArea>
      <CardContent>Content goes here</CardContent>
    </Card>
  );
};
