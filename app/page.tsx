
'use client'

import Search from './components/Search';

export default function Home() {
  return (
    <main>
      <div className="headerContainer">
        <div>F l i c k r</div><div>P i c s</div>
      </div>
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
        .headerContainer {
          font-size: 50px;
          font-weight: 100;
          margin-bottom: 20px;
          display: flex;
          justify-content: space-evenly;
          width: 45%;
        }
         @media only screen and (max-width: 900px) {
         .headerContainer  {
            font-size: 35px;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </main>
  );
}

