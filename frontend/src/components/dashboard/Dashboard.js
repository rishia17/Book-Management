import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const token = sessionStorage.getItem('token');
  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` },
  });

  const [counts, setCounts] = useState({
    bookCount: 0,
    adminCount: 0,
    userCount: 0,
  });

  const getCounts = async () => {
    try {
      const res = await axiosWithToken.get('http://localhost:5500/admin-api/dashboard');
      const { bookCount, adminCount, userCount } = res.data;
      setCounts({
        bookCount,
        adminCount,
        userCount,
      });
    } catch (error) {
      console.error('Error fetching counts:', error);
    }
  };

  useEffect(() => {
    getCounts();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Book Count Card */}
        <div className="col-md-4">
          <div className="card  text-white" style={{backgroundColor:"#9966ff"}}>
            <div className="card-body">
              <h5 className="card-title">Book Count</h5>
              <p className="card-text display-4">{counts.bookCount}</p>
            </div>
          </div>
        </div>

        {/* Admin Count Card */}
        <div className="col-md-4">
          <div className="card text-white"  style={{backgroundColor:"#9966ff"}}>
            <div className="card-body">
              <h5 className="card-title">Admin Count</h5>
              <p className="card-text display-4">{counts.adminCount}</p>
            </div>
          </div>
        </div>

        {/* User Count Card */}
        <div className="col-md-4">
          <div className="card text-white"  style={{backgroundColor:"#9966ff"}}>
            <div className="card-body">
              <h5 className="card-title">User Count</h5>
              <p className="card-text display-4">{counts.userCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
