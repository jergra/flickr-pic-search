'use client'

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';


const Search = () => {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  
  const handleSearch = async (e) => {
    e.preventDefault();
    const apiKey = process.env.NEXT_PUBLIC_FLICKR_API_KEY;
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&format=json&per_page=50&page=1&nojsoncallback=1`;

    try {
      const response = await axios.get(url);
      console.log('response:', response)
      const photos = response.data.photos.photo.map(photo => {
        return {
          id: photo.id,
          src: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
          title: photo.title
        };
      });
      setPhotos(photos);
    } catch (error) {
      console.error("Error fetching data from Flickr API", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search terms"
        />
        <button type="submit">Search</button>
      </form>
      <div className='grid'>
        {photos.length > 0 && photos.map((photo, index) => (
          <div key={index}>
            <Link href={`/photo/${photo.id}`}>
              <img src={photo.src} alt={photo.title} />
              <p>{photo.title}</p>
            </Link>
          </div>
        ))}
      </div>

      <style jsx>{`
        form {
          margin: 2rem;
        }
        input {
            font-size: 18px;
            padding: 3px 8px;
            border: none;
            border-radius: 5px;
            background-color: #eee;
            cursor: pointer;
            transition: background-color 0.2s ease-in-out;
            color: black;
        }
        input:hover {
            background-color: white;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
        }
        img {
          width: 100%;
          height: auto;
        }
        p {
          margin-top: 6px;
        }
        button {
            background-color: rgb(255,140,0);
            color: white;
            border-radius: 5px;
            font-weight: bold;
            padding: 3px 8px;
            margin-left: 6px;
        }
        button:hover {
            background-color: rgb(230,126,0);
        }
        div:hover {
            cursor: pointer;
        }
      `}</style>

    </>
  );
};

export default Search;
