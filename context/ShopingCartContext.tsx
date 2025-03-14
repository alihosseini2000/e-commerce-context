"use client"
import React, { createContext, useContext, useState } from "react";

const ShoppingCartContext = createContext({} as TShopingCartContext)

type ShoppingCartContextProvideerProps = {
    children: React.ReactNode
}

type CartItems = {
    id: number;
    qty: number;
}
type TShopingCartContext = {
    cartItems: CartItems[];
    handleIncreaseProductQty: (id: number) => void;
    handleDecreaseProductQty: (id: number) => void;
    getProductQty: (id: number) => number;
    cartTotalQty: number;
    handleRemoveProduct: (id: number) => void;
}

export const useShoppingCartContext = () => {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartContextProvideer({ children }: ShoppingCartContextProvideerProps) {

    const [cartItems, setCartItems] = useState<CartItems[]>([])

    const cartTotalQty = cartItems.reduce((totalQty, item) => {
        return totalQty + item.qty
    }, 0)

    const getProductQty = (id: number) => {
        return cartItems.find(item => item.id === id)?.qty || 0
    }

    const handleIncreaseProductQty = (id: number) => {
        setCartItems(currentItems => {

            let isNotProductExist = currentItems.find(item => item.id === id) == null

            if (isNotProductExist) {
                return [...currentItems, { id: id, qty: 1 }]
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return {
                            ...item,
                            qty: item.qty + 1
                        }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const handleDecreaseProductQty = (id: number) => {
        setCartItems(currentItems => {

            let isLastOne = currentItems.find(item => item.id === id)?.qty == 1

            if (isLastOne) {
                return currentItems.filter(item => item.id !== id)
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return {
                            ...item,
                            qty: item.qty - 1
                        }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const handleRemoveProduct = (id: number) => {
        setCartItems(currentItems => {
            return currentItems.filter(item => item.id != id)
        })
    }

    return (
        <ShoppingCartContext.Provider value={{ cartItems, handleIncreaseProductQty, handleDecreaseProductQty, getProductQty, cartTotalQty, handleRemoveProduct }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}