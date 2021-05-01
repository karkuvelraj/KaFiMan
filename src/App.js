import React, { Suspense } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"
import Login from "./Containers/Login"
// import User from "./models/User"
import "./styles.scss"
import {Provider as ReduxProvider} from "react-redux"
import configureStore from "./redux/ConfigureSore"
import Header from "./Components/Header"
const Dashboard =React.lazy(()=>import("./Containers/Dashboard"))
const Home =React.lazy(()=>import( "./Containers/Home"))
const PassengerDetails =React.lazy(()=>import( "../src/Containers/PassengerDetails"))
const AncillaryServices =React.lazy(()=>import( "../src/Containers/AncillaryServices"))
let store=configureStore()
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App(){
    return (
        <ReduxProvider store = {store}>
      
        <Router>
        <div className="outer">
           <Header/>
          
		<Suspense fallback={<div>Loading...</div>}> 
            <Switch>
            
                <Route exact path="/"><Login/></Route>
                <Route path="/home" component={Home} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/dashboard/passengers"><PassengerDetails/></Route>
                <Route path="/dashboard/ancillaryservices"><AncillaryServices/></Route>
            
            </Switch>
            </Suspense>
            
            </div>
            {/* </div> */}
        </Router>
        <ToastContainer />
        </ReduxProvider>
        
    )
}
export default App;