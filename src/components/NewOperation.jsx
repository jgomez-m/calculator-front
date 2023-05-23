import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useHistory } from 'react-router-dom';

const NewOperation = () => {
  const [operationType, setOperationType] = useState('');
  const [amount, setAmount] = useState('');
  const { userName } = useContext(UserContext);
  const history = useHistory();

  const handleOperationTypeChange = (e) => {
    setOperationType(e.target.value);
    if (e.target.value === 'RANDOM_STRING') {
      setAmount('');
    }
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleCreate = () => {
    // Perform the logic to create the operation using operationType and amount
    console.log('Create operation:', operationType, amount, userName);
    if (operationType !== undefined && userName !== undefined) {
      const recordData = {
        userName,
        operationType,
        amount: operationType === 'RANDOM_STRING' ? null : amount,
      };
  
      fetch('http://localhost:8080/records/newRecord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recordData),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.error('Error creating record:', response);
          }
        })
        .then((data) => {
          console.log("Record created. Result: ", data);
          setAmount('');
          setOperationType('');
          history.push("/user-records")
        })
        .catch((error) => {
          console.error('Error creating record:', error);
        });
    }
  };

  return (
    <div className="container">
      <h2>New Operation</h2>
      <div className="mb-3">
        <label htmlFor="operationType" className="form-label">Operation Type:</label>
        <select id="operationType" className="form-select" value={operationType} onChange={handleOperationTypeChange}>
          <option value="">Select an operation</option>
          <option value="ADDITION">Addition</option>
          <option value="SUBTRACTION">Subtraction</option>
          <option value="MULTIPLICATION">Multiplication</option>
          <option value="DIVISION">Division</option>
          <option value="SQUARE_ROOT">Square Root</option>
          <option value="RANDOM_STRING">Random String</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">Amount:</label>
        <input type="number" id="amount" className="form-control" 
          value={amount} 
          onChange={handleAmountChange} 
          disabled={operationType === 'RANDOM_STRING'}
          />
      </div>
      <div>
        <button className="btn btn-primary" onClick={handleCreate}>Create</button>
      </div>
    </div>
  );
};

export default NewOperation;
