import React from "react";
import {
  Target,
  BookOpen,
  Code,
  Briefcase,
  Star,
  Heart,
} from "lucide-react";

const SectionList = ({ icon: Icon, title, items, onChange, onAdd, isEditing }) => (
  <div className="mb-4">
    <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">
      <Icon size={20} /> {title}
    </h3>
    {items.map((item, index) =>
      isEditing ? (
        <textarea
          key={index}
          value={item}
          onChange={(e) => onChange(index, e.target.value)}
          className="w-full border dark:border-gray-600 p-2 rounded mb-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          rows={2}
        />
      ) : (
        <p key={index} className="text-gray-800 dark:text-gray-200 mb-1">
          - {item}
        </p>
      )
    )}
    {isEditing && (
      <button
        onClick={onAdd}
        className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        + Add {title}
      </button>
    )}
  </div>
);

const SectionSingle = ({ icon: Icon, title, content, onChange, isEditing, keyName }) => (
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

export default function Resume({
  data,
  onChange,
  isEditing,
  fontClass,
  profileImage,
}) {
  const handleListChange = (key, index, value) => {
    const updated = [...data[key]];
    updated[index] = value;
    onChange(key, updated);
  };

  const handleAddItem = (key, placeholder) => {
    const updated = [...data[key], placeholder];
    onChange(key, updated);
  };

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
      <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400">
        {data.name}
      </h1>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{data.contact}</p>

      <SectionSingle
        icon={Target}
        title="Career Objective"
        content={data.objective}
        onChange={onChange}
        isEditing={isEditing}
        keyName="objective"
      />

      <SectionList
        icon={BookOpen}
        title="Education"
        items={data.education}
        onChange={(i, v) => handleListChange("education", i, v)}
        onAdd={() => handleAddItem("education", "New education entry")}
        isEditing={isEditing}
      />

      <SectionList
        icon={Code}
        title="Projects"
        items={data.projects}
        onChange={(i, v) => handleListChange("projects", i, v)}
        onAdd={() => handleAddItem("projects", "New project entry")}
        isEditing={isEditing}
      />

      <SectionList
        icon={Briefcase}
        title="Experience"
        items={data.experience}
        onChange={(i, v) => handleListChange("experience", i, v)}
        onAdd={() => handleAddItem("experience", "New experience entry")}
        isEditing={isEditing}
      />

      <SectionList
        icon={Star}
        title="Skills"
        items={data.skills}
        onChange={(i, v) => handleListChange("skills", i, v)}
        onAdd={() => handleAddItem("skills", "New skill")}
        isEditing={isEditing}
      />

      <SectionList
        icon={Heart}
        title="Interests"
        items={data.interests}
        onChange={(i, v) => handleListChange("interests", i, v)}
        onAdd={() => handleAddItem("interests", "New interest")}
        isEditing={isEditing}
      />
    </div>
  );
}
