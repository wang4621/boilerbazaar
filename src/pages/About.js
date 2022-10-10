import blank from './blank.jpg'
import './About.css';

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