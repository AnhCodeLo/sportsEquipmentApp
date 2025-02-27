import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/ProductDetailStyles";
import BASE_URL from "../config";
import axios from "axios";

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("#000");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userId, setUserId] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchUserIdAndFavorites = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      if (!storedUserId) return;
      setUserId(storedUserId);

      try {
        // Lấy danh sách yêu thích từ API
        const response = await axios.get(
          `${BASE_URL}/api/favorite/${storedUserId}`
        );
        setFavorites(response.data.favoriteProducts);

        // Kiểm tra nếu sản phẩm này đã được yêu thích
        setIsFavorite(
          response.data.favoriteProducts.some((p) => p._id === product._id)
        );
      } catch (error) {
        console.error("Lỗi khi lấy danh sách yêu thích:", error);
      }
    };

    fetchUserIdAndFavorites();
  }, []);

  const handleToggleFavorite = async () => {
    if (!userId) {
      Alert.alert("Lỗi", "Bạn cần đăng nhập để thêm vào yêu thích!");
      return;
    }

    let updatedFavorites;
    try {
      if (isFavorite) {
        // Xóa khỏi danh sách yêu thích trên API
        await axios.delete(`${BASE_URL}/api/favorite/${userId}/${product._id}`);
        updatedFavorites = favorites.filter((p) => p._id !== product._id);
      } else {
        // Thêm vào danh sách yêu thích trên API
        await axios.post(`${BASE_URL}/api/favorite`, {
          userId,
          productId: product._id,
        });
        updatedFavorites = [...favorites, product];
      }

      // Cập nhật AsyncStorage và UI
      setFavorites(updatedFavorites);
      setIsFavorite(!isFavorite);
      await AsyncStorage.setItem(
        `favorites_${userId}`,
        JSON.stringify(updatedFavorites)
      );

      Alert.alert(
        "Thành công",
        isFavorite
          ? "Đã xóa khỏi danh sách yêu thích."
          : "Đã thêm vào danh sách yêu thích!"
      );
    } catch (error) {
      console.error(
        "Lỗi khi cập nhật yêu thích:",
        error.response?.data || error
      );
      Alert.alert("Lỗi", "Không thể cập nhật danh sách yêu thích!");
    }
  };

  // -------------------------------
  // THÊM CHỨC NĂNG "THÊM VÀO GIỎ HÀNG"
  // -------------------------------
  const handleAddToCart = async () => {
    if (!userId) {
      Alert.alert("Lỗi", "Bạn cần đăng nhập để thêm vào giỏ hàng!");
      return;
    }

    try {
      // Lấy giỏ hàng hiện tại từ AsyncStorage
      const storedCart = await AsyncStorage.getItem(`cart_${userId}`);
      let cart = storedCart ? JSON.parse(storedCart) : [];

      // Kiểm tra nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng
      const index = cart.findIndex((item) => item._id === product._id);
      if (index >= 0) {
        cart[index].quantity += quantity;
      } else {
        // Thêm sản phẩm mới kèm số lượng đã chọn
        cart.push({ ...product, quantity });
      }

      // Lưu lại giỏ hàng mới vào AsyncStorage
      await AsyncStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
      Alert.alert("Thành công", "Đã thêm sản phẩm vào giỏ hàng!");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      Alert.alert("Lỗi", "Không thể thêm sản phẩm vào giỏ hàng!");
    }
  };

  return (
    <View style={styles.container}>
      {/* Nút quay lại */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Giỏ hàng */}
      <TouchableOpacity style={styles.cartButton}>
        <Ionicons name="cart-outline" size={28} color="black" />
      </TouchableOpacity>

      {/* Ảnh sản phẩm */}
      <Image source={{ uri: product.image }} style={styles.productImage} />

      {/* Hộp chứa thông tin sản phẩm */}
      <View style={styles.detailBox}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Tên sản phẩm */}
          <Text style={styles.productTitle}>{product.name}</Text>

          {/* Giá tiền */}
          <View style={styles.priceContainer}>
            <Text style={styles.oldPrice}>
              ${product.oldPrice || product.price + 50}
            </Text>
            <Text style={styles.newPrice}>${product.price}</Text>
          </View>

          {/* Mô tả sản phẩm */}
          <Text style={styles.sectionTitle}>Mô tả sản phẩm</Text>
          <Text style={styles.productDescription}>
            {product.description || "Mô tả sản phẩm đang cập nhật..."}
          </Text>

          {/* Chọn màu sắc & số lượng */}
          <View style={styles.rowContainer}>
            {/* Chọn màu sắc */}
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionTitle}>Chọn màu sắc</Text>
              <View style={styles.colorOptions}>
                {["#000", "#F8C8DC", "#D3D3D3"].map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorCircle,
                      {
                        backgroundColor: color,
                        borderWidth: selectedColor === color ? 2 : 0,
                      },
                    ]}
                    onPress={() => setSelectedColor(color)}
                  />
                ))}
              </View>
            </View>

            {/* Chọn số lượng */}
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Text style={styles.sectionTitle}>Số lượng</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={() => setQuantity(Math.max(1, quantity - 1))}
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityValue}>{quantity}</Text>
                <TouchableOpacity
                  onPress={() => setQuantity(quantity + 1)}
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Chọn kích thước */}
          <Text style={styles.sectionTitle}>Chọn kích cỡ</Text>
          <View style={styles.sizeOptions}>
            {["S", "M", "L", "XL"].map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeButton,
                  selectedSize === size && styles.selectedSize,
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text
                  style={[
                    styles.sizeText,
                    selectedSize === size && styles.selectedSizeText,
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Nút Add to Cart */}
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
          >
            <Text style={styles.addToCartText}>+ Add to Cart</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Nút yêu thích */}
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={handleToggleFavorite}
      >
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={24}
          color="red"
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProductDetailScreen;
