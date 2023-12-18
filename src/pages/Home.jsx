import React from "react";
import moi from "../assets/images/moi.jpg"

function Home() {

  return (
    <React.Fragment>
        <section className="home flex justify-center items-center">
            <div className="home_basic flex justify-between">
                <div className="flex flex-col">
                    <h1><strong className='fonth1'>KV</strong><strong className='fonth1bis'>Pictures</strong></h1>
                    <p>Photographer</p>
                    <div className="group">
                        <div className="overlap-group">
                            <div className="ellipse" />
                            <div className="ellipse-1" />
                            <div className="ellipse-2" />
                            <div className="ellipse-3" />
                            <div className="ellipse-4" />
                            <div className="ellipse-5" />
                            <div className="ellipse-6" />
                            <div className="ellipse-7" />
                            <div className="ellipse-8" />
                            <div className="rectangle" />
                        </div>
                        <div className="ellipse-9" />
                        <div className="ellipse-10" />
                        <div className="ellipse-11" />
                        <div className="ellipse-12" />
                        <div className="ellipse-13" />
                        <div className="ellipse-14" />
                        <div className="ellipse-15" />
                        <div className="ellipse-16" />
                        <div className="ellipse-17" />
                        <div className="ellipse-18" />
                        <div className="ellipse-19" />
                        <div className="ellipse-20" />
                        <div className="ellipse-21" />
                        <div className="ellipse-22" />
                        <div className="ellipse-23" />
                        <div className="ellipse-24" />
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <ul className='navbis flex justify-center items-center'>
                        <li><a href="/">accueil</a></li>
                        <li><a href="/portfolio">portfolio</a></li>
                        <li>contact</li>
                    </ul>
                    <img className="me" src={moi} alt="moi" />
                    <blockquote className="text-center m-2">“Photography is the art of capturing the soul of a moment.”</blockquote>
                </div>
            </div>
        </section>
        <article className="about w-2/3 m-auto">
            <h2>a<stong className='fonth2'>B</stong>out</h2>
            <div className="flex justify-between">
                <div className="arrow-about">
                    <p>about</p>
                </div>
                <div className="w-2/3">
                    <p><strong>p</strong>assionate about photography, I use my free time to explore the world around me with my camera. I tried my hand at different types 
                    of photography such as landscape photography, street photography, portrait photography or wildlife photography.</p>
                </div>
            </div>
        </article>
    </React.Fragment>
  );
}

export default Home;
