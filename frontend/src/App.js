import React, {useEffect} from 'react';
import './App.css';
import './Assets/font-awesome-4.7.0/css/font-awesome.min.css';
import {BrowserRouter as Router, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import store from './store';
import {Provider} from 'react-redux';
// import PriRoute from './Components/ReUsable/PriRoute';
import APriRoute from './Components/ReUsable/APriRoute';
import pnf from './Components/Scripts/pageNotFound';
import jwtDecode from 'jwt-decode';
// import PubRoute from './Components/ReUsable/PubRoute';
// import APubRoute from './Components/ReUsable/APubRoute';
import setAuthTok from './Components/Utils/setAuthTok';
import {onLogSuc, onALogSuc} from './Components/Redux/Auth/authAct';
import Header from './Components/Scripts/Header';
import Reg from './Components/Scripts/User/Auth/Register';
import Log from './Components/Scripts/User/Auth/Login';
import UsrProf from './Components/Scripts/User/Profile/UsrProf';
import EditProf from './Components/Scripts/User/Profile/EditProf';
import AReg from './Components/Scripts/Admin/Auth/ARegister';
import ALog from './Components/Scripts/Admin/Auth/ALogin';
import Home from './Components/Scripts/Home';
import Dash from './Components/Scripts/Admin/Dash';
import Cat from './Components/Scripts/User/Category';
import CatArt from './Components/Scripts/User/Art/CatArt';
import AddCat from './Components/Scripts/Admin/Category/AddCat';
import EditCat from './Components/Scripts/Admin/Category/EditCat';
import Art from './Components/Scripts/User/Art/Art';
import AdmArt from './Components/Scripts/Admin/AdmArt';
import AdmCat from './Components/Scripts/Admin/Category/AdmCat';
import AddCom from './Components/Scripts/Admin/AdmCom';
import AddArt from './Components/Scripts/User/Art/AddArt';
import EditArt from './Components/Scripts/User/Art/EditArt';
import Footer from './Components/Scripts/Footer';
import Forgot from './Components/Scripts/Forgot';
import Reset from './Components/Scripts/ResetPass';
import Contact from './Components/Scripts/Contact';
import AOS from 'aos';
import "aos/dist/aos.css";

function App() {
    useEffect(() => {
        AOS.init({
            duration: 2000
        });
        AOS.refresh();
    }, []);
    const token = localStorage.getItem("user");
    const atoken = localStorage.getItem("admin");
    if(token)
    {
        setAuthTok(token);
        const decode = jwtDecode(token);
        store.dispatch(onLogSuc(decode));
    }
    else if(atoken)
    {
        setAuthTok(atoken);
        const decode = jwtDecode(atoken);
        store.dispatch(onALogSuc(decode));
    }
    
    const Main = withRouter(({location, history})=>{
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/contact" component={Contact}/>
                    <Route exact path="/userReg" component={Reg}/>
                    <Route exact path="/userLog" component={Log}/>
                    <Route exact path="/usrProf" component={UsrProf}/>
                    <Route exact path="/cat" component={Cat}/>
                    <Route exact path="/catArt/:id/:name" component={CatArt}/>
                    <Route exact path="/art" component={Art}/>
                    <Route exact path="/addArt" component={AddArt}/>
                    <Route exact path="/editArt/:id" component={EditArt}/>
                    <Route exact path="/editProf/:id" component={EditProf}/>
                    <Route exact path="/adminReg" component={AReg}/>
                    <Route exact path="/adminLog" component={ALog}/>
                    <Route exact path="/forgot" component={Forgot}/>
                    <Route exact path="/newPass/:token/:email" component={Reset}/>
                    <APriRoute exact path="/dash" component={Dash}/>
                    <APriRoute exact path="/admArt" component={AdmArt}/>
                    <APriRoute exact path="/admCat" component={AdmCat}/>
                    <APriRoute exact path="/addCat" component={AddCat}/>
                    <APriRoute exact path="/admCom" component={AddCom}/>
                    <APriRoute exact path="/editCat/:id" component={EditCat}/>
                    <Route exact path="/404" component={pnf}/>
                    <Redirect to="/404"/>
                </Switch>
                <Footer/>
            </div>
        )
    });
    return (
        <Provider store={store}>
            <Router>
                <Header/>
                <Main />
            </Router>
        </Provider>
    );
}

export default App;
