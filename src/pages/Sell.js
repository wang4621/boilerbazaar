import './Sell.css'
import { Avatar, Card, CardHeader, CardContent, Divider, Box, Typography, Button, ImageList, ImageListItem } from '@mui/material';
import { TextField, MenuItem } from '@mui/material';

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
function handleISBN(event) {

}

function changeText(event) {
    // console.log(event.target.value)
    // console.log(event.target)
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
    var items = e.target
    for (var i = 0; i < items.length; i+=2) {
        if (items[i].required && items[i].value == '') {
        }
    }
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
            <div className="previewDisplay">
                <Card sx={{ width: "90%", borderRadius: 5, height: '90%', display: 'flex', flexDirection: 'column'}} elevation={8}>
                        <CardHeader title="Preview" sx={{height: '5%'}}/>
                        <div className="innerCard">
                            <Box sx={{ width: '58%', height: '96%', backgroundColor: 'rgb(223, 223, 223)'}} className="innerLeftBox">
                                <CardContent sx={{alignItems: 'center', display: 'flex', justifyContent: 'center', height: '94%'}}>
                                    <Typography variant="h4" color="black">
                                        Listing Preview
                                    </Typography>
                                </CardContent>
                            </Box>
                            <Box sx={{ width: '37%', height: '96%', backgroundColor: 'whitesmoke'}} className="innerRightBox">
                                <CardContent sx={{wordBreak: 'break-word', overflowY: 'scroll', height:'70%', display:'flex', flexDirection:'column'}} className="scrollBar">
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
                        </div>
                </Card>
            </div>
        </div>
    )
}
  
export default Sell;