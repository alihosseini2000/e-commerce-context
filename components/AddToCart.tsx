"use client"
import { useShoppingCartContext } from '@/context/ShopingCartContext';

interface IAddToCartProps {
    id: number;
}
function AddToCart({ id }: IAddToCartProps) {

    const { handleIncreaseProductQty, handleDecreaseProductQty, getProductQty, handleRemoveProduct } = useShoppingCartContext()

    return (
        <div className='flex justify-between pe-8 mt-4'>
            <div className='flex gap-5 items-center'>
                <button
                    onClick={() => handleIncreaseProductQty(id)}
                    className='px-4 py-2 rounded bg-sky-500 text-white'>
                    +
                </button>
                <span>{getProductQty(id)}</span>
                <button
                    onClick={() => handleDecreaseProductQty(id)}
                    className='px-4 py-2 rounded bg-sky-500 text-white'>
                    -
                </button>
            </div>
            <button onClick={() => handleRemoveProduct(id)} className='bg-red-600 text-white rounded p-2'>Delete</button>
        </div>
    )
}

export default AddToCart