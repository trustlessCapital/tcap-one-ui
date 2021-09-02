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
                        <th className="mpTh">Invoice Value</th>
                        <th className="mpTh">Approved Amount</th>
                        <th className="mpTh">Amount Invested</th>
                        <th className="mpTh">Available Investment Capacity</th>
                        <th className="mpTh">Interest Rate(%)</th>
                        <th className="mpTh">Action</th>
                    </tr>

                    <tr className="mpTr">
                        <td className="mpTd">1234</td>
                        <td className="mpTd currencyRight">₹ 1,000,000</td>
                        <td className="mpTd currencyRight">₹ 500,000</td>
                        <td className="mpTd currencyRight">₹ 0</td>
                        <td className="mpTd currencyRight">₹ 500,000</td>
                        <td className="mpTd currencyRight">16</td>
                        <td className="mpTd viewDetails"><button className="investBtn">Invest Now</button></td>
                    </tr>

                    <tr className="mpTr">
                        <td className="mpTd">1234</td>
                        <td className="mpTd currencyRight">₹ 1,000,000</td>
                        <td className="mpTd currencyRight">₹ 500,000</td>
                        <td className="mpTd currencyRight">₹ 0</td>
                        <td className="mpTd currencyRight">₹ 500,000</td>
                        <td className="mpTd currencyRight">16</td>
                        <td className="mpTd viewDetails"><button className="investBtn">Invest Now</button></td>
                    </tr>


                    <tr className="mpTr">
                        <td className="mpTd">1234</td>
                        <td className="mpTd currencyRight">₹ 1,000,000</td>
                        <td className="mpTd currencyRight">₹ 500,000</td>
                        <td className="mpTd currencyRight">₹ 0</td>
                        <td className="mpTd currencyRight">₹ 500,000</td>
                        <td className="mpTd currencyRight">16</td>
                        <td className="mpTd viewDetails"><button className="investBtn">Invest Now</button></td>
                    </tr>

                    <tr className="mpTr">
                        <td className="mpTd">1234</td>
                        <td className="mpTd currencyRight">₹ 1,000,000</td>
                        <td className="mpTd currencyRight">₹ 500,000</td>
                        <td className="mpTd currencyRight">₹ 0</td>
                        <td className="mpTd currencyRight">₹ 500,000</td>
                        <td className="mpTd currencyRight">16</td>
                        <td className="mpTd viewDetails"><button className="investBtn">Invest Now</button></td>
                    </tr>


                    <tr className="mpTr">
                        <td className="mpTd">1234</td>
                        <td className="mpTd currencyRight">₹ 1,000,000</td>
                        <td className="mpTd currencyRight">₹ 500,000</td>
                        <td className="mpTd currencyRight">₹ 0</td>
                        <td className="mpTd currencyRight">₹ 500,000</td>
                        <td className="mpTd currencyRight">16</td>
                        <td className="mpTd viewDetails">
                            <Link to="\invest"><button className="investBtn">Invest Now</button></Link></td>
                    </tr>
                </table>
        </div>
    )
}
