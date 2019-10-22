import { JSO, Popup } from 'jso';

export const clientJSO = new JSO({
            
    client_id: "d6bae5a0-6dd1-4df4-b572-653c16c71ec6",
    redirect_uri: "http://localhost:3000/",
    authorization: "https://auth.dataporten.no/oauth/authorization",
    scopes: { request: ["profile", "email", "userid", "groups"]},
    response_type: 'code',
    client_secret: "6f6df49d-4272-47f2-abec-b0b373e737a2",
    token: "https://auth.dataporten.no/oauth/token", 
});
