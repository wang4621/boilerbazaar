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
                <input type="checkbox"></input>
            </div>
        </div>
    )
}
  
export default Buy;