import Shopping from "./Shopping";


export const metadata = {
    title: 'Electrika Computers - Shopping',
    description: 'Your leading computer store in the heart of the city',
  }

  export const getStaticPaths = async () => {
    const Data = await getAllData();
    const paths = Array.from({ length: Data.length }, (_, index) => ({
      params: {
        id: (index + 1).toString(),
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
  
  async function fetchImagesForID(electronicID) {
    const response = await fetch(`https://electrikacomputers.co.ke/backend/php/getimages.php?electronicId=${electronicID}`);
    const images = await response.json();
    return images;
  }
  
export default async function Shop( {params} ) {

    const allData = await getAllData();
    const imagesArray = [];
  
    for (const data of allData) {
      const images = await fetchImagesForID(data.id);
      imagesArray.push({ id: data.id, images: images });
    }

    return (
        <div>
        <Shopping params={params} allData={allData} images={imagesArray}/>
        </div>
  )
}
