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
function handleDollar(event) {
    var value = event.target.value
    if (value.includes('$')) {
        value = value.split('$')[1]
    }
    if (isNaN(value) || value === '') {
        event.target.value = ''
        document.getElementById('previewPrice').innerText = 'Price'
    } else {
        value = "$" + value;
        event.target.value = value
        document.getElementById('previewPrice').innerText = value
    }
}

function handleISBN(event) {

}

function changeText(event) {
    if (event.target.id === 'title') {
        if (event.target.value === '') {
            document.getElementById('previewTitle').innerText = 'Title'
        } else {
            document.getElementById('previewTitle').innerText = event.target.value
        }
    } else if (event.target.id === 'author') {
        document.getElementById('previewAuthor').innerText = event.target.value
    } else if (event.target.id === 'isbn') {
        document.getElementById('previewISBN').innerText = event.target.value
    } else if (event.target.id === 'edition') {
        document.getElementById('previewEdition').innerText = event.target.value
    } else if (event.target.id === 'condition') {
        document.getElementById('previewCondition').innerText = event.target.value
    } else if (event.target.id === 'description') {
        document.getElementById('previewDescription').innerText = event.target.value
    }
}

function Sell () {
    return (
        <div className="sellDisplay">
            <Box sx={{width: '30%', height: '100%', backgroundColor: 'rgb(223, 223, 223)'}}>
                <CardHeader title="Textbooks for sale" sx={{textAlign: 'center'}}/>
                <CardContent sx={{wordBreak: 'break-word', overflowY: 'scroll', height:'88%'}} className="scrollBar formDisplay">
                    <form>
                        <br/><br/>
                        <input type="text" placeholder="Title" id="title" onChange={event => changeText(event)} required/>
                        <br/><br/>
                        <input type="text" id="price" placeholder="Price" onChange={event => handleDollar(event)} maxLength="4" required/>
                        <br/><br/>
                        <input type="text" placeholder="Author" id="author" onChange={event => changeText(event)} required/>
                        <br/><br/>
                        <input type="text" placeholder="ISBN" id="isbn" onChange={event => changeText(event)} required/>
                        <br/><br/>
                        <input type="text" placeholder="Edition" id="edition" onChange={event => changeText(event)} required/>
                        <br/><br/>
                        <select id="condition" onChange={event => changeText(event)} required> 
                            <option value="" disabled selected hidden>Condition</option>
                            <option value="New">New</option>
                            <option value="Used - Like New">Used - Like New</option>
                            <option value="Used - Good">Used - Good</option>
                            <option value="Used - Fair">Used - Fair</option>
                        </select>
                        <br/><br/>
                        <textarea maxlength="250" placeholder="Description" id="description" rows="5" onChange={event => changeText(event)}/>
                        <br/><br/>
                        <input type="submit" value="List" id="list"/>
                    </form>
                </CardContent>
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
                                <CardContent sx={{wordBreak: 'break-word', overflowY: 'scroll', height:'70%'}} className="scrollBar">
                                    <Typography variant="h5" color="black" sx={{fontWeight:'bold'}} id="previewTitle">
                                        Title
                                    </Typography>
                                    <Typography variant="h6" color="black" sx={{fontWeight:'bold'}} id="previewPrice">
                                        Price
                                    </Typography>
                                    <br/>
                                    <Typography variant="h6" color="black" sx={{fontWeight:'bold'}} id="previewPrice">
                                        Details
                                    </Typography>
                                    <br/>
                                    <Typography variant="h6" color="black" sx={{fontWeight:'bold'}}>
                                        Author
                                        <Typography variant="body1" color="black" id="previewAuthor"/>
                                    </Typography>
                                    <Typography variant="h6" color="black" sx={{fontWeight:'bold'}}>
                                        ISBN
                                        <Typography variant="body1" color="black" id="previewISBN"/>
                                    </Typography>
                                    <Typography variant="h6" color="black" sx={{fontWeight:'bold'}}>
                                        Edition
                                        <Typography variant="body1" color="black" id="previewEdition"/>
                                    </Typography>               
                                    <Typography variant="h6" color="black" sx={{fontWeight:'bold'}}>
                                        Condition
                                        <Typography variant="body1" color="black" id="previewCondition"/>
                                    </Typography>
                                    <br/>
                                    <Typography variant="h6" color="black" sx={{fontWeight:'bold'}}>
                                        Description
                                        <Typography variant="body1" color="black" id="previewDescription"/>
                                    </Typography>
                                    <br/><br/>
                                </CardContent>
                                <Divider variant='middle' sx={{borderBottomColor: 'black'}}/>
                                <CardContent sx={{height: '30%'}}>
                                    <Typography variant="body1" color="black" sx={{fontWeight:'bold', fontSize:18}}>
                                        Seller Information
                                        <Button variant="outlined" size="small" disabled sx={{float: 'right'}}>Seller Details</Button>
                                    </Typography>
                                    <br/>
                                    <Typography variant="body1" color="black" sx={{display: 'flex', justifyContent:'space-between', alignItems:'center'}} id="avatarName">
                                        <Avatar sx={{ width: 40, height: 40 }} alt="" src="" id="avatarPic"/>
                                        Jeff Wang
                                    </Typography>
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