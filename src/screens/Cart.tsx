import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Header } from '../components/Header';
import { useCart } from '../hooks/useCart';
import { filterDesc } from '../utils/filterDesc';
import { formatPrice } from '../utils/formatPrice';
import { api } from '../services/api';
import { Product } from '../types';

export function Cart() {
  const { cart, removeProduct, updateProductAmount } = useCart();

  const cartFormatted = cart.map(product => {
    const newCart = {
      ...product, 
      titleFormatted: filterDesc(product.title),
      priceFormatted: formatPrice(product.price),
      subTotal: formatPrice(product.amount * product.price)
    };

    return newCart;
  });

  const total = formatPrice(
    cart.reduce((sumTotal, product) => {
      return sumTotal + (product.amount * product.price);   
    }, 0)
  );

  function handleProductIncrement(product: Product) {
    updateProductAmount({productId: product.id, amount: product.amount + 1});
  }

  function handleProductDecrement(product: Product) {
    if (product.amount === 1) {
      removeProduct(product.id)
    }

    updateProductAmount({productId: product.id, amount: product.amount - 1});
  }

  return (
    <>
    <Header />
    <View style={styles.container}>
      <Text style={styles.cartTitle}>Carinho</Text>

      <Text style={styles.cartSubTitle}>
        {cartFormatted.length === 0 
          ? 'Nenhum produto adicionado ao carrinho' 
          : `${cartFormatted.length} produtos adicionados:`
        }
      </Text>

      <ScrollView>
        { cartFormatted.map(productCart => (
          <View key={productCart.id}>
            <View style={styles.cartProduct}>
              <Image source={{ uri: productCart.image }} style={styles.cartImg} />
              <Text style={styles.cartDesc}>{productCart.titleFormatted}</Text>
    
              <View style={styles.cartQtd}>
                <TouchableOpacity onPress={() => handleProductDecrement(productCart)}>
                  <Feather name="minus-circle" size={26} color="black" />
                </TouchableOpacity>
                
                <Text style={[styles.cartDesc, { paddingHorizontal: 10 }]}>{productCart.amount}</Text>
                
                <TouchableOpacity onPress={() => handleProductIncrement(productCart)}>
                  <Feather name="plus-circle" size={26} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.cartSubtotal}>Subtotal: {productCart.subTotal}</Text>
          </View>
        )) }
      </ScrollView>
      <Text style={styles.cartTotal}>TOTAL: {total}</Text>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  cartTitle: {
    fontSize: 25,
    paddingLeft: 10,
    fontFamily: 'Anton_400Regular'
  },
  cartSubTitle: {
    paddingLeft: 10,
    marginVertical: 5,
    fontSize: 18,
  },
  cartImg: {
    width: 100,
    height: 100
  },
  cartProduct: {
    paddingVertical: '2%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  cartDesc: {
    fontSize: 16
  },
  cartQtd: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cartSubtotal: {
    textAlign: 'right',
    paddingRight: 10,
  },
  cartTotal: {
    fontFamily: 'Anton_400Regular',
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 40,
    textAlign: 'right'
  }
})