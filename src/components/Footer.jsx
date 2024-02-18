export default function Footer () {

    return <footer className="flex flex-col sm:flex-row justify-between items-center border-t border-slate-800 mx-12">
        <h1 className="flex flex-row justify-center items-center"><strong className='fonth1'>KV</strong><strong className='fonth1bis'>Pictures</strong></h1>
        <ul className='flex flex-row justify-start items-center m-5'>
            <li className="p-3"><a href="/">accueil</a></li>
            <li className="p-3"><a href="/portfolio">portfolio</a></li>
            <li className="p-3"><a href="/contact">contact</a></li>
        </ul>
    </footer>
}