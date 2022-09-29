// import './Sell.css'
import Box from '@mui/material/Box';
// import Card from '@mui/material/Card'

// adds dollar sign in front of price
function handleDollar() {
    var value = document.getElementById('price').value
    if (value.includes('$')) {
        value = value.split('$')[1]
    }
    if (isNaN(value) || value === '') {
        document.getElementById('price').value = ''
    } else {
        value = "$" + value;
        document.getElementById('price').value = value
    }
}

function Sell () {
    return (
        <div className="sellDisplay">
            <Box sx={{width: '30%', height: '871px', backgroundColor: 'rgb(223, 223, 223)'}} className="formDisplay">
                <form>
                    <span style={{"font-size": "25px", "font-weight": "bold"}}>Textbook For Sale</span>
                    <br/><br/>
                    <input type="text" placeholder="Title" required/>
                    <br/><br/>
                    <input type="text" placeholder="ISBN" required/>
                    <br/><br/>
                    <input type="text" placeholder="Author" required/>
                    <br/><br/>
                    <input type="text" placeholder="Edition" required/>
                    <br/><br/>
                    <select required> 
                        <option value="" disabled selected hidden>Condition</option>
                        <option value="new">New</option>
                        <option value="likeNew">Used - Like New</option>
                        <option value="good">Used - Good</option>
                        <option value="fair">Used - Fair</option>
                    </select>
                    <br/><br/>
                    <input type="text" id="price" placeholder="Price" onChange={handleDollar} maxLength="4" required/>
                    <br/><br/>
                    <textarea maxlength="250" placeholder="Description" rows="5" cols="30"/>
                    <br/><br/>
                    <input type="submit" value="List" id="list"/>
                </form>
            </Box>
        </div>
    )
}
  
export default Sell;