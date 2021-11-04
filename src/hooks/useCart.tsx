import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types';
import { api } from '../services/api';

interface CartProviderProps {
  children: ReactNode;
}

export interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext({} as CartContextData);

function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>([]);

  const addProduct = async (productId: number) => {
    try {
      const products = [...cart];
      const findProduct = cart.find(product => product.id === productId);
      
      const stock = await api.get(`/stock/${productId}`);
      const currentAmount = findProduct ? findProduct.amount : 0;
      const amount = currentAmount + 1;

      if (amount > stock.data.amount) {
        console.log('Quantidade solicitada fora de estoque');

        return;
      }
      
      if (findProduct) {
        findProduct.amount = amount;
      } else {
        const product = await api.get(`/products/${productId}`);

        const newProduct = {
          ...product.data,
          amount: 1
        }

        products.push(newProduct);
      }

      setCart(products);
    } catch (error) {
      console.log('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const products = [...cart];
      const findProductIndex = cart.findIndex(product => product.id === productId);

      if (findProductIndex >= 0) {
        products.splice(findProductIndex, 1);
        setCart(products);
      } else {
        throw Error();
      }
    } catch {
      console.log('Erro na remoção do produto');
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {   
      if (amount <= 0) {
        return; 
      }

      const stock = await api.get(`/stock/${productId}`);

      if (amount > stock.data.amount) {
        console.log('Quantidade solicitada fora de estoque');
        
        return;
      }

      const products = [...cart];
      const findProduct = products.find(product => product.id ===  productId);
      
      if (findProduct) {
        findProduct.amount = amount;
        setCart(products);
      } else {
        throw Error();
      }
     
    } catch {
      console.log('Erro na alteração de quantidade do produto');
    }
  };

  return (
    <CartContext.Provider value={{ cart,  addProduct, removeProduct, updateProductAmount }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider'); 
  }

  return context;
}

export { CartProvider, useCart };