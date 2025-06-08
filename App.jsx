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
    contact: "manasads939@gmail.com | linkedin.com/in/manasads | GitHub: manasads1105",
    objective:
      "To learn and contribute to team projects, and gain practical experience while enhancing organizational success.",
    education: [
      "B.Tech (CSE), PES University, Bangalore (2025)",
      "PU (PCMB), SAM PU College (2021)",
      "SSLC, SFS Public School (2019)",
    ],
    projects: [
      "Fire, Smoke, and Gas Detector Alarm using Arduino",
      "Portfolio website using HTML/CSS/JS",
    ],
    experience: ["Intern at ABC Tech", "Freelance Web Developer"],
    skills: ["Python", "Java", "C++", "HTML", "CSS", "React"],
    interests: ["Singing", "Sketching", "Cooking", "Farming"],
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

  const handleUploadProfileImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProfileImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleAIEnhance = (section) => {
    const updates = {
      education: [
        "B.Tech in Computer Science, PES University (2025)",
        "Pre-University in PCMB, SAM PU College (2021)",
        "SSLC, SFS Public School (2019)",
      ],
      projects: [
        "Designed an IoT-based Fire, Smoke, and Gas Detection System using Arduino",
        "Built a personal portfolio website using HTML, CSS, and JavaScript",
      ],
      experience: [
        "Software Development Intern at ABC Tech, worked on full-stack features",
        "Freelanced building responsive websites for local businesses",
      ],
      skills: ["React", "Node.js", "MongoDB", "TypeScript", "Tailwind CSS", "Git"],
      interests: ["UI/UX Design", "AI Research", "Open Source Contributions", "Hiking"],
      all: {
        objective:
          "To contribute meaningfully to innovative tech projects while enhancing my skills in software development.",
        education: [
          "B.Tech in Computer Science, PES University (2025)",
          "Pre-University in PCMB, SAM PU College (2021)",
          "SSLC, SFS Public School (2019)",
        ],
        projects: [
          "IoT-based Fire & Gas Detection System using Arduino & Sensors",
          "Modern portfolio site using HTML/CSS/JS with animations",
        ],
        experience: [
          "Web Developer Intern at ABC Tech, built responsive interfaces",
          "Freelance Web Developer – Delivered 5+ client projects",
        ],
        skills: ["JavaScript", "React", "Python", "Git", "Firebase", "Node.js"],
        interests: ["Art", "Sketching", "Hiking", "Volunteering"],
      },
    };

    if (section === "all") {
      setResumeData((prev) => ({ ...prev, ...updates.all }));
    } else {
      setResumeData((prev) => ({ ...prev, [section]: updates[section] || prev[section] }));
    }
  };

  // NEW: Save resume data JSON to localStorage and trigger download
  const handleSave = () => {
  const element = document.getElementById("resume");
  if (!element) {
    alert("Resume not found!");
    return;
  }
  html2pdf().from(element).save("resume-saved.pdf");
};


  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-950" : "bg-gray-100"
      } min-h-screen transition`}
    >
      <div className="max-w-9xl mx-auto py-6 px-4 flex gap-7">
        <div className="w-1/4 sticky top-6 self-start h-full">
          <Sidebar
            onFontChange={setFont}
            onEdit={() => setIsEditing(true)}
            onPreview={() => setIsEditing(false)}
            onDownload={handleDownload}
            onUploadProfileImage={handleUploadProfileImage}
            onAIEnhance={handleAIEnhance}
            onSave={handleSave}  
            isEditing={isEditing}
            theme={theme}
            toggleTheme={toggleTheme}
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
          />
        </div>
      </div>
    </div>
  );
}

export default App;
