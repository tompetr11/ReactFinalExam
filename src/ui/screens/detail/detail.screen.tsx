import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, Button } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MainParamList, Screen } from "../../navigation/types";
import { styles } from "./detail.styles";
import { Ionicons } from '@expo/vector-icons';
import StarRating from "../../atoms/starRating/starRating.atom";

interface DetailProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.Detail>;
  route: RouteProp<MainParamList, Screen.Detail>;
}

const DetailScreen = ({ navigation, route }: Props) => {
  const { top, bottom } = useSafeAreaInsets();
  const { id, idsArray } = route.params;
  const [product, setProduct] = useState<DetailProduct | null>(null);
  const [loading, setLoading] = useState(true);

  const currentIndex = useMemo(() => idsArray.indexOf(id), [id, idsArray]);
  const backIconColor = useMemo(() => (currentIndex > 0 ? "black" : "#cccccc"), [currentIndex]);
  const forwardIconColor = useMemo(
    () => (currentIndex < idsArray.length - 1 ? "black" : "#cccccc"),
    [currentIndex, idsArray.length]
  );

  const handleBack = useCallback(() => {
    const nextId = idsArray[currentIndex - 1];
    if (!nextId) {
      return;
    }
    navigation.setParams({ id: nextId });
  }, [currentIndex, idsArray, navigation]);

  const handleNext = useCallback(() => {
    const nextId = idsArray[currentIndex + 1];
    if (!nextId) {
      return;
    }
    navigation.setParams({ id: nextId });
  }, [currentIndex, idsArray, navigation]);

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading || !product) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}>
      {/* Header con immagine */}
      <Image source={{ uri: product.image }} style={styles.imageHeader} />

      {/* Navigazione tra i prodotti */}
      <View style={styles.navigatorContainer}>
        <Ionicons
          name="chevron-back-circle"
          size={32}
          onPress={handleBack}
          color={backIconColor}
        />
        <Ionicons
          name="chevron-forward-circle"
          size={32}
          onPress={handleNext}
          color={forwardIconColor}
        />
      </View>

      {/* Informazioni sul prodotto */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.category}>Category: {product.category}</Text>
        <Text style={styles.price}>Price: ${product.price.toFixed(2)}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.rating}>
        {product.rating.rate != null && <StarRating rating={product.rating.rate} />} ({product.rating.count} reviews)
        </Text>
      </View>

      {/* Spacer e Pulsante "Go Back" */}
      <View style={styles.spacer}></View>
      <Button title="Go Back" onPress={navigation.goBack} />
      <View style={styles.spacer}></View>
    </ScrollView>
  );
};


export default DetailScreen;
