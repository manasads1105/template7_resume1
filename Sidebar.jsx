import React, { useState } from "react";
import {
  Moon,
  Sun,
  Download,
  Edit3,
  Eye,
  Bot,
  Share2,
  Upload,
  Sparkles,
  Save,
  FileUp,
  Wand2,
  FilePenLine,
} from "lucide-react";

export default function Sidebar({
  onFontChange,
  onEdit,
  onPreview,
  onDownload,
  onSave,
  onUploadProfileImage,
  onAIEnhance,
  isEditing,
  theme,
  toggleTheme,
  font,
  shareContent,
}) {
  const [showEnhanceOptions, setShowEnhanceOptions] = useState(false);
  const [showUploadOptions, setShowUploadOptions] = useState(false);

  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "My Resume", text: shareContent });
        alert("Resume shared successfully!");
      } catch {
        alert("Sharing failed or cancelled.");
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareContent);
        alert("Share text copied to clipboard!");
      } catch {
        alert("Sharing not supported and unable to copy.");
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 h-full min-h-screen p-4 shadow-md space-y-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tools</h2>

      <button
        onClick={onDownload}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        <Download size={18} /> Download PDF
      </button>

      <button
        onClick={onSave}
        className="w-full flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        <Save size={18} /> Save to Documents
      </button>

      <button
        onClick={onEdit}
        className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded ${
          isEditing ? "bg-green-700" : "bg-green-500 hover:bg-green-600"
        } text-white`}
      >
        <Edit3 size={18} /> Edit Resume
      </button>

      <button
        onClick={onPreview}
        className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded ${
          !isEditing ? "bg-purple-700" : "bg-purple-500 hover:bg-purple-600"
        } text-white`}
      >
        <Eye size={18} /> Preview Resume
      </button>

      <div className="relative">
        <button
          onClick={() => setShowUploadOptions(!showUploadOptions)}
          className="w-full flex items-center justify-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          <FileUp size={18} /> Upload Resume
        </button>
        {showUploadOptions && (
          <div className="absolute z-10 mt-1 bg-white dark:bg-gray-700 shadow-lg rounded w-full text-left">
            <button
              onClick={onEdit}
              className="w-full px-4 py-2 text-sm text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2"
            >
              <FilePenLine size={14} /> Manual Edit
            </button>
            <button
              onClick={onEdit}
              className="w-full px-4 py-2 text-sm text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2"
            >
              <Wand2 size={14} /> AI Edit
            </button>
            <button
              onClick={() => onAIEnhance("all")}
              className="w-full px-4 py-2 text-sm text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2"
            >
              <Sparkles size={14} /> AI Enhance
            </button>
          </div>
        )}
      </div>

      <button
        onClick={() => setShowEnhanceOptions(!showEnhanceOptions)}
        className="w-full flex items-center justify-center gap-2 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
      >
        <Bot size={18} /> AI Assistant
      </button>

      {showEnhanceOptions && (
        <div className="space-y-2 pl-4">
          {["education", "projects", "experience", "skills", "interests"].map((section) => (
            <button
              key={section}
              onClick={() => onAIEnhance(section)}
              className="w-full text-left text-sm text-white bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
            >
              <Sparkles size={14} className="inline mr-1" /> Enhance{" "}
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={handleShareClick}
        className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        <Share2 size={18} /> Share Resume
      </button>

      <label className="w-full">
        <div className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 cursor-pointer mt-4">
          <Upload size={18} /> Upload Photo
        </div>
        <input type="file" accept="image/*" className="hidden" onChange={onUploadProfileImage} />
      </label>

      <div className="mt-4">
        <label htmlFor="font-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Font Style
        </label>
        <select
          id="font-select"
          value={font}
          className="w-full border dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          onChange={(e) => onFontChange(e.target.value)}
        >
          <option value="font-serif">Serif</option>
          <option value="font-mono">Mono</option>
          <option value="font-inter">Inter</option>
          <option value="font-poppins">Poppins</option>
          <option value="font-roboto">Roboto</option>
          <option value="font-lato">Lato</option>
          <option value="font-open-sans">Open Sans</option>
          <option value="font-merriweather">Merriweather</option>
          <option value="font-playfair">Playfair Display</option>
        </select>
      </div>

      <button
        onClick={toggleTheme}
        className="w-full mt-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        {theme === "light" ? (
          <span className="flex items-center gap-2">
            <Moon size={16} /> Dark Mode
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Sun size={16} /> Light Mode
          </span>
        )}
      </button>
    </div>
  );
}
