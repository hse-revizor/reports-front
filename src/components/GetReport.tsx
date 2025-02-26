import { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import axios from 'axios';

const GetReport = () => {
  const [reportId, setReportId] = useState('');
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://62.113.42.34:8771/report/${reportId}`);
      setReport(res.data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data || 'Report not found');
      setReport(null);
    }
  };

  return (
    <Box my={4}>
      <Typography variant="h5" gutterBottom>
        Get Report by ID
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Report ID"
          value={reportId}
          onChange={(e) => setReportId(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Get Report
        </Button>
      </form>
      {report && (
        <Box mt={2}>
          <Typography variant="h6">Report Details:</Typography>
          <pre>{JSON.stringify(report, null, 2)}</pre>
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

export default GetReport;