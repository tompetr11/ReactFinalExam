import { useCallback, useState } from "react";
import { storage } from "../../../core/storage/storage";
import { PREFERRED_PRODUCTS } from "../../../core/storage/types";

interface Product{
    id:number;
    title:string;
    price:number;
    description:string;
    category:string;
    image:string;
    rating:{
        rate:number;
        count:number;
    }
}

export interface GenericProduct{
    id:number;
    title:string;
    price:number;
    description:string;
    category:string;
    image:string;
}

export const useProducts = () => {
const [products, setProducts] = useState<Product[]>([]);
const [initialProducts, setInitialProducts] = useState<Product[]>([]);
const[favorites, setFavorites] = useState<number[]>([]);


const refreshProducts = useCallback(async() => {
    try{
    const responde =await fetch('https://fakestoreapi.com/products');
    const data = await responde.json();
    setInitialProducts([...data.products]);
    setProducts([...data.products]);
}catch(error){
    console.error('Error fetching products:', error);
}
},[]);

const loadFavorites = useCallback(async () => {
    try {
      const storedFavorites = await storage.getItem(PREFERRED_PRODUCTS);
      const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      setFavorites(parsedFavorites);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, []);
  const addFavorite = useCallback(
    async (item: Product) => {
      const updatedFavorites = favorites.includes(item.id)
        ? favorites.filter((id) => id !== item.id)
        : [...favorites, item.id];

      setFavorites(updatedFavorites);
      await storage.setItem(PREFERRED_PRODUCTS, JSON.stringify(updatedFavorites));
    },
    [favorites]
  );
return{
    products,
    setProducts,
    initialProducts,
    setInitialProducts,
    refreshProducts,
    favorites,
    setFavorites,
    loadFavorites,
    addFavorite,
}

};