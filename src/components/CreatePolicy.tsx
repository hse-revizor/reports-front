import { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import axios from 'axios';

const CreatePolicy = () => {
  const [projectId, setProjectId] = useState('');
  const [rulesIds, setRulesIds] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post('/rules-api/api/policy', {
        projectId,
        rulesIds: rulesIds.split(',').map((id) => id.trim()),
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
        Create Policy
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Project ID"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Rules IDs (comma-separated)"
          value={rulesIds}
          onChange={(e) => setRulesIds(e.target.value)}
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
          <Typography variant="h6">Policy Created:</Typography>
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

export default CreatePolicy;