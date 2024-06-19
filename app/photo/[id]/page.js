'use client'

import { useState, useEffect } from 'react';
import axios from 'axios'
import { usePathname } from 'next/navigation'
import Link from 'next/link';

const PhotoPage = () => {
  const [photo, setPhoto] = useState(null);
  
  const pathname = usePathname()
  const pathnameSplit = pathname.split("/")
  const id = pathnameSplit[2]
  
  useEffect(() => {
    if (id) {
      const fetchPhoto = async () => {
        const apiKey = process.env.NEXT_PUBLIC_FLICKR_API_KEY;
        const url = `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${apiKey}&photo_id=${id}&format=json&nojsoncallback=1`;

        try {
          const response = await axios.get(url);
          const photoData = response.data.photo;
          const photo = {
            src: `https://live.staticflickr.com/${photoData.server}/${photoData.id}_${photoData.secret}.jpg`,
            title: photoData.title._content
          };
          setPhoto(photo);
        } catch (error) {
          console.error("Error fetching photo data from Flickr API", error);
        }
      };

      fetchPhoto();
    }
  }, [id]);

  if (!photo) return <div>Loading...</div>;

  return (
    <>
      <div>
        <Link href={"/"}><button>Back</button></Link>
        {/* <button onClick={()=>router.push("/")}>Back</button> */}
        <img 
          src={photo.src} 
          alt={photo.title} 
          width={1000}
        />
        <h1>{photo.title}</h1>
      </div>

      <style jsx>{`
        div {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background-image: url('https://picsum.photos/200/300?grayscale');
          background-size: cover;
          background-position: center;
          background-blend-mode: multiply;
          background-color: rgba(5, 5, 5, 0.95); /* adjust opacity here */
          font-family: 'Open Sans', sans-serif;
          color: white;
        }
        img {
          max-width: 100%;
          height: auto;
        }
        h1 {
          margin-top: 2rem;
          font-size: 24px;
        }
        button {
          position: absolute;
          top: 20px;
          right: 20px;
          background-color: rgb(255,140,0);
          color: white;
          border-radius: 5px;
          font-size: large;
          font-weight: bold;
          padding: 3px 8px;
          margin-left: 6px;
        }
        button:hover {
          background-color: rgb(230,126,0);
        }
      `}</style>
    </>
  );
};

export default PhotoPage;
