
import './dashboard.css'
import Home from  "../home/Home";
import AdminInvoices from 'pages/adminInvoices/AdminInvoices';
import Investor from 'pages/investor/investor';

export default function Dashboard(props) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return (
        <div className="home">
            {userData.userType!='investor' && <Home verified = {props?.verified} userData = {props?.userData}/>}
            <br></br>
           {(props?.verified?.tcapRelation=='admin' || props?.verified?.tcapRelation=='arranger' || props.userData?.user=='abhijit.panda1319@gmail.com') && <AdminInvoices verified = {props?.verified} userData = {props?.userData}/>}
           {userData.userType=='investor' && <Investor verified = {props?.verified} userData = {props?.userData}/>}
        </div>
    )
}
