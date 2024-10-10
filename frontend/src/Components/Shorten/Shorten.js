import { useState } from 'react';
import './Shorten.css';
import ShortenOutput from './ShortenOutput';

function Shorten() {
    const [shortURL, setShortURL] = useState('');
    const [URLArr, setURLArr] = useState([]);
    const [enteredURL, setEnteredURL] = useState('');

    function shortenLogic(url) {
        const threelen = generateStr(3);
        const twolen = generateStr(2);

        const shortened = `https://${threelen}/${twolen}`;
        setShortURL(shortened);
        setURLArr([...URLArr, shortened])

        // map and put in database left

        return shortened;
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