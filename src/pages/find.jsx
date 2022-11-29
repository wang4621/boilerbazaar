import { useState } from "react";
import $ from "jquery";
export const Find = ({ userData }) => {
    // Get url params
    const url = document.location.href;
    const user = url.split("/")[
        url.split("/").length - 1
    ];
    const [accountData, setAccountData] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
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
                setAccountData(json);
                if (userData["following"].includes(accountData.puid)) {
                    setIsFollowing(true);
                }
            }
        );
    return (
        accountData ? (
            // Display data
            <div style={{
                marginLeft: "30px",
            }}>
                <h3>
                    Prefered Name: {accountData.preferredName}
                </h3>
                <h3>
                    PUID: {accountData.puid}
                </h3>
                <h3>
                    First Name: {accountData.firstName}
                </h3>
                <h3>
                    Last Name: {accountData.lastName}
                </h3>
                <h3>
                    Major: {accountData.major}
                </h3>
                <h3>
                    Preferrde Meeting Location: {accountData.preferredMeeting}
                </h3>
                {isFollowing  ? (
                    <>
                        <button onClick={() => {
                            var jsonData = { requesterPUID: userData["puid"], puid: accountData.puid };
                            jsonData = '"' + JSON.stringify(jsonData).replaceAll('"', '\\"') + '"';
                            $.ajax({
                                url: "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/following?requesterPUID=" + userData["puid"] + "&puid=" + accountData.puid,
                                type: "DELETE",
                                data: jsonData,
                                datatype: "json",
                                contentType: "application/json",
                                success: function (result) {
                                    if (result === "Error") {
                                        console.log(result);
                                    }
                                    else {
                                        let index = userData["following"].indexOf(accountData.puid);
                                        if (index > -1) {
                                            userData["following"].splice(index, 1);
                                        }
                                        setIsFollowing(false);
                                    }
                                },
                                error: function (result) {
                                    console.log(JSON.stringify(result));
                                },
                            });
                        }}>
                            Unfollow
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => {
                            var jsonData = { requesterPUID: userData["puid"], puid: accountData.puid };
                            jsonData = '"' + JSON.stringify(jsonData).replaceAll('"', '\\"') + '"';
                            $.ajax({
                                url: "https://66gta0su26.execute-api.us-east-1.amazonaws.com/Prod/following",
                                type: "PUT",
                                data: jsonData,
                                datatype: "json",
                                contentType: "application/json",
                                success: function (result) {
                                    if (result === "Already following") {
                                        alert("You are already following this user!");
                                    }
                                    else {
                                        userData["following"].push(accountData.puid);
                                        setIsFollowing(true);
                                    }
                                },
                                error: function (result) {
                                    console.log(JSON.stringify(result));
                                },
                            });
                        }}>
                            Follow
                        </button>
                    </>
                )}
            </div>
        ) : <div>Loading...</div>
    )
}