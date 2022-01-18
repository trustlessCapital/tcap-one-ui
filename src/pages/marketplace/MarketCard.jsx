import "./Marketplace.jsx"
import React from "react";
// import Card from "react-bootstrap/Card";
// import ListGroup from "react-bootstrap/ListGroup";
import { companyApiProvider } from 'services/api/company/companyService';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function MarketCard(props){

    
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

    return(
        <div className="MarketCard">
            <Container fluid>
                <Row>
                    <Col md={3}><strong>Asset ID : </strong>{props.assetID}</Col>
                    <Col md={3}><strong>Invoice Date : </strong>{props.invoiceDate}</Col>
                    <Col md={4}><strong>Invoice Amount :</strong>{props.invoiceAnount}</Col>
                </Row>
                <Row>
                    <Col md={3}><strong>Vendor Name : </strong>{props.vendorName}</Col>
                    <Col md={3}><strong>Remaining Amount : </strong>{props.remainingAmount}</Col>
                    <Col md={4}><strong>Funded Amount : </strong>{props.fundedAmount}</Col>
                </Row>
                <Row>
                    <Col md={3}><strong>Anchor Name : </strong>{props.anchorName}</Col>
                    <Col md={3}><strong>APR Yield : </strong>{props.aprYield}</Col>
                    <Col md={4}><strong>Payout Date : </strong>{props.payoutDate}</Col>
                </Row>
                <Row>
                    <Col md={3}><strong>Risk Score : </strong>{props.riskScore}</Col>
                </Row>
                <Row>
                    <Col md={3}><strong>Insurance Coverage : </strong>{props.insuranceCoverage}</Col>
                </Row>
            </Container>
            <button onClick={()=>investMoney(props)}>Invest Now</button>
        </div>
    );
}

export default MarketCard;