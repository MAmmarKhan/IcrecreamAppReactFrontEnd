import React, { useState,useContext} from 'react';
import NavBar from './Components/NavBar';
import SideNavBar from './Components/SideNavBar';
import $ from "jquery";
import { icecreamPrices } from './Components/icecreamData';
import { urlContext } from './ContextAPI/ServerURL';
function useURL() {
  return useContext(urlContext);
}

function OrderPanel() {
    var url = useURL();
    const [quantityNum, setquantityNum] = useState(0);
    // const [price, setPrice] = useState(0);
    const [displayPrice, setDisplayPrice] = useState("$ 0");
    const confirm = () => {
        var n =  $('#inputOrderSelector :selected').text().toString();
        if (($('#Quantity').text() !== " ") && (!isNaN(document.getElementById('Quantity').value))) {
            if ($('#inputGroupSelect01 :selected').text() === "Choose...") {
                $('#result').text("Please Select Icecream Type").addClass("text-danger").removeClass("text-success"); 
                return;
            }
            if ($('#inputOrderSelector :selected').text() === "Choose...") {
                $('#result').text("Please Select Flavour").addClass("text-danger").removeClass("text-success"); 
                return;
            }
            if (icecreamPrices[n] * quantityNum <= 0) {
                $('#result').text("Please Enter valid quantity of Ice creams").addClass("text-danger").removeClass("text-success"); 
                return;
            }
            console.log($('#Quantity').text());          
            // setPrice(icecreamPrices[n] * quantityNum);
            setDisplayPrice("$ " + icecreamPrices[n] * quantityNum);
            $('#result').text("");
            addOrder();            
        }    
        else
            $('#result').text("Missing Data Fields").addClass("text-danger").removeClass("text-success"); 
    }
    const addOrder = () => {
        const dateObj = new Date();
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        var date = new Date(Date.now()).toLocaleString().split('/');
      
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var n =  $('#inputOrderSelector :selected').text().toString();
        var raw = JSON.stringify({
            "date": date[0] + " " + monthNames[dateObj.getMonth()] + " " +date[2].split(',')[0],
            "flavour": $('#inputOrderSelector :selected').text(),
            "type": $('#inputGroupSelect01 :selected').text(),
            "quantity": quantityNum,
            "price": icecreamPrices[n] * quantityNum
          });
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        
        fetch(url + "sales", requestOptions)
        .then(response => response.text())
        .then(result => {
            $("#inputOrderSelector").val('Choose...');   
            $("#inputGroupSelect01").val('Choose...');   
            $('#result').text("Data Inserted").addClass("text-success").removeClass("text-danger"); 
            console.log(result)
        })
        .catch(error => console.log('error', error));                   
      }
    
    
    const minusOne = () => {
        if (quantityNum <= 0)
            return;
        setquantityNum(quantityNum - 1);        
    }
    const addOne = () => {
            setquantityNum(quantityNum + 1);     
    }
    return (
      <div>
        <h1>POS</h1>
        <h2>Customer Dealing</h2> 
        <SideNavBar></SideNavBar>
        <NavBar></NavBar>
      <h2>Icecream sell</h2>
      <div style={{width:'30%', display:'flex',flexDirection: 'column',marginLeft:'10%'}}>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text">Quantity</label>
            </div>
                <input type="number" class="form-control" id="Quantity" placeholder={quantityNum} aria-label="Quantity" style={{fontSize:'24px'}} aria-describedby="basic-addon2"/>
                <div class="input-group-append">
                    <button class="btn btn-danger" type="button" onClick={minusOne} style={{fontFamily:'monospace',fontSize:'22px'}}>-</button>
                    <button class="btn btn-success" type="button" onClick={addOne} style={{fontFamily:'monospace',fontSize:'22px'}}>+</button>
                </div>
        </div> 
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Type</label>
                </div>
                <select class="custom-select" id="inputGroupSelect01" style={{height:'auto'}}>
                    <option style={{fontSize:'24px'}} value="Choose..." selected>Choose...</option>
                    <option value="1">Cup</option>
                    <option value="2">Cone</option>
                </select>
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="inputOrderSelector">Flavour</label>
                </div>
                <select class="custom-select" id="inputOrderSelector" style={{height:'auto'}}>
                      <option style={{fontSize:'24px'}} value="Choose..." selected>Choose...</option>
                      <option value="Buttered Pecan">Buttered Pecan</option>
                      <option value="Chocolate">Chocolate</option>
                      <option value="Cotton candy">Cotton candy</option>
                      <option value="Grape">Grape</option>
                      <option value="Mango">Mango</option>
                      <option value="Strawberry">Strawberry</option>                                            
                      <option value="Tutti frutti">Tutti frutti</option>                                            
                   </select>
            </div>
            <div class="input-group mb-3" style={{fontFamily:'cursive'}}>
            <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01" >Price</label>
            </div>
                <input type="text" id="price" class="form-control" value={displayPrice} disabled aria-label="price" style={{fontSize:'24px'}} aria-describedby="basic-addon2"/>
            </div>
            <button type="button" id="buttonSell" class="btn btn-primary" style={{'fontSize': '30px'}} onClick={confirm}>Sell</button>
            <p id="result"></p>
        </div>
    </div>
    );
  }
  export default OrderPanel;