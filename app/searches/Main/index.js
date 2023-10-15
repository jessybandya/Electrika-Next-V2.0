'use client'

import { techCategories } from '@components/data';
import { Avatar, Card, Input, List, ListItem, ListItemPrefix, ListItemSuffix, Typography } from '@material-tailwind/react';
import { Icon } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import Suggestions from './Sugestions';
import { useRouter } from 'next/navigation';

function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function Main({ allData, images }) {

  const navigate = useRouter();
  const [posts1, setPosts1] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);
  console.log("Images: ", filteredPosts)


  useEffect(() => {
    const fetchData = async () => {
     
      setPosts1(allData);
    };

    fetchData();
  }, [allData]);

  useEffect(() => {
    const fetchImagesAndFilter = async () => {
      if (posts1?.length > 0) {
        const postsWithImages = await Promise.all(
          posts1.map(async (res) => {
            const id = res.id;
            const imagesForID = images.find(img => img.id === id)?.images || []; // Find images by matching ID
            return {
              ...res,
              images: imagesForID,
            };
          })
        );
  
        setFilteredPosts(
          postsWithImages.filter((res) =>
            res?.title?.toLowerCase()?.includes(searchTerm.toLowerCase())
          )
        );
      } else {
        setFilteredPosts([]);
      }
    };
  
    fetchImagesAndFilter();
  }, [searchTerm, posts1, images]);


  const updateSearchResults = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePostClick = (post) => {
    setShowSuggestions(false); // Hide suggestions on click
    navigate.push(`/product-view/${post.id}`);
  };

  const handleOutsideClick = (e) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);



    const pageTitle = `Search Page | Electrika Computers`
    const pageDescription = "Browse and buy the latest laptops & other electronics at our online store.";
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
      <div className="hidden sm:block w-1/4 mr-5">
      <Card className="bg-gray-100">
      <List>
      <ListItem disabled={true}>Categories</ListItem>
      {techCategories.map((category) => (
        <Link href={`/category/${category.id}/1`}>
        <ListItem ripple={false} className="py-1 pr-1 pl-4">
        {category.name}
        <ListItemSuffix>
        <Icon variant="text" color="blue-gray">{category.icon}</Icon>
      </ListItemSuffix>
      </ListItem>
      </Link>
        ))}
      </List>

    </Card>
      </div>
      <div className="w-full">
      <div className="flex items-center">   
      <label htmlFor="simple-search" className="sr-only">Search</label>
      <div className="w-full">
      <Input color="blue" type="text"
        value={searchTerm}
        onChange={updateSearchResults}
        onFocus={() => setShowSuggestions(true)}

        id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" label="Search from Electrika..." />
      </div>
      <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
        <span className="sr-only">Search</span>
      </button>
    </div>

    {searchTerm ?(
      <>
      <ListItem disabled={true}>Search results: {filteredPosts.length}</ListItem>
      <List       
      style={{
        maxHeight:'calc(110vh - 200px)',
        overflowY:'auto',
      }}>
      {filteredPosts.map((post, index) => (
        <Link href={`/product-view/${post.id}`}>
        <ListItem>
        <ListItemPrefix>
        {images.length === 0 ? (
          <Avatar variant="circular" alt="Electrika" src="https://firebasestorage.googleapis.com/v0/b/electrika-store.appspot.com/o/electrika-welcome.jpg?alt=media&token=34abff30-6591-4eef-a761-7b76bd78b982" />
      ):(
        <Avatar variant="circular" alt="Electrika" src={post?.images[0].image_url} />
      )}
        </ListItemPrefix>
        <div>
          <Typography variant="h6" color="blue">
          {post.title}
          </Typography>
          <Typography variant="small" color="gray" className="font-normal">
          Ksh{numberWithCommas(post.initialPrice)} - {post.category}
          </Typography>
        </div>
      </ListItem>
      </Link>
      ))}
      </List>
    </>
    ):(
      <Suggestions data={allData} images={images} />
    )}
      </div>
    </div>
  </div>
  )
}

export default Main