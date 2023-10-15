import { Button, Carousel, Typography } from '@material-tailwind/react';
import Link from 'next/link'
import React from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useMediaQuery } from 'react-responsive';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useDispatch } from 'react-redux';
import { addToCart } from '@auth/redux/dataSlice';
import { ToastContainer, toast } from 'react-toastify';
import { Backdrop } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

function Post({ electronicID, description, initialPrice, finalPrice, title, discount, image, timestamp, category, percentage, os, processor, ram, images, storage}) {
    // Define your breakpoint for small devices (e.g., mobile)
const SmallDeviceBreakpoint = 768; // You can adjust this value as needed

// Check if the screen size is smaller than the defined breakpoint
const isSmallDevice = useMediaQuery({ maxWidth: SmallDeviceBreakpoint });
const dispatch = useDispatch();
const [openBackdrop, setOpenBackdrop] = React.useState(false);
const [size, setSize] = React.useState(null);
 
const handleOpen = (value) => setSize(value);



const handleCloseBackdrop = () => {
  setOpenBackdrop(false);
};
const handleOpenBackdrop = () => {
  setOpenBackdrop(true);
};


const handleAddToCart = () => {

  const itemToAdd = {
    id: electronicID,
    name: title,
    price: initialPrice,
    image: images.length === 0 ? image : images[0]?.image_url,
    link: `https://electrikacomputers.co.ke/product-view/${electronicID}`,
    quantity: 1,
  };
  
  dispatch(addToCart(itemToAdd));
  toast.success(`"${title}" has been added to your cart!`,{
    position: "top-center",
  }); // Show toast notification
};


const EmailProduct= () => {
    const recipientEmail = 'info@electrikacomputers.co.ke'
    const subject = encodeURIComponent(`I want to buy this product: ${title}`);
    const body = encodeURIComponent(`I found this amazing product!\n\nName: ${title}\nPrice: ${initialPrice}\nLink: https://electrikacomputers.co.ke/product-view/${electronicID}\nDescription: ${description}\n`);

    const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
    
    window.open(mailtoLink, '_blank');
  }

  const WhatsAppProduct= () => {
    const phoneNumber = '+254713441634';
    const productTitle = title;
    const initialPrice = initialPrice;
    const productLink = `https://electrikacomputers.co.ke/product-view/${electronicID}`;   
    const formattedPrice = parseFloat(initialPrice).toLocaleString('en-US', { style: 'currency', currency: 'KES' });  
    
    const productMessage = `I want to buy this product:\n\n*Name:* ${productTitle}\n*Price:* ${formattedPrice}\n*Link:* ${productLink}`;
    
    const message = encodeURIComponent(productMessage);
    
    const whatsAppLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    
    window.open(whatsAppLink, '_blank');
  }

  const classes = "p-4 border-b border-blue-gray-50";
  return (
    <>
    <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl">
    <Link href={`/product-view/${electronicID}`}>
      <div className="relative flex items-end overflow-hidden rounded-xl">
      {images.length === 0 ? <> <img src={image} alt={title}/> </> : <><img src={images[0]?.image_url} alt={title} style={{height:200,width:'100%',objectFit:'cover'}}/></>}
        <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-slate-400 ml-1 text-sm">4.9</span>
        </div>
      </div>
      </Link>
      <div className="mt-1 p-2">
      <Link href={`/product-view/${electronicID}`}>
      <h2 className="text-slate-700 text-lg text-blue-500">
      {isSmallDevice ? (
        <span>{title}</span>
            ) : (
                <span>{title.length > 30 ? title.substring(0, 30) + "..." : title}</span>            
      )}
      </h2>
    </Link>
        <p style={{fontSize:16}} className="text-slate-500 mt-1 text-sm font-bold">Ksh{numberWithCommas(initialPrice)}</p>
        <div className="mt-3 flex items-end justify-between bottom-0">
        <div className="flex w-max gap-2">
        <Button onClick={handleAddToCart} color="blue">Add <AddShoppingCartIcon /></Button>
        <Button onClick={handleOpenBackdrop} color="red">Buy <ShoppingBagIcon /></Button>
      </div>
          <div onClick={() => handleOpen("lg")} className="group cursor-pointer inline-flex rounded-xl bg-blue-100 p-2 hover:bg-blue-200">
          <RemoveRedEyeIcon style={{color:'#007bff'}}/>
          </div>
        </div>
      </div>
  </article>

  <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={openBackdrop}
  onClick={handleCloseBackdrop}
>
<div className="flex w-max gap-2">
<Button onClick={WhatsAppProduct} style={{backgroundColor:'#59CE72'}}>Buy Via <WhatsAppIcon /></Button>
<Button onClick={EmailProduct} style={{backgroundColor:'#EA4335'}}>Buy Via <EmailIcon /></Button>
</div>
</Backdrop>


<Dialog
open={
  size === "lg"
}
size={size || "md"}
handler={handleOpen}
>
<DialogBody divider
style={{
    maxHeight:'calc(120vh - 200px)',
    overflowY:'auto',
    overflowX:'hidden',    
    }}
>
<ToastContainer/>
<div className="lg:col-span-3 lg:row-end-1">
<div className="lg:flex lg:items-start" style={{width:'100%', backgroundColor:'rgb(0, 191, 243)'}}>
  <div style={{margin:'auto', display:'table'}}>
  
    <Carousel autoplay={true} loop={true} autoplayDelay={10000}>
    {images.map((image, index) => (
    <figure className="relative h-96 w-full">
    <img
      className="h-full w-full max-w-full object-contain object-center"
      src={image.image_url}
      alt={`Image ${index + 1} of ${images.length}`}
    />
  </figure>
  ))}
    </Carousel>

  </div>
</div>
</div>
<br />
<div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
<h1 className="sm: text-2xl font-bold text-blue-900 sm:text-3xl">{title}</h1>
<hr />
{category === 'Laptop' || category === 'Desktop' ?(
  <table className="w-full min-w-max table-auto text-left">
  <tr>
  <td className={classes}>
  <Typography variant="small" color="blue-gray" style={{fontWeight:'bold'}} className="font-normal text-blue-500 ">
  PRICE
  </Typography>
  </td>
  <td className={`${classes} bg-blue-gray-50/50`}>
  <Typography variant="small" color="blue-gray" style={{fontWeight:'bold'}} className="font-normal">
  Ksh{numberWithCommas(initialPrice)}
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
    {category}
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
    {os}
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
    {processor}
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
    {ram}
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
    {storage}
  </Typography>
  </td>
  </tr>
  </table>
):(
  <table className="w-full min-w-max table-auto text-left">
  <tr>
  <td className={classes}>
  <Typography variant="small" color="blue-gray" style={{fontWeight:'bold'}} className="font-normal text-blue-500 ">
  PRICE
  </Typography>
  </td>
  <td className={`${classes} bg-blue-gray-50/50`}>
  <Typography variant="small" color="blue-gray" style={{fontWeight:'bold'}} className="font-normal">
  Ksh{numberWithCommas(initialPrice)}
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
    {category}
  </Typography>
  </td>
  </tr>  
  </table>
)}


<div className="flex w-max gap-1 mt-3">
<Button onClick={handleAddToCart} color="blue">Add <AddShoppingCartIcon /></Button>
<Button onClick={WhatsAppProduct} style={{backgroundColor:'#59CE72'}}>Buy Via <WhatsAppIcon /></Button>
<Button onClick={EmailProduct} style={{backgroundColor:'#EA4335'}}>Buy Via <EmailIcon /></Button>
</div>

</div>
</DialogBody>
</Dialog>
  </>
  )
}

export default Post