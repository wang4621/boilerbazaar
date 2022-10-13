import {useState} from "react";
import {sendGetRequest} from "../../Util/HTTP";

function BrowsingHistory (){
    const [data, setData] = useState(null)
    const email = "doan23@purdue.edu"

    if (data === null) {
        sendGetRequest(`https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/search_history?email=${email}`).then((rep)=>{
            setData(rep.body)
        })
        return <div>Loading...</div>
    }
    return (
        <div style={{
            width: "1000px",
            marginLeft: "auto",
            marginRight : "auto"
        }}>
            <div style={{
                fontWeight: "bold"
            }}>Recently opened</div>
            <div>
                <hr/>
                {data.map((each, index)=>{
                    return <div key={index}>
                        <div style={{margin: "10px"}}>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-around"
                            }}>
                                <div style={{
                                        display: "flex",
                                        flexDirection: "column"
                                }}>
                                    <img src={each.image} style={{
                                        width: "60px"
                                    }}></img>
                                    <br/>
                                    <a href={each.url}>{each.name}</a>
                                </div>

                                <div>Your opened just now</div>
                            </div>
                            <hr/>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default BrowsingHistory