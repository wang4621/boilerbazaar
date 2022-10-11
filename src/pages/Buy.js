import './Buy.css';

function Buy (){
    //Function to toggle the display of filters and sorting options
    function toggleFilters() {
        const filtersDiv = document.getElementById("filters");
        const filtersButton = document.getElementById("filtersButton");
        if (filtersDiv.style.display !== "none") {
            filtersDiv.style.display = "none";
        }
        else {
            filtersDiv.style.display = "block";
        }
    }
    return (
        <div>
            <h1>Buy</h1>
            <button id="filtersButton" onClick={toggleFilters}>Show Filters and Sorting</button>
            <div class="filters" id="filters">
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
                <label>
                    Title
                    <input type="radio" name="sorting" value="Title"></input>
                </label>
                <label>
                    Author
                    <input type="radio" name="sorting" value="Author"></input>
                </label>
                <label>
                    Price
                    <input type="radio" name="sorting" value="Price"></input>
                </label>
            </div>
        </div>
    )
}
  
export default Buy;