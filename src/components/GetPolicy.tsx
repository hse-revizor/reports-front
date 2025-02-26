import { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import axios from 'axios';

const GetPolicy = () => {
  const [policyId, setPolicyId] = useState('');
  const [policy, setPolicy] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/rules-api/api/policy/${policyId}`);
      setPolicy(res.data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data || 'Policy not found');
      setPolicy(null);
    }
  };

  return (
    <Box my={4}>
      <Typography variant="h5" gutterBottom>
        Get Policy by ID
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Policy ID"
          value={policyId}
          onChange={(e) => setPolicyId(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Get Policy
        </Button>
      </form>
      {policy && (
        <Box mt={2}>
          <Typography variant="h6">Policy Details:</Typography>
          <pre>{JSON.stringify(policy, null, 2)}</pre>
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

export default GetPolicy;