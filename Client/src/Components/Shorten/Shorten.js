import { useState } from 'react';
import './Shorten.css';
import axios from 'axios';
import { useContext } from 'react';
import UserContext from '../../Context/UserContext';
import { IoCopy } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";


function Shorten() {
    const { user, setUser } = useContext(UserContext);
    const [shortURL, setShortURL] = useState('');
    const [enteredURL, setEnteredURL] = useState('');
    const [URLname, setURLname] = useState('');
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');

    async function shortenLogic(url) {
        setError('');
        try {

            if (URLname.trim() === '') throw Error('Please Provide website name');
            if (url.trim() === '') throw Error('Please Provide website URL');
            // finding if already shortened one
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/url`, {
                originalurl: url
            });
            if (res.status === 200 && res.data.shortened != null) {
                // as can also be shortened by someother user

                await handleAddingToUserDB(res.data.shortened, url, res.data.dummyid);
                return setShortURL(res.data.shortened);
            }


            const threelen = generateStr(3);
            const shortened = `${process.env.REACT_APP_API_URL}/r/${threelen}`;
            await axios.post(`${process.env.REACT_APP_API_URL}/addurl`, {
                shortened,
                originalurl: url,
                name: URLname,
                Dummyid: threelen
            })

            setShortURL(shortened);
            await handleAddingToUserDB(shortened, url, threelen);
            return shortened;

        } catch (err) {
            const error = err.response?.data?.error || err.message || 'some error occured';
            setError(error);
        }
    }

    async function handleAddingToUserDB(shortened, url, Dummyid) {

        const response = await axios.patch(`${process.env.REACT_APP_API_URL}/users/${user._id}`, {
            shortened,
            originalurl: url,
            name: URLname,
            Dummyid
        });
        if (response.status === 200) setUser(response.data);
    }

    function generateStr(length) {
        const alphabets = 'abcdefghijklmnopqrstuvwxyz';
        let res = '';

        for (let i = 0; i < length; i++) {
            res += alphabets.charAt(Math.floor(Math.random() * alphabets.length));
        }
        return res;
    }

    function handleChange(e) {
        setEnteredURL(e.target.value);
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(shortURL).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1000);
        });

    }

    return (
        <div className='url-shortener'>
            <div className='shorten-title'>Shotern Your Loong Link</div>
            <div className="url-shortener-div">
                <input placeholder="Enter name of website" className="url-shortener-input" onChange={(e) => setURLname(e.target.value)}></input>
                <input placeholder="Enter url to shorten" className="url-shortener-input" onChange={handleChange}></input>
                <div>
                    <button className="url-shortener-btn" onClick={() => { shortenLogic(enteredURL) }} >Shorten URL</button>
                </div>
            </div>
            <div className='shortener-bottom'>Long links can often be cumbersome to share, especially on social media platforms or in text messages where space is limited. By using Shorten you can transform lengthy links into concise, easy-to-share versions.</div>
            {!error && shortURL.trim() !== '' &&
                <div className='shorten-output'>{shortURL}
                    {copied ? <FaCheck color="green" className='clipboard-copy' /> : <IoCopy className='clipboard-copy' onClick={copyToClipboard} />}
                </div>
            }
            {error && <p className='error'>*{error}</p>}
        </div>
    );
}
export default Shorten;