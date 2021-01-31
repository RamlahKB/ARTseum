import axios from 'axios';

const setAuthTok=(token)=>{
    if(token)
    {
        axios.defaults.headers.common['authenticated'] = token;
    }
    else
    {
        delete axios.defaults.headers.common['authenticated'];
    }
}

export default setAuthTok;