import React, { createContext, useContext, useState } from 'react';
import styles from '../../styles/Resume.module.css'; // adjust the path according to your project structure
import data from '../../utils/data/json/resume.json';

interface JobTitle {
  name: string;
  titles: string[];
}

interface ImgArea {
  imgSrc: string;
}

interface Social {
  linkedin: string;
  email: string;
  phone: string;
  location: string;
}

interface Header {
  jobTitle: JobTitle;
  imgArea: ImgArea;
  social: Social;
}

interface Detail {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  duration: string;
  details: string[];
}

interface Education {
  degree: string;
  field: string;
  school: string;
  duration: string;
}

interface ResumeProjectProps {
  projectName: string;
  projectYear: number;
  overall: string;
  domain: string;
  techStack: string[];
}

interface Resume {
  header: Header;

  main: {
    left: {
      Experience: Detail[];
    };
    right: {
      Education: Education[];
      Language: string;
      Award: string[];
      Skill: string[];
    };
  };
}

const Resume = () => {
  return (
    <div>
      <div className={styles.container} id="resume">
        <div className={styles.header}>
          <section className={styles.jobTitle}>
            <h2>{data.personal.name}</h2>
            {data.personal.work.map((title, index) => (
              <h3 key={index}>{title}</h3>
            ))}
          </section>

          <section className={styles.imgArea}>
            <img src={data.personal.imgSrc} alt="" />
          </section>

          <section className={styles.social}>
            <p>{data.personal.social.linkedin}<i className="fa-brands fa-linkedin-in"></i></p>
            <p>{data.personal.social.email}<i className="fa fa-envelope" aria-hidden="true"></i></p>
            <p>{data.personal.social.phone}<i className="fa fa-phone"></i></p>
            <p>{data.personal.social.location}<i className="fa fa-map-marker" aria-hidden="true"></i></p>
          </section>
        </div>

        <div className={styles.main}>
          <div className={styles.left}>
            <h2>Experience</h2>
            {data.experience.map((job, index) => {
              const startDate = new Date(job.startDate);
              let endDate = new Date(); // Default to current date

              if (job.endDate !== 'Present') {
                endDate = new Date(job.endDate);
              }

              const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
              const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
              const diffMonths = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30));

              const yearString = diffYears > 1 ? `${diffYears} years` : diffYears === 1 ? `${diffYears} year` : '';
              const monthString = diffMonths > 1 ? `${diffMonths} months` : diffMonths === 1 ? `${diffMonths} month` : '';

              const duration = [yearString, monthString].filter(Boolean).join(', ');

              return (
                <div key={index}>
                  <h3>{job.title}</h3>
                  <p>{job.company}</p>
                  <p>{job.startDate} - {job.endDate} ({duration})</p>
                  <ul>
                    {job.projectList.map((project, i) => (
                      <li key={i}>
                        <a href={`#project-${i + 1}`}>{project.projectName}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className={styles.right} >
            <h2>Education</h2>
            {data.education.map((education, index) => (
              <div key={index}>
                <h3>{education.degree}</h3>
                <p>{education.field}</p>
                <p>{education.school}</p>
                <p>{education.duration}</p>
              </div>
            ))}
            <h3>Language</h3>
            <p>{data.language}</p>
            <h2>Award</h2>
            <ul>
              {data.award.map((award, index) => (
                <li key={index}>{award}</li>
              ))}
            </ul>
            <h2>Skill</h2>
            <ul className={styles.skill}>
              {data.skill.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className={styles.container} id="project">
          <div className={styles.project}>
            <h1>Project Detail</h1>
            {data.experience.map((job, jobIndex) => (
              job.is_highlight && (
                <div key={jobIndex}>
                  <h2>{job.title}</h2>
                  <p>{job.company} ({job.startDate} - {job.endDate})</p>
                  {job.projectList.map((project, projectIndex) => (
                    <div key={projectIndex}>
                      <div className={styles.detail}>
                        <h4 id={`project-${projectIndex + 1}`}>{projectIndex + 1}. {project.projectName} ({project.projectYear})</h4>
                        <ul>
                          <li>Overall: {project.overall}</li>
                          <li>Domain: {project.domain}</li>
                          <li>Techstack: {project.techStack.join(", ")}</li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;