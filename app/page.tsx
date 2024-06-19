'use client'

import Search from './components/Search';

export default function Home() {
  return (
    <main>
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
          font-size: 40px;
          font-weight: bold;
        }
      `}</style>
    </main>
  );
}
