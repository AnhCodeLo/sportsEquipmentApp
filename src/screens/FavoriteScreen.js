import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../config";

const FavouriteScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Hàm tải danh sách yêu thích
  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const storedUserId = await AsyncStorage.getItem("userId");
      if (!storedUserId) return;
      setUserId(storedUserId);

      // Lấy danh sách yêu thích từ AsyncStorage (nếu có)
      const storedFavorites = await AsyncStorage.getItem(
        `favorites_${storedUserId}`
      );
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }

      // Gọi API để lấy danh sách yêu thích mới nhất bằng GET
      const response = await axios.get(
        `${BASE_URL}/api/favorite/${storedUserId}`
      );

      // Cập nhật state và lưu vào AsyncStorage để tránh mất dữ liệu khi reload
      setFavorites(response.data.favoriteProducts);
      await AsyncStorage.setItem(
        `favorites_${storedUserId}`,
        JSON.stringify(response.data.favoriteProducts)
      );
    } catch (error) {
      Alert.alert("Lỗi", "Không thể tải danh sách yêu thích!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Gọi lại khi quay lại màn hình
  useEffect(() => {
    fetchFavorites();
    const unsubscribe = navigation.addListener("focus", fetchFavorites);
    return unsubscribe;
  }, [navigation]);

  const handleRemoveFavorite = async (productId) => {
    try {
      console.log(
        `🗑️ Xóa sản phẩm yêu thích: ${productId} cho user: ${userId}`
      );

      const response = await axios.delete(
        `${BASE_URL}/api/favorite/${userId}/${productId}`
      );

      if (response.status === 200) {
        console.log("✅ Xóa sản phẩm thành công!");

        const updatedFavorites = favorites.filter(
          (item) => item._id !== productId
        );
        setFavorites(updatedFavorites);

        await AsyncStorage.setItem(
          `favorites_${userId}`,
          JSON.stringify(updatedFavorites)
        );

        Alert.alert("Thông báo", "Đã xóa khỏi danh sách yêu thích.");
      } else {
        throw new Error("Không thể xóa sản phẩm từ server.");
      }
    } catch (error) {
      console.error("❌ Lỗi khi xóa sản phẩm:", error.response?.data || error);
      Alert.alert("Lỗi", "Không thể xóa sản phẩm!");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>
          {item.description || "Mô tả sản phẩm đang cập nhật..."}
        </Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>

      {/* Nút "Mua ngay" */}
      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>Buy Now</Text>
      </TouchableOpacity>

      {/* Nút xóa khỏi danh sách yêu thích */}
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveFavorite(item._id)}
      >
        <Ionicons name="trash-outline" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favourite</Text>
        <TouchableOpacity>
          <Ionicons name="cart-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Danh sách sản phẩm yêu thích */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#FF6B81"
          style={{ marginTop: 20 }}
        />
      ) : favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <Text style={styles.emptyText}>
          Bạn chưa có sản phẩm yêu thích nào.
        </Text>
      )}

      {/* Nút Find More */}
      <TouchableOpacity
        style={styles.findMoreButton}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        <Text style={styles.findMoreText}>Find More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDE8F3",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    top: 22,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    top: 20,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  productFlavor: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },
  productPrice: {
    fontSize: 16,
    color: "#ff6b81",
    fontWeight: "bold",
    marginTop: 5,
  },
  productDescription: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
    lineHeight: 20,
  },

  buyButton: {
    backgroundColor: "#FF6B81",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  buyButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  removeButton: {
    marginLeft: 10,
  },
  findMoreButton: {
    backgroundColor: "#FF6B81",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  findMoreText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#777",
    marginTop: 20,
  },
});

export default FavouriteScreen;
