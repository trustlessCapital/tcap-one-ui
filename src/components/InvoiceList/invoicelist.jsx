import React from 'react';
import * as mdb from 'mdb-ui-kit';


export default function InvoiceList(props) {

  return (
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-12">
          <div class="table-responsive bg-white table-hover" data-mdb-perfect-scrollbar="true" style={{position: "relative", height: "445px"}}>
            <table class="table">
            
              <thead>
                <tr>
                  <th scope="col">NFT ID</th>
                  <th scope="col" align="right">Amount Invested</th>
                  <th scope="col" align="right">Debt Amount</th>
                  <th scope="col" align="right">Due Date</th>
                  <th scope="col" align="right">Issue Date</th>
                  <th scope="col" align="right">APR</th>
                  <th scope="col" align="right">Redeemed Amount</th>
                </tr>
              </thead>
              <tbody>
                {props?.history?.map((row) => (
                  <tr key={row.nftId}>
                    <th scope="row">
                      {row.nftId}
                    </th>
                    <td align="right">{row.amountInvested}</td>
                    <td align="right">{row.debtAmount}</td>
                    <td align="right">{new Date(row.dueDate * 1000).toDateString()}</td>
                    <td align="right">{new Date(row.issueDate * 1000).toDateString()}</td>
                    <td align="right">{row.rate}</td>
                    <td align="right">{row.redeemedAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  </div>
  );
}
