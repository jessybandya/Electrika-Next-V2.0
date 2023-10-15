import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Tooltip,
    IconButton,
    Spinner,
  } from "@material-tailwind/react";
import Post from "./Post";
import { useEffect, useState } from "react";
   
  export default function Desktops({ allData, images }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const laptops = allData.filter(item => item.category === 'Desktop');
          const postsWithImages = await Promise.all(laptops.slice(0, 6).map(async (item, index) => {
            const id = item.id;
            const imagesForID = images.find(img => img.id === id)?.images || []; // Find images by matching ID
            
            return {
              id: index + 1,
              post: item,
              images: imagesForID,
            };
          }));
  
          const shuffledPosts = shuffleArray(postsWithImages);
      
          setPosts(shuffledPosts);
        } catch (error) {
          console.log('Error fetching data:', error);
        }
      };
      
  
      const shuffleDataPeriodically = () => {
        fetchData();
        const interval = setInterval(fetchData, 1000000); // Set the interval time (in milliseconds) for shuffling data
        return () => clearInterval(interval); // Clear the interval when the component unmounts
      };
  
      fetchData();
      const shuffleTimer = shuffleDataPeriodically();
  
      return () => clearInterval(shuffleTimer); // Clear the shuffle timer when the component unmounts
    }, [allData]);
  
        // Function to shuffle an array randomly
        const shuffleArray = (array) => {
          const shuffledArray = [...array];
          for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
          }
          return shuffledArray;
        };
      
    return (
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.length > 0 ? (
        posts.map(({ id, post, images }) => (
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
          images={images}
          storage={post.storage}
          />
        ))
      ) : (
        <center>
        <Spinner color="blue"/>
        </center>
      )}
      </div>
    );
  }