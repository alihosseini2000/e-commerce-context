
import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import React from 'react'

function Products() {
  return (
    <div className="my-6 container flexCenter flex-col">
      <Filter />
      <ProductList />
    </div>
  )
}

export default Products