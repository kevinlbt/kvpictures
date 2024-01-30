import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import NavBar from '../components/navbar';

const token = "e98e1b6a60e1cce2296a55b9bbb7a62e16436ddea249e42b733df5df240520867e8a9fa4ee90332b8cc7d1d38b40ef8492a07a60c93e912e2ce184470272893f5e6b65fa3fb6a2c0668e4daedd88dd5fda997e557622a86f784a70fe60d071c9e1d55afd4e6c63b3701142bb694a7bc25d03f6aadcadb1a8edc87019c1c9d5e0"

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

    function PrevPhoto (photoId) {
 
        const photoSelected = projectPhotoSelected.attributes.photos.data;

        setTransitionName("fadeout")
        let prevId = 0;

        if (photoSelected.find(item => item.id === photoId)) {
            prevId = photoId;
        }
        else {
            prevId = photoSelected[photoSelected.length-1].id
        }

        
        setSelectedPhoto(photoSelected.filter(item => item.id === prevId)[0]);  
    }

    function NextPhoto (photoId) {

        const selectedPhoto = projectPhotoSelected.attributes.photos.data;

        setTransitionName("fade")
        let NextId = 0;

        if (selectedPhoto.find(item => item.id === photoId)) {
            NextId = photoId;
        }
        else {
            NextId = selectedPhoto[0].id
        }
        
        setSelectedPhoto(selectedPhoto.filter(item => item.id === NextId)[0]);
    }

    function handleChangeSelectedProject (id) {

        const newProjet = allPhoto.find(item => item.id === id)
        setProjectPhotoSelected(newProjet);
    }

    return <React.Fragment>
        <NavBar />
        <div className="portfolio">
            <div className="portfolio_bloc flex">
                <div className="m-12 w-1/3">
                    <h2 className="text-4xl p-5">Projects</h2>
                    <ul className="p-5">
                        {projectTitle ? projectTitle.map(titre => (
                            <li onClick={() => handleChangeSelectedProject(titre.id)} className={`cursor-pointer ${projectPhotoSelected.id === titre.id ? "selected_projet" : "not_selected"}`} key={titre.id}>{titre.titre}</li>
                        )): null}
                    </ul>
                </div>
                <div className='w-2/3 mr-12 mt-32 mb-12'>
                    {projectPhotoSelected ? <div className="grid-container">
                        {projectPhotoSelected.attributes.photos.data.map(photo => (
                            <img onClick={() => setSelectedPhoto(photo)} key={photo.id} src={`https://my-strapi.kevinlebot.com${photo.attributes.formats.medium.url}`} alt={photo.title} className={photo.attributes.height > photo.attributes.width ? "grid-item" : "large-item"} />
                        ))} </div>
                        : null }  
                </div>
                
                {selectedPhoto && (
                    
                    <div className="overlay-container flex justify-center items-center">
                            <div ref={wrapperRef} className={`overlay_item flex justify-center items-center`}>
                                <p className='index_pages text-2xl text-white'> {projectPhotoSelected.attributes.photos.data.indexOf(selectedPhoto)+1} / {projectPhotoSelected.attributes.photos.data.length} </p>
                                <i onClick={() => setSelectedPhoto(null)} className="cross_close_image fa-regular fa-circle-xmark text-4xl text-slate-300 cursor-pointer hover:text-slate-500 p-8"></i>
                                <i onClick={() => PrevPhoto(selectedPhoto.id-1)} className="fa-regular fa-circle-left text-5xl text-slate-300 cursor-pointer hover:text-slate-500 p-8"></i>
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
                                <i onClick={() => NextPhoto(selectedPhoto.id+1)} className="fa-regular fa-circle-right text-5xl text-slate-300 cursor-pointer hover:text-slate-500 p-8"></i>
                            </div>
                    </div>
                )}
            </div>
        </div>
    </React.Fragment>
}