import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import Content from './Components/Content'

const pages = [ 'home', 'achievements', 'projects' ]

const App = () => {
  const [ currentPage, setCurrentPage ] = useState('home');

  return (
    <div>
      <Navbar pagesListInfo={pages} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
      <Content currentPage={currentPage} />
    </div>
  )
}

export default App