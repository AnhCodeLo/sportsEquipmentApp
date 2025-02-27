import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const menuItems = [
  { icon: "heart-outline", title: "Favourites" },
  { icon: "download-outline", title: "Downloads" },
  { icon: "globe-outline", title: "Language" },
  { icon: "location-outline", title: "Location" },
  { icon: "card-outline", title: "Subscription" },
  { icon: "trash-outline", title: "Clear cache" },
  { icon: "time-outline", title: "Clear history" },
  { icon: "log-out-outline", title: "Log out", color: "red" },
];

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <Ionicons name="settings-outline" size={24} color="black" />
      </View>

      {/* Profile Info */}
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: "https://imgv3.fotor.com/images/gallery/3D-male-character-portrait-made-by-Fotor-AI-face-generator.jpg",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Charlotte King</Text>
        <Text style={styles.profileUsername}>@johnkinggraphics</Text>
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Menu List */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons
              name={item.icon}
              size={24}
              color={item.color || "black"}
            />
            <Text style={[styles.menuText, { color: item.color || "black" }]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    top: 20,
  },
  headerTitle: { fontSize: 22, fontWeight: "bold" },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: { fontSize: 20, fontWeight: "bold" },
  profileUsername: { fontSize: 14, color: "gray" },
  editProfileButton: {
    marginTop: 10,
    backgroundColor: "#FF6B81",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editProfileText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuText: { fontSize: 16, marginLeft: 10 },
});

export default ProfileScreen;
