import "./Buy.css";
import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Box,
  Grid,
  CircularProgress,
  Typography,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import $ from "jquery";
// import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Textbook from "../component/BuyListing/Textbook";
import { useLocation } from "react-router-dom";
import SharedListing from "../component/BuyListing/SharedListing";

var searchHistory = [];
var user = "doan23@purdue.edu";

function getSearchHistory() {
  var url =
    "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/search_history?email=" +
    user;
  $.ajax({
    url: url,
    type: "GET",
    success: function (result) {
      for (var i = 0; i < result["body"].length; i++) {
        searchHistory.push(result["body"][i]);
      }
      //alert(JSON.stringify(searchHistory));
    },
    error: function (result) {
      console.log(JSON.stringify(result));
    },
  });
}

function removeSearch(s) {
  var json = { user: user, search: s };
  json = '"' + JSON.stringify(json).replaceAll('"', '\\"') + '"';
  var url =
    "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/search_history";
  //console.log(json);
  $.ajax({
    url: url,
    type: "PUT",
    data: json,
    datatype: "json",
    contentType: "application/json",
    success: function (result) {
      console.log(JSON.stringify(result));
    },
    error: function (result) {
      console.log(JSON.stringify(result));
    },
  });
}

function addSearchHistory(s) {
  var json = { user: user, search: s };
  json = '"' + JSON.stringify(json).replaceAll('"', '\\"') + '"';
  var url =
    "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/search_history";
  $.ajax({
    url: url,
    type: "POST",
    data: json,
    datatype: "json",
    contentType: "application/json",
    success: function (result) {
      console.log(JSON.stringify(result));
    },
    error: function (result) {
      console.log(JSON.stringify(result));
    },
  });
}

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("className", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.id = arr[i];
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'></input>";
        b.innerHTML += "<button>x</button>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          if (e.target.tagName === "BUTTON") {
            removeSearch(this.id);
          } else {
            inp.value = this.getElementsByTagName("input")[0].value;
            closeAllLists();
          }

          /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" className on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add className "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" className from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

