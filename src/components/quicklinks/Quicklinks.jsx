import './quicklinks.css'
import{DoubleArrow} from "@material-ui/icons"

export default function Quicklinks() {
    return (
        
        <div className="pageQuickLinks">
            <h1 className="pageQuickLinksHeader"> Quick Links <DoubleArrow/></h1>
              <div className="quicklinkItems">
                <a href="https://tcap.one"><span>Add New Invoice</span></a>
              </div>
              <div className="quicklinkItems">
                <a href="https://tcap.one"><span>My Invoices</span></a>
              </div>
              <div className="quicklinkItems">
                  <a href="https://tcap.one"><span>My Funds</span></a>
              </div>
              <div className="quicklinkItems">
                  <a href="https://tcap.one"><span>Others</span></a>
              </div>
        </div>
        
    )
}
