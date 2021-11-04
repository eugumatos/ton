import React from 'react';
import { TouchableOpacity, View, Image, Button, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 

import { filterDesc } from '../utils/filterDesc';
import { formatPrice } from '../utils/formatPrice';
import { Product as IProduct } from '../types';
import { useCart } from '../hooks/useCart';

// type IProduct = Omit<ProductInterface, "id"|"amount">;

export function Product({ id, image, title, price, amount }: IProduct) {
  const { cart, addProduct, removeProduct } = useCart();

  const productExitsInCart = cart.find(cart => cart.id === id);

  async function handleAddProduct(id: number) {
    await addProduct(id);
  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId);
  }

  return (
    <View style={styles.container}>  
      <Image source={{ uri: image }} style={styles.productImg} />
      <Text style={styles.productText}>
        {filterDesc(title)}
      </Text>
      <View style={styles.productTextOpacity}>
        <Text style={styles.productText}>
          {formatPrice(price)}
        </Text>
      </View>

      <View style={styles.productCart}>
        <MaterialIcons name="add-shopping-cart" size={22} color="black" />
        <Text>{amount || 0}</Text> 
      </View>

      <TouchableOpacity style={styles.productButton} onPress={() => handleAddProduct(id)}>
        <Text style={styles.productText}>Adicionar ao carrinho</Text>
      </TouchableOpacity>
 
      { productExitsInCart && 
        <TouchableOpacity style={styles.productRemove} onPress={() => handleRemoveProduct(id)}>
          <Feather name="x-circle" size={24} color="black" />
        </TouchableOpacity>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingVertical: '2%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImg: {
    width: 150,
    height: 150
  },
  productText: {
    fontSize: 16
  },
  productTextOpacity: {
    opacity: 0.4,
  },
  productCart: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  productButton: {
    marginTop: 15,
    borderColor: '#dcdcdc',
    borderWidth: 1,
    padding: 5,
  },
  productRemove: {
    position: 'absolute',
    padding: 5,
    right: 0,
    top: 0,
  }
})