import React, { useEffect } from 'react'
import { useProductStore } from '../store/useProductStore'

function HomePage() {
    const { products, fetchProducts} = useProductStore()

    useEffect(() =>{
        fetchProducts()
    }, [fetchProducts])

    console.log(products)
  return (
    <div>HomePage</div>
  )
}

export default HomePage