import React from "react";
import Draw from "../components/draw";
import moi from "../assets/images/moi.webp"
import moi2 from "../assets/images/me2.webp"
import Footer from "../components/Footer"

function Home() {

  return (
    <React.Fragment>
        <section className="home flex justify-center items-center">
            <div className="home_basic flex flex-col lg:flex-row lg:justify-between">
                <div className="flex flex-col">
                    <h1><strong className='fonth1'>KV</strong><strong className='fonth1bis'>Pictures</strong></h1>
                    <p>Photographer</p>
                    <Draw/>
                </div>
                <div className="flex flex-col items-center justify-evenly lg:mr-24">
                    <ul className='navbis flex justify-center items-center mb-12 mt-8'>
                        <li><a href="/portfolio">Portfolio</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                    <div className="flex flex-col sm:flex-row lg:flex-col justify-between items-center">
                        <img className="me" src={moi} alt="moi" />
                        <blockquote className="text-center mt-4 lg:m-2">“Photography is the art of capturing the soul of a moment.”</blockquote>
                    </div>
                </div>
            </div>
        </section>
        <article className="about w-4/5 lg:w-2/3 m-auto">
            <h2>a<stong className='fonth2'>B</stong>out</h2>
            <div className="flex justify-between">
                <div className="arrow-about">
                    <p>about</p>
                </div>
                <div className="lg:w-2/3 description_about">
                    <p><strong className='fontp'>P</strong>assionate about photography, I use my free time to explore the world around me with my camera. I tried my hand at different types 
                    of photography such as landscape photography, street photography, portrait photography or wildlife photography.</p>
                </div>
            </div>
            <div className="my-16 flex flex-col sm:flex-row justify-between items-center">
                <img src={moi2} alt="moi" />
                <Draw/>
                <div className="h-2/3 flex justify-around items-center">
                    <div className="w-5/6 lg:w-3/6 description_about mt-5 sm:ml-5">
                        <p><strong className='fontp'>I</strong> discovered photography during my trip to Australia where I bought my first camera and my first lenses. 
                        It was immediately easy for me to take photos and above all it was obvious and a pleasure to do so.</p>
                    </div>
                    <div className="arrow-about-bis self-start mt-5">
                        <p>about</p>
                    </div>
                </div>
            </div>
        </article>
        <Footer />
    </React.Fragment>
  );
}

export default Home;
