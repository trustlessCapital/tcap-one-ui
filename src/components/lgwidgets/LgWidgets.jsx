import './lgWidgets.css'
import {VisibilityOutlined}  from "@material-ui/icons"

export default function LgWidgets() {
    const Button = ({type}) =>{
        return <button className={"lgWidgetsBtn" + type}>{type}</button>
    }
    const Status = ({type}) =>{
        return <span className={"status" + type}>{type}</span>
    }
    return (
        <div className="lgWidgets">
            <h3 className="lgWidgetsTitle">My Invoices</h3>
                <table className="lgWidgetsTable">
                    <tr className="lgWidgetsTr">
                        <th className="lgWidgetsTh">#</th>
                        <th className="lgWidgetsTh">Tracking ID</th>
                        <th className="lgWidgetsTh">Upload Date</th>
                        <th className="lgWidgetsTh">Invoice Payout Date</th>
                        <th className="lgWidgetsTh">Anchor Name</th>
                        <th className="lgWidgetsTh">Anchor Loation</th>
                        <th className="lgWidgetsTh">Invoice Status</th>
                        <th className="lgWidgetsTh">Invoice Amount</th>
                        <th className="lgWidgetsTh">Approved Amount</th>
                        <th className="lgWidgetsTh">Fundeded Amount</th>
                        <th className="lgWidgetsTh">Trnsaction Details</th>
                    </tr>

                    <tr className="lgWidgetsTr">
                        <td className="lgWidgetsTd">1</td>
                        <td className="lgWidgetsTd">1234</td>
                        <td className="lgWidgetsTd">07-10-2021</td>
                        <td className="lgWidgetsTd">10-10-2021</td>
                        <td className="lgWidgetsTd">ABCD SS</td>
                        <td className="lgWidgetsTd">Mumbai</td>
                        <td className="lgWidgetsTd"><Status type="Pending"/></td>
                        <td className="lgWidgetsTd currencyRight">₹ 1,000,000</td>
                        <td className="lgWidgetsTd currencyRight">₹ 0</td>
                        <td className="lgWidgetsTd currencyRight">₹ 0</td>
                        <td className="lgWidgetsTd viewDetails"><VisibilityOutlined className="lgWidgetsIcon"/><Button type="Details"/></td>
                    </tr>


                    <tr className="lgWidgetsTr">
                        <td className="lgWidgetsTd">2</td>
                        <td className="lgWidgetsTd">2345</td>
                        <td className="lgWidgetsTd">08-21-2021</td>
                        <td className="lgWidgetsTd">10-15-2021</td>
                        <td className="lgWidgetsTd">XY SYS</td>
                        <td className="lgWidgetsTd">Mumbai</td>
                        <td className="lgWidgetsTd"><Status type="Approved"/></td>
                        <td className="lgWidgetsTd currencyRight">₹ 100,000</td>
                        <td className="lgWidgetsTd currencyRight">₹ 60,000</td>
                        <td className="lgWidgetsTd currencyRight">₹ 0</td>
                        <td className="lgWidgetsTd viewDetails"><VisibilityOutlined className="lgWidgetsIcon"/><Button type="Details"/></td>
                    </tr>


                    <tr className="lgWidgetsTr">
                        <td className="lgWidgetsTd">3</td>
                        <td className="lgWidgetsTd">3456</td>
                        <td className="lgWidgetsTd">08-21-2021</td>
                        <td className="lgWidgetsTd">10-15-2021</td>
                        <td className="lgWidgetsTd">ZZ INFOSYS</td>
                        <td className="lgWidgetsTd">Bangalore</td>
                        <td className="lgWidgetsTd"><Status type="Rejected"/></td>
                        <td className="lgWidgetsTd currencyRight">₹ 500,000</td>
                        <td className="lgWidgetsTd currencyRight">₹ 0</td>
                        <td className="lgWidgetsTd currencyRight">₹ 0</td>
                        <td className="lgWidgetsTd viewDetails"><VisibilityOutlined className="lgWidgetsIcon"/><Button type="Details"/></td>
                    </tr>


                    <tr className="lgWidgetsTr">
                        <td className="lgWidgetsTd">4</td>
                        <td className="lgWidgetsTd">4567</td>
                        <td className="lgWidgetsTd">06-21-2021</td>
                        <td className="lgWidgetsTd">11-10-2021</td>
                        <td className="lgWidgetsTd">XY SYS</td>
                        <td className="lgWidgetsTd">Kolkata</td>
                        <td className="lgWidgetsTd"><Status type="Partially-Funded"/></td>
                        <td className="lgWidgetsTd currencyRight">₹ 100,000</td>
                        <td className="lgWidgetsTd currencyRight">₹ 60,000</td>
                        <td className="lgWidgetsTd currencyRight">₹ 20,000</td>
                        <td className="lgWidgetsTd viewDetails"><VisibilityOutlined className="lgWidgetsIcon"/><Button type="Details"/></td>
                    </tr>


                    <tr className="lgWidgetsTr">
                        <td className="lgWidgetsTd">5</td>
                        <td className="lgWidgetsTd">5678</td>
                        <td className="lgWidgetsTd">05-21-2021</td>
                        <td className="lgWidgetsTd">10-10-2021</td>
                        <td className="lgWidgetsTd">HJJK SYS</td>
                        <td className="lgWidgetsTd">Bhubaneswar</td>
                        <td className="lgWidgetsTd"><Status type="Fully-Funded"/></td>
                        <td className="lgWidgetsTd currencyRight">₹ 700,000</td>
                        <td className="lgWidgetsTd currencyRight">₹ 600,000</td>
                        <td className="lgWidgetsTd currencyRight">₹ 600,000</td>
                        <td className="lgWidgetsTd viewDetails"><VisibilityOutlined className="lgWidgetsIcon"/><Button type="Details"/></td>
                    </tr>
                </table>
        </div>
    
    )
}
