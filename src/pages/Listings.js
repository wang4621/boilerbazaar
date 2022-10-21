import { Divider, Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { AppBar, Toolbar, IconButton, ListItemText, ListItem, List } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import $ from 'jquery';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Listings() {
    const [listedTextbooks, setListedTextbooks] = useState(<CircularProgress/>);
    const [sold, setSold] = React.useState({})
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);
    const [listingID, setListingID] = React.useState('');

    const openDelete = (listingId) => {
        setDeleteOpen(true);
        setListingID(listingId);
    };
    
    const deleteClose = () => {
        setDeleteOpen(false);
    };

    const deleteListing = () => {
        console.log(listingID)
        $.ajax({
            url: 'https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/listing?listingID=' + listingID,
            type: 'DELETE',
            success: function (result) {
                alert(JSON.stringify(result))
                setDeleteOpen(false)
                setListingID('')
            },
            error: function (result) {
                console.log(JSON.stringify(result));
            }
        });
    }

    const openEdit = (listingId) => {
        setEditOpen(true);
        setListingID(listingId);
    };

    const closeEdit = () => {
        setEditOpen(false);
    }
    
    // on button click for "Mark as Sold" and "Mark as Available"
    const changeTextAndIcon = (listingId, event) => {
        console.log(listingId)
        // console.log(event)
        // console.log(sold)
        if (event.target.innerText === 'Mark as Sold') {
            // send ajax to update, on success - setSold
            $.ajax({
                url: 'https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/userlisting?listingID=' + listingId + '&sold=true',
                type: 'PUT',
                success: function (result) {
                    console.log(JSON.stringify(result));
                    setSold(sold => ({
                        ...sold,
                        [listingId]: true
                    }))
                },
                error: function (result) {
                    console.log(JSON.stringify(result));
                }
            });
        } else {
            // send ajax to update, on sucess - setSold
            $.ajax({
                url: 'https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/userlisting?listingID=' + listingId + '&sold=false',
                type: 'PUT',
                success: function (result) {
                    console.log(JSON.stringify(result));
                    setSold(sold => ({
                        ...sold,
                        [listingId]: false
                    }))
                },
                error: function (result) {
                    console.log(JSON.stringify(result));
                }
            });
        }
    }

    function generateListingUI(listing) {
        let listingSold = listing['sold'];
        let listingId = listing['listingID'];
        console.log("listingID:", listingId + " sold: ",listingSold)
        return (
            <Box key={listingId} m={2} sx={{width: '80%', height: '20%', display: 'flex', flexDirection:'row', justifyContent: 'center', backgroundColor:'var(--secondary-color)', borderRadius:5, boxShadow: 8}}>
                <Box sx={{height:'100%', width:'30%', display: 'flex', alignItems:'center', justifyContent:'center'}}>
                    <Box sx={{height:'80%', width:'80%', backgroundColor:'lightgrey', borderRadius:5, display:'flex', justifyContent:'center', alignItems:'center'}}>
                        Image Preview
                    </Box>
                </Box>
                <Box sx={{height:'100%', width:'70%', display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                    <Box sx={{height: '80%', width: '95%'}}>
                        <Box sx={{height: '80%', width: '100%'}}>
                            <Typography variant='body1' sx={{fontWeight:'bold'}}>
                                {listing['title']}
                            </Typography>
                            <Typography variant='body1'>
                                ${listing['price']}
                            </Typography>
                            <Typography variant='body2'>
                                0 clicks on listing
                            </Typography>
                            <Typography variant='body2'>
                                Listed on {listing['timeListed']}
                            </Typography>
                        </Box>
                        <Box sx={{height: '20%', width: '100%', display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
                            <Button variant='contained' startIcon={listingSold=='true' ? <CheckIcon/> : <CloseIcon/>} sx={{height:'100% !important', width: '35%', borderRadius: '5px !important'}} onClick={event => changeTextAndIcon(listingId, event)}>
                                {listingSold=='true' ? 'Mark as Available' : 'Mark as Sold'}
                            </Button>
                            <Button variant='contained' startIcon={<EditIcon/>} sx={{height:'100% !important', width: '30%', borderRadius: '5px !important'}} onClick={() => openEdit(listingId)}>
                                Edit Listing
                            </Button>
                            <Button variant='contained' startIcon={<DeleteIcon/>} sx={{height:'100% !important', width: '30%', borderRadius: '5px !important'}} onClick={() => openDelete(listingId)}>
                                Delete Listing
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    } 

    // generates text if no listing is found
    function generateNoListing() {
        return (
            <Typography variant='h6' sx={{padding:'10px'}}>
                No Listings
            </Typography>
        );
    }

    useEffect(() => {
        // get user textbook listings
        console.log("here")
        let list = [];
        $.ajax({
            url: 'https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/userlisting?puid=' + JSON.parse(localStorage.getItem('userData'))['puid'],
            type: 'GET',
            success: function (result) {
                if (result.length === 0) {
                    list.push(generateNoListing());
                } else {
                    for (var i = 0; i < result.length; i++) {
                        list.push(generateListingUI(result[i]));
                    }
                }
                setListedTextbooks(list);
            },
            error: function (result) {
                console.log(JSON.stringify(result));
            }
        });
    }, [sold, listingID])

    return (
        <Box sx={{width: '80%', height: '100%', display: 'flex', flexDirection:'column'}}>
            <Box sx={{height: '8%'}}>
                <Typography variant='h6' sx={{fontWeight:'bold', textAlign:'center', padding:'10px'}}>
                    Your Listings
                </Typography>
                <Divider variant='middle' sx={{borderBottomColor: 'var(--text-color)'}}/>
            </Box>
            <Box sx={{height: '94%', display: 'flex', flexDirection:'column', alignItems:'center', overFlowY:'scroll'}}>
                {listedTextbooks}
            </Box>
            <Dialog open={deleteOpen} onClose={deleteClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {"Delete Listing?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you would like to delete your listing?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={deleteClose}>Cancel</Button>
                    <Button onClick={deleteListing} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog fullScreen open={editOpen} onClose={closeEdit}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={closeEdit} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Sound
                        </Typography>
                        <Button autoFocus color="inherit" onClick={closeEdit}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItem button>
                        <ListItemText primary="Phone ringtone" secondary="Titania" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText
                        primary="Default notification ringtone"
                        secondary="Tethys"
                        />
                    </ListItem>
                </List>
            </Dialog>
        </Box>
    )
}

export default Listings;