import express from 'express'
import axios from 'axios';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());

const apiKey = 'b5012636c81dde3475ff4c99dba14ec9';

app.get('/api/observations', async (req, res) => {
  try {
    const { series_id } = req.query;
    console.log(series_id);
    
    const response = await axios.get('https://api.stlouisfed.org/fred/series/observations', {
      params: {
        api_key: apiKey,
        series_id: series_id,
        file_type: 'json',
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).send(error.message);
  }
});

app.get('/api/search', async (req, res) => {
  try {
    const response = await axios.get("https://api.stlouisfed.org/fred/series/search",
      {
        params: {
          search_text: req.query.search_text,
          api_key: apiKey,
          file_type: "json",
        },
      }
    );
    
    res.json(response.data.seriess);
  } catch (error) {
    res.status(error.response?.status || 500).send(error.message);
  }
});

app.listen(5000, () => {
  console.log('Proxy server running on http://localhost:5000');
});
