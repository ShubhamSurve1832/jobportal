import React from 'react'

function JobApprovalRow({ data, approveJob, index }) {
//   let { title, createdAt, deadlineDate, recruiterName, totalApplied, reportAddress, noOfHiring, status, companyName, approveAdmin, _id } = data;
//   // console.log(data)
//   return (
//     <tr key={data._id}>
//       <td>
//         <div className='td-title'>
//           <span> {index + 1}.   </span>
//           <h5>{title} - {reportAddress}</h5>
//           {/* <i><img src="/img/job_portal/cross_arrow.svg" /></i> */}
//         </div>
//         {/* <p>Candidates with experience and also freshers can apply having share...</p> */}
//       </td>
//       <td><p>{recruiterName ? recruiterName : 'Not Available'}</p></td>
//       <td><p>{companyName}</p></td>
//       <td>
//         <p className='d-ib radio-field custom-radio fz-20' onClick={() => approveJob(_id, `NotApprovedBtn${_id}`)}> Yes
//           {!approveAdmin ? <input type='checkbox' name='profile' /> : <input type='checkbox' defaultChecked name='profile' />}
//           <span className='checkmark'></span>
//         </p>
//         <p className='d-ib radio-field custom-radio fz-20'> No
//           {!approveAdmin ? <input type='checkbox' defaultChecked id={`NotApprovedBtn${_id}`} name='profile' /> : <input type='checkbox' id={`NotApprovedBtn${_id}`} name='profile' />}
//           <span className='checkmark'></span>
//         </p>
//       </td>
//       <td> {approveAdmin ? <p>Approved</p> : <p style={{ color: "red" }}>Not Approved</p>}</td>
//     </tr>
//   )
}

export default JobApprovalRow