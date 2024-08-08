import React from 'react';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (

    <>
    <h1 className='info-title'> Gresser</h1>
    <div className="container">
      <img className='GresserPic' src='/documentation/images/Gressercompany.jpg' alt='Gresser' />
      <div className='gresser-info'> 
      <ul>
        <li>Gresser is a leading concrete and masonry contractor company,
 founded in 1969 by Mike and Joan Gresser in their basement in Eagan, Minnesota.</li>

 <li>Over the years, Gresser has evolved into one of the nation's largest and most respected contractors. 
  The company's legacy has been passed down to their son, Michael. </li>

  <li>The companys system, “Hedgehog,” which was developed in the early 2000s, is now showing its age. 
    As some features begin to break down, the system struggles to keep pace with Gresser's evolving needs. 
    Its time for a remodel to maintain the high standards Gresser is known for.</li>
 </ul>
    <p>

    </p>
    </div>
    </div>

    </>
  );
}

export default InfoPage;
