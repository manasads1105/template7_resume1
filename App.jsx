import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Resume from "./components/Resume";
import html2pdf from "html2pdf.js";

function App() {
  const [font, setFont] = useState("font-sans");
  const [isEditing, setIsEditing] = useState(true);
  const [theme, setTheme] = useState("light");
  const [profileImage, setProfileImage] = useState(null);

  const [resumeData, setResumeData] = useState({
    name: "Manasa D S",
    contact:
      "manasads939@gmail.com | linkedin.com/in/manasads | GitHub: manasads1105",
    objective:
      "To work in a challenging environment that allows me to apply my technical and interpersonal skills, continuously learn new technologies, and contribute meaningfully to innovative projects in a growth-oriented organization.",
    education: [
      "Bachelor of Technology in Computer Science & Engineering, PES University, Bangalore (2021–2025) – CGPA: 8.7",
      "Pre-University (PCMB), Smt. Allum Sumangalamma Memorial PU College, Chikkaballapur (2019–2021) – Percentage: 89%",
      "SSLC, SFS Public School, Chikkaballapur (2019) – Percentage: 94%",
    ],
    projects: [
      "Fire, Smoke, and Gas Detector Alarm using Arduino – Built a sensor-based detection system for real-time alerts using buzzer & LEDs.",
      "Portfolio Website – Personal site using HTML, CSS, and JavaScript showcasing projects and contact form.",
      "Weather App – Built using React.js and OpenWeather API, allowing users to check real-time weather conditions.",
      "IoT Fire, Smoke, and Gas Detector – Built an Arduino-based safety system using MQ2 sensor, buzzer, and LEDs.",
      "Portfolio Website – Personal site using HTML, CSS, and JavaScript showcasing resume and projects.",
      "E-Commerce Frontend – Designed a shopping UI with React, Tailwind CSS, and Redux for cart state management.",
      "Student Result Portal – Developed a full-stack CRUD system using Node.js, Express, and MongoDB.",
      "Chat Application – Real-time chat using Socket.io and Node.js for peer-to-peer messaging.",
    ],
    experience: [
      "Web Development Intern – ABC Tech (June 2024 – Aug 2024) – Developed responsive UI components and integrated REST APIs.",
      "Freelance Frontend Developer (2023–Present) – Delivered 6+ static and dynamic websites for startups and NGOs.",
      "Campus Technical Assistant – PES University (Jan 2023 – Dec 2023) – Supported student projects, managed lab equipment and Arduino workshops.",
      "Open Source Contributor – Participated in Hacktoberfest 2023, contributed bug fixes and documentation to React projects.",
    ],
    skills: [
      "HTML", "CSS", "JavaScript", "React.js",
      "Tailwind CSS", "Node.js", "Express.js",
      "MongoDB", "MySQL", "Python", "Git & GitHub",
    ],
    interests: [
      "Singing", "Sketching", "Cooking", "Farming",
      "UI/UX Design", "Blog Writing", "Public Speaking",
    ],
  });

  const handleFieldChange = (key, value) => {
    setResumeData((prev) => ({ ...prev, [key]: value }));
  };

  const handleDownload = () => {
    const element = document.getElementById("resume");
    if (!element) {
      alert("Resume not found!");
      return;
    }
    html2pdf().from(element).save("resume.pdf");
  };

  const handleSave = () => {
    const element = document.getElementById("resume");
    if (!element) {
      alert("Resume not found!");
      return;
    }
    html2pdf().from(element).save("resume-saved.pdf");
  };

  const handleAIEnhance = (section) => {
    const updates = {
      education: [
        "B.Tech in Computer Science, PES University (2025) – CGPA: 8.7",
        "PU in PCMB, SAM PU College (2021) – 89%",
        "SSLC, SFS Public School (2019) – 94%",
      ],
      projects: [
      "IoT Fire, Smoke, and Gas Detector – Built an Arduino-based safety system using MQ2 sensor, buzzer, and LEDs.",
      "Portfolio Website – Personal site using HTML, CSS, and JavaScript showcasing resume and projects.",
      "Weather Forecast App – React.js app using OpenWeather API to display real-time weather for any city.",
      "E-Commerce Frontend – Designed a shopping UI with React, Tailwind CSS, and Redux for cart state management.",
      "Student Result Portal – Developed a full-stack CRUD system using Node.js, Express, and MongoDB.",
      "Chat Application – Real-time chat using Socket.io and Node.js for peer-to-peer messaging.",
      ],
      experience: [
      "Web Development Intern – ABC Tech (June 2024 – Aug 2024) – Built reusable components, collaborated in Agile sprints, fixed UI bugs.",
      "Freelance Frontend Developer – Delivered 6+ websites (2023–Present) using React, Bootstrap, and SEO optimization.",
      "Campus Technical Assistant – PES University (Jan 2023 – Dec 2023) – Supported student projects, managed lab equipment and Arduino workshops.",
      "Open Source Contributor – Participated in Hacktoberfest 2023, contributed bug fixes and documentation to React projects.",
      ],
      skills: [
       "HTML", "CSS", "JavaScript", "React.js",
      "Tailwind CSS", "Node.js", "Express.js",
      "MongoDB", "MySQL", "Python", "Git & GitHub",
      ],
      interests: [
      "Singing", "Sketching", "Cooking", "Farming",
      "UI/UX Design", "Blog Writing", "Public Speaking",
      ],
      all: {
        objective:
          "To apply my programming, design, and communication skills in a dynamic tech environment that values innovation and learning.",
        education: [
          "B.Tech in Computer Science – PES University, Bangalore (2021–2025) – CGPA: 8.7",
          "PU in PCMB – SAM PU College (2019–2021) – 89%",
          "SSLC – SFS Public School (2019) – 94%",
        ],
        projects: [
          "IoT Fire & Smoke Detector with Arduino, MQ2 Sensors, Buzzer Alert",
          "Animated Portfolio Website – HTML, CSS, JS, hosted on GitHub Pages",
          "React-based Weather Dashboard – Real-time search via OpenWeather API",
        ],
        experience: [
          "Frontend Intern – ABC Tech, built UI components and fixed bugs",
          "Freelancer – Developed 6+ responsive web apps using React and Bootstrap",
        ],
        skills: [
          "HTML", "CSS", "JavaScript", "React.js", "Tailwind", "Node.js",
          "MongoDB", "Python", "Firebase", "Git", "GitHub",
        ],
        interests: [
          "Singing", "Sketching", "Blogging", "Open Source", "Volunteer Teaching",
        ],
      },
    };

    if (section === "all") {
      setResumeData((prev) => ({ ...prev, ...updates.all }));
    } else {
      setResumeData((prev) => ({
        ...prev,
        [section]: updates[section] || prev[section],
      }));
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-950 text-white" : "bg-white text-black"
      } min-h-screen transition`}
    >
      <div className="max-w-9xl mx-auto py-6 px-4 flex gap-7">
        <div className="w-1/4 sticky top-6 self-start h-full">
          <Sidebar
            onFontChange={setFont}
            onEdit={() => setIsEditing(true)}
            onPreview={() => setIsEditing(false)}
            onDownload={handleDownload}
            onSave={handleSave}
            onAIEnhance={handleAIEnhance}
            isEditing={isEditing}
            theme={theme}
            font={font}
            shareContent="Resume Content"
          />
        </div>
        <div className="w-3/4">
          <Resume
            data={resumeData}
            onChange={handleFieldChange}
            isEditing={isEditing}
            fontClass={font}
            profileImage={profileImage}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
