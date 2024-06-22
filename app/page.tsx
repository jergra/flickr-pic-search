'use client'

import Head from 'next/head';
import Search from './components/Search';

export default function Home() {
  return (
    <main>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
      </Head>
        <h1>Flickr Pic Search</h1>
        <Search />
      
      <style jsx>{`
        main {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          background-image: url('https://picsum.photos/200/300?grayscale');
          background-size: cover;
          background-position: center;
          background-blend-mode: multiply;
          background-color: rgba(5, 5, 5, 0.90); /* adjust opacity here */
          font-family: 'Open Sans', sans-serif;
          color: white;
        }
        h1 {
          font-size: 60px;
          font-weight: bold;
          font-family: 'Pacifico', cursive; /* New font */
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Text shadow */
          //background: linear-gradient(45deg, #ff6b6b, #f06595); /* Gradient text */
          background: linear-gradient(45deg, rgb(249,115,22), rgb(194,65,12)); /* Gradient text */
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 20px 0; /* Adjust margin */
          padding: 10px 20px; /* Adjust padding */
          border-radius: 10px; /* Rounded corners */
          background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
        }
      `}</style>
    </main>
  );
}
