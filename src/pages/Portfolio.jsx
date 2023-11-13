import React, { useEffect, useState } from 'react';
import axios from 'axios';

const token = "e98e1b6a60e1cce2296a55b9bbb7a62e16436ddea249e42b733df5df240520867e8a9fa4ee90332b8cc7d1d38b40ef8492a07a60c93e912e2ce184470272893f5e6b65fa3fb6a2c0668e4daedd88dd5fda997e557622a86f784a70fe60d071c9e1d55afd4e6c63b3701142bb694a7bc25d03f6aadcadb1a8edc87019c1c9d5e0"

export default function Portfolio () {

    const [apiPhoto, setApiPhoto] = useState()

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

    console.log(apiPhoto);

    return <div>
        <h1 className="text-5xl m-6">kv pictures</h1>
        <div className='flex'>
            <div className="m-12 w-1/3">
                <h2 className="text-4xl p-5">Project</h2>
                <ul className="p-5">
                    <li>text text</li>
                    <li>text text</li>
                    <li>text text</li>
                    <li>text text</li>
                </ul>
            </div>
            <div className='w-2/3'>
                {apiPhoto ? <div className="grid-container">
                    {apiPhoto.map(photo => (
                        <img key={photo.id} src={`https://my-strapi.kevinlebot.com${photo.attributes.url}`} alt={photo.title} className={photo.attributes.height > photo.attributes.width ? "grid-item" : "large-item"} />
                    ))} </div>
                    : null }
                
            </div>
        </div>
    </div>
}