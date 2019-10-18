import React from 'react';
import { JSO, Popup } from 'jso';


export default function Login() {
    const feideLogin = () => {
        
        let client = new JSO({
            
            client_id: "d6bae5a0-6dd1-4df4-b572-653c16c71ec6",
            redirect_uri: "http://localhost:3000/selectcourse",
            authorization: "https://auth.dataporten.no/oauth/authorization",
            scopes: { request: ["profile"]},
            response_type: 'code',
            client_secret: "6f6df49d-4272-47f2-abec-b0b373e737a2",
            token: "https://auth.dataporten.no/oauth/token", 
        });
        
        client.getToken().then((token) => {
            console.log(token);
        });
        //client.wipeTokens();

        // Denne skal være der brukeren redirigeres etter login
        /*client.callback().then(response => {
            console.log(response);
        });*/
        
    }


    return (
        <div className="App">
            <header className="App-header">
            <p>
                TeamDoctor
            </p>
            <button onClick={feideLogin}>
                FEIDE LOGIN
            </button>
            </header>
        </div>
    );
}

