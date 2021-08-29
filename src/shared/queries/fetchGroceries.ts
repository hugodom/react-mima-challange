import { Grocery } from "../models/grocery";

export const fetchGroceries = async (): Promise<Grocery[]> => {
  const res = await fetch(`http://localhost:3000/grocery?_page=1&_limit=16`);
  return res.json();
};

export const fetchFavoriteGroceries = async (): Promise<Grocery[]> => {
  const res = await fetch(
    "http://localhost:3000/grocery?favorite=1&_page=1&_limit=16"
  );
  return res.json();
};
