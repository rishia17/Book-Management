import React from "react";

function Foot() {
  return (
    
    <footer className=" text-white py-4" style={{backgroundColor:"#7300e6"}}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>About Us</h5>
            <p>Find your next favorite book.</p>
          </div>
          <div className="col-md-6">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: abc@gmail.com</li>
              <li>Phone: +1 234 567 890</li>
            </ul>
          </div>
        </div>
        <hr className="my-4" />
        <p className="text-center">&copy; 2024 BookApp. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Foot;
