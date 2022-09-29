import './Sell.css'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card'

function Sell () {
    return (
        <div>
            <Box sx={{width: '30%', height: '50 %', backgroundColor: 'gray'}}>
                <form>
                    <input type="text" placeholder="Title" font-size="50" required/>
                    <br/>
                    <input type="text" placeholder="ISBN" required/>
                    <br/>
                    <input type="text" placeholder="Author" required/>
                    <br/>
                    <input type="text" placeholder="Edition" required/>
                    <br/>
                    <select required> 
                        <option value="" disabled selected hidden>Condition</option>
                        <option value="new">New</option>
                        <option value="likeNew">Used - Like New</option>
                        <option value="good">Used - Good</option>
                        <option value="fair">Used - Fair</option>
                    </select>
                    <br/>
                    <div className="price">
                        <input type="number" min="0" max="200" placeHolder="Price" required/>
                    </div>
                    <br/>
                    <textarea maxlength="250" placeholder="Description" rows="4" cols="50"/>
                    <br/>
                    <input type="submit" value="List" />
                </form>
            </Box>
            <Card variant="outlined"  sx={{ maxWidth: 345 }}>Hello</Card>
        </div>
    )
}
  
export default Sell;