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
                    <img src={blank} alt="name" 
                    style={{
                        width:100
                    }}/>
                        <div class="container">
                            <h2>Jeffrey Wang</h2>
                            <p>Contact Info: wang4621@purdue.edu</p>
                            <p>
                                <IconButton target="_blank" href="www.google.com" rel="noopener noreferrer">
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
                            <h2>name</h2>
                            <p>info</p>
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
                            <h2>name</h2>
                            <p>info</p>
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
                            <h2>name</h2>
                            <p>info</p>
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
                            <h2>name</h2>
                            <p>info</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
  
export default About;