import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);

  const fetchCartItems = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem("userId");
      if (!storedUserId) return;
      setUserId(storedUserId);
      const storedCart = await AsyncStorage.getItem(`cart_${storedUserId}`);
      const cart = storedCart ? JSON.parse(storedCart) : [];
      setCartItems(cart);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể tải giỏ hàng!");
    }
  };

  useEffect(() => {
    fetchCartItems();
    const unsubscribe = navigation.addListener("focus", fetchCartItems);
    return unsubscribe;
  }, [navigation]);

  const updateCartItems = async (newCart) => {
    setCartItems(newCart);
    await AsyncStorage.setItem(`cart_${userId}`, JSON.stringify(newCart));
  };

  const handleIncreaseQuantity = (item) => {
    const updatedCart = cartItems.map((cartItem) => {
      if (cartItem._id === item._id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });
    updateCartItems(updatedCart);
  };

  const handleDecreaseQuantity = (item) => {
    const updatedCart = cartItems.map((cartItem) => {
      if (cartItem._id === item._id) {
        return {
          ...cartItem,
          quantity: cartItem.quantity > 1 ? cartItem.quantity - 1 : 1,
        };
      }
      return cartItem;
    });
    updateCartItems(updatedCart);
  };

  const handleRemoveCartItem = async (itemId) => {
    try {
      const updatedCart = cartItems.filter((item) => item._id !== itemId);
      updateCartItems(updatedCart);
      Alert.alert("Thông báo", "Đã xóa sản phẩm khỏi giỏ hàng.");
    } catch (error) {
      Alert.alert("Lỗi", "Không thể xóa sản phẩm khỏi giỏ hàng.");
    }
  };

  const calculateTotal = () => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return total.toFixed(2);
  };

  // Hàm checkout: hiển thị thông báo và xóa giỏ hàng
  const handleCheckout = async () => {
    Alert.alert("Thanh toán", "Thanh toán thành công!");
    // Xóa giỏ hàng khỏi AsyncStorage và cập nhật state
    await AsyncStorage.removeItem(`cart_${userId}`);
    setCartItems([]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity onPress={() => handleDecreaseQuantity(item)}>
            <Ionicons name="remove-circle-outline" size={24} color="gray" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => handleIncreaseQuantity(item)}>
            <Ionicons name="add-circle-outline" size={24} color="gray" />
          </TouchableOpacity>
        </View>
        <Text style={styles.productTotal}>
          Tổng: ${(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveCartItem(item._id)}
      >
        <Ionicons name="trash-outline" size={24} color="red" />
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
        <Text style={styles.headerTitle}>Giỏ Hàng</Text>
        <View style={{ width: 24 }} />
      </View>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Giỏ hàng của bạn trống.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 140 }}
        />
      )}

      {/* Footer thanh toán */}
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>TOTAL</Text>
          <Text style={styles.totalAmount}>${calculateTotal()}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutText}>CHECKOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    top: 22,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#F9F9F9",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    top: 22,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  productTotal: {
    fontSize: 18,
    color: "#FF6B81",
    fontWeight: "bold",
    marginTop: 10,
  },
  removeButton: {
    marginLeft: 10,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 16,
    color: "gray",
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#FF6B81",
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CartScreen;
