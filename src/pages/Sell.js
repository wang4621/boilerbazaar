import './Sell.css'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

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

function changeText(event) {
    console.log(event.target.value)
    console.log(event.target.id)
    if (event.target.id === 'title') {

    } else if (event.target.id === 'price') {

    } else if (event.target.id === 'author') {

    } else if (event.target.id === 'isbn') {

    } else if (event.target.id === 'edition') {

    } else if (event.target.id === 'condition') {

    } else if (event.target.id === 'description') {

    }
}

function Sell () {
    return (
        <div className="sellDisplay">
            <Box sx={{width: '25%', height: '100%', backgroundColor: 'rgb(223, 223, 223)'}}>
                <CardHeader title="Textbooks for sale" sx={{textAlign: 'center'}}/>
                <div className="formDisplay">
                    <form>
                        <br/><br/>
                        <input type="text" placeholder="Title" id="title" onChange={event => changeText(event)} required/>
                        <br/><br/>
                        <input type="text" id="price" placeholder="Price" onChange={handleDollar} maxLength="4" required/>
                        <br/><br/>
                        <input type="text" placeholder="Author" id="author" required/>
                        <br/><br/>
                        <input type="text" placeholder="ISBN" id="isbn" required/>
                        <br/><br/>
                        <input type="text" placeholder="Edition" id="edition" required/>
                        <br/><br/>
                        <select id="condition" required> 
                            <option value="" disabled selected hidden>Condition</option>
                            <option value="new">New</option>
                            <option value="likeNew">Used - Like New</option>
                            <option value="good">Used - Good</option>
                            <option value="fair">Used - Fair</option>
                        </select>
                        <br/><br/>
                        <textarea maxlength="250" placeholder="Description" id="description" rows="5" cols="30"/>
                        <br/><br/>
                        <input type="submit" value="List" id="list"/>
                    </form>
                </div>
            </Box>
            <div className="previewDisplay">
                <Card sx={{ width: "90%", borderRadius: 5, height: '90%'}} elevation={12}>
                        <CardHeader title="Preview"/>
                        <div className="innerCard">
                            <Box sx={{ width: '58%', height: '88%', backgroundColor: 'rgb(223, 223, 223)'}} className="innerLeftBox">
                                <CardContent sx={{alignItems: 'center', display: 'flex', justifyContent: 'center', height: '100%'}}>
                                    <Typography variant="h4" color="black">
                                        Listing Preview
                                    </Typography>
                                </CardContent>
                            </Box>
                            <Box sx={{ width: '37%', height: '88%', backgroundColor: 'whitesmoke'}} className="innerRightBox">
                                <CardContent>
                                    <Typography variant="h4" color="black" sx={{fontWeight:'bold'}}>
                                        Title
                                    </Typography>
                                    <Typography variant="h6" color="black" sx={{fontWeight:'bold'}}>
                                        Price
                                        <br/>
                                    </Typography>
                                    <br/>
                                    <Typography variant="h6" color="black" sx={{fontWeight:'bold'}}>
                                        Details
                                    </Typography>
                                    <br/>
                                    <Typography variant="h6" color="black" sx={{fontWeight:'bold'}}>
                                        Author
                                        <br/>
                                    </Typography>
                                    <Typography variant="h6" color="black" sx={{fontWeight:'bold'}}>
                                        ISBN
                                        <br/>
                                    </Typography>
                                    <Typography variant="h6" color="black" sx={{fontWeight:'bold'}}>
                                        Edition
                                        <br/>
                                    </Typography>               
                                    <Typography variant="h6" color="black" sx={{fontWeight:'bold'}}>
                                        Condition
                                        <br/>
                                    </Typography>
                                    <br/>
                                    <Typography variant="h6" color="black" sx={{fontWeight:'bold'}}>
                                        Description
                                    </Typography>
                                    <br/><br/>
                                </CardContent>
                                <Divider variant='middle' sx={{borderBottomColor: 'black'}}/>
                                <CardContent>
                                    <Typography variant="body1" color="black" sx={{fontWeight:'bold', fontSize:18}}>
                                        Seller Information
                                        <Button variant="outlined" size="small" disabled sx={{float: 'right'}}>Seller Details</Button>
                                    </Typography>
                                    <br/>
                                    <Avatar></Avatar>
                                </CardContent>
                                <Box sx={{ width: '100%', height: '10%', backgroundColor: 'whitesmoke'}} className="innerBottomBox">
                                    <Button variant="contained" disabled sx={{width: '95%'}}>Message</Button>
                                </Box>
                            </Box>
                        </div>
                </Card>
            </div>
        </div>
    )
}
  
export default Sell;