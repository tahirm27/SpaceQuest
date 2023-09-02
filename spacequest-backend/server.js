const express = require("express");
const cors = require("cors");
const app = express();


const router = express.Router();
const axios = require("axios");

app.use(cors()); //allow cross origin resource sharing so different ports can work together


let NASA_API_KEY = "";
app.use(express.json());


//Express.js route handler
app.get("/api/data",async (req, res) =>
{
  const searchQuery = req.query.searchQuery;

  try
  {
    const apiData = await fetchData(searchQuery);
    res.json(apiData);
  }
  catch (error)
  {
    console.error("Route Handler error: ", error);
    throw new Error("Route Handler did not succeed");
  }

});

//Function to call NASA's POTD API
const fetchData = async (date) =>
{
  try
  {
    const response = await axios.get("https://api.nasa.gov/planetary/apod", 
    {
      params:
      {
        date: date,
        api_key: NASA_API_KEY,
      },
    });
    return response.data;
  }
  catch (error)
  {
    console.error("NASA API data fetch error: ", error);
    throw new Error("Failed to fetch NASA API data");
  }
}

const PORT = process.env.PORT || 3000; // Use the provided PORT or default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});