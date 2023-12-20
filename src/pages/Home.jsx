import React from "react";
import Draw from "../components/draw";
import moi from "../assets/images/moi.jpg"
import moi2 from "../assets/images/me2.jpg"

function Home() {

  return (
    <React.Fragment>
        <section className="home flex justify-center items-center">
            <div className="home_basic flex justify-between">
                <Draw/>
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
                <div className="w-2/3 description_about">
                    <p><strong className='fontp'>P</strong>assionate about photography, I use my free time to explore the world around me with my camera. I tried my hand at different types 
                    of photography such as landscape photography, street photography, portrait photography or wildlife photography.</p>
                </div>
            </div>
            <div className="m-12 flex justify-between items-center">
                <img src={moi2} alt="moi" />
                <div className="h-2/3 flex justify-around items-center">
                    <div className="w-2/6 description_about">
                        <p><strong className='fontp'>P</strong>assionate about photography, I use my free time to explore the world around me with my camera. I tried my hand at different types 
                        of photography such as landscape photography, street photography, portrait photography or wildlife photography.</p>
                    </div>
                    <div className="arrow-about-bis self-start">
                        <p>about</p>
                    </div>
                </div>
            </div>
        </article>
    </React.Fragment>
  );
}

export default Home;
