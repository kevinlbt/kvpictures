import React, { useState } from "react";
import NavBar from "../components/navbar";
import axios from 'axios';
import DOMPurify from 'dompurify';
import Cookies from 'js-cookie';

const AUTH_TOKEN = "ZXOoRm5oxtAcGNbGMyHI7NJpIeZzaqdFNteUa0KM";

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

export default function Contact () {

    const cookieExists = Cookies.get('contacted');
    const [IfMailSend, setIfMailSend] = useState(false);
    const [mailResponse, setMailResponse] = useState(null);
    const [ifError, setIfError] = useState(false);
    const [firstname, setFirstname] = useState('');
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const [replyTo, setReplyTo] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!replyTo || !name || !text || !subject || !firstname ) {
        setMailResponse("Veuillez remplir tous les champs.");
        setIfMailSend(true);
        setIfError(true);
        return;
        }
        if (!isValidEmail(replyTo)) {
        setMailResponse("Veuillez saisir une adresse email valide");
        setIfMailSend(true);
        setIfError(true);
        return;
        }

        if (cookieExists) {
        setMailResponse('Vous nous avez deja contacter, essayer plus tard.');
        setIfMailSend(true);
        setIfError(true);
        return;
        }

        const sanitizeFirstname = DOMPurify.sanitize(firstname);
        const sanitizeName = DOMPurify.sanitize(name);
        const sanitizeSubject = DOMPurify.sanitize(subject);
        const sanitizeText = DOMPurify.sanitize(text);
        const sanitizeReplyTo = DOMPurify.sanitize(replyTo);

        const data = {
        firstname: sanitizeFirstname,
        name: sanitizeName,
        subject: sanitizeSubject,
        text: sanitizeText,
        replyTo: sanitizeReplyTo
        };

        try {
        const response = await axios.post('https://email.api.kevinlebot.com/api/sendEmail', data, {
            headers: {
            'authorization': AUTH_TOKEN,
            'dest': "kevin.lebot@gmail.com",
            }
        });
        setIfError(false);
        setIfMailSend(true)
        setMailResponse(response.data)
        Cookies.set('contacted', true, { expires: 1 });
        } catch (error) {
        console.error(error);

        }
    };

    function HandleFirstnameChange(e) {
        setFirstname(e.target.value);
    }
    function HandleNameChange(e) {
        setName(e.target.value);
    }
    function HandleEmailChange(e) {
        setReplyTo(e.target.value);
    }
    function HandleSubjectChange(e) {
        setSubject(e.target.value);
    }
    function HandleMessageChange(e) {
        setText(e.target.value);
    }

    return <section className="contact" id="contact">
                <NavBar />

                <h3 className="ml-12"><strong className="contact_title pr-2">C</strong>ontacter - moi</h3>

                <div className="contact_form">  
                    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center formulaire w-2/3 lg:w-2/5 lg:pt-8 mx-auto m-12" >
                        <input onChange={HandleNameChange} type="text" name="name" placeholder=" nom" className="w-full rounded-md py-1.5 focus:ring-4 focus:ring-gray-500" />
                        <input onChange={HandleFirstnameChange} type="text" name="firstname" placeholder=" prénom" className="w-full rounded-md py-1.5 focus:ring-4 focus:ring-gray-500" />
                        <input onChange={HandleEmailChange} type="email" name="email" placeholder=" Email" className="w-full rounded-md py-1.5 focus:ring-4 focus:ring-gray-500" />
                        <input onChange={HandleSubjectChange} type="text" name="subject" placeholder=" Sujet" className="w-full rounded-md py-1.5 focus:ring-4 focus:ring-gray-500" />
                        <textarea onChange={HandleMessageChange} name="message" rows="7" className="w-full rounded-md py-1.5 focus:ring-4 focus:ring-gray-500"></textarea>
                        <button className="m-8" type="submit">
                            <span>Envoyer</span>
                        </button>
                        {IfMailSend ? <p className={`text-3xl text-center h-9 ${ifError ? "text-red-500" : "text-green-500"}`}>{mailResponse}</p> : <p className="h-9"></p>}
                    </form>
                </div>  

            </section>
}
