
export default function NavBar () {

    return <nav className="flex justify-between items-center">
                <h1 className=""><strong className='fonth1'>KV</strong><strong className='fonth1bis'>Pictures</strong></h1>
                <ul className='navbar flex justify-center items-center flex-wrap'>
                    <li><a href="/">accueil</a></li>
                    <li><a href="/portfolio">portfolio</a></li>
                    <li><a href="/contact">contact</a></li>
                </ul>
            </nav>
}