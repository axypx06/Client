import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Link,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function App() {
  const [flag, setFlag] = useState(false)
  const [apiKey, setApiKey] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch API key and user list on component mount
    fetchApiKey();
    fetchUsers();
  }, []);

  const fetchApiKey = () => {
  
    axios.get('https://telebotserv.onrender.com/admin/api-key')
      .then((response) => {
        setApiKey(response.data);
      })
      .catch((error) => {
        console.error('Error fetching API key:', error);
      });
  };

  const updateApiKey = () => {
    
    const newApiKey = prompt('Enter the new API key:');
    if (newApiKey) {
      axios.post('https://telebotserv.onrender.com/admin/api-key', { key: newApiKey })
        .then((response) => {
          alert(response.data);
          fetchApiKey(); // Refresh the API key after update
        })
        .catch((error) => {
          console.error('Error updating API key:', error);
        });
    }
  };

  const deleteUser = (chatId) => {
   
    axios.delete(`https://telebotserv.onrender.com/users/${chatId}`)
      .then((response) => {
        alert(response.data.message);
        fetchUsers(); // Refresh the user list after deletion
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  const fetchUsers = () => {
    
    axios.get('https://telebotserv.onrender.com/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  const onSuccess = (res) => {
    setFlag(true);
  }
  const handleLogout = () =>
  {
    setFlag(false);
  }

  return (
    <div>
      {flag ? (<Container maxWidth="md">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" style={{ padding: '20px', marginBottom: '20px', marginTop: '20px', fontStyle: 'italic', color: 'white', textAlign: 'center', fontWeight: 'bold' }} gutterBottom>
            Admin Dashboard
          </Typography>
          <Button variant="contained" color="primary" onClick={handleLogout} style={{ marginTop: '10px', backgroundColor: '#6919B0', marginBottom: '5px', marginLeft: '10px' }}>
            Sign Out
          </Button>
        </div>

        {/* Box for Managing API Keys */}
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px', marginTop: '20px', borderRadius: '20px', background: '#E2D2EF' }}>
          <Typography variant="h5" style={{ marginBottom: '20px', fontStyle: 'italic', fontWeight: 'bold' }} gutterBottom>Manage API Key</Typography>
          <Typography variant="body1" gutterBottom>Current API Key  :  {apiKey}</Typography>
          <Button variant="contained" color="primary" onClick={updateApiKey} style={{ marginTop: '10px', backgroundColor: '#6919B0', marginBottom: '5px' }}>
            Update API Key
          </Button>
        </Paper>

        {/* Box for Listing Current Users */}
        <Paper elevation={3} style={{ padding: '20px', borderRadius: '20px', marginTop: '30px', backgroundColor: '#E2D2EF' }}>
          <Typography variant="h5" style={{ marginBottom: '20px', fontStyle: 'italic', fontWeight: 'bold' }} gutterBottom>Current Users</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow >
                  <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Username</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Chat ID</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '16px' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.chatId}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.chatId}</TableCell>
                    <TableCell>
                      <IconButton aria-label="delete" onClick={() => deleteUser(user.chatId)} style={{ color: '#6919B0' }}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>



      </Container>) : (
        <div className="container">
          <div className="row">
            <div className="text-center">
              <h1 style={{ padding: '20px', marginTop: '80px', fontStyle: 'italic', color: 'white', textAlign: 'center' }}>Telegram Weather Bot</h1>
              <h2 style={{ padding: '20px', marginTop: '20px', fontStyle: 'italic', color: 'white', textAlign: 'center' }}>Hi👋 Everyone !</h2>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', marginTop: '100px' }}>
                <GoogleOAuthProvider clientId="611850993930-e0bir93ju9rpqers2ah3fel9akd3s8ha.apps.googleusercontent.com">
                  <GoogleLogin onSuccess={onSuccess} />
                </GoogleOAuthProvider>
              </div>
              {/* Footer */}
              <div style={{ textAlign: 'center' }}>
                <Typography variant="body2" >
                  <h3 style={{ marginTop: '260px', fontStyle: 'italic', color: 'white', textAlign: 'center' }}>You can find the bot at :{' '}</h3>
                  <Link href="http://t.me/StormReaperBot" style={{ marginTop: '2px', borderRadius: '20px', padding: '20px', backgroundColor: '#E2D2EF', display: 'inline-block', width: 'auto' }} target="_blank" rel="noopener noreferrer">
                    http://t.me/StormReaperBot
                  </Link>
                </Typography>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
