import './marketplace.css'
import React, { useEffect,useState } from 'react'
import moment from 'moment';
import {VisibilityOutlined}  from "@material-ui/icons"
import { Link} from "react-router-dom";
import { companyApiProvider } from 'services/api/company/companyService';

export default function Marketplace(props) {
  const [invoices,setInvoices] = useState([]);
  const [companyList,setCompanyList] = useState(new Map());
    const Status = ({type}) =>{
        return <span className={"status" + type}>{type}</span>
    }

    useEffect(async ()=>{
      // const companyData = await companyApiProvider.getCompanyList();
      // const companyMap = new Map();
      // companyData.forEach((company)=>{
      //   companyMap.set(company.id,company.organisationName);
      // })
      // setCompanyList(companyMap);      
      // await setCompanyList(companyMap);
      const invoicesData = await companyApiProvider.getAllDeals();
            setInvoices(invoicesData);
          console.log(invoicesData)
    },[])
    const investMoney = async (invoice) => {
      let investAmount = prompt("Enter amount to invest?");
      let userData = JSON.parse(localStorage.getItem('userData'));
      console.log(investAmount);
      if(investAmount){
      const invest = await companyApiProvider.investMoney({
        
          "borrower": invoice.borrowerAddress,
          "investor": userData?.walletAddress,
          "nftTokenId": invoice.nftTokenId,
          "investmentAmt":investAmount,
          "investmentType": "0",
          "party":invoice.party,
      
      })
      if(invest.txHash){
        alert(`Transaction Complete. Investment Done. Transaction ID is: ${invest.txHash}`)
      }}
    }
    return (
      <div className="mp">
        <h3 className="mpTitle">MARKETPLACE</h3>
        <table className="mpTable">
          <tr className="mpTr">
            <th className="mpTh">Invoice ID</th>
            <th className="mpTh">Borrower Addres</th>
            {/* <th className="mpTh">Anchor</th> */}
            <th className="mpTh">Estimated Yield</th>
            <th className="mpTh">NFT Token ID</th>
            <th className="mpTh">Tcap One Score</th>
            <th className="mpTh">Maturity Date</th>
            <th className="mpTh">Tenure</th>
            <th className="mpTh">Action</th>
          </tr>

          {invoices && invoices.map((invoice)=>{
            return(
            <tr className="mpTr">
            <td className="mpTd">{invoice.invoiceNumber}</td>
            {/* <td className="mpTd">{companyList.size>0 && companyList.get(invoice.vendorId)}</td> */}
            <td className="mpTd">{invoice.borrowerAddress}</td>
            {/* <td className="mpTd">{companyList.size>0 && companyList.get(invoice.anchorId)}</td> */}
            <td className="mpTd currencyRight">{invoice.debtAmount}</td>
            <td className="mpTd currencyRight">{invoice.nftTokenId}</td>
            <td className="mpTd currencyRight">{invoice.riskGroup}</td>
            <td className="mpTd currencyRight">{(new Date(invoice.dueDate*1000).toDateString())}</td>
            <td className="mpTd currencyRight">{Math.ceil(moment.duration(invoice.issuedate-invoice.dueDate).asDays())}</td>
            <td className="mpTd viewDetails">
              <button className="investBtn investBtnLink" onClick={()=>investMoney(invoice)} >Invest Now</button>
            </td>
            </tr>
            )
          }) 
        }
        </table>
      </div>
    );
}
