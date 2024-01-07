import React from "react";

const CandidateJobProcess = () => {
  return (
    <>
      <div className="process-row">
        <div className="process-box">
          <dl className="active">
            <dt>Upload CV</dt>
            <dd>1</dd>
          </dl>
          <dl>
            <dt>Basic Information</dt>
            <dd>2</dd>
          </dl>
          <dl>
            <dt>Education</dt>
            <dd>3</dd>
          </dl>
          <dl>
            <dt>Work Experience</dt>
            <dd>4</dd>
          </dl>
          <dl>
            <dt>Certifications and Skills</dt>
            <dd>5</dd>
          </dl>
          <dl>
            <dt>Confirm</dt>
            <dd>6</dd>
          </dl>
        </div>
      </div>
    </>
  );
};

export default CandidateJobProcess;
