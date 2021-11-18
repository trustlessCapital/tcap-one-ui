
import './dashboard.css'
import Home from  "../home/Home";
import AdminInvoices from 'pages/adminInvoices/AdminInvoices';

export default function Dashboard(props) {
    return (
        <div className="home">
            <Home verified = {props?.verified} userData = {props?.userData}/>
           {(props?.verified?.tcapRelation=='admin' || props?.verified?.tcapRelation=='arranger' || props.userData?.user=='hello@trustless.capital') && <AdminInvoices verified = {props?.verified} userData = {props?.userData}/>}
        </div>
    )
}
