import LgWidgets from '../../components/lgwidgets/LgWidgets'
import SmWidgets from '../../components/smwidgets/SmWidgets'
import { Link } from 'react-router-dom';
import './home.css'

export default function home(props) {
    return (
      <div className="home">
        <div className="homeWidgets">
        <div><h1>Welcome to TCAP</h1></div>
          {/* <SmWidgets/>
                <LgWidgets/> */}

{!props.verified?.companyId &&
              <>
           <br></br>   
          <div>
            Please verify you KYC &nbsp;
            <Link to="/onboardentity">Verify</Link>
          </div>
          </>}
        </div>
      </div>
    );
}
