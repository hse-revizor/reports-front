import { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import axios from 'axios';

const UpdateReport = () => {
  const [reportId, setReportId] = useState('');
  const [reportData, setReportData] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`/reports-api/report/${reportId}`, {
        reportData: JSON.parse(reportData),
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
        Update Report
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
        <TextField
          label="Report Data (JSON)"
          value={reportData}
          onChange={(e) => setReportData(e.target.value)}
          fullWidth
          margin="normal"
          required
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
      </form>
      {response && (
        <Box mt={2}>
          <Typography variant="h6">Report Updated:</Typography>
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

export default UpdateReport;