const Buy = ({ userData }) => {
  //Function to toggle the display of filters and sorting options
  function toggleFilters() {
    const filtersDiv = document.getElementById("filters");
    const filtersButton = document.getElementById("filtersButton");
    if (filtersDiv.style.display !== "flex") {
      filtersDiv.style.display = "flex";
    } else {
      filtersDiv.style.display = "none";
    }
  }

  var listingList = [];
  var originalListingList = [];
  function search() {
    setLoading(true);
    setFirst(false);
    const searchFilterValue = document.getElementById("searchFilter").innerText;
    const searchText = document.getElementById("searchBar").value;
    addSearchHistory(searchText);
    console.log("filter: " + searchFilterValue);
    var searchParams = "";
    if (searchFilterValue === "Title") {
      searchParams = "title=" + searchText + "&";
    } else if (searchFilterValue === "Author") {
      searchParams = "author=" + searchText + "&";
    } else if (searchFilterValue === "ISBN") {
      searchParams = "isbn=" + searchText + "&";
    } else if (searchFilterValue === "Course") {
      searchParams = "course=" + searchText + "&";
    }
    searchParams += "user=" + userData["puid"];
    const searchUrl =
      "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/listing?" +
      searchParams;
    console.log(searchUrl);
    $.ajax({
      url: searchUrl,
      type: "GET",
      success: function (result) {
        console.log(result);
        setLoading(false);
        let returnedItems = result.Items;
        let parsedTextbook = [];
        for (let i = 0; i < returnedItems.length; i++) {
          if (
            returnedItems[i].sold === "false" &&
            returnedItems[i].sellerID != userData["puid"]
          ) {
            parsedTextbook.push(returnedItems[i]);
          }
        }
        // returnedItems = temp
        setTextbooks(parsedTextbook);
        setOriginalTextbooks(parsedTextbook);
        // listingList = [];
        // for (let i = 0; i < returnedItems.length; i++) {
        //   listingList.push({
        //     listingID: returnedItems[i].listingID,
        //     title: returnedItems[i].title,
        //     author: returnedItems[i].author,
        //     isbn: returnedItems[i].isbn,
        //     edition: returnedItems[i].edition,
        //     course: returnedItems[i].course,
        //     condition: returnedItems[i].condition,
        //     price: returnedItems[i].price,
        //     description: returnedItems[i].description,
        //     toString:
        //       "Title: " +
        //       returnedItems[i].title +
        //       " Author: " +
        //       returnedItems[i].author +
        //       " ISBN: " +
        //       returnedItems[i].isbn +
        //       " Edition: " +
        //       returnedItems[i].edition +
        //       " Course: " +
        //       returnedItems[i].course +
        //       " Condition: " +
        //       returnedItems[i].condition +
        //       " Price: " +
        //       returnedItems[i].price +
        //       " Description: " +
        //       returnedItems[i].description
        //   });
        // }

        // console.log(listingList);
        // originalListingList = JSON.parse(JSON.stringify(listingList));
        // console.log(originalListingList);
        // repopulateListings();
        //repopulateFilters();
      },
      error: function (result) {
        console.log(JSON.stringify(result));
      },
    });
  }

  function compareByTitleA(a, b) {
    if (a.title === undefined && b.title === undefined) {
      return 0;
    } else if (a.title === undefined) {
      return 1;
    } else if (b.title === undefined) {
      return -1;
    }
    const x = a.title.toUpperCase();
    const y = b.title.toUpperCase();
    if (x < y) {
      return -1;
    } else if (x > y) {
      return 1;
    } else {
      return 0;
    }
  }

  function compareByTitleD(a, b) {
    if (a.title === undefined && b.title === undefined) {
      return 0;
    } else if (a.title === undefined) {
      return 1;
    } else if (b.title === undefined) {
      return -1;
    }
    const x = a.title.toUpperCase();
    const y = b.title.toUpperCase();
    if (x > y) {
      return -1;
    } else if (x < y) {
      return 1;
    } else {
      return 0;
    }
  }

  function compareByAuthorA(a, b) {
    if (a.author === undefined && b.author === undefined) {
      return 0;
    } else if (a.author === undefined) {
      return 1;
    } else if (b.author === undefined) {
      return -1;
    }
    const x = a.author.toUpperCase();
    const y = b.author.toUpperCase();
    if (x < y) {
      return -1;
    } else if (x > y) {
      return 1;
    } else {
      return 0;
    }
  }

  function compareByAuthorD(a, b) {
    if (a.author === undefined && b.author === undefined) {
      return 0;
    } else if (a.author === undefined) {
      return 1;
    } else if (b.author === undefined) {
      return -1;
    }
    const x = a.author.toUpperCase();
    const y = b.author.toUpperCase();
    if (x > y) {
      return -1;
    } else if (x < y) {
      return 1;
    } else {
      return 0;
    }
  }

  function compareByPriceA(a, b) {
    if (a.price === undefined && b.price === undefined) {
      return 0;
    } else if (a.price === undefined) {
      return 1;
    } else if (b.price === undefined) {
      return -1;
    }
    const x = parseInt(a.price);
    const y = parseInt(b.price);
    if (x < y) {
      return -1;
    } else if (x > y) {
      return 1;
    } else {
      return 0;
    }
  }

  function compareByPriceD(a, b) {
    if (a.price === undefined && b.price === undefined) {
      return 0;
    } else if (a.price === undefined) {
      return 1;
    } else if (b.price === undefined) {
      return -1;
    }
    const x = parseInt(a.price);
    const y = parseInt(b.price);
    if (x > y) {
      return -1;
    } else if (x < y) {
      return 1;
    } else {
      return 0;
    }
  }

  const sortListings = (e) => {
    setLoading(true);
    // const sortingMode = document.getElementById("sorting").innerText;
    const sortingMode = e.target.value
    let sorted;
    switch (sortingMode) {
      case "titleAscending":
        sorted = [...textbooks].sort(compareByTitleA);
        break;
      case "titleDescending":
        sorted = [...textbooks].sort(compareByTitleD);
        break;
      case "authorAscending":
        sorted = [...textbooks].sort(compareByAuthorA);
        break;
      case "authorDescending":
        sorted = [...textbooks].sort(compareByAuthorD);
        break;
      case "priceAscending":
        sorted = [...textbooks].sort(compareByPriceA);
        break;
      case "priceDescending":
        sorted = [...textbooks].sort(compareByPriceD);
        break;
      default:
        return;
    }
    setTextbooks(sorted);
    // repopulateListings();
  }

  function repopulateFilters() {
    //Repopulate filters
    let filters = document.getElementById("editionFilter");
    while (filters.hasChildNodes()) {
      filters.removeChild(filters.firstChild);
    }

    //Create filter for no filter
    let noFilter = document.createElement("option");
    let noFilterText = document.createTextNode("No filter");
    noFilter.value = "none";
    noFilter.selected = "selected";
    noFilter.appendChild(noFilterText);
    filters.appendChild(noFilter);

    let addedEditions = [];
    for (const item of originalTextbooks) {
      if (item.edition !== undefined) {
        if (!addedEditions.includes(item.edition)) {
          addedEditions.push(item.edition);
          let newFilter = document.createElement("option");
          let text = document.createTextNode(item.edition.trim());
          newFilter.value = item.edition.trim();
          newFilter.appendChild(text);
          filters.appendChild(newFilter);
        }
      }
    }

    filters = document.getElementById("conditionFilter");
    while (filters.hasChildNodes()) {
      filters.removeChild(filters.firstChild);
    }

    //Create filter for no filter
    noFilter = document.createElement("option");
    noFilterText = document.createTextNode("No filter");
    noFilter.value = "none";
    noFilter.selected = "selected";
    noFilter.appendChild(noFilterText);
    filters.appendChild(noFilter);

    let addedConditions = [];
    for (const item of originalTextbooks) {
      if (item.condition !== undefined) {
        if (!addedConditions.includes(item.condition)) {
          addedConditions.push(item.condition);
          let newFilter = document.createElement("option");
          let text = document.createTextNode(item.condition.trim());
          newFilter.value = item.condition.trim();
          newFilter.appendChild(text);
          filters.appendChild(newFilter);
        }
      }
    }

    filters = document.getElementById("courseFilter");
    while (filters.hasChildNodes()) {
      filters.removeChild(filters.firstChild);
    }

    //Create filter for no filter
    noFilter = document.createElement("option");
    noFilterText = document.createTextNode("No filter");
    noFilter.value = "none";
    noFilter.selected = "selected";
    noFilter.appendChild(noFilterText);
    filters.appendChild(noFilter);

    let addedCourses = [];
    for (const item of originalTextbooks) {
      if (item.course !== undefined) {
        if (!addedCourses.includes(item.course)) {
          addedCourses.push(item.course);
          let newFilter = document.createElement("option");
          let text = document.createTextNode(item.course.trim());
          newFilter.value = item.course.trim();
          newFilter.appendChild(text);
          filters.appendChild(newFilter);
        }
      }
    }
  }

  function filterListings() {
    /**
     * @TODO implement course filter whenever we add that to the database
     */
    let courseFilter = document.getElementById("courseFilter").value;
    let editionFilter = document.getElementById("editionFilter").value;
    let conditionFilter = document.getElementById("conditionFilter").value;

    listingList = JSON.parse(JSON.stringify(originalListingList));
    let filtered = originalTextbooks;

    if (editionFilter != "none") {
      filtered = [...filtered].filter(function (value, index, arr) {
        return value.edition == editionFilter;
      });
      /*
      listingList = listingList.filter(function (value, index, arr) {
        return value.edition == editionFilter;
      });
      */
    }
    if (conditionFilter != "none") {
      filtered = [...filtered].filter(function (value, index, arr) {
        return value.condition == conditionFilter;
      });
    }

    if (courseFilter != "none") {
      filtered = [...filtered].filter(function (value, index, arr) {
        return value.course == courseFilter;
      });
    }

    setTextbooks(filtered);

    console.log(listingList);
    // repopulateListings();
  }

  window.onload = function () {
    addSearchHistory("test");
    getSearchHistory();
    autocomplete(document.getElementById("searchBar"), searchHistory);
  };

  const [textbooks, setTextbooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(true);
  const [originalTextbooks, setOriginalTextbooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [listingId, setListingId] = useState("");
  const location = useLocation();
  // console.log('pathname', location.pathname.split('/')[2]);

  useEffect(() => {
    setLoading(false);
  }, [textbooks]);

  useEffect(() => {
    repopulateFilters();
  }, [originalTextbooks]);

  useEffect(() => {
    if (
      location.pathname.split("/")[2] != undefined &&
      location.pathname.split("/").length === 3
    ) {
      setOpen(true);
      setListingId(location.pathname.split("/")[2]);
    }
  }, []);

  return (
    <div className="buyDisplay">
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            width: "28%",
            height: "100%",
            backgroundColor: "var(--primary-color)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <label> */}
          {/* Search By */}
          <TextField
            id="searchFilter"
            // className="searchFilter"
            select
            label="Search By"
            sx={{ mt: 2 }}
          >
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="author">Author</MenuItem>
            <MenuItem value="isbn">ISBN</MenuItem>
            <MenuItem value="course">Course</MenuItem>
          </TextField>
          {/* </label> */}
          <TextField
            id="searchBar"
            placeholder="Search Textbooks..."
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={search}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          <Button id="filtersButton" variant="contained" onClick={toggleFilters} sx={{ width: "85%" }}>
            Filters and Sorting
          </Button>
          <Box className="filters" id="filters" sx={{ flexDirection: "column", width: '100%'}}>
            <Box className="filterCheckboxes" sx={{flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div className="filterDiv">
                <label className="filterLabel">Course</label>
                <select multiple size="4" id="courseFilter" className="filterSelector">
                  <option value="none" selected="selected">
                    No filter
                  </option>
                </select>
              </div>
              <div className="filterDiv">
                <label className="filterLabel">Edition</label>
                <select multiple size="4" id="editionFilter" className="filterSelector">
                  <option value="none" selected="selected">
                    No filter
                  </option>
                </select>
              </div>
              <div className="filterDiv">
                <label className="filterLabel">Condition</label>
                <select multiple size="4" id="conditionFilter" className="filterSelector">
                  <option value="none" selected="selected">
                    No filter
                  </option>
                </select>
              </div>
            </Box>
            <Button variant="outlined" sx={{width: '85%', mb: 2, mt: 2}} onClick={filterListings}>Filter</Button>
            <TextField id="sorting" name="sorting" className="sorting" select label="Sort By" onChange={sortListings}>
              <MenuItem value="titleAscending">Title - Ascending</MenuItem>
              <MenuItem value="titleDescending">Title - Descending</MenuItem>
              <MenuItem value="authorAscending">Author - Ascending</MenuItem>
              <MenuItem value="authorDescending">Author - Descending</MenuItem>
              <MenuItem value="priceAscending">Price - Ascending</MenuItem>
              <MenuItem value="priceDescending">Price - Descending</MenuItem>
            </TextField>
            {/* <button onClick={sortListings}>Sort</button> */}
          </Box>
          {/* <div>
          <ul id="listings"></ul>
        </div> */}
        </Box>
        <Box
          sx={{
            width: "72%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            overflowY: "auto",
          }}
          className="scrollBar"
        >
          {loading ? (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : textbooks.length > 0 ? (
            <Grid
              container
              spacing={1}
              sx={{
                display: "flex",
                // justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              {textbooks.map((textbook) => {
                return <Textbook textbook={textbook} userData={userData} />;
              })}
            </Grid>
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {first ? <Typography variant="h5">To See Textbooks, Start By Searching.</Typography> : <Typography variant="h5">No Textbooks Found</Typography>}
            </Box>
          )}
        </Box>
      </Box>
      {listingId !== "" ? <SharedListing listingID={listingId} open={open} setOpen={setOpen} /> : ""}
    </div>
  );
};

export default Buy;
