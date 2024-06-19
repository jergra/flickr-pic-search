'use client'

import { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#111'
  },
};

const Search = () => {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [photo, setPhoto] = useState({})

  const [modalIsOpen, setIsOpen] = useState(false);
  
  function openModal(photo) {
    setIsOpen(true);
    setPhoto(photo)
    console.log('photo:', photo)
  }
  function closeModal() {
    setIsOpen(false);
  }
  
  const truncateTitle = (text) => {
    if (text?.length > 500) {
      return text.substring(0, 500) + ' . . .';
    }
    return text;
  };  

  const truncateDescription = (text) => {
    if (text?.length > 1200) {
      return text.substring(0, 1200) + ' . . .';
    }
    return text;
  };  

  const getDateupload = (timestamp) => {
    const milliseconds = timestamp * 1000;
    const dateObject = new Date(milliseconds);
    const humanReadableDate = dateObject.toISOString().slice(0, 16).replace('T', ' ');
    return humanReadableDate
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    const apiKey = process.env.NEXT_PUBLIC_FLICKR_API_KEY;
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&extras=description,date_upload&format=json&per_page=60&nojsoncallback=1`;
   
    try {
      const response = await axios.get(url);
      console.log('response:', response)
      const photos = response.data.photos.photo.map(photo => {
        return {
          id: photo.id,
          src: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
          title: photo.title,
          description: photo.description._content,
          dateupload: getDateupload(photo.dateupload)
        };
      });
      setPhotos(photos);
    } catch (error) {
      console.error("Error fetching data from Flickr API", error);
    }
  };

  const handleInteresting = async () => {
    const apiKey = process.env.NEXT_PUBLIC_FLICKR_API_KEY;
    const url = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${apiKey}&extras=description,date_upload&format=json&per_page=60&nojsoncallback=1`;

    try {
      const response = await axios.get(url);
      console.log('response:', response)
      const photos = response.data.photos.photo.map(photo => {
        return {
          id: photo.id,
          src: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
          title: photo.title,
          description: photo.description._content,
          dateupload: getDateupload(photo.dateupload)
        };
      });
      setPhotos(photos);
    } catch (error) {
      console.error("Error fetching data from Flickr API", error);
    }
  };

  const handleRecent = async () => {
    const apiKey = process.env.NEXT_PUBLIC_FLICKR_API_KEY;
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${apiKey}&extras=description,date_upload&format=json&per_page=60&nojsoncallback=1`;

    try {
      const response = await axios.get(url);
      console.log('response:', response)
      const photos = response.data.photos.photo.map(photo => {
        return {
          id: photo.id,
          src: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
          title: photo.title,
          description: photo.description._content,
          dateupload: getDateupload(photo.dateupload)
        };
      });
      setPhotos(photos);
    } catch (error) {
      console.error("Error fetching data from Flickr API", error);
    }
  };

  return (
    <>
      <div className="formAndButtonsContainer">
        <div className="formContainer">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search terms"
            />
            <button type="submit" className="buttonInput">Search</button>
          </form>
        </div>
        <div className="buttonsContainer">
          <button onClick={()=>handleInteresting()}>Interesting</button>
          <button onClick={()=>handleRecent()}>Recent</button>
        </div>
      </div>
      <div className='grid'>
        {photos.length > 0 && photos.map((photo, index) => (
          <div key={index}>
            <a onClick={()=>openModal(photo)}>
              <img src={photo.src} alt={photo.title} />
              <p>{photo.title}</p>
            </a>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={customStyles}
      >
        <div className="modal">
          <button className="modalButton" onClick={closeModal}>Close</button>
          <img 
            src={photo.src} 
            alt={truncateTitle(photo.title)}
            className="imgModal"
          />
          <h1 className="h1Modal">{truncateTitle(photo.title)}</h1>
          <div className="description">{truncateDescription(photo.description)}</div>
          <div className="dateupload">Uploaded: {photo.dateupload}</div>
        </div>
      </Modal>

      <style jsx>{`
        .formAndButtonsContainer {
          margin-top: 1rem;
          margin-bottom: 2rem;
          width: 60%;
          display: flex;
          justify-content: space-between;
        }
        .buttonsContainer {
          width: 30%;
          display: flex;
          justify-content: space-between;
        }
        .formContainer {
          position: relative;
          width: 50%;
        }
        input {
          font-size: 18px;
          padding: 2px 8px;
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
        .modal {
          background-color: #111;
          position: relative;
          height: 90vh;
          width: 70vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: 'Open Sans', sans-serif;
          color: white;
        }
        .modalButton {
          position: absolute;
          top: 10px;
          right: 10px;
        }
        .imgModal {
          width: auto;
          height: 100%;
        }
        .h1Modal {
          margin-top: 2rem;
          font-size: 20px;
        }
        .description {
          margin-top: 1rem;
        }
        .dateupload {
          margin-top: 1rem;
        }
        img {
          width: 100%;
          height: auto;
        }
        p {
          margin-top: 6px;
        }
        button {
            background-color: rgb(249,115,22);
            color: white;
            border-radius: 5px;
            font-weight: bold;
            padding: 3px 8px;
            margin-left: 10px;
        }
        button:hover {
            background-color: rgb(194,65,12);
        }
        .buttonInput {
          position: absolute;
          left: 265px;
        }
        div:hover {
            cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Search;
