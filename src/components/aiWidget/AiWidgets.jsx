import './aiWidgets.css'

import {VisibilityOutlined}  from "@material-ui/icons"

export default function LgWidgets() {
    const Button = ({type}) =>{
        return <button className={"aiWidgetsBtn" + type}>{type}</button>
    }
    const Status = ({type}) =>{
        return <span className={"status" + type}>{type}</span>
    }
    return (
        <div className="addInvPage">
            <h3 className="addInvPageTitle">Upload New Invoie</h3>
            <div className="addInvPageWrapper">

                <form className="addInvForm">
                 <div className="aiWidget">
                    <AiWidget/>

                 </div>

                    <div className="addInvItem">
                        <label>Tracking ID</label>
                        <input type="text" className="addInvInput" readOnly/>
                    </div>
                    <div className="addInvItem">
                        <label>Invoice Date</label>
                        <input type="date" className="addInvInput"/>
                    </div>
                    <div className="addInvItem">
                        <label>Due Date</label>
                        <input type="date" className="addInvInput"/>
                    </div>
                    <div className="addInvItem">
                        <label>Anchor Name</label>
                        <input type="text" className="addInvInput"/>
                    </div>
                    <div className="addInvItem">
                        <label>Anchor Location</label>
                        <input type="text" className="addInvInput"/>
                    </div>
                    <div className="addInvItem">
                        <label>Invoice Amount</label>
                        <input type="text" className="addInvInput"/>
                    </div>
                    <div className="addInvItem">
                        <label>Vendor Name</label>
                        <input type="text" className="addInvInput"/>
                    </div>
                    <div className="addInvItem">
                        <label>Vendor Location</label>
                        <input type="text" className="addInvInput"/>
                    </div>
                    
                    <div className="addInvItem">
                        <label>Arranger</label>
                        <input type="text" value="Arranger1" className="addInvInput"/>
                    </div>
                    <div className="addInvItem">
                        <label>Upload File</label>
                        <input type="file" className="addInvInput"/>
                    </div>
                </form>
            </div>
        </div>
    )
}
