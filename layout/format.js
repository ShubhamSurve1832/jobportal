

import { useEffect } from "react"



export default function format({ children }) {

	useEffect(()=>{
		(window.onbeforeunload = () =>{
			return window.scrollTo(0,0);
		})();

	},[])

	return (
		<>
			<div id="page-container">
				<main className='main' id='main'>{children}</main>
			</div>
		</>
	)
}