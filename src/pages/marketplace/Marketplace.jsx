import './marketplace.css'
import React, { useEffect,useState } from 'react'
import moment from 'moment';
import {VisibilityOutlined}  from "@material-ui/icons"
import { Link} from "react-router-dom";
import { companyApiProvider } from 'services/api/company/companyService';
import MarketCard from "./MarketCard";
import { v4 as uuidv4 } from 'uuid'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Spinner } from 'react-bootstrap';

export default function Marketplace(props) {
  const [invoices,setInvoices] = useState(null);
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
      if(!invoicesData.error)
            setInvoices(invoicesData);
          console.log(invoicesData)
    },[])
    console.log(invoices);
    return (
      <div className="mp">
        <h3 className='Head'>Welcome to Real World Asset Marketplace</h3>
          
          <Container fluid>
            <Row>
              <Col sm={1}></Col>
              <Col sm={4}></Col>
              <Col className = "Heading" sm={2}>Invoice Amount</Col>
              <Col className = "Heading" sm={2}>APR Yield</Col>
              <Col className = "Heading1" sm={2}>Payout Date</Col>
            </Row>
          </Container>
          {invoices && invoices.map((invoice, index)=>{
            
            return(
              <MarketCard
                key={uuidv4()}
                id = {index}
                image = "https://storage.googleapis.com/tinlake/pool-media/consolfreight-4/icon.svg"
                assetID = {invoice.assetID}
                vendorName = {invoice.vendorId}
                anchorName = {invoice.anchorId}
                riskScore = {invoice.riskScore}
                insuranceCoverage = {invoice.insuranceCoverage}
                invoiceDate = {(new Date(invoice.dueDate*1000).toDateString())}
                remainingAmount = {invoice.remainingAmount}
                aprYield = {invoice.aprYield}
                invoiceAmount = {invoice.invoiceAmount}
                fundedAmount = {invoice.fundedAmount}
                payoutDate = {invoice.payoutDate}
                investMoney = {invoice}
              />
            )
          }) 
        }






        {/* <table className="mpTable">
          <tr className="mpTr">
            <th className="mpTh">Invoice ID</th>
            <th className="mpTh">Borrower Addres</th> */}
            {/* <th className="mpTh">Anchor</th> */}
            {/* <th className="mpTh">Estimated Yield</th>
            <th className="mpTh">NFT Token ID</th>
            <th className="mpTh">Tcap One Score</th>
            <th className="mpTh">Maturity Date</th>
            <th className="mpTh">Tenure</th>
            <th className="mpTh">Action</th>
          </tr> */}

          {/* {invoices && invoices.map((invoice)=>{
            return(
            <tr className="mpTr">
            <td className="mpTd">{invoice.invoiceNumber}</td> */}
            {/* <td className="mpTd">{companyList.size>0 && companyList.get(invoice.vendorId)}</td> */}
            {/* <td className="mpTd">{invoice.borrowerAddress}</td> */}
            {/* <td className="mpTd">{companyList.size>0 && companyList.get(invoice.anchorId)}</td> */}
            {/* <td className="mpTd currencyRight">{invoice.debtAmount}</td>
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
        </table> */}
      </div>
    );
}
