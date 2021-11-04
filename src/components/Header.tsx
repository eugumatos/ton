import React from 'react';
import { View, Text,TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Constants from 'expo-constants';

import { useCart } from '../hooks/useCart';
import { RootStackParamList } from '../routes';

type cartScreenProp = NativeStackNavigationProp<RootStackParamList, 'Cart'>;

export function Header() {
  const navigation = useNavigation<cartScreenProp>();
  const route = useRoute();

  const { cart } = useCart();

  const isCart = route.name === "Cart";

  return (
    <View style={styles.container}>
      <View style={[styles.header, { justifyContent: isCart ? 'space-between': 'flex-end' }]}>
       { isCart &&
        <TouchableOpacity  onPress={() => navigation.navigate('Home')}>
          <Feather name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
       }
        <TouchableOpacity style={styles.cart} onPress={() => navigation.navigate('Cart')}> 
          { cart.length > 0 && 
            <View style={styles.notification}>
              <Text style={styles.count}>{cart.length}</Text>
            </View>
          }
          <Feather name="shopping-cart" color="black" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight + 10,
    borderBottomColor: "#e6e6e6",
    borderBottomWidth: 2
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  cart: {
    position: 'relative',
  },
  notification: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: 20,
    borderWidth: 2,
    backgroundColor: 'tomato',
    borderColor: 'tomato',
    borderRadius: 50,
    zIndex: 10,
    top: -10,
    right: -10
  },
  count: {
    color: '#f5f5f5',
    fontSize: 13,
    fontWeight: 'bold'
  }
});