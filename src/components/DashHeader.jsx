import { Link } from 'react-router-dom'

const DashHeader = () => {

    const content = (
        <header className="w-full">
            <div className="flex justify-center p-4">
                <Link to="/dash">
                    <h1 className="text-4xl text-[#1D976C]">Plans Field &#128515;</h1>
                </Link>
                <nav className="dash-header__nav">
                    {/* add nav buttons later */}
                </nav>
            </div>
        </header>
    )

    return content
}
export default DashHeader