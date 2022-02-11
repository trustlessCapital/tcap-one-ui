
import './dashboard.css'
import Home from  "../home/Home";
import Investor from 'pages/investor/investor';
import AdminLanding from 'pages/adminInvoices/AdminLanding';

export default function Dashboard(props) {
    const userData = localStorage.getItem('userData');
    return (
        <div className="home">
            {userData.userType!='investor' && <Home verified = {props?.verified} userData = {props?.userData}/>}
            <br></br>
           {(props?.verified?.tcapRelation=='admin' || props?.verified?.tcapRelation=='arranger' || props.userData?.userType=='ADMIN') && <AdminLanding verified = {props?.verified} userData = {props?.userData}/>}
           {userData.userType=='investor' && <Investor verified = {props?.verified} userData = {props?.userData}/>}
        </div>
    )
}


// import './dashboard.css'
// import Home from  "../home/Home";
// import AdminInvoices from 'pages/adminInvoices/AdminInvoices';
// import Investor from 'pages/investor/investor';

// export default function Dashboard(props) {
//     const userData = localStorage.getItem('userData');
//     return (
//         <div className="home">
//             {userData.userType!='investor' && <Home verified = {props?.verified} userData = {props?.userData}/>}
//             <br></br>
//            {(props.userData?.userType=='ADMIN' || props?.verified?.tcapRelation=='admin' || props?.verified?.tcapRelation=='arranger' ) && <AdminDashboard verified = {props?.verified} userData = {props?.userData}/>}

//            {userData.userType=='investor' && <Investor verified = {props?.verified} userData = {props?.userData}/>}
//         </div>
//     )
// }

