import { Grocery } from "../models/grocery";

export const fetchGroceries = async (): Promise<Grocery[]> => {
  const res = await fetch("http://localhost:3000/grocery?_page=1_limit=10");
  return res.json();
};
