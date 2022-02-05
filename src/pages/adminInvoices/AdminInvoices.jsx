import './admininvoices.css'
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
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import { companyApiProvider } from 'services/api/company/companyService';
import { addToMarketplaceStub } from 'stub/stub';
import { digest } from 'multiformats';
import Marketplace from 'pages/marketplace/Marketplace';

export default function AdminInvoices(props) {
  const [invoices,setInvoices] = useState([]);
  const [selectedInvoice,setSelectedInvoice] = useState(null);
  const [addToMarketPlaceDetails,setaddToMarketPlaceDetails] = useState(addToMarketplaceStub);
  const [addToMarketPlaceDetailsResponse,setaddToMarketPlaceDetailsResponse] = useState({});
  const [companyList,setCompanyList] = useState(new Map());
  const [addToMarketPlaceOpen,setAddToMarketPlaceOpen] = useState(false);

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
        <Dialog open={addToMarketPlaceOpen} onClose={()=>setAddToMarketPlaceOpen(false)}>
        <DialogTitle>
          Add to Marketplace</DialogTitle>
        <DialogContent>
          <DialogContentText>
            please enter details to add to marketplace.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="borrowerAddress"
            label="borrower Address"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>setaddToMarketPlaceDetails({...addToMarketPlaceDetails,borrowerAddress:e.target.value})}
          />
          <TextField
            autoFocus
            margin="dense"
            id="debtAmount"
            label="Debt Amount"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e)=>setaddToMarketPlaceDetails({...addToMarketPlaceDetails,debtAmount:e.target.value})}
          />
          <TextField id="rate" type='number' label="Rates" value={addToMarketPlaceDetails.rate} onChange={(e)=>setaddToMarketPlaceDetails({...addToMarketPlaceDetails,rate:e.target.value})}/>
          <TextField id="riskGroup" type='number' label="Risk Group" value={addToMarketPlaceDetails.riskGroup} onChange={(e)=>setaddToMarketPlaceDetails({...addToMarketPlaceDetails,riskGroup:e.target.value})}/>
          <br></br>
          <TextField
            autoFocus
            margin="dense"
            id="anchorAddress"
            label="Anchor Address"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>setaddToMarketPlaceDetails({...addToMarketPlaceDetails,anchorAddress:e.target.value})}
          />
          <label>Due Date
          </label>
          <TextField
            autoFocus
            margin="dense"
            id="dueDate"
            type="date"
            fullWidth
            variant="standard"
            onChange={(e)=>setaddToMarketPlaceDetails({...addToMarketPlaceDetails,dueDate:e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setAddToMarketPlaceOpen(false)} >Cancel</Button>
          <Button onClick={addToMarketPlace} disabled={addToMarketPlaceDetailsResponse.celoTxHash}>Create</Button>
        </DialogActions>
       {addToMarketPlaceDetailsResponse.ipfsTxHash&& <div style={{padding:'20px'}}>IPFS TX Link:<a href={`https://rinkeby-explorer.arbitrum.io/tx/${addToMarketPlaceDetailsResponse.ipfsTxHash}`} target="_blank">{`https://rinkeby-explorer.arbitrum.io/tx/${addToMarketPlaceDetailsResponse.ipfsTxHash}`}</a></div>}
       {addToMarketPlaceDetailsResponse.celoTxHash &&  <div style={{padding:'20px'}}>BlockChain TX Link:<a href={`https://rinkeby-explorer.arbitrum.io/tx/${addToMarketPlaceDetailsResponse.celoTxHash}`} target="_blank">{`https://rinkeby-explorer.arbitrum.io/tx/${addToMarketPlaceDetailsResponse.celoTxHash}`}</a></div>}
      </Dialog>
      
        <h3 className="mpTitle">INVOICES</h3>
        <table className="mpTable">
          <tr className="mpTr">
            <th className="mpTh">Invoice ID</th>
            <th className="mpTh">Vendor</th>
            <th className="mpTh">Anchor</th>
            <th className="mpTh">Invoice Value</th>
            <th className="mpTh">APY</th>
            <th className="mpTh">Risk Score</th>
            <th className="mpTh">Maturity Date</th>
            <th className="mpTh">Evidence</th>
            <th className="mpTh">Action</th>
          </tr>

          {invoices && invoices.map((invoice,index)=>{
            if(invoice.status == 'pending' || invoice.status == 'approved') 
            {return(
            <tr className="mpTr" key={invoice.id}>
            <td className="mpTd">{invoice.invoiceNumber}</td>
            <td className="mpTd">{companyList.size>0 && companyList.get(invoice.vendorId)}</td>
            <td className="mpTd">{companyList.size>0 && companyList.get(invoice.anchorId)}</td>
            <td className="mpTd currencyRight">{invoice.invoiceAmount}</td>
            <td className="mpTd currencyRight"></td>
            <td className="mpTd currencyRight"></td>
            <td className="mpTd currencyRight">{invoice.payoutDate}</td>
            <td className="mpTd currencyRight">
            <button className="investBtn investBtnLink" disabled={invoice.status=='approved'} onClick={()=>{verifyInvoice(invoice)}}>Verify</button>
            </td>
            <td className="mpTd viewDetails">
              <button className="investBtn investBtnLink" disabled={invoice.status=='pending'} onClick={()=>{setAddToMarketPlaceOpen(true);setSelectedInvoice(invoice)}}>Add to Marketplace</button>
            </td>
            </tr>
            )}
            else 
            return null
          }) 
        }
        </table>
      </div>
    );
}
