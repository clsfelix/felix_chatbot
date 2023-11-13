import './header.scss';
import Image from '../../assets/img/gato_felix_completo.png'

export default function Header() {

    return(
        <>
        <div className="headerContainer">
            <img alt="Gato felix completo" src={Image} className='imageAvatar'/>
            <div className="infos">
                <h2 className="title">
                    FELIX BOT
                </h2>
                <p className="subtitle">
                    Developer's Bot Assistant
                </p>
                
            </div>
        </div>
        </>
    )
}