import blank from "../component/Images/blank.jpg";
import "./About.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";
import { Avatar, Box, CardHeader, CircularProgress, Grid, Typography } from "@mui/material";

// function About() {
//   return (
//     <div>
//       <div class="header">
//         <h1>About BoilerBazaar</h1>
//       </div>
//       <div class="horizontal">
//         <div class="vertical">
//           <div class="member">
//             <div class="container">
//               <h2>Project Repository</h2>
//               <p>
//                 <IconButton
//                   color="inherit"
//                   sx={{ ml: 1, transform: "scale(2)" }}
//                   target="_blank"
//                   href="https://github.com/wang4621/boilerbazaar"
//                   rel="noopener noreferrer"
//                 >
//                   <GitHubIcon />
//                 </IconButton>
//               </p>
//             </div>
//           </div>
//         </div>
//         <div class="vertical">
//           <div class="member">
//             <img
//               src={blank}
//               alt="name"
//               style={{
//                 width: 100,
//               }}
//             />
//             <div class="container">
//               <h2>Jeffrey Wang</h2>
//               <p>Contact Info: wang4621@purdue.edu</p>
//               <p>
//                 <IconButton
//                   color="inherit"
//                   target="_blank"
//                   href="https://github.com/wang4621"
//                   rel="noopener noreferrer"
//                 >
//                   <GitHubIcon />
//                 </IconButton>
//               </p>
//             </div>
//           </div>
//         </div>

//         <div class="vertical">
//           <div class="member">
//             <img
//               src={blank}
//               alt="name"
//               style={{
//                 width: 100,
//               }}
//             />
//             <div class="container">
//               <h2>Michio L Sekiguchi</h2>
//               <p>Contact Info: msekiguc@purdue.edu</p>
//               <p>
//                 <IconButton
//                   color="inherit"
//                   target="_blank"
//                   href="https://github.com/msekiguc"
//                   rel="noopener noreferrer"
//                 >
//                   <GitHubIcon />
//                 </IconButton>
//               </p>
//             </div>
//           </div>
//         </div>

//         <div class="vertical">
//           <div class="member">
//             <img
//               src={blank}
//               alt="name"
//               style={{
//                 width: 100,
//               }}
//             />
//             <div class="container">
//               <h2>Ryan Doan</h2>
//               <p>Contact Info: doan23@purdue.edu</p>
//               <p>
//                 <IconButton
//                   color="inherit"
//                   target="_blank"
//                   href="https://github.com/ryan-doan"
//                   rel="noopener noreferrer"
//                 >
//                   <GitHubIcon />
//                 </IconButton>
//               </p>
//             </div>
//           </div>
//         </div>

//         <div class="vertical">
//           <div class="member">
//             <img
//               src={blank}
//               alt="name"
//               style={{
//                 width: 100,
//               }}
//             />
//             <div class="container">
//               <h2>Xavier Huu Pham</h2>
//               <p>Contact Info: xpham@purdue.edu</p>
//               <p>
//                 <IconButton
//                   color="inherit"
//                   target="_blank"
//                   href="https://github.com/x-pham"
//                   rel="noopener noreferrer"
//                 >
//                   <GitHubIcon />
//                 </IconButton>
//               </p>
//             </div>
//           </div>
//         </div>

//         <div class="vertical">
//           <div class="member">
//             <img
//               src={blank}
//               alt="name"
//               style={{
//                 width: 100,
//               }}
//             />
//             <div class="container">
//               <h2>Shicheng Fang</h2>
//               <p>Contact Info: fang282@purdue.edu</p>
//               <p>
//                 <IconButton
//                   color="inherit"
//                   target="_blank"
//                   href="https://github.com/fsc1118"
//                   rel="noopener noreferrer"
//                 >
//                   <GitHubIcon />
//                 </IconButton>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default About;

import React from "react";

const About = () => {
  return (
    <div className="aboutDisplay">
      <Grid
        container
        // spacing={1}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          //   mt: 2,
        }}
      >
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: 250,
              width: "80%",
              borderRadius: 5,
              backgroundColor: "var(--secondary-color)",
              boxShadow: 8,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <CardHeader title="Project Repository"/>
            <IconButton
              color="inherit"
              target="_blank"
              href="https://github.com/wang4621/boilerbazaar"
              rel="noopener noreferrer"
            >
              <GitHubIcon sx={{ width:128, height:128 }}/>
            </IconButton>
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: 250,
              width: "80%",
              borderRadius: 5,
              backgroundColor: "var(--secondary-color)",
              boxShadow: 8,
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Avatar sx={{ width: 64, height: 64 }} />
            <Box sx={{textAlign:'center'}}>
              <Typography>Jeffrey Wang</Typography>
              <Typography>Contact Info: wang4621@purdue.edu</Typography>
            </Box>
            <IconButton
              color="inherit"
              target="_blank"
              href="https://github.com/wang4621"
              rel="noopener noreferrer"
            >
              <GitHubIcon sx={{ width: 32, height: 32 }} />
            </IconButton>
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: 250,
              width: "80%",
              borderRadius: 5,
              backgroundColor: "var(--secondary-color)",
              boxShadow: 8,
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Avatar sx={{width:64, height:64}}/>
            <Box sx={{textAlign:'center'}}>
            <Typography>Michio L Sekiguchi</Typography>
            <Typography>Contact Info: msekiguc@purdue.edu</Typography>
            </Box>
            
            <IconButton
              color="inherit"
              target="_blank"
              href="https://github.com/msekiguc"
              rel="noopener noreferrer"
            >
              <GitHubIcon sx={{width:32, height:32}}/>
            </IconButton>
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: 250,
              backgroundColor: "white",
              width: "80%",
              borderRadius: 5,
              backgroundColor: "var(--secondary-color)",
              boxShadow: 8,
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Avatar sx={{ width: 64, height: 64 }} />
            <Box sx={{textAlign:'center'}}>
            <Typography>Ryan Doan</Typography>
            <Typography>Contact Info: doan23@purdue.edu</Typography>
            </Box>
            <IconButton
              color="inherit"
              target="_blank"
              href="https://github.com/ryan-doan"
              rel="noopener noreferrer"
            >
              <GitHubIcon sx={{ width: 32, height: 32 }} />
            </IconButton>
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: 250,
              backgroundColor: "white",
              width: "80%",
              borderRadius: 5,
              backgroundColor: "var(--secondary-color)",
              boxShadow: 8,
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Avatar sx={{ width: 64, height: 64 }} />
            <Box sx={{textAlign:'center'}}>
            <Typography>Xavier Huu Pham</Typography>
            <Typography>Contact Info: xpham@purdue.edu</Typography>
            </Box>
            
            <IconButton
              color="inherit"
              target="_blank"
              href="https://github.com/x-pham"
              rel="noopener noreferrer"
            >
              <GitHubIcon sx={{ width: 32, height: 32 }}/>
            </IconButton>
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: 250,
              backgroundColor: "white",
              width: "80%",
              borderRadius: 5,
              backgroundColor: "var(--secondary-color)",
              boxShadow: 8,
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Avatar sx={{ width: 64, height: 64 }} />
            <Box sx={{textAlign:'center'}}>
            <Typography>Shicheng Fang</Typography>
            <Typography>Contact Info: fang282@purdue.edu</Typography>
            </Box>
            
            <IconButton
              color="inherit"
              target="_blank"
              href="https://github.com/fsc1118"
              rel="noopener noreferrer"
            >
              <GitHubIcon sx={{ width: 32, height: 32 }}/>
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default About;
