'use client'

import { Button, Carousel, Tab, TabPanel, Tabs, TabsBody, TabsHeader, Typography } from '@material-tailwind/react';
import React from 'react'
import { Helmet } from 'react-helmet';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { toast } from 'react-toastify';
import { addToCart } from '@auth/redux/dataSlice';
import { useDispatch } from 'react-redux';


function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

function Product({ params, allData, images }) {
    const classes = "p-4 border-b border-blue-gray-50";
    const dispatch = useDispatch()


    const EmailProduct= () => {
        const recipientEmail = 'info@electrikacomputers.co.ke'
        const subject = encodeURIComponent(`I want to buy this product: ${allData[0]?.title}`);
        const body = encodeURIComponent(`I found this amazing product!\n\nName: ${allData[0]?.title}\nPrice: ${allData[0]?.initialPrice}\nLink: https://electrikacomputers.co.ke/product-view/${params.id}\nDescription: ${allData[0]?.description}\n`);
    
        const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
        
        window.open(mailtoLink, '_blank');
      }
    
      const WhatsAppProduct= () => {
        const phoneNumber = '+254713441634';
        const productTitle = allData[0]?.title;
        const initialPrice = allData[0]?.initialPrice;
        const productLink = `https://electrikacomputers.co.ke/product-view/${params?.id}`;   
        const formattedPrice = parseFloat(allData[0]?.initialPrice).toLocaleString('en-US', { style: 'currency', currency: 'KES' });  
        
        const productMessage = `I want to buy this product:\n\n*Name:* ${productTitle}\n*Price:* ${formattedPrice}\n*Link:* ${productLink}`;
        
        const message = encodeURIComponent(productMessage);
        
        const whatsAppLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
        
        window.open(whatsAppLink, '_blank');
      }


      const handleAddToCart = () => {

        const itemToAdd = {
          id: params.id,
          name: allData[0]?.title,
          price: allData[0]?.initialPrice,
          image: images.length === 0 ? "https://firebasestorage.googleapis.com/v0/b/electrika-store.appspot.com/o/electrika-welcome.jpg?alt=media&token=34abff30-6591-4eef-a761-7b76bd78b982" : images[0].images[0].image_url,
          link: `https://electrikacomputers.co.ke/product-view/${params.id}`,
          quantity: 1,
        };
        
        dispatch(addToCart(itemToAdd));
        toast.success(`"${allData[0]?.title}" has been added to your cart!`,{
          position: "top-center",
        }); // Show toast notification
      };


      const paragraphStyle = {
        marginBottom: '1.5em' // Adjust the spacing as needed
      };
    
      const paragraphs = allData[0]?.description?.split('\n\n').map((paragraph, index) => (
        <p key={index} style={paragraphStyle}>{paragraph}</p>
      ));
    
  return (
    <>
    <Helmet>
    <title>{`${allData[0]?.title}  |  Electrika Computers`}</title>
    <meta name="description" content={allData[0]?.title.slice(0, 100)} />
    <meta property="twitter:image" content={images[0]?.image_url} />
    <meta property="og:image" content={images[0]?.image_url} />
    
    {/* Open Graph meta tags */}
    <meta property="og:title" content={allData[0]?.title}  />
    <meta property="og:description" content={allData[0]?.title.slice(0, 100)} />
    <meta property="og:image" content={images[0]?.image_url}  />

    {/* Twitter Card meta tags */}
    <meta name="twitter:title" content={allData[0]?.title} />
    <meta name="twitter:description" content={allData[0]?.title.slice(0, 100)} />
    <meta name="twitter:image" content={images[0]?.image_url}  />
  </Helmet>
  {allData[0]?.category === 'Laptop' || allData[0]?.category === 'Desktop' ?(
    <section className="py-12 sm:py-7"> 
    <div className="container mx-auto px-4">

      <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
        <div className="lg:col-span-3 lg:row-end-1">
          <div className="lg:flex lg:items-start">
            <div className="lg:order-2 lg:ml-5" style={{backgroundColor:'rgb(0, 191, 243)'}}>
              <center>
              <Carousel autoplay={true} loop={true} autoplayDelay={10000}>
              {images[0].images.map((image, index) => (
            <div className="max-w-xl overflow-hidden rounded-lg">
            <img className="h-full w-full max-w-full object-cover" src={image?.image_url} alt={`Image ${index + 1} of ${images.length}`}/>
          </div>
            ))}
              </Carousel>
              </center>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
          <h1 className="sm: text-2xl font-bold text-blue-900 sm:text-3xl">{allData[0].title}</h1>
          <div className="mt-5 flex items-center">
            <div className="flex items-center">
              <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className />
              </svg>
              <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className />
              </svg>
              <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className />
              </svg>
              <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className />
              </svg>
              <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className />
              </svg>
            </div>
            <p className="ml-2 text-sm font-medium text-gray-500">1 Reviews</p>

          </div>

          <br />
          <hr />
          <table className="w-full min-w-max table-auto text-left">
          <tr>
          <td className={classes}>
          <Typography variant="small" color="blue-gray" style={{fontWeight:'bold'}} className="font-normal text-blue-500 ">
          PRICE
          </Typography>
          </td>
          <td className={`${classes} bg-blue-gray-50/50`}>
          <Typography variant="small" color="blue-gray" style={{fontWeight:'bold'}} className="font-normal">
          Ksh{numberWithCommas(allData[0].initialPrice)}
          </Typography>
          </td>
          </tr>
          <tr>
          <td className={classes}>
          <Typography variant="small" color="blue-gray" style={{fontWeight:'bold'}} className="font-normal text-blue-500 ">
          CATEGORY
          </Typography>
          </td>
          <td className={`${classes} bg-blue-gray-50/50`}>
          <Typography variant="small" color="blue-gray" style={{fontWeight:'bold'}} className="font-normal">
            {allData[0].category}
          </Typography>
          </td>
          </tr>
          <tr>
          <td className={classes}>
          <Typography variant="small" color="blue-gray" style={{fontWeight:'bold'}} className="font-normal text-blue-500 ">
          OS
          </Typography>
          </td>
          <td className={`${classes} bg-blue-gray-50/50`}>
          <Typography variant="small" color="blue-gray" style={{fontWeight:'bold'}} className="font-normal">
            {allData[0].os}
          </Typography>
          </td>
          </tr>
          
          <tr>
          <td className={classes}>
          <Typography variant="small" color="blue-gray" style={{fontWeight:'bold'}} className="font-normal text-blue-500 ">
          PROCESSOR
          </Typography>
          </td>
          <td className={`${classes} bg-blue-gray-50/50`}>
          <Typography variant="small" color="blue-gray" style={{fontWeight:'bold'}} className="font-normal">
            {allData[0].processor}
          </Typography>
          </td>
          </tr>
          <tr>
          <td className={classes}>
          <Typography variant="small" color="blue-gray" style={{fontWeight:'bold'}} className="font-normal text-blue-500 ">
          RAM
          </Typography>
          </td>
          <td className={`${classes} bg-blue-gray-50/50`}>
          <Typography variant="small" color="blue-gray" style={{fontWeight:'bold'}} className="font-normal">
            {allData[0].ram}
          </Typography>
          </td>
          </tr>
          
          <tr>
          <td className={classes}>
          <Typography variant="small" color="blue-gray" style={{fontWeight:'bold'}} className="font-normal text-blue-500 ">
          STORAGE
          </Typography>
          </td>
          <td className={`${classes} bg-blue-gray-50/50`}>
          <Typography variant="small" color="blue-gray" style={{fontWeight:'bold'}} className="font-normal">
            {allData[0].storage}
          </Typography>
          </td>
          </tr>
          </table>
          <div className="flex w-max gap-1 mt-3">
          <Button onClick={handleAddToCart} color="blue">Add <AddShoppingCartIcon /></Button>
          <Button onClick={WhatsAppProduct} style={{backgroundColor:'#59CE72'}}>Buy Via <WhatsAppIcon /></Button>
          <Button onClick={EmailProduct} style={{backgroundColor:'#EA4335'}}>Buy Via <EmailIcon /></Button>
          </div>
        </div>
        <div className="lg:col-span-3">
        <Tabs id="custom-animation" value={0}>
        <TabsHeader>
            <Tab key={0} value={0}>
              <div className="flex items-center gap-2">
                     Descriptions
              </div>
            </Tab>
            <Tab key={1} value={1}>
            <div className="flex items-center gap-2">
                   Reviews
            </div>
          </Tab>
        </TabsHeader>
        <TabsBody
        animate={{
            initial: { y: 250 },
            mount: { y: 0 },
            unmount: { y: 250 },
          }}
        >
            <TabPanel key={0} value={0}>
              {paragraphs}
            </TabPanel>
            <TabPanel key={1} value={1}>
            <div className="w-screen bg-gray-50">
    {/* Reviews */}
      <div className="flex w-full flex-col">
        <div className="text-gray-700">
          <p className="font-medium">Reviews</p>
          <ul className="mb-6 mt-2 space-y-2">
            <li className="flex items-center text-sm font-medium">
              <span className="w-3">5</span><span className="mr-4 text-yellow-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg></span>
              <div className="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-300">
                <div className="h-full w-10/12 bg-yellow-400" />
              </div>
              <span className="w-3">56</span>
            </li>
            <li className="flex items-center text-sm font-medium">
              <span className="w-3">4</span><span className="mr-4 text-yellow-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg></span>
              <div className="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-300">
                <div className="h-full w-8/12 bg-yellow-400" />
              </div>
              <span className="w-3">12</span>
            </li>
            <li className="flex items-center text-sm font-medium">
              <span className="w-3">3</span><span className="mr-4 text-yellow-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg></span>
              <div className="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-300">
                <div className="h-full w-1/12 bg-yellow-400" />
              </div>
              <span className="w-3">4</span>
            </li>
            <li className="flex items-center text-sm font-medium">
              <span className="w-3">2</span><span className="mr-4 text-yellow-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg></span>
              <div className="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-300">
                <div className="h-full w-0 bg-yellow-400" />
              </div>
              <span className="w-3">0</span>
            </li>
            <li className="flex items-center text-sm font-medium">
              <span className="w-3">1</span><span className="mr-4 text-yellow-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg></span>
              <div className="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-300">
                <div className="h-full w-1/12 bg-yellow-400" />
              </div>
              <span className="w-3">5</span>
            </li>
          </ul>
        </div>
        <button className="w-36 rounded-full bg-blue-900 py-3 text-white font-medium">Write a review</button>
    </div>
    {/* /Reviews */}
  </div>
          </TabPanel>
        </TabsBody>
      </Tabs>
        </div>
      </div>
    </div>
  </section>
  ):(    <section className="py-12 sm:py-7"> 
  <div className="container mx-auto px-4">

    <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
      <div className="lg:col-span-3 lg:row-end-1">
        <div className="lg:flex lg:items-start">
          <div className="lg:order-2 lg:ml-5" style={{backgroundColor:'rgb(0, 191, 243)'}}>
            <center>
            <Carousel autoplay={true} loop={true} autoplayDelay={10000}>
            {images[0].images.map((image, index) => (
          <div className="max-w-xl overflow-hidden rounded-lg">
          <img className="h-full w-full max-w-full object-cover" src={image?.image_url} alt={`Image ${index + 1} of ${images.length}`}/>
        </div>
          ))}
            </Carousel>
            </center>
          </div>
        </div>
      </div>
      <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
        <h1 className="sm: text-2xl font-bold text-blue-900 sm:text-3xl">{allData[0].title}</h1>
        <div className="mt-5 flex items-center">
          <div className="flex items-center">
            <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className />
            </svg>
            <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className />
            </svg>
            <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className />
            </svg>
            <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className />
            </svg>
            <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className />
            </svg>
          </div>
          <p className="ml-2 text-sm font-medium text-gray-500">1 Reviews</p>

        </div>

        <br />
        <hr />
        <table className="w-full min-w-max table-auto text-left">
        <tr>
        <td className={classes}>
        <Typography variant="small" color="blue-gray" style={{fontWeight:'bold'}} className="font-normal text-blue-500 ">
        PRICE
        </Typography>
        </td>
        <td className={`${classes} bg-blue-gray-50/50`}>
        <Typography variant="small" color="blue-gray" style={{fontWeight:'bold'}} className="font-normal">
        Ksh{numberWithCommas(allData[0].initialPrice)}
        </Typography>
        </td>
        </tr>
        <tr>
        <td className={classes}>
        <Typography variant="small" color="blue-gray" style={{fontWeight:'bold'}} className="font-normal text-blue-500 ">
        CATEGORY
        </Typography>
        </td>
        <td className={`${classes} bg-blue-gray-50/50`}>
        <Typography variant="small" color="blue-gray" style={{fontWeight:'bold'}} className="font-normal">
          {allData[0].category}
        </Typography>
        </td>
        </tr>
        </table>
        <div className="flex w-max gap-1 mt-3">
        <Button onClick={handleAddToCart} color="blue">Add <AddShoppingCartIcon /></Button>
        <Button onClick={WhatsAppProduct} style={{backgroundColor:'#59CE72'}}>Buy Via <WhatsAppIcon /></Button>
        <Button onClick={EmailProduct} style={{backgroundColor:'#EA4335'}}>Buy Via <EmailIcon /></Button>
        </div>
      </div>
      <div className="lg:col-span-3">
      <Tabs id="custom-animation" value={0}>
      <TabsHeader>
          <Tab key={0} value={0}>
            <div className="flex items-center gap-2">
                   Descriptions
            </div>
          </Tab>
          <Tab key={1} value={1}>
          <div className="flex items-center gap-2">
                 Reviews
          </div>
        </Tab>
      </TabsHeader>
      <TabsBody
      animate={{
          initial: { y: 250 },
          mount: { y: 0 },
          unmount: { y: 250 },
        }}
      >
          <TabPanel key={0} value={0}>
            {paragraphs}
          </TabPanel>
          <TabPanel key={1} value={1}>
          <div className="w-screen bg-gray-50">
  {/* Reviews */}
    <div className="flex w-full flex-col">
      <div className="text-gray-700">
        <p className="font-medium">Reviews</p>
        <ul className="mb-6 mt-2 space-y-2">
          <li className="flex items-center text-sm font-medium">
            <span className="w-3">5</span><span className="mr-4 text-yellow-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg></span>
            <div className="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-300">
              <div className="h-full w-10/12 bg-yellow-400" />
            </div>
            <span className="w-3">56</span>
          </li>
          <li className="flex items-center text-sm font-medium">
            <span className="w-3">4</span><span className="mr-4 text-yellow-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg></span>
            <div className="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-300">
              <div className="h-full w-8/12 bg-yellow-400" />
            </div>
            <span className="w-3">12</span>
          </li>
          <li className="flex items-center text-sm font-medium">
            <span className="w-3">3</span><span className="mr-4 text-yellow-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg></span>
            <div className="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-300">
              <div className="h-full w-1/12 bg-yellow-400" />
            </div>
            <span className="w-3">4</span>
          </li>
          <li className="flex items-center text-sm font-medium">
            <span className="w-3">2</span><span className="mr-4 text-yellow-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg></span>
            <div className="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-300">
              <div className="h-full w-0 bg-yellow-400" />
            </div>
            <span className="w-3">0</span>
          </li>
          <li className="flex items-center text-sm font-medium">
            <span className="w-3">1</span><span className="mr-4 text-yellow-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg></span>
            <div className="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-300">
              <div className="h-full w-1/12 bg-yellow-400" />
            </div>
            <span className="w-3">5</span>
          </li>
        </ul>
      </div>
      <button className="w-36 rounded-full bg-blue-900 py-3 text-white font-medium">Write a review</button>
  </div>
  {/* /Reviews */}
</div>
        </TabPanel>
      </TabsBody>
    </Tabs>
      </div>
    </div>
  </div>
</section>)}

      </>
  )
}

export default Product