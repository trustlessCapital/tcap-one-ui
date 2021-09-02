
//import LgWidgets from '../../components/lgwidgets/LgWidgets'
//import SmWidgets from '../../components/smwidgets/SmWidgets'
//import AiWidgets from '../components/aiWidgets/AiWidgets'
import './anchorApprove.css'
//import Select from 'react-select';
import { Publish } from '@material-ui/icons';
import React, { Component } from 'react';


export default class AnchorApprove extends Component {

      render(){
        
    return (
        <div className="addInvPage">
            <h3 className="addInvPageTitle">Approve Invoice</h3>
            <div className="addInvPageWrapper">

                <form className="addInvForm">
                    
                    <h3 className="addInvSectionTitle">Invoice Details</h3>
                    

                    <div className="inputCols">
                      <div className="addInvItem">
                        <label>Tracking ID</label>
                        <label name="tid" className="valueLabel">123</label>
                      </div>
                      <div className="addInvItem">
                         <label>Invoice No</label>
                         <label name="invNo"  className="valueLabel">1111</label>
                      </div>
                      <div className="addInvItem">
                        <label>Vendor Name</label>
                        <label name="vname" className="valueLabel">Vendor1</label>
                      </div>
                    </div>

                    <div className="inputCols">
                      <div className="addInvItem">
                        <label>Anchor Name</label>
                        <label name="aname"  className="valueLabel">Anchor3</label>
                      </div>

                      <div className="addInvItem">
                        <label>Vendor Location</label>
                        <label name="vloc"  className="valueLabel">SSSS</label>
                      </div>
                      <div className="addInvItem">
                         <label>Anchor Location</label>
                        <label name="aloc"  className="valueLabel">DDDD</label>
                       </div>
                   </div>

                    <div className="inputCols">
                      <div className="addInvItem">
                        <label>Product Type</label>
                        <label  name="ptype"  className="valueLabel">Services</label>
                      </div>
                      <div className="addInvItem">
                        <label>Invoice Date</label>
                        <label name="invDt"  className="valueLabel">01-07-2021</label>
                      </div>
                      <div className="addInvItem">
                            <label>Due Date</label>
                        <label name="dueDt"  className="valueLabel">01-10-2021</label>
                       </div>
                    </div>

                    <div className="inputCols">
                      <div className="addInvItem">
                        <label>Invoice Amount</label>
                        <label name="invAmt"  className="valueLabel">999999</label>
                      </div>
                      <div className="addInvItem">
                        <label>Payout Date</label>
                        <label name="payDt"  className="valueLabel">11-01-2022</label>
                      </div>
                      <div className="addInvItem">
                        <label>Interest Rate</label>
                        <label name="iRate"  className="valueLabel">8.8</label>
                      </div>
                    </div>

                    <div className="inputCols">
                      <div className="addInvItem">
                        <label>Arranger</label>
                        <label name="arrName" className="valueLabel">Arranger1</label>
                      </div>
                      <div className="addInvItem">
                        <label>Invoice</label>
                        <label htmlFor="file" className="labelFile"><span>View File</span></label>
                      </div>
                      <div className="addInvItem"></div>
                    </div>

                    <div className="inputCols">
                     <div className="addInvItem"><button className="apprInvBtn" type="submit" >Approve</button></div>
                    </div>
                </form>

                <h3 className="addInvSectionTitle">Approval Section</h3>
            </div>
        </div>
    )
    
  }
}
