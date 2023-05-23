import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const UserRecords = () => {
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const { userName } = useContext(UserContext);

  useEffect(() => {
    // Fetch user records from the server using RESTful API
    const getRecords = async() => {
      await fetch('http://localhost:8080/records?userName='+ userName, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((response) => {
        if (response.ok) {
          console.log("RESPONSE: OK")
          return response.json();
    
        } else {
          console.error('Error getting record:', response);
        }

      })
      .then((data) => {
        if(data) {
          setRecords(data);
        }
      })
      .catch((error) => {
        console.error('Error getting records:', error);
      })
      
    }
    getRecords();

  }, [records]);

  const handleDeleteRecord = (recordId) => {
    // Send delete record request to the server using RESTful API
  };

  const filteredRecords = records.filter((record) =>
    record.operation.type.includes(searchTerm)
  );

  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div className="container">
      <h2>User Records</h2>
      <div className="mb-3">
        <label htmlFor="search" className="form-label">Search:</label>
        <input
          type="text"
          id="search"
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Operation Type</th>
            <th>User</th>
            <th>Amount</th>
            <th>User Balance</th>
            <th>Operation Response</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedRecords.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.operation.type}</td>
              <td>{userName}</td>
              <td>{record.amount}</td>
              <td>{record.userBalance}</td>
              <td>{record.operationResponse}</td>
              <td>{record.date}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDeleteRecord(record.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <span>Page:</span>
        <select
          value={currentPage}
          onChange={(e) => setCurrentPage(Number(e.target.value))}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          {/* Add more options based on the number of pages */}
        </select>
        <span>Per Page:</span>
        <select
          value={perPage}
          onChange={(e) => setPerPage(Number(e.target.value))}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          {/* Add more options as needed */}
        </select>
      </div>
    </div>
  );
};

export default UserRecords;
