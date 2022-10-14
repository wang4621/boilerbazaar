import blank from './blank.jpg'
import './About.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import IconButton from '@mui/material/IconButton';

function About (){
    return (
        <div>
            <div  class="header">
                <h1>About Boiler Bazaar</h1>
                <p>about</p>
            </div>
            <div class="horizontal">
                <div class="vertical">
                    <div class="member">
                        <div class="container">
                            <h2>Project Repository</h2>
                            <p>
                                <IconButton sx={{ ml: 1, transform: 'scale(2)' }} target="_blank" href="https://github.com/wang4621/boilerbazaar" rel="noopener noreferrer">
                                    <GitHubIcon/>
                                </IconButton>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="vertical">
                    <div class="member">
                    <img src={blank} alt="name" 
                    style={{
                        width:100
                    }}/>
                        <div class="container">
                            <h2>Jeffrey Wang</h2>
                            <p>Contact Info: wang4621@purdue.edu</p>
                            <p>
                                <IconButton target="_blank" href="https://github.com/wang4621" rel="noopener noreferrer">
                                    <GitHubIcon/>
                                </IconButton>
                            </p>
                        </div>
                    </div>
                </div>

                <div class="vertical">
                    <div class="member">
                    <img src={blank} alt="name" 
                    style={{
                        width:100
                    }}/>
                        <div class="container">
                            <h2>Michio L Sekiguchi</h2>
                            <p>Contact Info: msekiguc@purdue.edu</p>
                            <p>
                                <IconButton target="_blank" href="https://github.com/msekiguc" rel="noopener noreferrer">
                                    <GitHubIcon/>
                                </IconButton>
                            </p>
                        </div>
                    </div>
                </div>

                <div class="vertical">
                    <div class="member">
                    <img src={blank} alt="name" 
                    style={{
                        width:100
                    }}/>
                        <div class="container">
                            <h2>Ryan Doan</h2>
                            <p>Contact Info: doan23@purdue.edu</p>
                            <p>
                                <IconButton target="_blank" href="https://github.com/ryan-doan" rel="noopener noreferrer">
                                    <GitHubIcon/>
                                </IconButton>
                            </p>
                        </div>
                    </div>
                </div>

                <div class="vertical">
                    <div class="member">
                    <img src={blank} alt="name" 
                    style={{
                        width:100
                    }}/>
                        <div class="container">
                            <h2>Xavier Huu Pham</h2>
                            <p>Contact Info: xpham@purdue.edu</p>
                            <p>
                                <IconButton target="_blank" href="https://github.com/x-pham" rel="noopener noreferrer">
                                    <GitHubIcon/>
                                </IconButton>
                            </p>
                        </div>
                    </div>
                </div>

                <div class="vertical">
                    <div class="member">
                    <img src={blank} alt="name" 
                    style={{
                        width:100
                    }}/>
                        <div class="container">
                            <h2>Shicheng Fang</h2>
                            <p>Contact Info: fang282@purdue.edu</p>
                            <p>
                                <IconButton target="_blank" href="https://github.com/fsc1118" rel="noopener noreferrer">
                                    <GitHubIcon/>
                                </IconButton>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
  
export default About;