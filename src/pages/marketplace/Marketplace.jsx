import './marketplace.css'
import React from 'react'
import {VisibilityOutlined}  from "@material-ui/icons"
import { Link} from "react-router-dom";
export default function Marketplace() {

    const Status = ({type}) =>{
        return <span className={"status" + type}>{type}</span>
    }
    return (
      <div className="mp">
        <h3 className="mpTitle">MARKETPLACE</h3>
        <table className="mpTable">
          <tr className="mpTr">
            <th className="mpTh">Tracking ID</th>
            <th className="mpTh">Vendor</th>
            <th className="mpTh">Anchor</th>
            <th className="mpTh">Invoice Value</th>
            <th className="mpTh">Amount Invested</th>
            <th className="mpTh">Available Investment Capacity</th>
            <th className="mpTh">Interest Rate(%)</th>

            <th className="mpTh">Action</th>
          </tr>

          <tr className="mpTr">
            <td className="mpTd">324</td>
            <td className="mpTd">Vendor1</td>
            <td className="mpTd">Anchor1</td>
            <td className="mpTd currencyRight">₹ 1,000,00</td>
            <td className="mpTd currencyRight">₹ 0</td>
            <td className="mpTd currencyRight">₹ 500,00</td>
            <td className="mpTd currencyRight">4</td>
            <td className="mpTd viewDetails">
              <button className="investBtn investBtnLink">Invest Now</button>
            </td>
          </tr>

          <tr className="mpTr">
            <td className="mpTd">454</td>
            <td className="mpTd">Vendor2</td>
            <td className="mpTd">Anchor2</td>
            <td className="mpTd currencyRight">₹ 1,000,00</td>
            <td className="mpTd currencyRight">₹ 1,000,00</td>
            <td className="mpTd currencyRight">₹ 0</td>
            <td className="mpTd currencyRight">12</td>
            <td className="mpTd viewDetails">
              <button className="investBtn investBtnLink disabled" disabled>
                Invest Now
              </button>
            </td>
          </tr>

          <tr className="mpTr">
            <td className="mpTd">654</td>
            <td className="mpTd">Vendor3</td>
            <td className="mpTd">Anchor4</td>
            <td className="mpTd currencyRight">₹ 1,000,000</td>
            <td className="mpTd currencyRight">₹ 0</td>
            <td className="mpTd currencyRight">₹ 500,000</td>
            <td className="mpTd currencyRight">14</td>
            <td className="mpTd viewDetails">
              <button className="investBtn investBtnLink ">Invest Now</button>
            </td>
          </tr>

          <tr className="mpTr">
            <td className="mpTd">786</td>
            <td className="mpTd">Vendor4</td>
            <td className="mpTd">Anchor4</td>
            <td className="mpTd currencyRight">₹ 1,000,000</td>
            <td className="mpTd currencyRight">₹ 0</td>
            <td className="mpTd currencyRight">₹ 500,000</td>
            <td className="mpTd currencyRight">10</td>
            <td className="mpTd viewDetails">
              <button className="investBtn investBtnLink">Invest Now</button>
            </td>
          </tr>

          <tr className="mpTr">
            <td className="mpTd">234</td>
            <td className="mpTd">Vendor5</td>
            <td className="mpTd">Anchor5</td>
            <td className="mpTd currencyRight">₹ 1,000,000</td>
            <td className="mpTd currencyRight">₹ 500,000</td>
            <td className="mpTd currencyRight">₹ 500,000</td>
            <td className="mpTd currencyRight">18</td>
            <td className="mpTd viewDetails">
              <Link to="\invest">
                <button className="investBtn investBtnLink">Invest Now</button>
              </Link>
            </td>
          </tr>
        </table>
      </div>
    );
}
