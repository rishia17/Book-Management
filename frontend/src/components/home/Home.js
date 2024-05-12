import React from 'react'

function Home() {
  return (
    <div>
      <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "left", color: "#ffc107" ,marginLeft: "40px"}}>
        <h1>Book Shop</h1>
        <p>Browse the collection of our best top interesting books.</p>
        <p>you will definitely find what you are looking  for </p>
      </div>
      <div style={{ marginLeft: "auto", marginRight: "30px" }}> {/* Changed position to marginLeft and added marginRight */}
        <img
          src="/photos/booksimg.jpg" // Add the URL of your image
          alt="Books Image"
          style={{ width: "500px", height: "auto" }} // Adjust the width and height as needed
        />
      </div>
    </div>
  </div>
  )
}

export default Home