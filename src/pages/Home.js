import React, { useState } from "react";
import { TextField, Box, Typography, InputAdornment, IconButton } from "@mui/material";
import RatingstoGive from "../component/Rating/RatingstoGive";
import ViewingHistoryHome from "../component/ViewingHistory/ViewingHistoryHome";
import SearchIcon from "@mui/icons-material/Search";
import "./Home.css";

const Home = ({ userData }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isNameSelected, setIsNameSelected] = useState(false);
  const [isIdSelected, setIsIdSelected] = useState(false);
  // When submit button is clicked, the search result is updated
  const urlForID = "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/profile";
  const urlForName = "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/getProfileByName";

  return (
    <div className="homeDisplay">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "40%",
        }}
      >
        <Box sx={{ height: "70%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h1
            style={{
              textAlign: "center",
              // marginTop: "20px",
            }}
          >
            Welcome to BoilerBazaar
          </h1>
          <br />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (userInput === "") {
                alert("Please enter a search term!");
                return;
              }
              if (!isNameSelected && !isIdSelected) {
                alert("Please select a search type!");
                return;
              }
              if (isIdSelected) {
                fetch(urlForID, {
                  method: "POST",
                  body: JSON.stringify({
                    yourPuid: userData['puid'],
                    puid: userInput,
                  }),
                })
                  .then((response) => {
                    return response.json();
                  })
                  .then((data) => {
                    if (data.statusCode === 404) {
                      alert("No user found!");
                      setSearchResult([]);
                      return;
                    }
                    setSearchResult([
                      // turn data from string to object
                      JSON.parse(data.body),
                    ]);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                fetch(urlForName, {
                  method: "POST",
                  body: JSON.stringify({
                    yourPuid: userData['puid'],
                    name: userInput,
                  }),
                })
                  .then((response) => {
                    return response.json();
                  })
                  .then((data) => {
                    if (data.statusCode === 404) {
                      alert("No user found!");
                      setSearchResult([]);
                      return;
                    }
                    console.log(data);
                    setSearchResult([JSON.parse(data.body)]);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            }}
          >
            {/* Search either id or name */}
            {/* Search field should take an entire */}
            <TextField
              placeholder="Search for Users"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onInput={(e) => {
                setUserInput(e.target.value);
              }}
              sx={{ mb: 1 }}
            />
            {/* <input
            type="text"
            placeholder="Search"
            onInput={(e) => {
              setUserInput(e.target.value);
            }}
          /> */}
            {/* Newline */}
            <br />
            <input
              type="radio"
              name="search"
              value="id"
              onClick={() => {
                setIsIdSelected(true);
                setIsNameSelected(false);
              }}
            />
            <label htmlFor="id">ID</label>
            <input
              type="radio"
              name="search"
              value="name"
              onClick={() => {
                setIsNameSelected(true);
                setIsIdSelected(false);
              }}
            />
            <label htmlFor="name">Name</label>
            <br />
            {/* <button type="submit">Search</button> */}
          </form>
        </Box>
        {/* <br /> */}
        {/* A table to display search result */}
        {searchResult.length > 0 && (
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              maxHeight: "30%",
              overflowY: "auto",
            }}
            className="scrollBar"
          >
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Major</th>
                  <th>ID</th>
                  <th>preferredName</th>
                </tr>
              </thead>
              <tbody>
                {searchResult.map((item) => {
                  return (
                    <tr>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.major}</td>
                      <td>
                        <a href={`/find/${item.puid}`}>{item.puid}</a>
                      </td>
                      <td>{item.preferredName}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Box>
        )}
      </Box>
      <Box sx={{ display: "flex", height: "60%", flexDirection: "row" }}>
        <Box
          sx={{
            display: "flex",
            width: "50%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RatingstoGive userData={userData} />
        </Box>
        <Box sx={{ display: "flex", width: "50%", alignItems: "center", justifyContent: "center" }}>
          <ViewingHistoryHome userData={userData} />
        </Box>
      </Box>
    </div>
  );
};

export default Home;
