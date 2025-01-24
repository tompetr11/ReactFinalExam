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
const [initialFilter, setInitialFilter] = useState<string[]>([]);
const [filter, setFilter] = useState<string[]>([]);


const refreshProducts = useCallback(async() => {
    try{
    const responde =await fetch('https://fakestoreapi.com/products');
    const data = await responde.json();

    // Filtra prodotti senza URL immagine valido
    const validProducts = data.filter(
      (product: Product) =>
        product.image && typeof product.image === 'string' && product.image.startsWith('http')
    );
    
    setInitialProducts([...data]);
    setProducts([...data]);
}catch(error){
    console.error('Error fetching products:', error);
}
},[]);

const refreshFilter = useCallback(async () => {
  const staticFilters = ['All', ...[1, 2, 3, 4, 5].map((star) => `★${star}`)];
  try {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    const data = await response.json();
    
    if (Array.isArray(data) && data.length > 0) {
      
      const allFilters = [...staticFilters, ...data];

      setInitialFilter(allFilters);
      setFilter(allFilters);
    } 
  } catch (error) {
    console.error('Error fetching filter:', error);
    setInitialFilter(staticFilters);
    setFilter(staticFilters);
    
  }
}, []);

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
    initialFilter,
    setInitialFilter,
    filter,
    setFilter,
    refreshFilter,
}

};