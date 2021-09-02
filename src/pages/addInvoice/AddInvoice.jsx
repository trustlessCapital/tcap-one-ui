
//import LgWidgets from '../../components/lgwidgets/LgWidgets'
//import SmWidgets from '../../components/smwidgets/SmWidgets'
//import AiWidgets from '../components/aiWidgets/AiWidgets'
import './addInvoice.css'
//import Select from 'react-select';
import { Publish } from '@material-ui/icons';
import { Component } from 'react';


export default class AddInvoice extends Component {

  userData;

    constructor(props) {
        super(props);

        this.onChangetid = this.onChangeTid.bind(this);
        this.onChangeinvNo = this.onChangeInvNo.bind(this);
        this.onChangevname = this.onChangeVname.bind(this);
        this.onChangeaname = this.onChangeAname.bind(this);
        this.onChangevloc = this.onChangeVloc.bind(this);
        this.onChangealoc = this.onChangeAloc.bind(this);
        this.onChangeptype = this.onChangePtype.bind(this);
        this.onChangeinvDt = this.onChangeInvDt.bind(this);
        this.onChangedueDt = this.onChangeDueDt.bind(this);
        this.onChangeinvAmt = this.onChangeInvAmt.bind(this);
        this.onChangepayDt = this.onChangePayDt.bind(this);
        this.onChangeiRate = this.onChangeIRate.bind(this);
        this.onChangearrName = this.onChangeArrName.bind(this);
        this.onChangeinvFile = this.onChangeInvFile.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            tid:'',
            invno: '',
            vname: '',
            aname: '',
            vloc: '',
            aloc: '',
            ptype: '',
            invdt: '',
            duedt: '',
            invamt: '',
            paydt: '',
            irate: '',
            arrname: '',
            invurl:''
        }
    }

    // Form Events
    onChangeTid(e) {this.setState({ tid: e.target.value })}
    onChangeInvNo(e) {this.setState({ invno: e.target.value })}
    onChangeVname(e) {this.setState({ vame: e.target.value })}
    onChangeAname(e) {this.setState({ aname: e.target.value })}
    onChangeVloc(e) {this.setState({ vloc: e.target.value })}
    onChangeAloc(e) {this.setState({ aloc: e.target.value })}
    onChangePtype(e) {this.setState({ ptype: e.target.value })}
    onChangeInvDt(e) {this.setState({ invdt: e.target.value })}
    onChangeDueDt(e) {this.setState({ duedt: e.target.value })}
    onChangeInvAmt(e) {this.setState({ invamt: e.target.value })}
    onChangePayDt(e) {this.setState({ paydt: e.target.value })}
    onChangeIRate(e) {this.setState({ irate: e.target.value })}
    onChangeArrName(e) {this.setState({ arrname: e.target.value })}
    onChangeInvFile(e) {this.setState({ invurl: e.target.value })}


    onSubmit(e) {
        e.preventDefault()

        this.setState({
          tid:'',
          invno: '',
          vname: '',
          aname: '',
          vloc: '',
          aloc: '',
          ptype: '',
          invdt: '',
          duedt: '',
          invamt: '',
          paydt: '',
          irate: '',
          arrname: '',
          invurl:''
        })
    }

    // React Life Cycle
    componentDidMount() {
        this.userData = JSON.parse(localStorage.getItem('user'));


        if (localStorage.getItem('user')) {
          
            this.setState({
                tid: this.userData.tid,
                invno: this.userData.invno,
                vname: this.userData.vname,
                aname: this.userData.aname,
                vloc: this.userData.vloc,
                aloc: this.userData.aloc,
                ptype: this.userData.ptype,
                invdt: this.userData.invdt,
                duedt: this.userData.duedt,
                invamt: this.userData.invamt,
                paydt: this.userData.paydt,
                irate: this.userData.irate,
                arrname: this.userData.arrname,
                invurl: this.userData.invurl
            })
        } else {
            this.setState({
              tid:'',
              invno: '',
              vname: '',
              aname: '',
              vloc: '',
              aloc: '',
              ptype: '',
              invdt: '',
              duedt: '',
              invamt: '',
              paydt: '',
              irate: '',
              arrname: '',
              invurl:''
            })
        }
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('user', JSON.stringify(nextState));
    }


      render(){
        
    return (
        <div className="addInvPage">
            <h3 className="addInvPageTitle">Upload New Invoice</h3>
            <div className="addInvPageWrapper">

                <form className="addInvForm">
                    
                    <h3 className="addInvSectionTitle">Invoice Details</h3>
                    

                    <div className="inputCols">
                      <div className="addInvItem">
                        <label>Tracking ID</label>
                        <input type="text" name="tid" className="addInvInput" readOnly value={123} onChange={this.handleTidChange}/>
                      </div>
                      <div className="addInvItem">
                         <label>Invoice No</label>
                        <input type="text" name="invNo" className="addInvInput"  onChange={this.handleInvNoChange}/>
                      </div>
                    </div>

                    <div className="inputCols">
                      
                      <div className="addInvItem">
                        <label>Vendor Name</label>
                        <select className="addInvInput" name="vname"  onChange={this.handleVnameChange}>
                          <option value="">--Select--</option>
                          <option value="Vendor1">Vendor1</option>
                          <option value="Vendor2">Vendor2</option>
                          <option value="Vendor3">Vendor3</option>
                        </select>
                      </div>
                      <div className="addInvItem">
                        <label>Anchor Name</label>
                        <select className="addInvInput" name="aname"  onChange={this.handleAnameChange}>
                          <option value="">--Select--</option>
                          <option value="Anchor1">Anchor1</option>
                          <option value="Anchor2">Anchor2</option>
                          <option value="Anchor3">Anchor3</option>
                        </select>
                      </div>
                    </div>

                    <div className="inputCols">
                      <div className="addInvItem">
                        <label>Vendor Location</label>
                        <input type="text" className="addInvInput" name="vloc" onChange={this.handleVlocChange}/>
                      </div>
                      <div className="addInvItem">
                         <label>Anchor Location</label>
                         <input type="text" className="addInvInput" name="aloc" onChange={this.handleAlocChange}/>
                       </div>
                    </div>

                    <div className="inputCols">
                      <div className="addInvItem">
                        <label>Product Type</label>
                        <select className="addInvInput" name="ptype"  onChange={this.handlePtypeChange}>
                          <option value="">--Select--</option>
                          <option value="Hardware">Hardware</option>
                          <option value="Software">Software</option>
                          <option value="Food Items">Food Items</option>
                          <option value="Pharmaceuticals">Pharmaceuticals</option>
                          <option value="Services">Services</option>
                        </select>
                      </div>
                      <div className="addInvItem"></div>
                    </div>

                    <div className="inputCols">
                      <div className="addInvItem">
                        <label>Invoice Date</label>
                        <input type="date" className="addInvInput" name="invDt" onChange={this.handleInvDtChange}/>
                      </div>
                      <div className="addInvItem">
                            <label>Due Date</label>
                        <input type="date" className="addInvInput" name="dueDt" onChange={this.handleDueDtChange}/>
                       </div>
                    </div>

                    <div className="inputCols">
                      <div className="addInvItem">
                        <label>Invoice Amount</label>
                        <input type="text" className="addInvInput" name="invAmt" onChange={this.handleInvAmtChange}/>
                      </div>
                      <div className="addInvItem"></div>
                      
                    </div>
                    <div className="inputCols">
                      <div className="addInvItem">
                        <label>Payout Date</label>
                        <input type="date" className="addInvInput" name="payDt" onChange={this.handlePayDtChange}/>
                      </div>
                      <div className="addInvItem">
                        <label>Interest Rate</label>
                        <input type="text" className="addInvInput" name="iRate" onChange={this.handleIRateChange}/>
                      </div>
                    </div>

                    <div className="inputCols">
                      <div className="addInvItem">
                        <label>Arranger</label>
                        <input type="text" value="Arranger1" className="addInvInput" readOnly style={{cursor:"no-drop"}} name="arrName"   value="Arranger1" onChange={this.handleArrNameChange}/>
                      </div>
                      <div className="addInvItem"></div>
                    </div>

                    <div className="inputCols">
                      <div className="addInvItem">
                      <label>Upload Invoice</label>
                        <label htmlFor="file" className="labelFile"><Publish/><span>Select File</span></label>
                        <input type="file" id="file" name="invfile" style={{display:"none"}} onChange={this.handleInvFileChange}/>
                      </div>
                     <div className="addInvItem"><button className="saveInvBtn" type="submit" >Submit</button></div>
                    </div>
                      
                    
                </form>

                <h3 className="addInvSectionTitle">Approval Section</h3>
            </div>
        </div>
    )
    
  }
}
