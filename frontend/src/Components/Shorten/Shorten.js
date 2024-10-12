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

    async function shortenLogic(url) {

        // finding if already shortened one
        const res = await axios.post(`http://localhost:6969/url`, {
            originalurl: url
        });
        if (res.status === 200 && res.data.shortened != null) {
            // as can also be shortened by someother user
            handleAddingToUserDB(res.data.shortened, url, res.data.dummyid);
            return res.data.shortened;
        }


        const threelen = generateStr(3);
        const shortened = `http://localhost:6969/r/${threelen}`;
        handleAddingToUserDB(shortened, url, threelen);
        await axios.post('http://localhost:6969/addurl', {
            shortened,
            originalurl: url,
            name: URLname,
            Dummyid: threelen
        })
        return shortened;
    }

    async function handleAddingToUserDB(shortened, url, Dummyid) {
        setShortURL(shortened);

        const response = await axios.patch(`http://localhost:6969/users/${user._id}`, {
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
                    <button className="url-shortener-btn" onClick={() => { shortenLogic(enteredURL) }}>Shorten URL</button>
                </div>
            </div>
            <div className='shortener-bottom'>Long links can often be cumbersome to share, especially on social media platforms or in text messages where space is limited. By using Shorten you can transform lengthy links into concise, easy-to-share versions.</div>
            {shortURL.trim() !== '' &&
                <div className='shorten-output'>{shortURL}
                    {copied ? <FaCheck color="green" className='clipboard-copy' /> : <IoCopy className='clipboard-copy' onClick={copyToClipboard} />}
                </div>
            }
        </div>
    );
}
export default Shorten;