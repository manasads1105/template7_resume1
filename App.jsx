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
    objective: "To learn and contribute to team projects, and gain practical experience while enhancing organizational success.",
    education: "- B.Tech (CSE), PES University, Bangalore (2025)\n- PU (PCMB), SAM PU College (2021)\n- SSLC, SFS Public School (2019)",
    projects: "- Fire, Smoke, and Gas Detector Alarm using Arduino\n- Portfolio website using HTML/CSS/JS",
    experience: "- Intern at ABC Tech\n- Freelance Web Developer",
    skills: "Python, Java, C++, MySQL, HTML, CSS, JavaScript, React",
    interests: "Singing, Sketching, Cooking, Farming",
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

  const enhanceSection = (key) => {
    const enhancements = {
      education: "\n- Attended machine learning workshops and technical seminars.",
      projects: "\n- Built an AI-powered resume enhancer using React and Tailwind.",
      experience: "\n- Contributed to open-source projects and remote internships.",
      skills: ", Tailwind CSS, Git, Figma, REST APIs",
      interests: ", UI/UX Design, Reading Tech Blogs",
    };
    handleFieldChange(key, resumeData[key] + enhancements[key]);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const shareContent = `
Name: ${resumeData.name}
Contact: ${resumeData.contact}

Career Objective:
${resumeData.objective}

Education:
${resumeData.education}

Projects:
${resumeData.projects}

Experience:
${resumeData.experience}

Skills:
${resumeData.skills}

Interests:
${resumeData.interests}
`.trim();

  return (
    <div className={`${theme === "dark" ? "bg-gray-950" : "bg-gray-100"} min-h-screen transition`}>
      <div className="max-w-9xl mx-auto py-6 px-4 flex gap-7">
        <div className="w-1/4 sticky top-6 self-start h-full">
          <Sidebar
            onFontChange={setFont}
            onEdit={() => setIsEditing(true)}
            onPreview={() => setIsEditing(false)}
            onDownload={handleDownload}
            onSave={handleDownload} // use same function for Save to Documents
            onUploadProfileImage={handleUploadProfileImage}
            onAIEnhance={enhanceSection}
            isEditing={isEditing}
            theme={theme}
            toggleTheme={toggleTheme}
            font={font}
            shareContent={shareContent}
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
