import './marketplace.css'
import React, { useEffect,useState } from 'react'
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
      const companyData = await companyApiProvider.getCompanyList();
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
    return (
      <div className="mp">
        <h3 className="mpTitle">MARKETPLACE</h3>
        <table className="mpTable">
          <tr className="mpTr">
            <th className="mpTh">Invoice ID</th>
            <th className="mpTh">Vendor</th>
            <th className="mpTh">Anchor</th>
            <th className="mpTh">Invoice Value</th>
            <th className="mpTh">APY</th>
            <th className="mpTh">Risk Score</th>
            <th className="mpTh">Maturity Date</th>

            <th className="mpTh">Action</th>
          </tr>

          {invoices && invoices.map((invoice)=>{
            return(
            <tr className="mpTr">
            <td className="mpTd">{invoice.invoiceNumber}</td>
            <td className="mpTd">{companyList.size>0 && companyList.get(invoice.vendorId)}</td>
            <td className="mpTd">{companyList.size>0 && companyList.get(invoice.anchorId)}</td>
            <td className="mpTd currencyRight">{invoice.invoiceAmount}</td>
            <td className="mpTd currencyRight"></td>
            <td className="mpTd currencyRight"></td>
            <td className="mpTd currencyRight">{invoice.payoutDate}</td>
            <td className="mpTd viewDetails">
              <button className="investBtn investBtnLink">Invest Now</button>
            </td>
            </tr>
            )
          }) 
        }
        </table>
      </div>
    );
}
