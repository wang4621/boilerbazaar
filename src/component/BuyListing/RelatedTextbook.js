import {
    Box,
    Typography
} from "@mui/material";

const RelatedTextbook = ({ listing }) => {
    return (
        <Box
        key={listing["listingId"]}
        m={2}
    >
        <Typography
            variant="body1"
            color="var(--text-color)"
            fontWeight= 'bold'
        >
            {listing["title"]}
        </Typography>
        <Typography
            variant="body1"
            color="var(--text-color)"
            fontStyle= 'italic'
        >
            {listing["author"]}
        </Typography>
        <Typography
            variant="body1"
            color="var(--text-color)"
        >
            {listing["course"]}
        </Typography>
    </Box>
    );
};

export default RelatedTextbook;