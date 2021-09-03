//import LgWidgets from '../../components/lgwidgets/LgWidgets'
//import SmWidgets from '../../components/smwidgets/SmWidgets'
//import AiWidgets from '../components/aiWidgets/AiWidgets'
import "./addInvoice.css";
//import Select from 'react-select';
import { Publish } from "@material-ui/icons";
import { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

export default class AddInvoice extends Component {
  userData;

  constructor(props) {
    super(props);

    // this.onChangeTid = this.onChangeTid.bind(this);
    this.onChangeInvNo = this.onChangeInvNo.bind(this);
    this.onChangeVname = this.onChangeVname.bind(this);
    this.onChangeAname = this.onChangeAname.bind(this);
    this.onChangeVloc = this.onChangeVloc.bind(this);
    this.onChangeAloc = this.onChangeAloc.bind(this);
    this.onChangePtype = this.onChangePtype.bind(this);
    this.onChangeInvDt = this.onChangeInvDt.bind(this);
    this.onChangeDueDt = this.onChangeDueDt.bind(this);
    this.onChangeInvAmt = this.onChangeInvAmt.bind(this);
    this.onChangePayDt = this.onChangePayDt.bind(this);
    this.onChangeIRate = this.onChangeIRate.bind(this);
    this.onChangeArrName = this.onChangeArrName.bind(this);
    this.onChangeInvFile = this.onChangeInvFile.bind(this);
    this.onHandleClose = this.onHandleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // var rtid = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    this.state = {
      approvalInvoice: [],
      tid: Math.floor(Math.random() * (999 - 100 + 1) + 100),
      invno: "",
      vname: "",
      aname: "",
      vloc: "",
      aloc: "",
      ptype: "",
      invdt: "",
      duedt: "",
      invamt: "",
      paydt: "",
      irate: "",
      arrname: "",
      invurl: "",
      open: false,
    };
  }

  // Form Events
  // onChangeTid(e) {
  //   this.setState({ tid: e.target.value });
  // }
  onChangeInvNo(e) {
    this.setState({ invno: e.target.value });
  }
  onChangeVname(e) {
    this.setState({ vname: e.target.value });
  }
  onChangeAname(e) {
    this.setState({ aname: e.target.value });
  }
  onChangeVloc(e) {
    this.setState({ vloc: e.target.value });
  }
  onChangeAloc(e) {
    this.setState({ aloc: e.target.value });
  }
  onChangePtype(e) {
    this.setState({ ptype: e.target.value });
  }
  onChangeInvDt(e) {
    this.setState({ invdt: e.target.value });
  }
  onChangeDueDt(e) {
    this.setState({ duedt: e.target.value });
  }
  onChangeInvAmt(e) {
    this.setState({ invamt: e.target.value });
  }
  onChangePayDt(e) {
    this.setState({ paydt: e.target.value });
  }
  onChangeIRate(e) {
    this.setState({ irate: e.target.value });
  }
  onChangeArrName(e) {
    this.setState({ arrname: e.target.value });
  }
  onChangeInvFile(e) {
    this.setState({ invurl: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    alert("are you sure you want to send for approval?");
    this.setState({
      open: true,
    });
    console.log(e.target.value);
  }
  onHandleClose(e) {
    if (e.target.firstChild.data == "No") {
      this.setState({
        open: false,
      });
    } else {
      var joined = this.state.approvalInvoice.concat({
        tid: this.state.tid,
        invno: this.state.invno,
        vname: this.state.vname,
        aname: this.state.aname,
        vloc: this.state.vloc,
        aloc: this.state.aloc,
        ptype: this.state.ptype,
        invdt: this.state.invdt,
        duedt: this.state.duedt,
        invamt: this.state.invamt,
        paydt: this.state.paydt,
        irate: this.state.irate,
        arrname: "Arranger1",
        invurl: this.state.invurl,
      });
      this.setState({
        approvalInvoice: joined,
        tid: Math.floor(Math.random() * (999 - 100 + 1) + 100),
        invno: "",
        vname: "",
        aname: "",
        vloc: "",
        aloc: "",
        ptype: "",
        invdt: "",
        duedt: "",
        invamt: "",
        paydt: "",
        irate: "",
        arrname: "",
        invurl: "",
        open: false,
      });
    }
  }

  // React Life Cycle
  componentDidMount() {
    // this.userData = JSON.parse(localStorage.getItem("user"));
    // if (localStorage.getItem("user")) {
    //   this.setState({
    //     tid: Math.floor(Math.random() * (999 - 100 + 1) + 100),
    //     invno: this.userData.invno,
    //     vname: this.userData.vname,
    //     aname: this.userData.aname,
    //     vloc: this.userData.vloc,
    //     aloc: this.userData.aloc,
    //     ptype: this.userData.ptype,
    //     invdt: this.userData.invdt,
    //     duedt: this.userData.duedt,
    //     invamt: this.userData.invamt,
    //     paydt: this.userData.paydt,
    //     irate: this.userData.irate,
    //     arrname: this.userData.arrname,
    //     invurl: this.userData.invurl,
    //   });
    // } else {
    //   this.setState({
    //     approvalInvoice: [],
    //     tid: Math.floor(Math.random() * (999 - 100 + 1) + 100),
    //     invno: "",
    //     vname: "",
    //     aname: "",
    //     vloc: "",
    //     aloc: "",
    //     ptype: "",
    //     invdt: "",
    //     duedt: "",
    //     invamt: "",
    //     paydt: "",
    //     irate: "",
    //     arrname: "",
    //     invurl: "",
    //     open: false,
    //   });
    // }
  }

  componentWillUpdate(nextProps, nextState) {
    // localStorage.setItem("user", JSON.stringify(nextState));
  }

  render() {
    return (
      <div className="addInvPage">
        <Dialog
          open={this.state.open}
          onClose={this.onHandleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Submit Invoice?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to submit the invoice?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onHandleClose} color="primary">
              No
            </Button>
            <Button onClick={this.onHandleClose} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <h3 className="addInvPageTitle">Upload New Invoice</h3>
        <Button>
          <Link to="/marketplace">Market Place</Link>
        </Button>
        <div className="addInvPageWrapper">
          <form className="addInvForm" onSubmit={this.handleSubmit}>
            <h3 className="addInvSectionTitle">Invoice Details</h3>

            <div className="inputCols">
              <div className="addInvItem">
                <label>Tracking ID</label>
                <input
                  type="text"
                  name="tid"
                  className="addInvInput"
                  readOnly
                  value={this.state.tid}
                />
              </div>
              <div className="addInvItem">
                <label>Invoice No</label>
                <input
                  type="text"
                  name="invNo"
                  className="addInvInput"
                  onChange={this.onChangeInvNo}
                  required
                  value={this.state.invno}
                />
              </div>
            </div>

            <div className="inputCols">
              <div className="addInvItem">
                <label>Vendor Name</label>
                <select
                  className="addInvInput"
                  name="vname"
                  onChange={this.onChangeVname}
                  required
                  value={this.state.vname}
                >
                  <option value="">--Select--</option>
                  <option value="Vendor1">Vendor1</option>
                  <option value="Vendor2">Vendor2</option>
                  <option value="Vendor3">Vendor3</option>
                </select>
              </div>
              <div className="addInvItem">
                <label>Anchor Name</label>
                <select
                  className="addInvInput"
                  name="aname"
                  onChange={this.onChangeAname}
                  required
                  value={this.state.aname}
                >
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
                <input
                  type="text"
                  className="addInvInput"
                  name="vloc"
                  onChange={this.onChangeVloc}
                  required
                  value={this.state.vloc}
                />
              </div>
              <div className="addInvItem">
                <label>Anchor Location</label>
                <input
                  type="text"
                  className="addInvInput"
                  name="aloc"
                  onChange={this.onChangeAloc}
                  required
                  value={this.state.aloc}
                />
              </div>
            </div>

            <div className="inputCols">
              <div className="addInvItem">
                <label>Product Type</label>
                <select
                  className="addInvInput"
                  name="ptype"
                  onChange={this.onChangePtype}
                  required
                  value={this.state.ptype}
                >
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
                <input
                  type="date"
                  className="addInvInput"
                  name="invDt"
                  onChange={this.onChangeInvDt}
                  required
                  value={this.state.invdt}
                />
              </div>
              <div className="addInvItem">
                <label>Due Date</label>
                <input
                  type="date"
                  className="addInvInput"
                  name="dueDt"
                  onChange={this.onChangeDueDt}
                  required
                  value={this.state.duedt}
                />
              </div>
            </div>

            <div className="inputCols">
              <div className="addInvItem">
                <label>Invoice Amount</label>
                <input
                  type="number"
                  className="addInvInput"
                  name="invAmt"
                  onChange={this.onChangeInvAmt}
                  required
                  value={this.state.invamt}
                />
              </div>
              <div className="addInvItem"></div>
            </div>
            <div className="inputCols">
              <div className="addInvItem">
                <label>Payout Date</label>
                <input
                  type="date"
                  className="addInvInput"
                  name="payDt"
                  onChange={this.onChangePayDt}
                  required
                  value={this.state.paydt}
                />
              </div>
              <div className="addInvItem">
                <label>Interest Rate</label>
                <input
                  type="number"
                  className="addInvInput"
                  name="iRate"
                  onChange={this.onChangeIRate}
                  required
                  value={this.state.irate}
                />
              </div>
            </div>

            <div className="inputCols">
              <div className="addInvItem">
                <label>Arranger</label>
                <input
                  type="text"
                  value="Arranger1"
                  className="addInvInput"
                  readOnly
                  style={{ cursor: "no-drop" }}
                  name="arrName"
                  value="Arranger1"
                  onChange={this.onChangeArrName}
                  required
                />
              </div>
              <div className="addInvItem"></div>
            </div>

            <div className="inputCols">
              <div className="addInvItem">
                <label>Upload Invoice</label>
                <label htmlFor="file" className="labelFile">
                  <Publish />
                  <span>Select File</span>
                </label>
                <input
                  type="file"
                  id="file"
                  name="invfile"
                  style={{ display: "none" }}
                  onChange={this.onChangeInvFile}
                />
              </div>
              <div className="addInvItem">
                <input className="saveInvBtn" type="submit" value="Submit" />
              </div>
            </div>
          </form>

          <h3 className="addInvSectionTitle">Approval Section</h3>
          {this.state.approvalInvoice.length > 0 ? (
            <table>
              <tbody>
                <tr>
                  <td>
                    <thead>Tracking ID:</thead>
                  </td>
                  <td>
                    <thead>Vendor Name:</thead>
                  </td>
                  <td>
                    <thead>Product Type:</thead>
                  </td>
                  <td>
                    <thead>Inv Date:</thead>
                  </td>
                  <td>
                    <thead>Invoice Amt:</thead>
                  </td>
                  <td>
                    <thead>Interest Rate:</thead>
                  </td>
                  <td>
                    <thead>Action</thead>
                  </td>
                </tr>

                {this.state.approvalInvoice.length > 0 &&
                  this.state.approvalInvoice.map((invoice, index) => {
                    return (
                      <tr key={index}>
                        <td>{invoice.tid}</td>
                        <td>{invoice.vname}</td>
                        <td>{invoice.ptype}</td>
                        <td>{invoice.invdt}</td>
                        <td>{invoice.invamt}</td>
                        <td>{invoice.irate}</td>
                        <td>
                          <Button>Approve</Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          ) : (
            <div>No Invoices for approval</div>
          )}
        </div>
      </div>
    );
  }
}
