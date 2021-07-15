import React, { useEffect, useState,useContext} from 'react';
import NavBar from './Components/NavBar';
import SideNavBar from './Components/SideNavBar';
import { Sales } from './Components/icecreamData';
import $ from 'jquery';

import { urlContext } from './ContextAPI/ServerURL';
function useURL() {
  return useContext(urlContext);
}

function SalesPanel() {
  // var url = useURL();
  var originalURI = useURL();
  var sortURI = "/g/?sort";
  const [uri, setUri] = useState(originalURI + "sales");
  function sortit(){
    if (($('#Selector_quantity').val() !== "Sort By Quantity") &&($('#Selector_flavour').val() !== "Sort By flavour")) {      
      setUri(originalURI + sortURI + $('#Selector_quantity').val() + "&" + $('#Selector_flavour').val());
      return;
    }
    if (($('#Selector_quantity').val() !== "Sort By Quantity") &&($('#Selector_price').val() !== "Sort By Price")) {      
      setUri(originalURI + sortURI + $('#Selector_quantity').val() + "&" + $('#Selector_price').val());
      return;
    }
    if (($('#Selector_flavour').val() !== "Sort By flavour") &&($('#Selector_price').val() !== "Sort By Price")) {      
      setUri(originalURI + sortURI + $('#Selector_flavour').val() + "&" + $('#Selector_price').val());
      return;
    }
    if ($('#Selector_price').val() !== "Sort By Price") {
      setUri(originalURI + sortURI +$('#Selector_price').val());
      return;
    }
    if ($('#Selector_flavour').val() !== "Sort By flavour") {
      setUri(originalURI + sortURI +$('#Selector_flavour').val());
      return;
    }
    if ($('#Selector_quantity').val() !== "Sort By Quantity") {
      setUri(originalURI + sortURI +$('#Selector_quantity').val());
      return;
    }
    
  }
  function calcTotal(result){
    var calc = 0;
    result.forEach(item => {
      calc+=item.price;      
    });
    settotal(calc);     
  }  
  const [sales, setsales] = useState(Sales);
  const [total, settotal] = useState(0);
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }; 
  useEffect(() => {
    setTimeout(function (){       
      fetch(uri, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          setsales(result);
          calcTotal(result);
        })
        .catch(error => console.log('error', error));  
    }, 2000);      
  }, [sales]);
    return (
      <div>
        <h1>Sales</h1>
        <SideNavBar></SideNavBar>
        <NavBar></NavBar>
        
      <div style={{display:'flex'}}>     
      <div style={{backgroundColor:'#f8e16c',padding:'5px 10px',marginTop:'25px' ,width:'180px',height:'70vh'}}>
        <h2> Sort Options</h2>
        
        <select class="custom-select" id="Selector_price" style={{height:'auto',margin:'5px',padding:'6px 12px'}}>
                      <option style={{fontSize:'24px'}} selected>Sort By Price</option>
                      <option value="=+price">Ascending Order</option>    
                      <option value="=-price">Descending Order</option>                                           
        </select>
        <select class="custom-select" id="Selector_flavour" style={{height:'auto',margin:'5px',padding:'6px 12px'}}>
                      <option style={{fontSize:'24px'}} selected>Sort By flavour</option>
                      <option value="=+flavour">Ascending Order</option>    
                      <option value="=-flavour">Descending Order</option>                                           
        </select>
        <select class="custom-select" id="Selector_quantity" style={{height:'auto',margin:'5px',padding:'6px 12px'}}>
                      <option style={{fontSize:'24px'}} selected>Sort By Quantity</option>
                      <option value="=+quantity">Ascending Order</option>    
                      <option value="=-quantity">Descending Order</option>                                           
        </select>
        <button onClick={sortit} style={{margin:'5px',width:'100%',padding:'6px 12px'}}> Sort </button>
      </div> 
      <table className="tableSales" class="table" style={{width:'80%'}}>
        <thead class="thead-light">
          <tr>
            <th colspan="5" style={{textAlign:'center'}}>Sales List</th>
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
          {sales.map((data, key) => {
            return (            
              <tr key={key+1}>
                <td>{data.date.split(':')[0].substring(0, 10)}</td>
                <td>{data.type}</td>
                <td>{data.flavour}</td>
                <td>{data.quantity}</td>   
                <td>${data.price}</td>                           
            </tr>
            );          
          })}
        </tbody>
            <th scope="row" colSpan='4'> Total</th>
            <td>${total}.00</td>
      </table>      
      </div>
    </div>
    );
  }
  export default SalesPanel;