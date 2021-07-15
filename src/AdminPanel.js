import React, {useState, useEffect,useContext} from 'react';
import SideNavBar from './Components/SideNavBar';
import NavBar from './Components/NavBar';
import { Sales, Purchases } from './Components/icecreamData';
import { BrowserRouter as Router, Link} from "react-router-dom";
import { urlContext } from './ContextAPI/ServerURL';
function useURL() {
  return useContext(urlContext);
}

function AdminPanel() {
  var url = useURL();
  const [purchase, setPurchase] = useState(Purchases);
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }; 
  useEffect(() => {
    setTimeout(function(){       
      fetch(url + "purchase", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          setPurchase(result);
        })
        .catch(error => console.log('error', error));  
    }, 5000);      
  }, [purchase]);

  const [sales, setsales] = useState(Sales);
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }; 
  useEffect(() => {
    setTimeout(function(){       
      fetch(url + "sales", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          setsales(result);
        })
        .catch(error => console.log('error', error));  
    }, 5000);      
  }, [sales]);

    return (
      <div>
        <h1>Private Admin Panel</h1>
        <SideNavBar></SideNavBar>
        <NavBar></NavBar>
      <div style={{display:'flex'}}>
      <table className="tableSales" class="table">
        <thead class="thead-light">
          <tr>
            <th colspan="5" style={{textAlign:'left'}}>Recent Sales</th>
          </tr>
        </thead>
        <thead class="thead-dark">
          <tr>
            <th scope="col">DATE</th>
            <th scope="col">TYPE</th>
            <th scope="col">Flavour</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
        {sales.slice(0,5).map((data, key) => {
          return (            
            <tr key={key+1}>
              <td>{data.date.split(':')[0].substring(0, 10)}</td>
              <td>{data.type}</td>
              <td>{data.flavour}</td>
              <td>{data.quantity}</td>
              <td>{data.price}</td>
          </tr>
          );          
        })}
        {
          Sales.length > 5 ? <tr> <td colSpan="4"> </td><Router> <Link to="/sales"><td > View All >></td></Link></Router></tr> : null
        }
        </tbody>
      </table>
      <table class="table" style={{width:'35%'}}>
        <thead class="thead-light">
          <tr>
            <th colspan="4" style={{textAlign:'left'}}>Recent Purchases</th>
          </tr>
        </thead>
        <thead class="thead-dark">
          <tr>
            <th scope="col">TYPE</th>
            <th scope="col">Flavour</th>
            <th scope="col">Quantity</th>
            <th scope="col">Company</th>
          </tr>
        </thead>
        <tbody>
        {purchase.slice(0,5).map((data, key) => {
          return (            
            <tr key={key+1}>
              <td>{data.date.split(':')[0].substring(0, 10)}</td>
              <td>{data.flavour}</td>
              <td>{data.quantity}</td>
              <td>{data.company}</td>
          </tr>
          );          
        })}
        {
          Purchases.length > 5 ? <tr> <td colSpan="3"> </td><Router> <Link to="/purchases"><td  > View All >></td></Link></Router></tr> : null
        }
        </tbody>
      </table>
      </div>      
    </div>
    );
  }
  export default AdminPanel;