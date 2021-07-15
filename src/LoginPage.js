import React, {useContext} from 'react';
import { authContext } from './ContextAPI/Authentication';
import $ from 'jquery';
import loader from './assets/icecream_8.gif';
const showloader = () => {
  $(".overlay_loader").show(); 
}
function LoginPage() {    
    const username = "fox";
    const pass = "123";
    $(document).ready(function(){
        $(".overlay_loader").hide();        
    });
    let auth = useAuth();
    let login = () => {
      if (document.getElementById('user').value === username) {
        if (document.getElementById('pass').value === pass) {
          showloader();
          setTimeout(function(){       
            auth.signin();
          }, 3000);            
          return;
        }
      }     
      $('#failed').addClass("text-danger").text("Invalid Username or password");
     
      document.getElementById('failed').style.display = 'block';       
    };
    return auth.user ? null :(
      <div className="loginContainer">
        <div style={{border: 'dotted #fb8f67 4px', margin:'50px 20px',padding:'40px 20px'}}>
          <h1 className="headText" style={{margin: '50px 0px', color:'#fb8f67', fontWeight: '500',fontSize:'120px'}}>LoginIn</h1>
          <input id="user" placeholder="username" style={{width:'300px'}} required></input>
          <br/>
          <input id="pass" style={{margin: '10px 0px', width:'300px'}} placeholder="password" required></input>
          <br/>
          <button onClick={login}>Log in</button>      
          <p id="failed" style={{display:'none'}}>Invalid Username or password. (id is fox and pass is 123)</p>
        </div>
        <div className="overlay_loader">
          <img src={loader}></img>
        </div>
      </div>
      
    );
  }
  export default LoginPage;

function useAuth() {
    return useContext(authContext);
}