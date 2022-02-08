import './admin.css'
import React, { useEffect,useState } from 'react'
import {VisibilityOutlined}  from "@material-ui/icons"
import { Link} from "react-router-dom";
import base58 from 'bs58';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from 'react-bootstrap/Button';
import { TextField } from '@material-ui/core';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DialogTitle from '@material-ui/core/DialogTitle';
import { companyApiProvider } from 'services/api/company/companyService';
import { addToMarketplaceStub } from 'stub/stub';
import { digest } from 'multiformats';
import Marketplace from 'pages/marketplace/Marketplace';
import Sidebar from './Sidebar';
import AddNewUserModal from './AddNewUserModal';

export default function AdminManageUsers(props) {
  const [invoices,setInvoices] = useState([]);
  const [selectedInvoice,setSelectedInvoice] = useState(null);
  const [addToMarketPlaceDetails,setaddToMarketPlaceDetails] = useState(addToMarketplaceStub);
  const [addToMarketPlaceDetailsResponse,setaddToMarketPlaceDetailsResponse] = useState({});
  const [companyList,setCompanyList] = useState(new Map());
  const [addToMarketPlaceOpen,setAddToMarketPlaceOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);

    const Status = ({type}) =>{
        return <span className={"status" + type}>{type}</span>
    }

    useEffect(async ()=>{
      const Data = await companyApiProvider.getCompanyList();
      const jData = JSON.stringify(Data);
      const companyData = JSON.parse(jData);

      const companyMap = new Map();
      companyData.forEach((company)=>{
        companyMap.set(company.id,company.organisationName);
      })
      setCompanyList(companyMap);      
      await setCompanyList(companyMap);
      const invoicesData = await companyApiProvider.getAllInvoices();
          setInvoices(invoicesData);
          console.log(invoicesData)
    },[])
    useEffect(async ()=>{
if(addToMarketPlaceDetails.digest !='')
{
  const marketPlaceDetails = await companyApiProvider.addToMarketplace(addToMarketPlaceDetails);
  console.log(marketPlaceDetails);
  if(marketPlaceDetails.celoTxHash)
  {
    setaddToMarketPlaceDetailsResponse(marketPlaceDetails);
  }
}
    },[addToMarketPlaceDetails])
    const addToMarketPlace = async () =>{
      let unixDate = new Date(addToMarketPlaceDetails.dueDate).getTime();
      let unixinSeconds = Math.floor(unixDate/1000);
      let digestDataoutput={};
      const digestData = await getBytes32FromMultiash(selectedInvoice.contentId);
//       digestData.then((response) => {
// digestDataoutput = response;
//       })
console.log(digestData)
      await setaddToMarketPlaceDetails({...addToMarketPlaceDetails,dueDate:unixinSeconds, digest: digestData.digest,hashFunction:digestData.hashFunction,size:digestData.size });
        console.log(addToMarketPlaceDetails);
    }
    async function getBytes32FromMultiash(contentId){
      const decoded = base58.decode(contentId);
      return {
        digest: `0x${decoded.slice(2).toString('hex')}`,
        hashFunction: decoded[0],
        size: decoded[1],
      };
  }
  const verifyInvoice = async (invoice) =>{
    let verifyInvoiceDoc;
    let evidenceDetails = await companyApiProvider.getInvoiceEvidence(`evidence-${invoice.id}`);
    if(evidenceDetails.contentId){
       verifyInvoiceDoc= await companyApiProvider.verifyInvoice({...invoice,status:'approved',userId:props?.userData?.userId});
    }
    if(verifyInvoiceDoc.id){
      alert("invoice approved successfully,ready to be added to marketplace ");
    }
  }
    return (
      <div className="mp">
        
      <Button style={{backgroundColor: "#FFAFAF", color: "#FFFFFF", border:"none"}} variant="secondary" className="addnewuser" onClick={() => {setModalShow(true)}}>Add New User</Button>
      <AddNewUserModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    

      
      <Container fluid>
                <Row className='Deals'>
                    <Col sm={3}>
                        <Sidebar />
                    </Col>
                    <Col sm={9}>
                    <div class="container-fluid">
                        <div class="row justify-content-center">
                            <div class="col-12">
                            <div class="table-responsive table-scroll bg-white table-hover" data-mdb-perfect-scrollbar="true" style={{position: "relative", height: "700px"}}>
                                <table class="table">
                                        <thead class="table-dark" style={{position: "sticky", top: "0"}}>
                                            <tr>
                                            <th className="heads currencyRight" scope="col">User Name</th>
                                            <th className="heads currencyRight" scope="col" align="right">User Type</th>
                                            <th className="heads currencyRight" scope="col" align="right">Company</th>
                                            <th className="heads currencyRight" scope="col" align="right">Email Address</th>
                                            <th className="heads currencyRight" scope="col" align="right">Mobile No.</th>
                                            <th className="heads currencyRight" scope="col" align="right">Active/Inactive</th>
                                            
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="mpTd currencyRight">Kapil</td>
                                                <td className="mpTd currencyRight">Vendor</td>
                                                <td className="mpTd currencyRight">Trustless</td>
                                                <td className="mpTd currencyRight"></td>
                                                <td className="mpTd currencyRight">9999999999</td>
                                                <td className="mpTd currencyRight">Active</td>
                                                
                                                
                                            </tr>

                                            <tr>
                                                <td className="mpTd currencyRight">Abhijit</td>
                                                <td className="mpTd currencyRight">Anchor</td>
                                                <td className="mpTd currencyRight">Company 4</td>
                                                <td className="mpTd currencyRight"></td>
                                                <td className="mpTd currencyRight">9888888888</td>
                                                <td className="mpTd currencyRight">Locked</td>
                                                
                                                
                                            </tr>


                                            <tr>
                                                <td className="mpTd currencyRight">Jakir</td>
                                                <td className="mpTd currencyRight">Admin</td>
                                                <td className="mpTd currencyRight">Trustless</td>
                                                <td className="mpTd currencyRight"></td>
                                                <td className="mpTd currencyRight">9777777777</td>
                                                <td className="mpTd currencyRight">Inactive</td>
                                                
                                                
                                            </tr>

                                            <tr>
                                                <td className="mpTd currencyRight">Nagarjun</td>
                                                <td className="mpTd currencyRight">Arranger</td>
                                                <td className="mpTd currencyRight">Company 3</td>
                                                <td className="mpTd currencyRight"></td>
                                                <td className="mpTd currencyRight">9666666666</td>
                                                <td className="mpTd currencyRight">Active</td>

                                                
                                            </tr>
                                            
                                        </tbody>
                                        </table>
                                </div>
                                </div>
                            </div>
                        </div>
                        
                    </Col>
            
            </Row>
            </Container>
      </div>
    );
}
