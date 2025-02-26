import { Container, Typography, Box } from '@mui/material';
import CreateRule from './components/CreateRule';
import GetRule from './components/GetRule';
import DeleteRule from './components/DeleteRule';
import CreatePolicy from './components/CreatePolicy';
import GetPolicy from './components/GetPolicy';
import DeletePolicy from './components/DeletePolicy';
import GetReport from './components/GetReport';
import CreateReport from './components/CreateReport';
import UpdateReport from './components/UpdateReport';

function App() {
  return (
    <Container>
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Projects & rules
        </Typography>
        <CreateRule />
        <GetRule />
        <DeleteRule />
        <CreatePolicy />
        <GetPolicy />
        <DeletePolicy />
        <CreateReport />
        <GetReport />
        <UpdateReport />
      </Box>
    </Container>
  );
}

export default App;