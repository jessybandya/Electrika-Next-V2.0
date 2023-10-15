import React from 'react'
import Product from './product';

export const getStaticPaths = async () => {
  const data = await getAllData();

  const paths = data.map((product) => ({
    params: {
      id: product.id.toString(), // Assuming the product object has an "id" property
    },
  }));

  return {
    paths,
    fallback: true, // false or "blocking"
  };
};

async function getAllData() {
  const res = await fetch("https://electrikacomputers.co.ke/backend/php/getelectronics.php");
  const data = await res.json();
  return data;
}

async function getProductData(electronicId) {
    const response = await fetch(`https://electrikacomputers.co.ke/backend/php/viewelectronic.php?electronicId=${electronicId}`);
    const product = await response.json();
    return product;
  }
  
  async function fetchImagesForID(electronicID) {
    const response = await fetch(`https://electrikacomputers.co.ke/backend/php/getimages.php?electronicId=${electronicID}`);
    const images = await response.json();
    return images;
  }

export default async function ProductView({ params }) {
    const allData = await getProductData(params.id);
    const imagesArray = [];
  
    for (const data of allData) {
      const images = await fetchImagesForID(data.id);
      imagesArray.push({ id: data.id, images: images });
    }

  return (
    <div>
    <Product params={params} allData={allData} images={imagesArray}/>
    </div>
  )
}