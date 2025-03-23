
import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import React from 'react'

function Products() {
  return (
    <div className="container flexCenter flex-col">
      <Filter />
      <ProductList />
    </div>
  )
}

export default Products