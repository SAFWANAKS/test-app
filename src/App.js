import React, { useState, useEffect } from 'react';

const App = () => {
  // State variables to store form inputs and saved emails
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [savedEmails, setSavedEmails] = useState([]);

  // Load saved emails from local storage when component mounts
  useEffect(() => {
    const storedEmails = JSON.parse(localStorage.getItem('emails')) || [];
    setSavedEmails(storedEmails);
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = { name, email, message };
    const updatedEmails = [...savedEmails, newEntry];
    setSavedEmails(updatedEmails);
    localStorage.setItem('emails', JSON.stringify(updatedEmails));
    setName('');
    setEmail('');
    setMessage('');
    alert('Data saved to local storage!');
  };

  // Handle delete functionality
  const handleDelete = (index) => {
    const updatedEmails = savedEmails.filter((_, i) => i !== index);
    setSavedEmails(updatedEmails);
    localStorage.setItem('emails', JSON.stringify(updatedEmails));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto'}}>
      <h1>Contact Manager</h1>
      <h4>Add Contact</h4>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
          <input 
            id="name"
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input 
            id="email"
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="message" style={{ display: 'block', marginBottom: '5px' }}>Message:</label>
          <textarea 
            id="message"
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', height: '100px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 15px' }}>Submit</button>
      </form>

      {savedEmails.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Saved Emails:</h2>
          <ul style={{ padding: 0, textAlign: 'left' }}>
            {savedEmails.map((entry, index) => (
              <li key={index} style={{ listStyle: 'none', marginBottom: '10px' }}>
                <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', backgroundColor: '#ffffff' }}>
                  <p><strong>Name:</strong> {entry.name}</p>
                  <p><strong>Email:</strong> {entry.email}</p>
                  <p><strong>Message:</strong> {entry.message}</p>
                  <button 
                    onClick={() => handleDelete(index)} 
                    style={{ padding: '5px 10px', background: 'red', color: 'white', border: 'none', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;