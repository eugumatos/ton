import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';

import { Header } from '../components/Header';
import { Product } from '../components/Product';
import { Product as IProduct } from '../types';
import { useCart } from '../hooks/useCart'
import { api } from '../services/api';

interface CartItemsAmount {
  [key: number]: number;
}

export function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);

  const { addProduct, cart } = useCart();

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    sumAmount[product.id] = product.amount;
    
    return sumAmount;
  }, {} as CartItemsAmount)

  useEffect(() => {
    api.get('products')
      .then(response => {
        setProducts(response.data)
      });
  }, []);

  return (
    <>
    <Header />
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Calçados</Text>

        <View style={styles.containerProducts}>
          { products.map(product => (
            <Product 
              key={product.id} 
              id={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              amount={cartItemsAmount[product.id]}
            />
          )) }
        </View>
      </ScrollView>
    </View>     
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeee',
    marginBottom: 25,
  },
  title: {
    fontSize: 25,
    paddingLeft: 10,
    fontFamily: 'Anton_400Regular'
  },
  containerProducts: {
    marginTop: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  product: {
    width: 160,
    height: 160,
    marginBottom: 20,
    backgroundColor: 'tomato'
  }
});

