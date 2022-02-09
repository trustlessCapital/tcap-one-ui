import "./Marketplace.jsx"
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import Card from "react-bootstrap/Card";
// import ListGroup from "react-bootstrap/ListGroup";
import { companyApiProvider } from 'services/api/company/companyService';
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Accordion from 'react-bootstrap/Accordion';

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
        <Accordion defaultActiveKey="0" flush className="Accord">
            <Accordion.Item eventKey={props.id}>
                <Container fluid>
                   <Row className="rows">
                        <Col className = "Img" sm={1}>
                            <img height = "55" width = "55" src ={props.image}></img>
                        </Col>
                        <Col className = "Text" sm={4}><p>ConsolFreight Series 4</p></Col>
                        <Col className = "Value" sm={2}>1234</Col>
                        <Col className = "Value" sm={2}>1234</Col>
                        <Col className = "Value1" sm={1}>1234</Col>
                        <Col className = "InvestButton" sm={2}><Button onClick={()=>investMoney(props)} variant="outline-info">INVEST</Button>{' '}</Col>
                    </Row>
                </Container>
                <Accordion.Header>
                    
                

                </Accordion.Header>

                <Accordion.Body className="MarketCard">
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
                        
                </Accordion.Body>
            </Accordion.Item>

        </Accordion>

            
     
    );
}

export default MarketCard;