import { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import axios from 'axios';

const CreateRule = () => {
  const [params, setParams] = useState('');
  const [typeId, setTypeId] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post('/rules-api/api/rule', {
        params,
        typeId,
      });
      setResponse(res.data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data || 'An error occurred');
      setResponse(null);
    }
  };

  return (
    <Box my={4}>
      <Typography variant="h5" gutterBottom>
        Create Rule
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Params"
          value={params}
          onChange={(e) => setParams(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Type ID"
          value={typeId}
          onChange={(e) => setTypeId(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </form>
      {response && (
        <Box mt={2}>
          <Typography variant="h6">Rule Created:</Typography>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </Box>
      )}
      {error && (
        <Box mt={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
    </Box>
  );
};

export default CreateRule;