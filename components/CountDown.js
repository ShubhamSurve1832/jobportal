import React, { useState, useEffect } from 'react';
import moment from 'moment/moment';

const Countdown = ({targetTimeForEvent}) => {

  const now = moment();
  const date = now.format(targetTimeForEvent);
  // console.log(date)

  const calculateTimeLeft = () => {
    const difference = +new Date(date) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    },[],1000);

    return () => clearTimeout(timer);
  });

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div>
      {timeLeft.days > 0 && (
        <h1 className='heading03'>
          {formatTime(timeLeft.days)}d
          {formatTime(timeLeft.hours)}h{' '}
          {formatTime(timeLeft.minutes)}m {formatTime(timeLeft.seconds)}s
        </h1>
      )}
      {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 && (
        <h2 className='heading04'>Countdown finished!</h2>
      )}
    </div>
  );
};

export default Countdown;


// import React, { useEffect, useState } from "react";

// import moment from "moment";









// export const CountdownMonths = ({targetTimeForEvent}) => {

//   let d = new Date(targetTimeForEvent).toLocaleDateString()?.split('/')?.reverse().join('-')
// console.log(d);
//   let Dat = moment(d).format('Y-M-D')?.split('-')
//   Dat[1] < 10 && Dat.splice(1,1,0+""+Dat[1])
//   Dat[2] < 10 && Dat.splice(2,1,0+""+Dat[2])

//   let Time = moment(targetTimeForEvent).format('h:mm:ss')?.split(':')

//   const targetTime = moment(Dat.join('-')+" "+Time?.join(':'));
  
//   const [currentTime, setCurrentTime] = useState(moment());

//   const timeBetween = moment.duration(targetTime.diff(currentTime));




//   useEffect(() => {

//     const interval = setInterval(() => {

//       setCurrentTime(moment());

//     }, 1000);




//     return () => clearInterval(interval);

//   }, []);



//   const {years,months, days, hours, minutes, seconds } = timeBetween._data;

//   if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
//     return (

//       <>
//         <p className="event-live">Event is Live</p>

//       </>

//     );
//   } else {
//     return (

//       <>

//         {/* <p>Deadline comes in</p> */}

//         <p className="counter">

          

//           {/* <span>{timeBetween.years()}y </span> */}

//           {/* <span>{timeBetween.months()}m </span> */}

//           <span>{timeBetween.days()}d </span>

//           <span>{timeBetween.hours()}h </span>

//           <span>{timeBetween.minutes()}min </span>

//           <span>{timeBetween.seconds()}s </span>

//         </p>

//       </>

//     );
//   }

// };

// export default CountdownMonths;