import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    marginTop: 50,
    margin: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 10,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
  },
  banner: {
    backgroundColor: "#ff6b81",
    borderRadius: 15,
    padding: 7,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    margin: 17,
  },
  bannerImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  bannerTextContainer: {
    marginLeft: 10,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  bannerSubtitle: {
    fontSize: 12,
    color: "#fff",
    marginTop: 5,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
  },
  filterButtonActive: {
    backgroundColor: "#ff6b81",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  filterText: {
    fontSize: 12,
    color: "#333",
  },
  filterTextActive: {
    fontSize: 12,
    color: "#fff",
  },
  productGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productCard: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
  },
  productPrice: {
    fontSize: 12,
    color: "#ff6b81",
    marginTop: 5,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#f2f2f2",
    marginTop: 20,
  },
});

export default styles;
