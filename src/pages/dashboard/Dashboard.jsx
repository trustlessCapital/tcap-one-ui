
import './dashboard.css'
import Home from  "../home/Home";

export default function Dashboard(props) {
    return (
        <div className="home">
            <Home verified = {props?.verified} userData = {props?.userData}/>
        </div>
    )
}
