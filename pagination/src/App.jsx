import { useState } from 'react'
import './App.css'
import Pagination from './components/Pagination'
import Posts from './components/Posts';
import { useEffect } from 'react';

const TOTAL_PAGES = 10;

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postData, setPostData] = useState(null);


  const onPageChange = (pageNumber) => {
    if(pageNumber > TOTAL_PAGES || pageNumber < 0) {
      return;
    }
    fetch(`https://picsum.photos/v2/list?page=${pageNumber}&limit=5`)
    .then(res => res.json())
    .then(data => {
        setPostData(data)
        setCurrentPage(pageNumber);
    });
  }

  useEffect(() => {
    onPageChange(1)
  }, [])

  return (
    <>
      <Posts postData={postData} />
      <Pagination totalPages={TOTAL_PAGES} currentPage={currentPage} handlePageClick={onPageChange} />
    </>
  )
}

export default App
