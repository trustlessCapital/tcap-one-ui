
import './dashboard.css'
import Home from  "../home/Home";
import AdminInvoices from 'pages/adminInvoices/AdminInvoices';
import Investor from 'pages/investor/investor';

export default function Dashboard(props) {
    return (
        <div className="home">
            <Home verified = {props?.verified} userData = {props?.userData}/>
            <br></br>
           {(props?.verified?.tcapRelation=='admin' || props?.verified?.tcapRelation=='arranger' || props.userData?.user=='hello@trustless.capital') && <AdminInvoices verified = {props?.verified} userData = {props?.userData}/>}
           { <Investor verified = {props?.verified} userData = {props?.userData}/>}
        </div>
    )
}
