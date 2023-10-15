import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import Link from 'next/link';
import { Avatar, ListItem, ListItemPrefix, Typography } from '@material-tailwind/react';

function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function Post({ title, index, initialPrice, category, electronicID, timestamp, finalPrice, images }) {



  return (
    <Link href={`/product-view/${electronicID}`}>
    <ListItem>
    <ListItemPrefix>
    {images.length === 0 ? (
      <Avatar variant="circular" alt="Electrika" src="https://firebasestorage.googleapis.com/v0/b/electrika-store.appspot.com/o/electrika-welcome.jpg?alt=media&token=34abff30-6591-4eef-a761-7b76bd78b982" />
  ):(
    <Avatar variant="circular" alt="Electrika" src={images[0].image_url} />
  )}
    </ListItemPrefix>
    <div>
      <Typography variant="h6" color="blue">
      {title}
      </Typography>
      <Typography variant="small" color="gray" className="font-normal">
      Ksh{numberWithCommas(initialPrice)} - {category}
      </Typography>
    </div>
  </ListItem>
  </Link>
  );
}

export default Post;
