import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const token = "e98e1b6a60e1cce2296a55b9bbb7a62e16436ddea249e42b733df5df240520867e8a9fa4ee90332b8cc7d1d38b40ef8492a07a60c93e912e2ce184470272893f5e6b65fa3fb6a2c0668e4daedd88dd5fda997e557622a86f784a70fe60d071c9e1d55afd4e6c63b3701142bb694a7bc25d03f6aadcadb1a8edc87019c1c9d5e0"

export default function Portfolio () {

    const [apiPhoto, setApiPhoto] = useState()
    const [selectedPhoto, setSelectedPhoto] = useState(null)
    const wrapperRef = useRef(null);

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

    useEffect(() => {
        (async function () {
            const { data } = await axios.get("https://my-strapi.kevinlebot.com/api/photos?&populate=*", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setApiPhoto(data.data[0].attributes.photos.data)
        })();
    }, [ setApiPhoto])

    function PrevPhoto (photoId) {

        let prevId = 0;

        if (apiPhoto.find(item => item.id === photoId)) {
            prevId = photoId;
        }
        else {
            prevId = apiPhoto[apiPhoto.length-1].id
        }

        setSelectedPhoto(apiPhoto.filter(item => item.id === prevId)[0]);
    }

    function NextPhoto (photoId) {

        let NextId = 0;

        if (apiPhoto.find(item => item.id === photoId)) {
            NextId = photoId;
        }
        else {
            NextId = apiPhoto[0].id
        }

        setSelectedPhoto(apiPhoto.filter(item => item.id === NextId)[0]);
    }

    console.log(apiPhoto);

    return <div className={`portfolio`}>
        <h1 className="text-5xl m-6">kv pictures</h1>
        <div className="portfolio_bloc flex">
            <div className="m-12 w-1/3">
                <h2 className="text-4xl p-5">Project</h2>
                <ul className="p-5">
                    <li>text text</li>
                    <li>text text</li>
                    <li>text text</li>
                    <li>text text</li>
                </ul>
            </div>
            <div className='w-2/3 mr-12 mt-24'>
                {apiPhoto ? <div className="grid-container">
                    {apiPhoto.map(photo => (
                        <img onClick={() => setSelectedPhoto(photo)} key={photo.id} src={`https://my-strapi.kevinlebot.com${photo.attributes.formats.medium.url}`} alt={photo.title} className={photo.attributes.height > photo.attributes.width ? "grid-item" : "large-item"} />
                    ))} </div>
                    : null }
                
            </div>
            {selectedPhoto && (
                <div className="overlay-container flex justify-center items-center">
                    <div ref={wrapperRef} className="overlay_item flex justify-center items-center">
                        <i onClick={() => setSelectedPhoto(null)} className="cross_close_image fa-regular fa-circle-xmark text-4xl text-slate-300 cursor-pointer hover:text-slate-500 p-8"></i>
                        <i onClick={() => PrevPhoto(selectedPhoto.id-1)} className="fa-regular fa-circle-left text-5xl text-slate-300 cursor-pointer hover:text-slate-500 p-8"></i>
                        <img src={`https://my-strapi.kevinlebot.com${selectedPhoto.attributes.formats.large.url}`} alt={selectedPhoto.title} />
                        <i onClick={() => NextPhoto(selectedPhoto.id+1)} className="fa-regular fa-circle-right text-5xl text-slate-300 cursor-pointer hover:text-slate-500 p-8"></i>
                    </div>
                </div>
            )}
        </div>
    </div>
}