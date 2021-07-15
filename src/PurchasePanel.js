import React, {useState,useEffect,useContext } from 'react';
import { Purchases } from './Components/icecreamData';
import NavBar from './Components/NavBar';
import SideNavBar from './Components/SideNavBar';
import $ from "jquery";
import { urlContext } from './ContextAPI/ServerURL';
function useURL() {
  return useContext(urlContext);
}

const addPurchase = () => {
  if ($('#inputPurchaseSelector :selected').text() === "Choose...") {
    $('#result').text("Invalid Icecream Choice").removeClass("text-success").addClass("text-danger");  
    return;
  }
  if($('#companyName').text.length > 3){
    $('#result').text("Invalid Company Name").removeClass("text-success").addClass("text-danger");  
    return;
  }
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "flavour": $('#inputPurchaseSelector :selected').text(),
    "company": document.getElementById('companyName').value,
    "quantity": document.getElementById('Quantity').value
  });
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  fetch("http://localhost:4000/purchase", requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result);
      $('#result').text("Data Inserted").addClass("text-success").removeClass("text-danger");  
      document.getElementById('companyName').value = "";
      $("#inputPurchaseSelector").val('Choose...');   
    })
    .catch(error => console.log('error', error));
}



function PurchasePanel() {
  var url = useURL();
  $("#companyName").keypress(function(event) {
    if (event.keyCode === 13) {
        $("#dataSendToDB").click();
    }
  });
  const [quantityNum, setquantityNum] = useState(0);
  const minusOne = () => {
      if (quantityNum <= 0)
          return;
      setquantityNum(quantityNum - 1);        
  }
  const minusTen = () => {
    if (quantityNum <= 9)
        return;
    setquantityNum(quantityNum - 10);        
  }
  const addOne = () => {
          setquantityNum(quantityNum + 1);     
  }
  const addTen = () => {
    setquantityNum(quantityNum + 10);     
}
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
    }, 3000);      
  }, [purchase]);
  console.log(useURL());
    return (
      <div>
        <h1>Purchase Icecream stocks</h1>
        <SideNavBar></SideNavBar>
        <NavBar></NavBar>
        <br></br>
        <br></br>        
        <div style={{width:'30%', display:'flex',flexDirection: 'column',marginLeft:'10%'}}>
          <h2>Add Ice cream</h2>
          <form>          
          <div class="input-group mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text">Quantity</label>
            </div>          
              <input type="text" class="form-control" id="Quantity" value={quantityNum} placeholder="Quantity" aria-label="Quantity" style={{fontSize:'24px'}} aria-describedby="basic-addon2"/>
              <div class="input-group-append">
                  <button class="btn btn-danger" type="button" onClick={minusTen} style={{fontFamily:'monospace',fontSize:'22px'}}>-10</button>
                  <button class="btn btn-danger" type="button" onClick={minusOne} style={{fontFamily:'monospace',fontSize:'22px'}}>-</button>
                  <button class="btn btn-success" type="button" onClick={addOne} style={{fontFamily:'monospace',fontSize:'22px'}}>+</button>
                  <button class="btn btn-success" type="button" onClick={addTen} style={{fontFamily:'monospace',fontSize:'22px'}}>+10</button>
              </div>
              </div>              
              <div class="input-group mb-3">
                  <div class="input-group-prepend">
                      <label class="input-group-text" for="inputPurchaseSelector">Flavour</label>
                   </div>
                   <select class="custom-select" id="inputPurchaseSelector" style={{height:'auto'}}>
                      <option style={{fontSize:'24px'}} selected value="Choose...">Choose...</option>
                      <option value="Buttered Pecan">Buttered Pecan</option>
                      <option value="Chocolate">Chocolate</option>
                      <option value="Cotton candy">Cotton candy</option>
                      <option value="Grape">Grape</option>
                      <option value="Mango">Mango</option>
                      <option value="Strawberry">Strawberry</option>                                            
                      <option value="Tutti frutti">Tutti frutti</option>                                            
                   </select>
              </div>
              <div class="input-group mb-3">
              <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1"  style={{fontFamily:'monospace',fontSize:'22px'}}>@</span>
              </div>
              <input type="text" id="companyName" class="form-control" placeholder="Company Name" aria-label="Company Name" style={{fontSize:'24px'}} aria-describedby="basic-addon1"/>
          </div>
            <button id="dataSendToDB" type="button" class="btn btn-primary" style={{'fontSize': '30px'}} onClick={addPurchase} onKeyPress={addPurchase}>Purchase</button>
            <p id="result"></p>
            </form>
          </div>  
         <hr></hr>
          <table class="table" style={{marginLeft:'130px'}} >
            <thead class="thead-light">
              <tr>
                <th colSpan="4" style={{textAlign:'left'}}>Recent Purchases</th>
              </tr>
            </thead>
            <thead class="thead-dark">
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Flavour</th>
                <th scope="col">Quantity</th>
                <th scope="col">Company</th>
              </tr>
            </thead>
            <tbody>
            {purchase.map((data, key) => {
              return (            
                <tr key={key+1}>
                  <td>{data.date.split(':')[0].substring(0, 10)}</td>
                  <td>{data.flavour}</td>
                  <td>{data.quantity}</td>
                  <td>{data.company}</td>
              </tr>
              );          
            })}
          </tbody>
        </table>
          <br></br>
        </div>
    );
  }
  export default PurchasePanel;