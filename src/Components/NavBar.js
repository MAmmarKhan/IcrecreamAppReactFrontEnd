import React from 'react';
import { BrowserRouter as Router, Link} from "react-router-dom";

function NavBar() {
    return (
        <Router>
        
            <div className="container">
            <div style={{backgroundColor:'white'}}> <a style={{textDecoration:'underline', cursor: 'pointer'}} onClick={() => window.location.href = '/admin' }> Home </a> </div>            
            <div style={{backgroundColor:'white'}}> <a style={{textDecoration:'underline', cursor: 'pointer'}} onClick={() => window.location.href = '/purchases' }> Purchases </a> </div>
            <div style={{backgroundColor:'white'}}> <a style={{textDecoration:'underline', cursor: 'pointer'}} onClick={() => window.location.href = '/sales' }> Sales </a> </div>
            <div style={{backgroundColor:'white'}}> <a style={{textDecoration:'underline', cursor: 'pointer'}} onClick={() => window.location.href = '/order' }> POS </a></div>
        </div>
      </Router>
    );
  }
  
  export default NavBar;
  