import LgWidgets from '../../components/lgwidgets/LgWidgets'
import SmWidgets from '../../components/smwidgets/SmWidgets'
import './home.css'

export default function home() {
    return (
        <div className="home">
            <div className="homeWidgets">
                <SmWidgets/>
                <LgWidgets/>
            </div>
        </div>
    )
}
