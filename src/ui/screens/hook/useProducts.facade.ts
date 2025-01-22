import { useCallback, useState } from "react";

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
//const[favorites, setFavorites] = useState<number[]>([]);


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

return{
    products,
    setProducts,
    initialProducts,
    setInitialProducts,
    refreshProducts,
}

};