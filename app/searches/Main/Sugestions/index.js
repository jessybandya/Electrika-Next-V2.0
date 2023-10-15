import React, { useState, useEffect } from 'react';
import Post from './Post';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { List, ListItem } from '@material-tailwind/react';


export default function Suggestions({ data, images }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsWithImages = await Promise.all(data.slice(0, 20).map(async (item, index) => {
          const id = item.id;
          const imagesForID = images.find(img => img.id === id)?.images || []; // Find images by matching ID
          
          return {
            id: index + 1,
            post: item,
            images: imagesForID,
          };
        }));

        setPosts(postsWithImages);
        setIsLoading(false);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, [data, images]);

  if (isLoading) {
    return (
      <div className="box-suggestions">
        <center style={{ color: '#000', fontWeight: 'bold' }} className="title">Search Suggestions</center>
        <Box style={{ display: 'table', margin: 'auto' }} sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      </div>
    );
  }

  return (
    <div className="box-suggestions">
    <ListItem disabled={true}>Search Suggestions</ListItem>
      <List
      style={{
        maxHeight:'calc(110vh - 200px)',
        overflowY:'auto',
      }}
      >
        {posts.map(({ id, post, images }) => (
          <Post
            index={id}
            key={id}
            electronicID={post.id}
            description={post.description}
            initialPrice={post.initialPrice}
            finalPrice={post.finalPrice}
            title={post.title}
            discount={post.discount}
            images={images}
            timestamp={post.timestamp}
            category={post.category}
            percentage={post.percentage}
            os={post.os}
            processor={post.processor}
            ram={post.ram}
            storage={post.storage}
          />
        ))}
      </List>
    </div>
  );
}
