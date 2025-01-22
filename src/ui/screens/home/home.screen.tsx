import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainParamList, Screen } from "../../navigation/types";
import { useProducts } from "../hook/useProducts.facade";
import React, { useCallback } from "react";
import { GenericProduct } from "../../atoms/genericProduct/genericProduct.atom";
import { FlatList } from "react-native";

interface Props {
    navigation: NativeStackNavigationProp<MainParamList, Screen.Home>;
}

const HomeSCreen =({navigation}: Props) => {
const {products,setProducts,initialProducts,refreshProducts}=useProducts();

const renderItem = useCallback(
    ({item})=>(
    <GenericProduct
    genericProduct={item}
    onPress={()=>navigation.navigate(Screen.Detail,{
        id:item.id,
        idsArray:products.map((product)=>product.id),
    })}
    />
),[products,navigation]);


return (
    
    <FlatList
    data={products}
    renderItem={renderItem}
    keyExtractor={(item)=>item.id.toString()}
    />
);
};