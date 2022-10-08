import './Sell.css'
import { Avatar, CardHeader, CardContent, Divider, Box, Typography, Button, ImageList, ImageListItem } from '@mui/material';
import { TextField, MenuItem } from '@mui/material';
import $ from 'jquery';

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

// this checks if isbn is 10 or 13 and if it numbers only
// function handleISBN(event) {

// }

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
    } else if (event.target.name === 'condition') {
        document.getElementById('previewCondition').innerText = event.target.value
    } else if (event.target.id === 'description') {
        document.getElementById('previewDescription').innerText = event.target.value
    }
}

function listTextbook(e) {
    console.log(e)
    var title = document.getElementById('title').value
    var price = document.getElementById('price').value
    console.log(price)
    var author = document.getElementById('author').value
    var isbn = document.getElementById('isbn').value
    var edition = document.getElementById('edition').value
    $.ajax({
        url: 'https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/listing',
        type: 'POST',
        data: '',
        datatype: 'json',
        contentType: 'application/json',
        success: function (result) {
            alert(JSON.stringify(result))
        },
        error: function (result) {
            alert(JSON.stringify(result));
        }
    });
    e.preventDefault()
}

function Sell () {
    return (
        <div className="sellDisplay">
            <Box sx={{width: '28%', height: '100%', backgroundColor: 'whitesmoke', display: 'flex', flexDirection: 'column'}}>
                <CardHeader title="Textbooks for sale" sx={{textAlign: 'center', height: '5%'}}/>
                <Box sx={{'& > :not(style)': { m: 1 }, height: "95%", overflowY: 'scroll'}} component="form" noValidate autoComplete="off" className="formDisplay scrollBar"
                onSubmit={event => listTextbook(event)}>
                    <Typography variant="body1" color="black">
                        This is where you add pictures for textbooks
                    </Typography>
                    <TextField id="title" label="Title" required onChange={event => changeText(event)}/>
                    <TextField id="price" label="Price" required onChange={event => handleDollar(event)}/>
                    <TextField id="author" label="Author" required onChange={event => changeText(event)}/>
                    <TextField id="isbn" label="ISBN" required onChange={event => changeText(event)}/>
                    <TextField id="edition" label="Edition" required onChange={event => changeText(event)}/>
                    <TextField id="condition" name="condition" label="Condition" select required onChange={event => changeText(event)}>
                            <MenuItem value="New">New</MenuItem>
                            <MenuItem value="Used - Like New">Used - Like New</MenuItem>
                            <MenuItem value="Used - Good">Used - Good</MenuItem>
                            <MenuItem value="Used - Fair">Used - Fair</MenuItem>
                    </TextField>
                    <TextField id="description" label="Description" multiline rows={5} onChange={event => changeText(event)} inputProps={{ maxLength: 250 }}/>
                    <TextField id="list" type="submit" value="List"/>
                </Box>
            </Box>
            <Box sx={{width: '72%', height: '100%', display: 'flex', justifyContent:'center', alignItems: 'center'}}>
                <Box sx={{ width: '90%', borderRadius: 5, height: '90%', display: 'flex', flexDirection: 'column', backgroundColor:'white', boxShadow: 8}}>
                    <CardHeader title="Preview" sx={{height: '5%', marginLeft:'1%'}}/>
                    <Box sx={{height:'95%', width:'100%', display:'flex',justifyContent:'center', overflowY:'auto'}}>
                        <Box sx={{height: '96%', width: '95%', display: 'flex', flexDirection: 'row'}}>
                            <Box sx={{ width: '60%', height: '100%', backgroundColor: 'rgb(223, 223, 223)'}} className="innerLeftBox">
                                <Typography variant="h4" color="black">
                                    Listing Preview
                                </Typography>
                            </Box>
                            <Box sx={{ width: '40%', height: '100%', backgroundColor: 'whitesmoke'}} className="innerRightBox">
                                <CardContent sx={{wordBreak: 'break-word', overflowY: 'scroll', height:'70%', display:'flex', flexDirection:'column'}} className="scrollBar">
                                    <Typography variant="h5" color="black" sx={{fontWeight:'bold'}} id="previewTitle">
                                        Title
                                    </Typography>
                                    <Typography variant="h6" color="black" sx={{fontWeight:'bold'}} id="previewPrice">
                                        Price
                                    </Typography>
                                    <br/>
                                    <Typography variant="h6" color="black" sx={{fontWeight:'bold'}}>
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
                                <CardContent sx={{height: '20%', display: 'flex', flexDirection:'column'}}>
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
                                <Box sx={{height: '10%', backgroundColor: 'whitesmoke'}} className="innerBottomBox">
                                    <Button variant="contained" disabled sx={{width: '95%'}}>Message</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}
  
export default Sell;