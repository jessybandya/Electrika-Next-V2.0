"use client"

import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { Button, Carousel, MenuItem, Typography } from '@material-tailwind/react';
import { techCategories } from '@components/data';
import Link from 'next/link';
import { Icon } from '@mui/material';
import Slider from "react-slick";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Laptops from './Laptops';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Desktops from './Desktops';
import Monitors from './Monitors';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


const SampleNextArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='next'>
        <ArrowForwardIosIcon className='fa fa-long-arrow-alt-right' />
      </button>
    </div>
  )
}
const SamplePrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='prev'>
        <ArrowBackIosIcon className='fa fa-long-arrow-alt-left' />
      </button>
    </div>
  )
}


const settings = {
  dots: false,
  infinite: true,
  speed: 20000,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }
  ]
};


function Home({ allData, images }) {

  const pageTitle = "Welcome to our Online Store";
  const pageDescription = "Discover a wide range of laptops and shop online with ease.";
  const imageUrl = "/media/images/favicon.ico";

  return (
    <div className="header_sticky">
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
    <Carousel autoplay={true} loop={true} autoplayDelay={10000} style={{marginTop:65}}>
    <figure className="relative h-96 w-full">
    <img
      className="h-full w-full object-cover object-center"
      src="/images/slider/slider-01.jpg"
      alt="nature image"
    />
    <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/60 py-4 px-6 shadow-lg shadow-black/5 saturate-200">
      <div>
        <Typography variant="h5" style={{color:'#5C5CFF'}}>
          Electrika Computers
        </Typography>
        <Typography color="blue-gray" className="mt-2 font-normal">
          HP Elitebook 830 G5 - KES46,500
        </Typography>
      </div>
      <Typography>
      <Button variant="outlined" style={{color:'blue', border: '1px solid blue'}}>
      Get Now    
      </Button>
      </Typography>
    </figcaption>
  </figure>

  <figure className="relative h-96 w-full">
  <img
    className="h-full w-full object-cover object-center"
    src="/images/slider/slider-03.jpg"
    alt="nature image"
  />
  <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/60 py-4 px-6 shadow-lg shadow-black/5 saturate-200">
    <div>
      <Typography variant="h5" style={{color:'#5C5CFF'}}>
        Electrika Computers
      </Typography>
      <Typography color="blue-gray" className="mt-2 font-normal">
        Dell Latitude e7250 - KES32,000
      </Typography>
    </div>
    <Typography>
    <Button variant="outlined" style={{color:'blue', border: '1px solid blue'}}>
    Get Now    
    </Button>
    </Typography>
  </figcaption>
</figure>

<figure className="relative h-96 w-full">
<img
  className="h-full w-full object-cover object-center"
  src="/images/slider/slider-04.jpg"
  alt="nature image"
/>
<figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/60 py-4 px-6 shadow-lg shadow-black/5 saturate-200">
  <div>
    <Typography variant="h5" style={{color:'#5C5CFF'}}>
      Electrika Computers
    </Typography>
    <Typography color="blue-gray" className="mt-2 font-normal">
      Lenovo Thinkpad T470 - KES31,999
    </Typography>
  </div>
  <Typography>
  <Button variant="outlined" style={{color:'blue', border: '1px solid blue'}}>
  Get Now    
  </Button>
  </Typography>
</figcaption>
</figure>

    </Carousel>
    <div style={{paddingLeft:30, paddingRight:30}}>
    <hr />
    <Slider
    className='mx-auto grid max-w-screen-xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'
    {...settings}>
    {techCategories.map(({ name, icon, id }) => (
      <Link href={`/category/${id}`} key={name}>
        <MenuItem style={{display:'block'}}>
          <Typography variant="h6" color="blue">
          <center>
          <Icon style={{fontSize:35}}>{icon}</Icon>
          </center>
          </Typography>
          <Typography variant="small" color="gray" className="font-normal ml-3">
            <center>
            {name}
            </center>
          </Typography>
        </MenuItem>
      </Link>
    ))}
  </Slider>
</div>
<hr />
<br />
  <div className="flex flex-col gap-6">
  <div style={{paddingLeft:50, paddingRight:50}} className="flex justify-between items-center">
  <center><Button variant="outlined" style={{color:'blue', border: '1px solid blue'}}>Laptops</Button></center>
<Button color="blue">
<Link href="/category/Laptop/1">
View All
</Link>
</Button>
  </div>
  <Laptops allData={allData} images={images} />
</div>

<br />
<hr />
<br />
<div className="flex flex-col gap-6">
<div style={{paddingLeft:50, paddingRight:50}} className="flex justify-between items-center">
<center><Button variant="outlined" style={{color:'blue', border: '1px solid blue'}}>Desktops</Button></center>
<Button color="blue">
<Link href="/category/Desktop/1">
View All
</Link>
</Button>
</div>
<Desktops allData={allData} images={images} />
</div>

<br />
<hr />
<br />
<div className="flex flex-col gap-6">
<div style={{paddingLeft:50, paddingRight:50}} className="flex justify-between items-center">
<center><Button variant="outlined" style={{color:'blue', border: '1px solid blue'}}>Monitors</Button></center>
<Button color="blue">
<Link href="/category/Monitor/1">
View All
</Link>
</Button>
</div>
<Monitors allData={allData} images={images} />
</div>


      </div>
  
  )
}

export default Home