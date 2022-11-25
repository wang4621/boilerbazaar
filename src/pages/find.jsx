import { useState } from "react";
export const Find = () => {
    // Get url params
    const url = document.location.href;
    const user = url.split("/")[
        url.split("/").length - 1
    ];
    const [data, setData] = useState(null);
    fetch(`https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/profile`
        , {
            method: "POST",
            body: JSON.stringify({
                puid: user
            })
        }).then
        (res => res.json()).then(

            (data) => {
                // convert data to json
                const json = JSON.parse(data.body);
                setData(json);
            }
        );
    return (
        data ? (
            // Display data
            <div style={{
                marginLeft: "30px",
            }}>
                <h3>
                    Prefered Name: {data.preferredName}
                </h3>
                <h3>
                    PUID: {data.puid}
                </h3>
                <h3>
                    First Name: {data.firstName}
                </h3>
                <h3>
                    Last Name: {data.lastName}
                </h3>
                <h3>
                    Major: {data.major}
                </h3>
                <h3>
                    Preferrde Meeting Location: {data.preferredMeeting}
                </h3>
            </div>
        ) : <div>Loading...</div>
    )
}