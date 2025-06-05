import React from "react";
import {
  Target,
  BookOpen,
  Code,
  Briefcase,
  Star,
  Heart,
} from "lucide-react";

const Section = ({ icon: Icon, title, content, onChange, isEditing, keyName }) => (
  <div className="mb-4">
    <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">
      <Icon size={20} /> {title}
    </h3>
    {isEditing ? (
      <textarea
        value={content}
        onChange={(e) => onChange(keyName, e.target.value)}
        className="w-full border dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        rows={3}
      />
    ) : (
      <p className="whitespace-pre-line text-gray-800 dark:text-gray-200">{content}</p>
    )}
  </div>
);

export default function Resume({ data, onChange, isEditing, fontClass, profileImage }) {
  return (
    <div
      id="resume"
      className={`bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md ${fontClass} min-h-full`}
    >
      {profileImage && (
        <div className="mb-4">
          <img
            src={profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
          />
        </div>
      )}
      <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400">{data.name}</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{data.contact}</p>

      <Section icon={Target} title="Career Objective" content={data.objective} onChange={onChange} isEditing={isEditing} keyName="objective" />
      <Section icon={BookOpen} title="Education" content={data.education} onChange={onChange} isEditing={isEditing} keyName="education" />
      <Section icon={Code} title="Projects" content={data.projects} onChange={onChange} isEditing={isEditing} keyName="projects" />
      <Section icon={Briefcase} title="Experience" content={data.experience} onChange={onChange} isEditing={isEditing} keyName="experience" />
      <Section icon={Star} title="Skills" content={data.skills} onChange={onChange} isEditing={isEditing} keyName="skills" />
      <Section icon={Heart} title="Interests" content={data.interests} onChange={onChange} isEditing={isEditing} keyName="interests" />
    </div>
  );
}
