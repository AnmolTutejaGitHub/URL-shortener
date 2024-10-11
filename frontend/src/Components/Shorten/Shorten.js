import { useState } from 'react';
import './Shorten.css';
import ShortenOutput from './ShortenOutput';
import axios from 'axios';
import { useContext } from 'react';
import UserContext from '../../Context/UserContext';

function Shorten() {
    const { user, setUser } = useContext(UserContext);
    const [shortURL, setShortURL] = useState('');
    const [URLArr, setURLArr] = useState([]);
    const [enteredURL, setEnteredURL] = useState('');
    const [URLname, setURLname] = useState('');

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
        setURLArr([...URLArr, shortened]);

        const response = await axios.patch(`http://localhost:6969/users/${user._id}`, {
            shortened,
            originalurl: url,
            name: URLname,
            Dummyid
        });
        if (response.status === 200) setUser(response.data);
    }


    const renderURLs = URLArr.map((url, index) => (
        <ShortenOutput key={index} url={url} />
    ));

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

    return (
        <div className='url-shortener'>
            <div className="url-shortener-div">
                <input placeholder="Enter name of website" className="url-shortener-input" onChange={(e) => setURLname(e.target.value)}></input>
                <input placeholder="Enter url to shorten" className="url-shortener-input" onChange={handleChange}></input>
                <div>
                    <button className="url-shortener-btn" onClick={() => { shortenLogic(enteredURL) }}>Shorten URL</button>
                </div>
            </div>
            <div>{renderURLs}</div>
        </div>
    );
}
export default Shorten;