import {useEffect, useState} from "react";
import Approuter from "components/Router";
import {authService} from "fbinstance";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [init, Setinit] = useState(false);
    const [isLoggedin, setIsLoggin] = useState(false);
    const [userObj, SetUserObj]=useState(null);
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggin(true);
                SetUserObj(user);
            } else {
                setIsLoggin(false);

            }
            Setinit(true);
        });
    }, []);
    const refreshUser=()=>
    {
        SetUserObj(Object.assign({}, authService.currentUser));
    }
    return (<div className="container-fluid bg-secondary overflow-scroll">
        <div className="row justify-content-center" style={{height:"100vh"}}>
            <div className="col-8">
        {init?<Approuter refreshUser={refreshUser} isLoggedin={isLoggedin} userObj={userObj}/>:"Initializing..."}
        </div>
        </div>
    </div>
    
    );
}

export default App;
