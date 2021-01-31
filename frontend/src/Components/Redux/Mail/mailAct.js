import axios from 'axios';

export const onMailReq=(data)=>{
    console.log(data);
    return(dispatch)=>{
        axios.post("http://localhost:2000/frgtPass", data)
        .then((res)=>{
            if(res.status === 200)
            {
                console.log(res.data);
                // history.push('/newPass/:token/:email');
                dispatch(onMailSuc(res.data.msg));
            }
            // else if (res.status === 400)
            // {
            //     console.log("Hello"+res);
            //     dispatch(onMailFail(res.data.msg));
            // }
        }).catch((err)=>{
            console.log(err);
            dispatch(onMailFail(err.response.data.msg));
        }); 
    }
}

export const onMailSuc=(msg)=>{
    return{
        type : "MAIL_SUC",
        payload : msg
    }
}

export const onMailFail=(msg)=>{
    return{
        type : "MAIL_FAIL",
        payload : msg
    }
}

export const onNewPass=(data, history)=>{
    console.log(data);
    return(dispatch)=>{
        console.log(data);
        axios.post("http://localhost:2000/newPass", data)
        .then((res)=>{
            if(res.status === 200)
            {
                console.log(res.data);
                dispatch(onNPassSuc(res.data));
                history.push("/userLog");
            }
            else
            {
                console.log(res);
                dispatch(onNPassFail(res.data.msg));
            }
        }).catch((err)=>{
            console.log(err);
        }); 
    }
}

export const onNPassSuc=(data)=>{
    return{
        type : "NPASS_SUC",
        payload : data
    }
}

export const onNPassFail=(msg)=>{
    return{
        type : "NPASS_FAIL",
        payload : msg
    }
}

export const onCMail=(data,history)=>{
    console.log(data);
    return(dispatch)=>{
        axios.post("http://localhost:2000/cMail", data)
        .then((res)=>{
            if(res.status === 200)
            {
                console.log(res.data);
                // history.push('/newPass/:token/:email');
                dispatch(onCMailSuc(res.data));
                history.push("/contact");
            }
            else if (res.status === 400)
            {
                console.log("Hello"+res);
                dispatch(onCMailFail(res.data.msg));
            }
        }).catch((err)=>{
            console.log(err);
        }); 
    }
}

export const onCMailSuc=(data)=>{
    return{
        type : "CMAIL_SUC",
        payload : data
    }
}

export const onCMailFail=(msg)=>{
    return{
        type : "CMAIL_FAIL",
        payload : msg
    }
}