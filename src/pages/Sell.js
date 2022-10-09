import './Sell.css'
import { Avatar, CardHeader, CardContent, Divider, Box, Typography, Button, ImageList, ImageListItem } from '@mui/material';
import { TextField, MenuItem } from '@mui/material';

// function sendToServer() {
//     var title = document.getElementById("title").value;
//     var isbn = document.getElementById("isbn").value;
//     var author = document.getElementById("author").value;
//     var edition = document.getElementById("edition").value;
//     var price = document.getElementById("price").value;
//     var description = document.getElementById("description").value;
//     var client = new XMLHttpRequest();
//     client.open("POST", "http://localhost:8080", true);
//     //client.setRequestHeader("Request_Type", 1);
//     client.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
//     var json = `{"title": "${title}", "isbn": "${isbn}", "author": "${author}", "edition": "${edition}", "price": "${price}", "description": "${description}"}`; 
//     console.log(json);
//     client.send(json);

// adds dollar sign in front of price
function handleDollar(event) {
    var value = event.target.value
    if (value.includes('$')) {
        value = value.split('$')[1]
    }
    if (value === '') {
        event.target.value = ''
        document.getElementById('previewPrice').innerText = 'Price'
    } else if (isNaN(value)) {
        event.target.value = event.target.value.slice(0, -1)
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
        if (!isNaN(event.target.value)) {
            document.getElementById('previewEdition').innerText = event.target.value
        } else {
            event.target.value = event.target.value.slice(0,-1)
        }
    } else if (event.target.name === 'condition') {
        document.getElementById('previewCondition').innerText = event.target.value
    } else if (event.target.id === 'description') {
        document.getElementById('previewDescription').innerText = event.target.value
    }
}

function listTextbook(e) {
    console.log(e)
    e.preventDefault()
}

function Sell () {
    return (
        <div className="sellDisplay">
            <Box sx={{width: '28%', height: '100%', backgroundColor: 'var(--primary-color)', display: 'flex', flexDirection: 'column'}}>
                <CardHeader title="Textbooks for sale" sx={{textAlign: 'center', height: '5%'}}/>
                <Box sx={{'& > :not(style)': { m: 1 }, height: "95%", overflowY: 'scroll'}} component="form" noValidate autoComplete="off" className="formDisplay scrollBar"
                onSubmit={event => listTextbook(event)}>
                    <Typography variant="body1" color='var(--text-color)'>
                        This is where you add pictures for textbooks
                    </Typography>
                    <TextField id="title" label="Title" required onChange={event => changeText(event)}/>
                    <TextField id="price" label="Price" required onChange={event => handleDollar(event)} inputProps={{ maxLength: 4 }}/>
                    <TextField id="author" label="Author" required onChange={event => changeText(event)}/>
                    <TextField id="isbn" label="ISBN" required onChange={event => changeText(event)} inputProps={{ maxLength: 13 }}/>
                    <TextField id="edition" label="Edition" required onChange={event => changeText(event)} inputProps={{ maxLength: 2 }}/>
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
                <Box sx={{ width: '90%', borderRadius: 5, height: '90%', display: 'flex', flexDirection: 'column', backgroundColor:'var(--primary-color)', boxShadow: 8}}>
                    <CardHeader title="Preview" sx={{height: '5%', marginLeft:'1%'}}/>
                    <Box sx={{height:'95%', width:'100%', display:'flex',justifyContent:'center', overflowY:'auto'}}>
                        <Box sx={{height: '96%', width: '95%', display: 'flex', flexDirection: 'row'}}>
                            <Box sx={{ width: '60%', height: '100%', backgroundColor: 'var(--tertiary-color)'}} className="innerLeftBox">
                                <Typography variant="h4" color='var(--text-color)'>
                                    Listing Preview
                                </Typography>
                            </Box>
                            <Box sx={{ width: '40%', height: '100%', backgroundColor: 'var(--secondary-color)'}} className="innerRightBox">
                                <CardContent sx={{wordBreak: 'break-word', overflowY: 'scroll', height:'70%', display:'flex', flexDirection:'column'}} className="scrollBar">
                                    <Typography variant="h5" color='var(--text-color)' sx={{fontWeight:'bold'}} id="previewTitle">
                                        Title
                                    </Typography>
                                    <Typography variant="h6" color='var(--text-color)' sx={{fontWeight:'bold'}} id="previewPrice">
                                        Price
                                    </Typography>
                                    <br/>
                                    <Typography variant="h6" color='var(--text-color)' sx={{fontWeight:'bold'}}>
                                        Details
                                    </Typography>
                                    <br/>
                                    <Typography variant="h6" color='var(--text-color)' sx={{fontWeight:'bold'}}>
                                        Author
                                        <Typography variant="body1" color='var(--text-color)' id="previewAuthor"/>
                                    </Typography>
                                    <Typography variant="h6" color='var(--text-color)' sx={{fontWeight:'bold'}}>
                                        ISBN
                                        <Typography variant="body1" color='var(--text-color)' id="previewISBN"/>
                                    </Typography>
                                    <Typography variant="h6" color='var(--text-color)' sx={{fontWeight:'bold'}}>
                                        Edition
                                        <Typography variant="body1" color='var(--text-color)' id="previewEdition"/>
                                    </Typography>               
                                    <Typography variant="h6" color='var(--text-color)' sx={{fontWeight:'bold'}}>
                                        Condition
                                        <Typography variant="body1" color='var(--text-color)' id="previewCondition"/>
                                    </Typography>
                                    <br/>
                                    <Typography variant="h6" color='var(--text-color)' sx={{fontWeight:'bold'}}>
                                        Description
                                        <Typography variant="body1" color='var(--text-color)' id="previewDescription"/>
                                    </Typography>
                                    <br/><br/>
                                </CardContent>
                                <Divider variant='middle' sx={{borderBottomColor: 'black'}}/>
                                <CardContent sx={{height: '20%', display: 'flex', flexDirection:'column'}}>
                                    <Typography variant="body1" color='var(--text-color)' sx={{fontWeight:'bold', fontSize:18}}>
                                        Seller Information
                                        <Button variant="outlined" size="small" disabled sx={{float: 'right'}}>Seller Details</Button>
                                    </Typography>
                                    <br/>
                                    <Typography variant="body1" color='var(--text-color)' sx={{display: 'flex', justifyContent:'space-between', alignItems:'center'}} id="avatarName">
                                        <Avatar sx={{ width: 40, height: 40 }} alt="" src="" id="avatarPic"/>
                                        Jeff Wang
                                    </Typography>
                                </CardContent>
                                <Box sx={{height: '10%', backgroundColor: 'var(--secondary-color)'}} className="innerBottomBox">
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