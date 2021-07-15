import React from 'react';
import { BrowserRouter as Router, Link} from "react-router-dom";
function SideNavBar() {
    return (
        <Router>
        <nav class="navbar navbar-inverse sidebar" role="navigation">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" style={{visibility:"hidden"}} class="navbar-toggle" data-toggle="collapse" data-target="#bs-sidebar-navbar-collapse-1">
                </button>
                <a class="navbar-brand" data-toggle="collapse" data-target="#bs-sidebar-navbar-collapse-1">ICMS SIDEBAR</a>
            </div>
            <div class="collapse navbar-collapse" id="bs-sidebar-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li class="active"> <Link to="/admin">Home<span  class="pull-right hidden-xs showopacity glyphicon glyphicon-home"></span></Link></li>
                    <li><Link to="/sales">Sales<span  class="pull-right hidden-xs showopacity glyphicon glyphicon-user"></span></Link></li>
                    <li><Link to="/purchases">Purchases<span  class="pull-right hidden-xs showopacity glyphicon glyphicon-envelope"></span></Link></li>                   
                    <li><Link to="/order">Order<span  class="pull-right hidden-xs showopacity glyphicon glyphicon-home"></span></Link></li>                    
                </ul>
            </div>
        </div>
    </nav>
    </Router>
    );
  }
  
  export default SideNavBar;
  