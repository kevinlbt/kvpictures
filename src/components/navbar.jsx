
export default function NavBar () {

    return <nav className="flex justify-between items-center">
                <h1 className="flex flex-col sm:flex-row justify-center items-center"><strong className='fonth1'>KV</strong><strong className='fonth1bis'>Pictures</strong></h1>
                <ul className='navbar flex justify-center items-center flex-wrap'>
                    <li><a href="/">Home</a></li>
                    <li><a href="/portfolio">Portfolio</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
}