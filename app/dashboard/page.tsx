"use client"

import axios from "axios"
import { ChangeEvent, useState } from "react"

function Dashboard() {

  const [newProduct, setNewProduct] = useState({
    title: "",
    image: "",
    price: "",
    categoryId: "",
    description: "",
  })

  const handleChangeProduct = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target
    setNewProduct({
      ...newProduct,
      [name]: value,
    })
  }

  const handleCreateProduct = ()=>{

    axios({
      method: "POST",
      url: "https://api.escuelajs.co/api/v1/products/",
      data: {
        "title": newProduct.title,
        "price": newProduct.price,
        "description": newProduct.description,
        "categoryId": newProduct.categoryId,
        "images": [newProduct.image]
      }
    })
    
  }

  return (
    <div className='container flex flex-col gap-4 my-8'>
      <div className='grid grid-cols-3 gap-4'>
        <input
          onChange={handleChangeProduct}
          className='bg-gray-900 focus:outline-orange-600 p-2 rounded-lg border border-orange-400'
          type="text"
          name="title"
          id="title"
          placeholder="title" />
        <input
          onChange={handleChangeProduct}
          className='bg-gray-900 focus:outline-orange-600 p-2 rounded-lg border border-orange-400'
          type="text"
          name="price"
          id="price"
          placeholder="price" />
           <input
          onChange={handleChangeProduct}
          className='bg-gray-900 focus:outline-orange-600 p-2 rounded-lg border border-orange-400'
          type="number"
          name="categoryId"
          id="categoryId"
          placeholder="categoryId" />
        <input
          onChange={handleChangeProduct}
          className='bg-gray-900 focus:outline-orange-600 p-2 rounded-lg border border-orange-400'
          type="text"
          name="image"
          id="image"
          placeholder="image" />
      </div>
      <textarea
        onChange={handleChangeProduct}
        className='bg-gray-900 focus:outline-orange-600 p-2 rounded-lg border border-orange-400'
        name="description"
        id="description"
        placeholder='description'></textarea>
      <button
      onClick={handleCreateProduct} 
      className='bg-orange-600 text-white rounded-lg px-4 py-2'>Create</button>
    </div>
  )
}

export default Dashboard