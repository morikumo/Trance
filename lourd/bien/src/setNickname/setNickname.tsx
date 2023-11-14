import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import './SetNickname.css';

export default function SetNickname() {
    const navigate = useNavigate();
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const token = urlParams.get('token');
	const [nickname, setNickname] = useState("");
    const [used, setUsed] = useState(false);
    const [regex, setRegex] = useState(false);

	const handleChange = (event) => {
		setNickname(event.target.value);
	};

	const handleEnable = async (e) => {
		e.preventDefault();
		await axios.patch(`http://localhost:3001/auth/checkNickname`, {nickname, token}, { withCredentials: true })
			.then(response => {
				navigate('/newprofile');
				window.location.reload();
			})
			.catch(err => {
				// if (err.response.status === 401) {
                //     Cookie.remove('accessToken')
                //     window.location.href = "/";
                // }
                if (err.response.data.message === "wrong regex")
                {
                    setUsed(false);
                    setRegex(true);
                }
                else if (err.response.data.message === "already used")
                {
                    setUsed(true);
                    setRegex(false);
                }
			});
	}

	return (
        <div id="SetNickName">
            <div id="SetNickName-truc">
                <form onSubmit={handleEnable} id="SetNickName-form">
                </form>
                <div className="setNick_good_nickname_or_not">
                    {used && <div>Nickname deja utilise !</div>}
                    {regex && <div>Nickname invalide ! Min: 2 - Max: 20, lettres, chiffres, espace, tiret, _</div>}
                </div>       
            </div>
        </div>
	)
}