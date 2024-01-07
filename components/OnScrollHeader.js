import React, { useState, useEffect, useRef } from 'react'

function useScrollDirection() {
	const [scrollDirection, setScrollDirection] = useState(null);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (direction !== scrollDirection && (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    }
  }, [scrollDirection]);

  return scrollDirection;

};
export default function Header() {

	// when scroll event start after window scorlltop 100
	// const [addClass, setAddClass] = useState()
	// const scrollEvent = () => {
	// 	if(window.scrollY > 100){
	// 		setAddClass("active")
	// 	} else{
	// 		setAddClass(" ")
	// 	}
	// }

	// useEffect(() => {
	// 	window.addEventListener("scroll", scrollEvent)
	// })


	// when scroll event start after window scorlltop equal to header height
	// const [addClass, setAddClass] = useState()
	// const headRef = useRef()
		
	// useEffect(() => {
	// 	const scrollEvent = () => {
	// 		if(window.scrollY > 220 ){
	// 			setAddClass("active")
	// 		} else if(window.pageYOffset < 220 ){
	// 			setAddClass("")
	// 		}
	// 	}
	// 	window.addEventListener("scroll", scrollEvent)
	// })




const scrollDirection = useScrollDirection();

	return (

	<>
		<header id="header" className={`header ${ scrollDirection === "down" ? "active" : " "}`}>
			<div className="top-header"> Top Header </div>
			<div className="middle-header"> Middle Header </div>
			<div className="bottom-header"> Bottom Header </div>
		</header>
		<div className="wrapper p-50">
			<p>Lorem ipsum, dolor sit amet consectetur, adipisicing elit. Cumque odit pariatur voluptate rerum, repellat corporis harum cupiditate, earum necessitatibus eligendi dolorem aperiam optio. Molestiae harum, soluta saepe nobis necessitatibus, vitae.</p>
			<p>Lorem ipsum, dolor sit amet consectetur, adipisicing elit. Cumque odit pariatur voluptate rerum, repellat corporis harum cupiditate, earum necessitatibus eligendi dolorem aperiam optio. Molestiae harum, soluta saepe nobis necessitatibus, vitae.</p>
			<p>Lorem ipsum, dolor sit amet consectetur, adipisicing elit. Cumque odit pariatur voluptate rerum, repellat corporis harum cupiditate, earum necessitatibus eligendi dolorem aperiam optio. Molestiae harum, soluta saepe nobis necessitatibus, vitae.</p>
		</div>
	</>

	)
}
