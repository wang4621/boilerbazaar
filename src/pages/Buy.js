import './Buy.css';
import { TextField, MenuItem } from '@mui/material';

function Buy (){
    //Function to toggle the display of filters and sorting options
    function toggleFilters() {
        const filtersDiv = document.getElementById("filters");
        const filtersButton = document.getElementById("filtersButton");
        if (filtersDiv.style.display !== "none") {
            filtersDiv.style.display = "none";
        }
        else {
            filtersDiv.style.display = "flex";
        }
    }
    return (
        <div class="buyDisplay">
            <h1>Buy</h1>
            <button id="filtersButton" onClick={toggleFilters}>Show Filters and Sorting</button>
            <div class="filters" id="filters">
                <div class="filterCheckboxes">
                <label>
                    Course
                    <input type="checkbox"></input>
                </label>
                <label>
                    Edition
                    <input type="checkbox"></input>
                </label>
                <label>
                    Condition
                    <input type="checkbox"></input>
                </label>
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
        </div>
    )
}
  
export default Buy;