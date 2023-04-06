import { useNavigate, useLocation } from 'react-router-dom'

const DashFooter = () => {

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const onGoHomeClicked = () => navigate('/dash')

    let goHomeButton = null
    if (pathname !== '/dash') {
        goHomeButton = (
            <button
                className="dash-footer__button icon-button"
                title="Home"
                onClick={onGoHomeClicked}
            >
            </button>
        )
    }

    const content = (
        <footer className="absolute bottom-0 p-8 w-full flex justify-center items-center gap-4 bg-[#1D976C]">
            {goHomeButton}
            <p className='text-white font-bold text-2xl'>Current User:</p>
            <p className='text-white font-bold text-2xl'>Status:</p>
        </footer>
    )
    return content
}
export default DashFooter