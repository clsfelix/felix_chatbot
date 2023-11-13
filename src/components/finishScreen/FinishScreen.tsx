import './finishedScreen.scss'

import image from '../../assets/img/Felix_the_cat.webp'
export default function FinishScreen() {
    return (
        <>
        <div className="screen">
            <img src={image} alt="felix_the_cat" />
            <h2 className="titleScreen">
                Obrigada por nos avaliar
            </h2>
            <p>Sua opinião é muito importante para nós</p>


            <span>Espero que possamos nos ver em breve</span>
        </div>
        </>
    )
}