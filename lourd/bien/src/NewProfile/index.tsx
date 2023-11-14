import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookie from 'js-cookie';

import './NewProfile.css'


import Form from "../Form"

export default function NewProfile() {
	const token = Cookie.get('accessToken');
	if (!token)
		//window.location.href = `${process.env.REACT_APP_LOCAL_F}/connect`;
        console.log("pas de token")

	const navigate = useNavigate();

	let [name, setName] = useState("");

	useEffect(() => {
		axios.get(
			'http://localhost:3001/user/getUser',
			{ headers: { "Authorization": `Bearer ${token}` } })
			.then(response => {
				setName(response.data.user.name);
			}).catch(error => {
				if (error.response.status === 401) {
					Cookie.remove('accessToken')
					window.location.href = "/";
				}
			});
	}, [token])

	const handleClick = async () => {
		navigate("/");
	};

	return (
		<div id="menu">
			<div className="box">
				<div id="welcome">WELCOME {name}</div>
				<Form />
				<button id="np_move_on" onClick={handleClick}></button>
			</div>
		</div>
	)
}