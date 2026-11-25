
import React, { createContext, useContext, useState } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Create Context
const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const addToCart = (product) => {
    setLoading(true);

    setTimeout(() => {
      setCart(prev => [...prev, product]);
      setLoading(false);
    }, 1000);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, loading }}>
      {children}
    </CartContext.Provider>
  );
}

// Tab 1: Shop
function ShopScreen() {
  const { addToCart, loading } = useContext(CartContext);

  const products = [
    { id: '1', name: 'T-Shirt', price: 250 },
    { id: '2', name: 'Shoes', price: 1200 },
    { id: '3', name: 'Bag', price: 500 },
    { id: '4', name: 'Watch', price: 800 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Shop</Text>

      {loading && (
        <Text style={styles.loading}>Adding to cart...</Text>
      )}

      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.product}>{item.name}</Text>
            <Text>Price: ₱{item.price}</Text>
            <Button
              title="Add to Cart"
              onPress={() => addToCart(item)}
              disabled={loading}
            />
          </View>
        )}
      />
    </View>
  );
}

// Tab 2: Cart
function CartScreen() {
  const { cart } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Shopping Cart</Text>

      <FlatList
        data={cart}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.product}>{item.name}</Text>
            <Text>₱{item.price}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text>Your cart is empty.</Text>
        }
      />

      <Text style={styles.total}>
        Total Items: {cart.length}
      </Text>

      <Text style={styles.total}>
        Total Price: ₱{total}
      </Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Shop" component={ShopScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F6F7',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2471A3',
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3,
  },
  product: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  loading: {
    color: 'green',
    marginBottom: 10,
  },
});
