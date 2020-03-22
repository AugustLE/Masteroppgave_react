import { JSO, Popup } from 'jso';

export const clientJSO = new JSO({
            
    client_id: "d6bae5a0-6dd1-4df4-b572-653c16c71ec6",
    redirect_uri: "https://teamaccelerator.surge.sh/",
    //redirect_uri: "http://localhost:3000/",
    authorization: "https://auth.dataporten.no/oauth/authorization",
    scopes: { request: ["profile", "email", "userid", "userid-feide"]},
    response_type: 'code',
    client_secret: "6f6df49d-4272-47f2-abec-b0b373e737a2",
    token: "https://auth.dataporten.no/oauth/token", 
});

export const URLS = {
    feide_profile_info: 'https://auth.dataporten.no/userinfo',
    //api_url: 'http://127.0.0.1:8000',
    api_url: 'https://teamacceleratoreu.herokuapp.com',
    //api_url: 'https://teamaccelerator.idi.ntnu.no',
    end_session: 'https://auth.dataporten.no/openid/endsession',
    logout: 'https://auth.dataporten.no/logout',
}

export const PRIVACY_POLICY = 'The application will collect your Feide username, email and full name in order for you to participate in the study. In addition to this information, the application will store the feedback given by you related to your group work experience. The feedback will be available to the relevant course staff (e.g. researchers, teaching, assistants, lecturers and professors) This information will be used to understand if TeamAccelerator is an approach that can be used to diagnose and solve group work issues. The data collection within the project will only last and be active throughout this spring semester.';
export const LIST_LOGIN = true;