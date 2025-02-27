import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../config";
import styles from "../styles/HomeStyles";

const windowHeight = Dimensions.get("window").height;

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
        fetchFavoriteProducts(storedUserId);
      }
    };
    fetchUserId();
    fetchProducts(page);
  }, [page]);

  const fetchProducts = async (pageNum = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/products`, {
        params: { page: pageNum, limit: 4 },
      });
      setProducts((prev) => [...prev, ...response.data.products]);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavoriteProducts = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/favorite/${userId}`);
      setFavorites(response.data.favoriteProducts);
    } catch (error) {
      console.error("Error fetching favorite products:", error);
    }
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={[styles.productCard, { width: "48%", marginBottom: 15 }]}
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
    >
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.productImage} />
      ) : (
        <View style={styles.productImagePlaceholder}>
          <Text>No Image</Text>
        </View>
      )}
      <Text style={styles.productTitle}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="grid-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Hello Jessica</Text>
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color="gray" />
        <TextInput placeholder="Search" style={styles.searchInput} />
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <Image
          //source={require("../assets/sale.png")}
          style={styles.bannerImage}
        />
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerTitle}>Big Sale</Text>
          <Text style={styles.bannerSubtitle}>
            Get the trendy fashion at a special price
          </Text>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButtonActive}>
          <Text style={styles.filterTextActive}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Popular</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Recent</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Recommended</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <View style={[styles.container, { flex: 1 }]}>
      {renderHeader()}

      {/* Khung chứa danh sách sản phẩm */}
      <View
        style={[styles.productListContainer, { height: windowHeight * 0.6 }]}
      >
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item, index) => `${item._id}-${index}`}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          onEndReached={() => setPage((prevPage) => prevPage + 1)}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
      </View>

      {/* Fixed Bottom Navigation */}
      <View style={fixedStyles.bottomNav}>
        <TouchableOpacity>
          <Ionicons name="home" size={28} color="#ff6b81" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("FavoriteScreen")}>
          <Ionicons name="heart-outline" size={28} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
          <Ionicons name="cart-outline" size={28} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
          <Ionicons name="person-outline" size={28} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const fixedStyles = StyleSheet.create({
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
});

export default HomeScreen;
