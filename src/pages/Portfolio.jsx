import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import NavBar from '../components/navbar';
import Footer from "../components/Footer";

const token = import.meta.env.VITE_BACK_TOKEN

export default function Portfolio () {

    const [allPhoto, setAllPhoto] = useState()
    const [projectPhotoSelected, setProjectPhotoSelected] = useState();
    const [projectTitle, setProjectTitle] = useState();
    const [selectedPhoto, setSelectedPhoto] = useState(null)
    const wrapperRef = useRef(null);
    const [transitionName, setTransitionName] = useState();

    useOutsideRemoveModal(wrapperRef);

    function useOutsideRemoveModal(ref) {
        useEffect(() => {
        
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setSelectedPhoto(null);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const childFactoryCreator = (classNames) => (
        (child) => (
          React.cloneElement(child, {
            classNames
          })
        )
    );

    useEffect(() => {
        (async function () {
            const { data } = await axios.get("https://my-strapi.kevinlebot.com/api/photos?&populate=*", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAllPhoto(data.data);
            setProjectPhotoSelected(data.data[0])
            setProjectTitle([])
            const titles = data.data.map(item => ({titre:item.attributes.titre,id: item.id}));
            setProjectTitle(titles);
        })();
    }, [ setAllPhoto ])

    function PrevPhoto () {
 
        const allPhotoFromSelectedProject = projectPhotoSelected.attributes.photos.data;

        setTransitionName("fade")
        let prevId = 0;

        if (allPhotoFromSelectedProject.indexOf(selectedPhoto) !== 0) {

            prevId = allPhotoFromSelectedProject.indexOf(selectedPhoto) -1;
        }
        else {
            prevId = allPhotoFromSelectedProject.length-1
        }
  
        setSelectedPhoto(allPhotoFromSelectedProject[prevId]);

    }

    function NextPhoto () {

        const allPhotoFromSelectedProject = projectPhotoSelected.attributes.photos.data;

        setTransitionName("fadeout")
        let NextId = 0;

        if (allPhotoFromSelectedProject.indexOf(selectedPhoto) !== allPhotoFromSelectedProject.length - 1) {

            NextId = allPhotoFromSelectedProject.indexOf(selectedPhoto) + 1;
        }
        else {
            NextId = 0;
        }
        
        setSelectedPhoto(allPhotoFromSelectedProject[NextId]);
    }

    function handleChangeSelectedProject (id) {

        const newProjet = allPhoto.find(item => item.id === id)
        setProjectPhotoSelected(newProjet);
    }


    return <React.Fragment>
        <NavBar />
        <div className="portfolio">
            <div className="portfolio_bloc flex flex-col sm:flex-row">
                <div className="m-5 lg:m-12 sm:w-1/3">
                    <h2 className="text-5xl sm:text-4xl p-5">Projects</h2>
                    <ul className="lg:p-5 text-center sm:text-left">
                        {projectTitle ? projectTitle.map(titre => (
                            <li onClick={() => handleChangeSelectedProject(titre.id)} className={`cursor-pointer ${projectPhotoSelected.id === titre.id ? "selected_projet" : "not_selected"}`} key={titre.id}>{titre.titre}</li>
                        )): null}
                    </ul>
                </div>
                <div className='mx-auto w-4/5 sm:w-3/5 lg:w-2/3 sm:mr-5 lg:mr-12 sm:mt-24 lg:mt-32 mb-12'>
                    {projectPhotoSelected ? <div className="grid-container">
                        {projectPhotoSelected.attributes.photos.data.map(photo => (
                            <div key={photo.id} className={photo.attributes.height > photo.attributes.width ? "grid-item" : "large-item"}>
                                <img onClick={() => setSelectedPhoto(photo)} src={`https://my-strapi.kevinlebot.com${photo.attributes.formats.medium.url}`} alt={photo.title}/>
                            </div>
                        ))} </div>
                        : null }  
                </div>
                
                {selectedPhoto && (
                    
                    <div className="overlay-container flex justify-center items-center">
                            <div ref={wrapperRef} className={`overlay_item flex flex-col sm:flex-row justify-center items-center`}>
                                <p className='index_pages text-2xl text-white'> {projectPhotoSelected.attributes.photos.data.indexOf(selectedPhoto)+1} / {projectPhotoSelected.attributes.photos.data.length} </p>
                                <i onClick={() => setSelectedPhoto(null)} className="cross_close_image fa-regular fa-circle-xmark text-4xl text-slate-300 cursor-pointer hover:text-slate-500 p-8"></i>
                                <i onClick={() => PrevPhoto()} className="fa-regular fa-circle-left text-5xl text-slate-300 cursor-pointer hover:text-slate-500 p-8"></i>
                                <TransitionGroup
                                    childFactory={childFactoryCreator(transitionName === "fade" ? "fade" : "fadeout")}
                                >
                                    <CSSTransition
                                        in={selectedPhoto !== null}
                                        appear={true}
                                        key={selectedPhoto.id}
                                        timeout={300}
                                        classNames={transitionName === "fade" ? "fade" : "fadeout"}
                                        unmountOnExit
                                    >   
                                        <img src={`https://my-strapi.kevinlebot.com${selectedPhoto.attributes.url}`} alt={selectedPhoto.title} />                   
                                    </CSSTransition>
                                </TransitionGroup>
                                <i onClick={() => NextPhoto()} className="fa-regular fa-circle-right text-5xl text-slate-300 cursor-pointer hover:text-slate-500 p-8"></i>
                            </div>
                    </div>
                )}
            </div>
        </div>
        <div className='flex items-center mx-12 mb-12'>
            <i onClick={() => window.scrollTo(top)} className="fa-solid fa-up-long text-5xl cursor-pointer hover:-translate-y-2 duration-200"></i>
            <p className='pl-7'>back to top</p>
        </div>
        <Footer />
    </React.Fragment>
}