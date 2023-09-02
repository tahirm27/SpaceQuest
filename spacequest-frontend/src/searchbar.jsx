import React from "react";
import { useState } from "react";
import axios from "axios";

function SearchBar()
{

    //State variable declartions
    const [searchQuery, setSearchQuery] = useState("");

    const [imageData, setImageData] = useState(null);


    //State variable updater via method
    const handleInput = (event) =>
    {
        setSearchQuery(event.target.value);
    }


    const handleSearch = (event) =>
    {
        event.preventDefault()
        //Calls test method to verify correct pattern of search Query
        if (/^(199[6-9]|20[0-2][0-3])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(searchQuery))
        {
            //If successful, use axios library to send a GET request to server to retrieve API data
            console.log(searchQuery);
            console.log("Success!");
            axios.get("http://localhost:3000/api/data",
            {
                params:
                {
                    searchQuery: searchQuery,
                },
            })
            .then(response => {
                console.log("Response from server:", response.data);
                setImageData(response.data);
            })
            .catch(error => {
                console.error("Error:", error);
            });

        }
        else
        {
            //If unsuccessful, output error to user
            console.log(searchQuery);
            console.log("Error: Incorrect Search Query Input");
        }
    }

    //Download button functionality
    const handleDownload = (event) =>
    {
      if (imageData)
      {
        const downloadLink = document.createElement("a");
        downloadLink.href = imageData.url;
        downloadLink.download = imageData.title;
        downloadLink.target = "_blank";
        downloadLink.click();
      }
    }

    const returnHome = () => {
      // window.history.back();
      window.location.reload();
    };
    

    return (
        <div>
          {imageData ? (
            // Render the image section if imageData is available
            <div>
              <div className="homebutton-container">
              <button id="homebutton" onClick={returnHome}>🌎</button>
              </div>
              <div className="image-container">
              <img src={imageData.url} alt="NASA APOD" />
              </div>
              <div className="image-content-container">
              <h2 id="content-title">{imageData.title}</h2>
              <p id="content-paragraph">{imageData.explanation}</p>
              <button id="download-button" onClick={handleDownload}>Download</button>
              </div>
              
            </div>
          ) : (
            // Render the search bar and form if imageData is not available
            <div>
              <div className="title">
                <h2>🛸 SpaceQuest 🪐</h2>
            </div>
            <div className="subtitle">
            <h5>Powered by NASA's API 🛰️</h5>
            </div>
            <form autoComplete="off" onSubmit={handleSearch} action="/" method="get">
              <input
                type="text"
                placeholder="Search 🔭"
                name="s"
                value={searchQuery}
                onChange={handleInput}
              />
              <button type="submit">🚀</button>
            </form>
            </div>
          )}
        </div>
      );
      
}

export default SearchBar;