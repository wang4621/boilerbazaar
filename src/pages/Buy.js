import './Buy.css';
import { TextField, MenuItem } from '@mui/material';

function Buy() {
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
            <button id="filtersButton" onClick={toggleFilters}>Filters and Sorting</button>
            <div class="filters" id="filters">
                <div class="filterCheckboxes">
                    <div class="filterDiv">
                        <label class="filterLabel">
                            Course:
                        </label>
                        <select multiple size="5" class="filterSelector">
                            <option value='none'>No filter</option>
                            <option value='CS307'>CS 307</option>
                            <option value='CS381'>CS 381</option>
                            <option value='CS182'>CS 182</option>
                            <option value='CS240'>CS 240</option>
                        </select>
                    </div>
                    <div class="filterDiv">
                        <label class="filterLabel">
                            Edition:
                        </label>
                        <select multiple size="5" class="filterSelector">
                            <option value='none'>No filter</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                        </select>
                    </div>
                    <div class="filterDiv">
                        <label class="filterLabel">
                            Condition:
                        </label>
                        <select multiple size="5" class="filterSelector">
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
        </div>
    )
}

export default Buy;