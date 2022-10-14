import './BuyMain.css'
import * as React from 'react';
import { TextField, MenuItem } from '@mui/material';
import $ from 'jquery';
import { Routes, Route, NavLink } from 'react-router-dom';

function BuyMain() {
    //Function to toggle the display of filters and sorting options
    function toggleFilters() {
        const filtersDiv = document.getElementById("filters");
        const filtersButton = document.getElementById("filtersButton");
        if (filtersDiv.style.display !== "flex") {
            filtersDiv.style.display = "flex";
        }
        else {
            filtersDiv.style.display = "none";
        }
    }

    

    function search() {
        const searchFilterValue = document.getElementById("searchFilter").innerText;
        const searchText = document.getElementById("searchBar").value;
        console.log("filter: " + searchFilterValue);
        var searchParams = "";
        if (searchFilterValue === "Title") {
            searchParams = "title=" + searchText;
        }
        else if (searchFilterValue === "Author") {
            searchParams = "author=" + searchText;
        }
        else if (searchFilterValue === "ISBN") {
            searchParams = "isbn=" + searchText;
        }
        const searchUrl = "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/listing?" + searchParams;
        console.log(searchUrl);
        $.ajax({
            url: searchUrl,
            type: 'GET',    
            success: function (result) {
                //alert(JSON.stringify(result))
                console.log(result);
                let returnedItems = result.Items;
            
                const listings = document.getElementById("listings");
                var listingList = [];
                for (let i = 0; i < returnedItems.length; i++) {
                    listingList.push(["Title: " + returnedItems[i].title + " Author: " + returnedItems[i].isbn + " ISBN: " + returnedItems[i].isbn + " Edition: " + returnedItems[i].condition + " Condition: " + returnedItems[i].price + " Price: " + returnedItems[i].price + " Description: " + returnedItems[i].description]);
                }
                //const listingList = ["Title: " + returnedItem.title + " Author: " + returnedItem.isbn + " ISBN: " + returnedItem.isbn + " Edition: " + returnedItem.condition + " Condition: " + returnedItem.price + " Price: " + returnedItem.price + " Description: " + returnedItem.description];

                console.log(listingList);
                while (listings.hasChildNodes()) {
                    listings.removeChild(listings.firstChild);
                }
                for (let item of listingList) {
                    let newListing = document.createElement('li');
                    let a = document.createElement('a');
                    let text = document.createTextNode(item.trim());
                    a.appendChild(text);
                    a.title = "title";
                    a.href = "";
                    newListing.appendChild(a);
                    listings.appendChild(newListing);
                }
            },
            error: function (result) {
                alert(JSON.stringify(result));
            }
        });
        
    }
    return (
        <div>
        <label>
            Search By
            <TextField id="searchFilter" class="searchFilter" select>
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="author">Author</MenuItem>
                <MenuItem value="isbn">ISBN</MenuItem>
            </TextField>
        </label>

        <div>
            <form id="searchFrm" ></form>
            <input id="searchBar" type="text" placeholder ="Search Book Title"></input>
            <input id="searchBtn" type="submit" onClick={search}></input>
        </div>

            <button id="filtersButton" onClick={toggleFilters}>Filters and Sorting</button>
            <div class="filters" id="filters">
                <div class="filterCheckboxes">
                    <div class="filterDiv">
                        <label class="filterLabel">
                            Course
                        </label>
                        <select multiple size="4" class="filterSelector">
                            <option value='none'>No filter</option>
                            <option value='CS307'>CS 307</option>
                            <option value='CS381'>CS 381</option>
                            <option value='CS182'>CS 182</option>
                            <option value='CS240'>CS 240</option>
                        </select>
                    </div>
                    <div class="filterDiv">
                        <label class="filterLabel">
                            Edition
                        </label>
                        <select multiple size="4" class="filterSelector">
                            <option value='none'>No filter</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                        </select>
                    </div>
                    <div class="filterDiv">
                        <label class="filterLabel">
                            Condition
                        </label>
                        <select multiple size="4" class="filterSelector">
                            <option value='none'>No filter</option>
                            <option value='new'>New</option>
                            <option value='usedLN'>Used - Like New</option>
                            <option value='usedG'>Used - Good</option>
                            <option value='usedF'>Used - Fair</option>
                        </select>
                    </div>
                </div>
                <label>
                    Sort by
                    <TextField id="sorting" name="sorting" class="sorting" select>
                        <MenuItem value="titleAscending">Title - Ascending</MenuItem>
                        <MenuItem value="titleDescending">Title - Descending</MenuItem>
                        <MenuItem value="authorAscending">Author - Ascending</MenuItem>
                        <MenuItem value="authorDescending">Author - Descending</MenuItem>
                        <MenuItem value="priceAscending">Price - Ascending</MenuItem>
                        <MenuItem value="priceDescending">Price - Descending</MenuItem>
                    </TextField>
                </label>
            </div>

            <div>
                <ul id="listings">
                    <NavLink to='listing'>textbook</NavLink>
                </ul>
            </div>
        </div>
    )
}
export default BuyMain;