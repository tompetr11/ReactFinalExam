import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  imageHeader: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  navigatorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  infoContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  category: {
    fontSize: 16,
    color: "#777",
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
    lineHeight: 22,
  },
  rating: {
    fontSize: 16,
    fontWeight: "500",
    color: "#444",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  spacer: {
    height: 20,
  },
});