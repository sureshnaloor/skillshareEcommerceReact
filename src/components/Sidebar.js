import React from 'react'
import Basketcart from './Basketcart'
import Search from './Search'
import Categories from './Categories'

export default function Sidebar() {
  return (
    <div>
      {' '}
      <Basketcart />
      <Search />
      <Categories />
    </div>
  )
}
