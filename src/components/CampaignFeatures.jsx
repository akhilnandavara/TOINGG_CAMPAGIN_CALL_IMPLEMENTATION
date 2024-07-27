import { useState, useEffect } from "react";
import axios from "axios";
// import PropTypes from "prop-types";
const key = import.meta.env.VITE_AUTH_KEY;
const toinggUrl = import.meta.env.VITE_TOINGG_URL;

export default function CampaignFeatures() {
  const [campaignData, setCampaignData] = useState({
    title: "",
    voice: "",
    language: "",
    script: "",
    purpose: "",
    knowledgeBase: "",
    calendar: "10Am to 10Pm IST",
    firstLine: "",
    tone: "",
    postCallAnalysis: false,
    postCallAnalysisSchema: {},
  });

  const url = location.pathname;
  const [languages, setLanguages] = useState([]);
  const [voices, setVoices] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isUpdate = Boolean(url === "/update-campaign");

  const headers = {
    accept: "application/json",
    Authorization: "Bearer " + key,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    const fetchLanguagesAndVoices = async () => {
      try {
        const languageResponse = await axios.get(
          `${toinggUrl}/api/v3/get_supported_languages`,
          { headers: headers }
        );
        const voiceResponse = await axios.get(
          `${toinggUrl}/api/v3/get_supported_voices`,
          { headers: headers }
        );
        setLanguages(languageResponse.data.result.languages);
        setVoices(voiceResponse.data.result.voice);
      } catch (error) {
        console.error("Error fetching languages or voices", error);
      }
    };

    fetchLanguagesAndVoices();
    // If updating, fetch existing campaign data
    if (isUpdate) {
      const fetchCampaignData = async () => {
        try {
          const response = await axios.get(
            `${toinggUrl}/api/v3/get_campaigns`,
            { header: headers }
          );
          setCampaignData(response.data);
        } catch (error) {
          console.error("Error fetching campaign data", error);
        }
      };

      fetchCampaignData();
    }
  }, [isUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampaignData({ ...campaignData, [name]: value });
  };

  //   const handleFileChange = (e) => {
  //     setCampaignData({ ...campaignData, file: e.target.files[0] });
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isUpdate) {
        await axios.put(`${toinggUrl}/api/v3/update_campaign`, {
          method: "PUT",
          headers: headers,
          body: JSON.stringify(),
        });
        alert("Campaign updated successfully!");
      } else {
        await axios
          .post(`${toinggUrl}/api/v3/create_campaign`, campaignData, {
            headers,
          })
          .then(() => {
            alert("Campaign created successfully!");
          })
          .catch((error) => {
            throw new Error(error.response.data.detail);
          });
      }
    } catch (error) {
      console.error("Error creating/updating campaign", error);
      alert(error);
    } finally {
      setIsSubmitting(false);
      setCampaignData({
        title: "",
        voice: "",
        language: "",
        script: "",
        purpose: "",
        knowledgeBase: "",
        calendar: "10Am to 10Pm IST",
        firstLine: "",
        tone: "",
        postCallAnalysis: false,
        postCallAnalysisSchema: {},
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-5 text-gray-700 bg-white rounded-lg shadow-lg transition transform duration-500 hover:scale-105">
      <h2 className="text-2xl font-bold mb-4 ">
        {isUpdate ? "Update Campaign" : "Create Campaign"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
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
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500 transition duration-300"
          />
        </>
        {/* language */}
        <>
          <label className="block text-sm font-medium text-gray-700">
            Language
          </label>
          <select
            name="language"
            value={campaignData.language}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500 text-gray-700 transition duration-300"
          >
            <option value="">Select a language</option>
            {languages.map((lang, i) => (
              <option key={i} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </>
        {/* voice */}
        <>
          <label className="block text-sm font-medium text-gray-700">
            Voice
          </label>
          <select
            name="voice"
            value={campaignData.voice}
            onChange={handleChange}
            required
            className="mt-1 block text-gray-700 w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500 transition duration-300"
          >
            <option value="">Select a voice</option>
            {voices.map((voice, i) => (
              <option key={i} value={voice.name}>
                {voice.name} {voice?.type}
              </option>
            ))}
          </select>
        </>
        {/* script */}
        <>
          <label className="block text-sm font-medium ">Script</label>
          <textarea
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500 transition duration-300"
            placeholder="The script should have a minimum of 200 characters."
            name="script"
            value={campaignData.script}
            onChange={handleChange}
          ></textarea>

          <p
            className={` ${
              campaignData?.script === "" || campaignData?.script?.length > 200
                ? "hidden"
                : "block"
            } text-red-600 text-xs`}
          >
            Need To have min of 200 Characters
          </p>
        </>
        <>
          <label className="block text-sm font-medium ">
            Knowledge Base URL
          </label>
          <input
            type="url"
            name="knowledgeBaseUrl"
            value={campaignData.knowledgeBaseUrl}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500 transition duration-300"
          />
        </>
        {/* file upload */}
        {/* <>
          <label className="block text-sm font-medium ">Upload Document</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500 transition duration-300"
          />
        </> */}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full p-2 text-white rounded-md ${
            isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } transition duration-300`}
        >
          {isSubmitting
            ? "Saving..."
            : isUpdate
            ? "Update Campaign"
            : "Create Campaign"}
        </button>
      </form>
    </div>
  );
}
