import './Sell.css'

function Sell () {
    return (
        <form>
            <label>Title:</label>
            <input type="text" required/>
            <br/>
            <label>ISBN:</label>
            <input type="text" required/>
            <br/>
            <label>Author:</label>
            <input type="text" required/>
            <br/>
            <label>Edition:</label>
            <input type="text" required/>
            <br/>
            <label>Condition:</label>
            <select required> 
                <option value="new">New</option>
                <option value="likeNew">Used - Like New</option>
                <option selected value="good">Used - Good</option>
                <option value="fair">Used - Fair</option>
            </select>
            <br/>
            <label>Price:</label>
            <div className="price">
                <input type="number" min="0" max="200" required/>
            </div>
            <br/>
            <label>Description:</label>
            <br/>
            <textarea maxlength="250"/>
            <br/>
            <input type="submit" value="Submit" />
        </form>
    )
}
  
export default Sell;