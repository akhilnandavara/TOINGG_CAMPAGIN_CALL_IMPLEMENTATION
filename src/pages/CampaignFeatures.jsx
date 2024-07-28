import { useState, useEffect, useRef } from "react";
import axios from "axios";

const key = import.meta.env.VITE_AUTH_KEY;
const toinggUrl = import.meta.env.VITE_TOINGG_URL;

import PropTypes from "prop-types";

export default function CampaignFeatures({ isUpdate }) {
  CampaignFeatures.propTypes = {
    isUpdate: PropTypes.bool.isRequired,
  };

  const [campaignData, setCampaignData] = useState({
    title: "",
    voice: "",
    language: "",
    script: "",
    purpose: "",
    knowledgeBaseUrl: "",
    calendar: "10Am to 10Pm IST",
    firstLine: "",
    tone: "",
    postCallAnalysis: false,
    postCallAnalysisSchema: {},
    knowledgeBase: "",
  });

  const [languages, setLanguages] = useState([]);
  const [voices, setVoices] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    const fetchLanguagesAndVoices = async () => {
      try {
        const languageResponse = await axios.get(
          `${toinggUrl}/api/v3/get_supported_languages`,
          { headers }
        );
        const voiceResponse = await axios.get(
          `${toinggUrl}/api/v3/get_supported_voices`,
          { headers }
        );
        setLanguages(languageResponse.data.result.languages);
        setVoices(voiceResponse.data.result.voice);
      } catch (error) {
        console.error("Error fetching languages or voices", error);
      }
    };

    const fetchCampaignData = async () => {
      try {
        const response = await axios.get(`${toinggUrl}/api/v3/get_campaigns`, {
          headers,
        });
        console.log(response);

        const campaign = response.data.result.find(
          (c) => c.id === localStorage.getItem("campaignId")
        );
        if (campaign) {
          setCampaignData(campaign);
        } else {
          alert("Campaign not found");
        }
      } catch (error) {
        console.error("Error fetching campaign data", error);
      }
    };

    fetchLanguagesAndVoices();

    if (isUpdate) {
      fetchCampaignData();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "knowledgeBase" && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setCampaignData((prevState) => ({
          ...prevState,
          knowledgeBase: reader.result, // Base64 string
        }));
      };

      reader.readAsDataURL(file);
    } else {
      setCampaignData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const knowledgeBaseData =
      campaignData.knowledgeBaseUrl || campaignData.knowledgeBase || "";

    const processedData = {
      title: campaignData.title,
      voice: campaignData.voice,
      language: campaignData.language,
      script: campaignData.script,
      purpose: campaignData.purpose,
      knowledgeBase: knowledgeBaseData,
      calendar: campaignData.calendar,
      firstLine: campaignData.firstLine,
      tone: campaignData.tone,
      postCallAnalysis: campaignData.postCallAnalysis,
      postCallAnalysisSchema: campaignData.postCallAnalysisSchema,
    };

    try {
      if (isUpdate) {
        const campaignId = localStorage.getItem("campaignId");
        if (campaignId) {
          await axios
            .put(
              `${toinggUrl}/api/v3/update_campaign/${campaignId}`,
              processedData,
              {
                headers,
              }
            )
            .then(() => {
              alert("Campaign updated successfully!");
            })
            .catch((error) => {
              console.error("Error updating campaign", error);
              alert(
                error.response.data.detail ||
                  "An error occurred while updating the campaign."
              );
            });
        } else {
          alert("Campaign ID not found in local storage.");
        }
      } else {
        await axios
          .post(`${toinggUrl}/api/v3/create_campaign`, processedData, {
            headers,
          })
          .then((res) => {
            localStorage.setItem("campaignId", res.data.result.campaignId);
            alert("Campaign created successfully!");
          })
          .catch((error) => {
            console.error("Error creating campaign", error);
            alert(
              error.response.data.detail ||
                "An error occurred while creating the campaign."
            );
          });
      }
    } catch (error) {
      console.error("Error processing campaign", error);
      alert(
        error.message || "An error occurred while processing the campaign."
      );
    } finally {
      setIsSubmitting(false);
      setCampaignData({
        title: "",
        voice: "",
        language: "",
        script: "",
        purpose: "",
        knowledgeBaseUrl: "",
        knowledgeBase: "",
        calendar: "10Am to 10Pm IST",
        firstLine: "",
        tone: "",
        postCallAnalysis: false,
        postCallAnalysisSchema: {},
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-5 text-gray-700  rounded-lg shadow-lg transition transform duration-500 hover:scale-105">
      <h2 className="text-lg sm:text-2xl font-bold mb-4">
        {isUpdate ? "Update Campaign" : "Create Campaign"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={campaignData.title}
            onChange={handleChange}
            required
            className="mt-1 max-sm:text-xs block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500 transition duration-300"
          />
        </>
        <>
          <label className="block text-sm font-medium text-gray-700">
            Language
          </label>
          <select
            name="language"
            value={campaignData.language}
            onChange={handleChange}
            required
            className="mt-1 max-sm:text-xs block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500 text-gray-700 transition duration-300"
          >
            <option value="">Select a language</option>
            {languages.map((lang, i) => (
              <option key={i} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </>
        <>
          <label className="block text-sm font-medium text-gray-700">
            Voice
          </label>
          <select
            name="voice"
            value={campaignData.voice}
            onChange={handleChange}
            required
            className="mt-1 max-sm:text-xs block text-gray-700 w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500 transition duration-300"
          >
            <option value="">Select a voice</option>
            {voices.map((voice, i) => (
              <option key={i} value={voice.name}>
                {voice.name} {voice?.type}
              </option>
            ))}
          </select>
        </>
        <>
          <label className="block text-sm font-medium">Script</label>
          <textarea
            className="mt-1  max-sm:text-xs block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500 transition duration-300"
            placeholder="The script should have a minimum of 200 characters."
            name="script"
            value={campaignData.script}
            onChange={handleChange}
          ></textarea>
          <p
            className={`${
              campaignData.script === "" || campaignData.script.length > 200
                ? "hidden"
                : "block"
            } text-red-600 text-xs`}
          >
            Need To have min of 200 Characters
          </p>
        </>
        <>
          <label className="block text-sm font-medium">
            Knowledge Base URL
          </label>
          <input
            type="url"
            name="knowledgeBaseUrl"
            value={campaignData.knowledgeBaseUrl}
            onChange={handleChange}
            className="mt-1 max-sm:text-xs block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500 transition duration-300"
          />
        </>
        <>
          <label className="block text-sm font-medium">
            Knowledge Base Document
          </label>
          <input
            type="file"
            ref={fileInputRef}
            name="knowledgeBase"
            accept=".pdf,.doc,.docx,.xls,.xlsx"
            onChange={handleChange}
            className="mt-1 max-sm:text-xs block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500 transition duration-300"
          />
        </>
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 w-full bg-[#fba668] bg-opacity-50 text-white font-bold py-2 px-4 rounded hover:bg-[#fba668] transition duration-300"
        >
          {isUpdate ? "Update Campaign" : "Create Campaign"}
        </button>
      </form>
    </div>
  );
}
