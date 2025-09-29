"use client";

import React, { useEffect } from "react";
import "./IntroCrawl.css";

function IntroCrawl({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 20000); // 20 seconds for the crawl

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="star-wars-intro">
      <div className="crawl-container">
        <div className="crawl">
          <div className="title">
          <h1>Fundserv 2025 CTF Challenge</h1>
          </div>
          <p>
            In the year 2091, AI has run rogue due to the compromised security breach...
          </p>
          <p>
            Fundserv has formed F-Men to save the world...
          </p>
          <p>
            We are sending our last hope to the past...
          </p>
          <p>
            You can help by capturing all five flags...
          </p>
          <p>
            Are you up for the challenge?
          </p>
        </div>
      </div>
    </div>
  );
}

export default IntroCrawl;

// "use client";

// import React, { useEffect } from "react";
// import "./IntroCrawl.css";

// function IntroCrawl({ onFinish }) {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onFinish();
//     }, 20000); // 20 seconds for the crawl

//     return () => clearTimeout(timer);
//   }, [onFinish]);

//   return (
//     <div className="star-wars-intro">
//       <div className="crawl-container">
//         <div className="crawl">
//           <div className="title">
//             <h1>F-Men: The Flag Mission</h1>
//             <h2>A Fundserv Adventure</h2>
//           </div>
//           <p>
//             In the year 2091, AI has run rogue due to the compromised security breach...
//           </p>
//           <p>
//             Critical systems worldwide are failing. Digital chaos threatens humanity...
//           </p>
//           <p>
//             Fundserv has formed the elite F-Men team to save the world from total collapse...
//           </p>
//           <p>
//             We are sending this message to you in the year 2025
//           </p>
//           <p>
//             You can help the cause by capturing all the five flags scattered across the digital realm
//           </p>
//           <p>
//             Your mission begins now. The fate of the future rests in your hands...
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default IntroCrawl;