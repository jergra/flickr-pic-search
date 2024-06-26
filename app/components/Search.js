'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import customStyles from '../lib/customStyles'
import getRandomWords from '../utils/getRandomWords'
import getDateUploaded from '../utils/getDateUploaded'
import getEditedDescription from '../utils/getEditedDescription'
import truncateTitle from '../utils/truncateTitle'
import goToTop from '../utils/goToTop'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Search = () => {

  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [photo, setPhoto] = useState({})
  const [theIndex, setTheIndex] = useState(null)
  const [modalIsOpen, setIsOpen] = useState(false);
  const [randomTerms, setRandomTerms] = useState('');
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 1500) {
        setShowTop(true)
      } else {
        setShowTop(false)
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Fetch images with random words on initial render
    const randomWords = getRandomWords();
    setRandomTerms(randomWords.join(' '));
    handleSearch(randomWords.join(' '));
  }, []);
  
  function openModal(photo, index) {
    setIsOpen(true);
    setPhoto(photo)
    setTheIndex(index)
  }
  
  const handleNext = () => {
    if (theIndex < photos.length - 1) {
      setPhoto(photos[theIndex + 1])
      setTheIndex(theIndex + 1)
    }
  }
  
  const handlePrevious = () => {
    if (theIndex > 0) {
      setPhoto(photos[theIndex - 1])
      setTheIndex(theIndex - 1)
    }
  }
  
  const handleSearch = async (query) => {
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
          description: getEditedDescription(photo.description._content),
          dateUploaded: getDateUploaded(photo.dateupload)
        };
      });
      setPhotos(photos);
      console.log('photos:', photos)
    } catch (error) {
      console.error("Error fetching data from Flickr API", error);
    }
  };

  const handleClick = async (buttonChoice) => {
    let apiChoice = ''
    if (buttonChoice == 'interesting') {
      apiChoice = 'flickr.interestingness.getList'
    }
    if (buttonChoice == 'recent') {
      apiChoice = 'flickr.photos.getRecent'
    }
    const apiKey = process.env.NEXT_PUBLIC_FLICKR_API_KEY;
    const url = `https://api.flickr.com/services/rest/?method=${apiChoice}&api_key=${apiKey}&extras=description,date_upload&format=json&per_page=60&nojsoncallback=1`;

    try {
      const response = await axios.get(url);
      console.log('response:', response)
      const photos = response.data.photos.photo.map(photo => {
        return {
          id: photo.id,
          src: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
          title: photo.title,
          description: getEditedDescription(photo.description._content),
          dateUploaded: getDateUploaded(photo.dateupload)
        };
      });
      setPhotos(photos);
      console.log('photos:', photos)
    } catch (error) {
      console.error("Error fetching data from Flickr API", error);
    }
  };

  return (
    <>
      <div className="formAndButtonsContainer">
        <form onSubmit={(e) => {e.preventDefault(); handleSearch(query);}}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={randomTerms ? randomTerms : 'search terms'}
          />
          <button type="submit">Search</button>
        </form>
        <div className="buttonsContainer">
          <button onClick={()=>handleClick('interesting')}>Interesting</button>
          <button onClick={()=>handleClick('recent')}>Recent</button>
        </div>
      </div>
      <div className='grid'>
        {photos.length > 0 && photos.map((photo, index) => (
           <div key={index}>
            <a onClick={()=>openModal(photo, index)}>
              <img src={photo.src} alt={photo.title} />
              <p>{photo.title}</p>
            </a>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        style={customStyles}
      >
        <div className="modal">
          <button className="modalButton" onClick={()=>setIsOpen(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <img 
            src={photo.src} 
            alt={truncateTitle(photo.title)}
            className="imgModal"
          />
          <h1 className="h1Modal">{truncateTitle(photo.title)}</h1>
          <div className="description" dangerouslySetInnerHTML={{ __html: photo.description }}></div>
          <div className="dateUploaded">Uploaded: {photo.dateUploaded}</div>
          <div className="previousContainer" onClick={()=>handlePrevious()}>
            <div className="previous"></div>
            <div className="previousCover"></div>
          </div>
          <div className="nextContainer" onClick={()=>handleNext()}>
            <div className="nextCover"></div>
            <div className="next"></div>
          </div>
        </div>
      </Modal>

      {showTop ? (
        <div className='fixed bottom-5 right-5'>
          <button 
            onClick={goToTop}
          >
            Top
          </button>
        </div>
      ) : (
        <div></div>
      )}

      <style jsx>{`
        .formAndButtonsContainer {
          margin-top: 1rem;
          margin-bottom: 2rem;
          width: 60%;
          display: flex;
          justify-content: space-between;
        }
        @media only screen and (max-width: 900px) {
         .formAndButtonsContainer  {
            margin-top: 1rem;
            margin-bottom: 3rem;
            width: 100%;
            display: flex;
            flex-direction: column;
            height: 80px;
            align-items: center;
          }
        }
        .buttonsContainer {
          width: 30%;
          display: flex;
          justify-content: space-between;
        }
        @media only screen and (max-width: 900px) {
         .buttonsContainer  {
            width: 100%;
            display: flex;
            justify-content: center;
          }
        }
        form {
          width: 70%;
          display: flex;
        }
        @media only screen and (max-width: 900px) {
         form {
            width: 100%;
            display: flex;
            justify-content: center;
            margin-bottom: 1rem;
          }
        }
        input {
          font-size: 18px;
          padding-left: 8px;
          margin-right: 5px;
          border: none;
          border-radius: 5px;
          background-color: #eee;
          cursor: pointer;
          color: black;
          font-family: 'Inter', sans-serif;
        }
        input:hover {
          background-color: white;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
          font-family: 'Inter', sans-serif;
        }
        .modal {
          position: relative;
          background-color: #111;
          height: 90vh;
          width: 70vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
          color: white;
        }
        .modalButton {
          position: absolute;
          top: 0;
          right: 0;
          border: none;
          font-size: 20px;
          cursor: pointer;
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
          margin-bottom: 5px;
          min-height: 3em;
          max-height: 7em; 
          overflow-y: auto;
          padding-right: 5px;
        }
        .dateUploaded {
          margin-top: 1rem;
        }
        .nextContainer {
          position: absolute;
          right: 0px;
          bottom: 0px;
          display: flex;
        }
        .next {
          background-color: rgb(249,115,22);
          width: 30px;
          height: 30px;
          transform: rotate(45deg);
        }
        .nextCover {
          background-color: #111;
          width: 30px;
          height: 30px;
          transform: rotate(45deg);
          margin-right: -16px;
          z-index: 10;
        }
        .next:hover {
            background-color: rgb(194,65,12);
        }
        .previousContainer {
          display: flex;
          position: absolute;
          left: 0px;
          bottom: 0px;
        }
        .previous {
          background-color: rgb(249,115,22);
          width: 30px;
          height: 30px;
          transform: rotate(45deg);
        }
        .previousCover {
          background-color: #111;
          width: 30px;
          height: 30px;
          transform: rotate(45deg);
          margin-left: -16px;
        }
        .previous:hover {
            background-color: rgb(194,65,12);
        }
        img {
          width: 100%;
          height: auto;
        }
        p {
          margin-top: 6px;
        }
        a {
          cursor: pointer;
        }
        button {
            background-color: rgb(249,115,22);
            color: white;
            border-radius: 5px;
            font-weight: bold;
            padding: 3px 8px;
            margin: 5px;
            font-family: 'Inter', sans-serif;
        }
        button:hover {
            background-color: rgb(194,65,12);
        }  
      `}</style>
    </>
  );
};

export default Search;

