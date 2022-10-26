import {
    Divider, 
    Box,
    Typography,
    CircularProgress  
} from "@mui/material";
import './Watchlist.css'

function Watchlist() {
    /**
      @todo: add actual ajax request and update loading
    **/
    let loading = false;
    return (
        <Box
          sx={{
            width: "80%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
            <Box sx={{ height: "8%" }}>
                <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", textAlign: "center", padding: "10px" }}
                >
                    Your Watchlist
                </Typography>
                <Divider
                    variant="middle"
                    sx={{ borderBottomColor: "var(--text-color)" }}
                />
                {loading ? <CircularProgress/> : 
                <Typography variant="h6" sx={{ padding: "10px" }}>
                    No Listings in Watchlist
                </Typography>
                }
            </Box>
        </Box>
      );
}

export default Watchlist;