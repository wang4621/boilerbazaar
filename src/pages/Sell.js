import './Sell.css'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

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
            <Box sx={{width: '25%', height: '100%', backgroundColor: 'rgb(223, 223, 223)'}} className="formDisplay">
                {/* <span style={{"font-size": "25px", "font-weight": "bold"}}>Textbook For Sale</span> */}
                <form>
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
            <div className="previewDisplay">
                <Card sx={{ width: "90%", borderRadius: 5, height: '90%'}} elevation={12}>
                        <CardHeader title="Preview"/>
                        <div className="innerCard">
                            <Card sx={{ width: '60%', borderRadius: '5 0 0 5', height: '88%', backgroundColor: 'gray'}}>
                                <CardContent>
                                </CardContent>
                            </Card>
                            <Card sx={{ width: '35%', borderRadius: '0 5 5 0', height: '88%', backgroundColor: 'rgb(223, 223, 223)'}}>
                                <CardContent>
                                    <Typography variant="h5" color="black">
                                        Title
                                    </Typography>
                                    <Typography variant="body1" color="black">
                                        Price
                                        <br/>
                                        Details
                                        <br/>
                                        Description
                                    </Typography>
                                    <Divider variant='middle'/>
                                </CardContent>
                            </Card>
                        </div>
                </Card>
            </div>
        </div>
    )
}
  
export default Sell;