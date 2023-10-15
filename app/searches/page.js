import Main from "./Main";

export const metadata = {
  title: 'Search Page | Electrika Computers',
  description: 'Your leading computer store in the heart of the city',
}

async function getAllData() {
  const res = await fetch("https://electrikacomputers.co.ke/backend/php/getelectronics.php");
  const data = await res.json();
  return data;
}

async function fetchImagesForID(electronicID) {
  const response = await fetch(`https://electrikacomputers.co.ke/backend/php/getimages.php?electronicId=${electronicID}`);
  const images = await response.json();
  return images;
}

export default async function Searches() {
  const allData = await getAllData();
  const imagesArray = [];

  for (const data of allData) {
    const images = await fetchImagesForID(data.id);
    imagesArray.push({ id: data.id, images: images });
  }
  return (
    <div>
     <Main allData={allData} images={imagesArray}/>
    </div>
  );
}
