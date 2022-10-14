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

    
    var listingList = [];
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
                listingList = [];
                for (let i = 0; i < returnedItems.length; i++) {
                    listingList.push({"title": returnedItems[i].title, "author": returnedItems[i].author, "isbn": returnedItems[i].isbn, "edition:": returnedItems[i].edition, "condition": returnedItems[i].condition, "price": returnedItems[i].price, "description": returnedItems[i].description, "toString": "Title: " + returnedItems[i].title + " Author: " + returnedItems[i].author + " ISBN: " + returnedItems[i].isbn + " Edition: " + returnedItems[i].edition + " Condition: " + returnedItems[i].condition + " Price: " + returnedItems[i].price + " Description: " + returnedItems[i].description});
                }
                //const listingList = ["Title: " + returnedItem.title + " Author: " + returnedItem.isbn + " ISBN: " + returnedItem.isbn + " Edition: " + returnedItem.condition + " Condition: " + returnedItem.price + " Price: " + returnedItem.price + " Description: " + returnedItem.description];

                console.log(listingList);
                while (listings.hasChildNodes()) {
                    listings.removeChild(listings.firstChild);
                }
                for (const item of listingList) {
                    let newListing = document.createElement('li');
                    let a = document.createElement('a');
                    let text = document.createTextNode(item.toString.trim());
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

    function compareByTitleA(a, b) {
        const x = a.title.toUpperCase();
        const y = b.title.toUpperCase();
        if (x < y) {
            return -1;
        }
        else if (x > y) {
            return 1;
        }
        else {
            return 0;
        }
    }

    function compareByTitleD(a, b) {
        const x = a.title.toUpperCase();
        const y = b.title.toUpperCase();
        if (x > y) {
            return -1;
        }
        else if (x < y) {
            return 1;
        }
        else {
            return 0;
        }
    }

    function compareByAuthorA(a, b) {
        const x = a.author.toUpperCase();
        const y = b.author.toUpperCase();
        if (x < y) {
            return -1;
        }
        else if (x > y) {
            return 1;
        }
        else {
            return 0;
        }
    }

    function compareByAuthorD(a, b) {
        const x = a.author.toUpperCase();
        const y = b.author.toUpperCase();
        if (x > y) {
            return -1;
        }
        else if (x < y) {
            return 1;
        }
        else {
            return 0;
        }
    }

    function compareByPriceA(a, b) {
        const x = parseInt(a.price);
        const y = parseInt(b.price);
        if (x < y) {
            return -1;
        }
        else if (x > y) {
            return 1;
        }
        else {
            return 0;
        }
    }

    function compareByPriceD(a, b) {
        const x = parseInt(a.price);
        const y = parseInt(b.price);
        if (x > y) {
            return -1;
        }
        else if (x < y) {
            return 1;
        }
        else {
            return 0;
        }
    }
    
    function sortListings() {
        const sortingMode = document.getElementById("sorting").innerText;
        switch (sortingMode) {
            case "Title - Ascending":
                listingList.sort(compareByTitleA);
                break;
            case "Title - Descending":
                listingList.sort(compareByTitleD);
                break;
            case "Author - Ascending":
                listingList.sort(compareByAuthorA);
                break;
            case "Author - Descending":
                listingList.sort(compareByAuthorD);
                break; 
            case "Price - Ascending":
                listingList.sort(compareByPriceA);
                break;
            case "Price - Descending":
                listingList.sort(compareByPriceD);
                break;
            default:
                return;
        }

        //Repopulate listings display
        const listings = document.getElementById("listings");
        while (listings.hasChildNodes()) {
            listings.removeChild(listings.firstChild);
        }
        for (const item of listingList) {
            let newListing = document.createElement('li');
            let a = document.createElement('a');
            let text = document.createTextNode(item.toString.trim());
            a.appendChild(text);
            a.title = "title";
            a.href = "";
            newListing.appendChild(a);
            listings.appendChild(newListing);
        }
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
                    <button onClick={sortListings}>Sort</button>
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