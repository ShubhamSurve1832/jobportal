import { useState } from 'react';
// import { Document, Page } from 'react-pdf';
// import { RxCross1 } from "react-icons/rx";
// import ReactDOM from 'react-dom';
import {Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { pdfjs } from 'react-pdf';


const ModalExample = ({ ShowResume,closePoup,pdfTitle }) => {
    console.log(ShowResume,pdfTitle)
    // const extension = ShowResume.split('.').pop();
    // console.log("extension",extension)
    const [shown, setShown] = useState(false);

    return (
        <>
            <p
               className='btn maroon-border-btn next-btn'
                onClick={() => setShown(true)}
            >
                View CV
            </p>
            {shown && (
                 <div
                 style={{
                     backgroundColor: '#fff',
                     flexDirection: 'column',
                    //  overflow: 'hidden',
     
                     /* Fixed position */
                     left: 0,
                     position: 'fixed',
                     top: 0,
     
                     /* Take full size */
                     height: '100%',
                     width: '100%',
     
                     /* Displayed on top of other elements */
                    zIndex: 9999,
                    display: 'flex',
                 
                    overflow: 'hidden',

                 }}
             >
                 <div
                     style={{
                         alignItems: 'center',
                         backgroundColor: '#fff',
                         color: '#000',
                         display: 'flex',
                         padding: '.5rem 5rem',
                         margin:'3rem 0'
                     }}
                 >
                     <p className='title01' style={{ marginRight: 'auto', fontSize:'3rem' }}>{pdfTitle}</p>
                     <p
                        className='downloadbtn cms-btn edit-box add-btn pointer'
                         onClick={() => setShown(false)}
                         style={{marginBottom:"0"}}
                     >
                         Close
                     </p>
                 </div>
                 <div className='resume-view'>
                     <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
                     <Viewer fileUrl={ShowResume} />
                     </Worker>
                 </div>
             </div>
                )}
        </>
    );
};

export default ModalExample;











// const Resume  = ({ShowResume,closePoup}) => {
//     console.log(ShowResume)
//     const [width, setWidth] = useState(800);
//     const [numPages, setNumPages] = useState();

//     const onDocumentLoadSuccess = ({ numPages }) => {
//         setNumPages(numPages);
//       };

//     //   const resumeLink =  "https://raw.githubusercontent.com/Ruturajwork/resume/main/updatedRuturajResume.pdf";
    
//   return (
//     <>
//       <div className="overlay jobportal-overlay"></div>
//     <div className='notificationPopup SimandharInterviewForm'>
//       <div className="popheading text-center">
//             <p>Simandhar Interview Form</p>
//             <p className="closeicon pointer" onClick={() => closePoup()}>
//               <RxCross1 />
//             </p>
//           </div>
//           <iframe src={ShowResume} frameborder="0"></iframe>
//       {/* <Document file="https://codegify.s3.ap-south-1.amazonaws.com/document/shubham_surve_resume.pdf" onLoadSuccess={onDocumentLoadSuccess}>
//         <Page  />
//     </Document> */}
      
//     </div>
//     </>
//   );
// }

// export default Resume