import React from 'react'
import { useParams } from 'react-router'

const SingleProduct = () => {
    const {_id} = useParams()
  return (
    <div>SingleProduct</div>
  )
}

export default SingleProduct