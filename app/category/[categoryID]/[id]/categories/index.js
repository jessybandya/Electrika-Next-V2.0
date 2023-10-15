'use client'
import React, {useState, useEffect} from 'react'
import {
  List,
  ListItem,
  ListItemSuffix,
  Card,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { techCategories } from '@components/data';
import { CircularProgress, Icon, Slider } from '@mui/material';
import Link from 'next/link';
import { Helmet } from 'react-helmet';
import Post from './Post';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
 
function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path
        fillRule="evenodd"
        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
        clipRule="evenodd"
      />
    </svg>
  );
}
function Categories({ params, allData, images }) {
    const [value, setValue] = React.useState([16000, 100000]);
    const [posts, setPosts] = useState([])
    const [posts1, setPosts1] = useState([]);
    const commaNumber = require('comma-number')
    const [active, setActive] = React.useState(params.id);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6); // Number of posts to display per page
    const [visiblePages, setVisiblePages] = useState(5); // Number of visible pagination links
  
    
  
    const getItemProps = (index) =>
    ({
      variant: active === index ? "filled" : "text",
      color: "gray",
      onClick: () => setActive(index),
    } );
  
    const fetchData = async (id) => {
      try {
        const laptops = allData.filter(item => item.category === id);
        const postsWithImages = await Promise.all(laptops.map(async (item, index) => {
          const id = item.id;
          const imagesForID = images.find(img => img.id === id)?.images || []; // Find images by matching ID
          
          return {
            id: index + 1,
            post: item,
            images: imagesForID,
          };
        }));
  
        setPosts(postsWithImages);
  
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
  
    useEffect(() => {
    
      // Fetch data initially
      fetchData(params.categoryID);
    }, [params.categoryID]);
  
  
  
    useEffect(() => {
      if (params.id) {
        setCurrentPage(parseInt(params.id));
      } else {
        setCurrentPage(1);
      }
    }, [params.id]);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
  
      // Get current posts based on current page
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    
      const totalPages = Math.ceil(posts.length / postsPerPage);
    
      const getVisiblePageNumbers = () => {
        const halfVisiblePages = Math.floor(visiblePages / 2);
        let startPage = Math.max(currentPage - halfVisiblePages, 1);
        let endPage = Math.min(startPage + visiblePages - 1, totalPages);
    
        if (totalPages - endPage < halfVisiblePages) {
          startPage = Math.max(endPage - visiblePages + 1, 1);
        }
    
        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
      };
    
      const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
  
      const pageTitle = `Category: ${params.categoryID}  |  Electrika Computers`
      const pageDescription = `Category: ${params.categoryID}  |  Electrika Computers`;
      const imageUrl = "/media/images/favicon.ico";

  return (
    <div>
    <Helmet>
    <title>{pageTitle}</title>
    <meta name="description" content={pageDescription} />

    {/* Open Graph meta tags */}
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={pageDescription} />
    <meta property="og:image" content={imageUrl} />

    {/* Twitter Card meta tags */}
    <meta name="twitter:title" content={pageTitle} />
    <meta name="twitter:description" content={pageDescription} />
    <meta name="twitter:image" content={imageUrl} />
  </Helmet>
    <div className="container mx-auto mt-20 flex">
      <div className="hidden sm:block w-1/4">
      <Card className="bg-gray-100">
      <List>
      <ListItem disabled={true}>Categories</ListItem>
      {techCategories.map((category) => (
        <>
        {category.id === params.categoryID ?(
            <Link href={`/category/${category.id}/1`} onClick={()=> fetchData(category.id)}>
            <ListItem ripple={false} className="py-1 pr-1 pl-4" style={{fontWeight:'bold',color:'#42a5f5'}}>
            {category.name}
            <ListItemSuffix>
            <Icon variant="text" color="blue-gray">{category.icon}</Icon>
          </ListItemSuffix>
          </ListItem>
          </Link>
          ):(
            <Link href={`/category/${category.id}/1`} onClick={()=> fetchData(category.id)}>
            <ListItem ripple={false} className="py-1 pr-1 pl-4">
            {category.name}
            <ListItemSuffix>
            <Icon variant="text" color="blue-gray">{category.icon}</Icon>
          </ListItemSuffix>
          </ListItem>
          </Link>
          )}
          </>
        ))}
      </List>
      <hr />
      <List>
      <ListItem disabled={true}>Filter Price</ListItem>
      <ListItem ripple={false}>
      <div>
      Ksh{commaNumber(value[0])} - Ksh{commaNumber(value[1])}
    </div>
      </ListItem>
      <ListItem ripple={false}>
      <Slider
      value={value}
      onChange={handleChange}
      valueLabelDisplay="auto"
      min={0}
      max={400000}
      step={100}
    />

    </ListItem>
      </List>
    </Card>
      </div>
      <div className="w-full">
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {currentPosts?.length > 0 ? (
        currentPosts?.map(({ id, post, images }) => (
          <Post
          index={id}
          key={id}
          electronicID={post.id}
          description={post.description}
          initialPrice={post.initialPrice}
          finalPrice={post.finalPrice}
          title={post.title}
          discount={post.discount}
          image={post.image}
          timestamp={post.timestamp}
          category={post.category}
          percentage={post.percentage}
          os={post.os}
          processor={post.processor}
          ram={post.ram}
          storage={post.storage}
          images={images}
          />
        ))
      ) : (
        <div style={{
          display:'table',
          margin:'auto'
        }}>
          <CircularProgress />
        </div>
      )}
      </div>

      <center className="flex items-center gap-1 mt-5 ml-5">
     {params.id > 1 &&(
      <Link href={`/shop/${currentPage - 1}`}>
      <Button
        variant="text"
        className="flex items-center gap-2"
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </Link>
     )}

    <div className="flex items-center gap-1">
    {getVisiblePageNumbers().map((pageNumber) => (
      <Link href={`/shop/${pageNumber}`} key={pageNumber}>
      {pageNumber === currentPage ?(
        <IconButton
          {...getItemProps(pageNumber)}
          variant="filled"

          color= "blue"
        >
          {pageNumber}
        </IconButton>
      ):(
        <IconButton
        {...getItemProps(pageNumber)}
        variant="text"
        color= "gray"
      >
        {pageNumber}
      </IconButton>
      )}
      </Link>
    ))}
  </div>

  {currentPage < totalPages && (
    <Link href={`/shop/${currentPage + 1}`}>
    <Button
      variant="text"
      className="flex items-center gap-2"
      onClick={next}
    >
      <ArrowRightIcon strokeWidth={2} className="h-4 w-4" /> 
    </Button>
  </Link>
  )}


    </center>
      </div>
    </div>
  </div>
  )
}

export default Categories