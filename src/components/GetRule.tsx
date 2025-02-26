import { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import axios from 'axios';

const GetRule = () => {
  const [ruleId, setRuleId] = useState('');
  const [rule, setRule] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/rules-api/api/rule/${ruleId}`);
      setRule(res.data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data || 'Rule not found');
      setRule(null);
    }
  };

  return (
    <Box my={4}>
      <Typography variant="h5" gutterBottom>
        Get Rule by ID
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
        <Button type="submit" variant="contained" color="primary">
          Get Rule
        </Button>
      </form>
      {rule && (
        <Box mt={2}>
          <Typography variant="h6">Rule Details:</Typography>
          <pre>{JSON.stringify(rule, null, 2)}</pre>
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

export default GetRule;