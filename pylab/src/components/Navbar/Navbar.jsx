import './Navbar.css'

function Navbar() {
    return(
        <>
        <nav className="navbar navbar-expand-lg">
            <img src="/python-logo.png" alt="Python Logo" />
            <div className="container-fluid">
                <a className="navbar-brand text-light name" href="#">PyLab</a>
            </div>
        </nav>
        </>
    )
}

export default Navbar
