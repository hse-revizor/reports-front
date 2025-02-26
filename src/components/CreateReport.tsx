import { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import axios from 'axios';

const CreateReport = () => {
  const [name, setName] = useState('');
  const [projectsIds, setProjectsIds] = useState('');
  const [rulesIds, setRulesIds] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.put('/reports-api/report', {
        checkingCombination: {
          name,
          projects_ids: projectsIds.split(',').map((id) => id.trim()),
          rules_ids: rulesIds.split(',').map((id) => id.trim()),
        },
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
        Create Report
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Project IDs (comma-separated)"
          value={projectsIds}
          onChange={(e) => setProjectsIds(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Rule IDs (comma-separated)"
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
          <Typography variant="h6">Report Created:</Typography>
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

export default CreateReport;