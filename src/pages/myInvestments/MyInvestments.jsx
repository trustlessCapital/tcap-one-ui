import "./myinvestments.css";
import React from "react";
export default function MyInvestments() {
  const data = [
    {
      investedAmount: "1,00,000",
      payoutDate: "22-12-2021",
      interestRate: "5%",
      tid: "123",
      vendor: "Vendor1",
      anchor: "Anchor1",
    },
    {
      investedAmount: "1,0,000",
      payoutDate: "21-12-2021",
      interestRate: "12%",
      tid: "143",
      vendor: "Vendor2",
      anchor: "Anchor2",
    },
    {
      investedAmount: "1,000",
      payoutDate: "24-12-2021",
      interestRate: "6%",
      tid: "543",
      vendor: "Vendor3",
      anchor: "Anchor3",
    },
  ];
  return (
    <div className="mp">
      <h3 className="mpTitle">YOUR INVESTMENTS</h3>
      {data.map((investment, index) => {
        return (
          <div className="investment" key={index}>
            <p>Invested Amount: {investment.investedAmount}</p>
            <p>Payout Date: {investment.payoutDate}</p>
            <p>Interest Rate: {investment.interestRate}</p>
            <p>TrackingID: {investment.tid}</p>
            <p>Vendor: {investment.vendor}</p>
            <p>Anchor: {investment.anchor}</p>
          </div>
        );
      })}
    </div>
  );
}
