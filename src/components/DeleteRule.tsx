import { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import axios from 'axios';

const DeleteRule = () => {
  const [ruleId, setRuleId] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`/rules-api/api/rule/${ruleId}`);
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
        Delete Rule by ID
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Rule ID"
          value={ruleId}
          onChange={(e) => setRuleId(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="error">
          Delete
        </Button>
      </form>
      {response && (
        <Box mt={2}>
          <Typography variant="h6">Rule Deleted:</Typography>
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

export default DeleteRule;