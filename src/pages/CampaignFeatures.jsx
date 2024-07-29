import { useState, useEffect, useRef } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { base64ToFile, dataURLToFile, fileToDataURL } from "../utils/fileUtils";
import { ClipLoader } from "react-spinners";

const key = import.meta.env.VITE_AUTH_KEY;
const toinggUrl = import.meta.env.VITE_TOINGG_URL;

const initialCampaignData = {
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
};

export default function CampaignFeatures({ isUpdate }) {
  // propTypes declaration
  CampaignFeatures.propTypes = {
    isUpdate: PropTypes.bool.isRequired,
  };
  // states
  const [isLoading, setIsLoading] = useState(false);
  const [campaignData, setCampaignData] = useState(initialCampaignData);
  const [languages, setLanguages] = useState([]);
  const [voices, setVoices] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };

  // useEffect to fetch languages, voices and campaign data
  useEffect(() => {
    const fetchLanguagesAndVoices = async () => {
      try {
        const [languageResponse, voiceResponse] = await Promise.all([
          axios.get(`${toinggUrl}/api/v3/get_supported_languages`, { headers }),
          axios.get(`${toinggUrl}/api/v3/get_supported_voices`, { headers }),
        ]);
        setLanguages(languageResponse.data.result.languages);
        setVoices(voiceResponse.data.result.voice);
      } catch (error) {
        console.error("Error fetching languages or voices", error);
      }
    };

    const fetchCampaignData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${toinggUrl}/api/v3/get_campaigns`, {
          headers,
        });
        const campaign =
          response.data.result[localStorage.getItem("campaignId")];
        if (campaign) {
          const updatedCampaign = isValidUrl(campaign.knowledgeBase)
            ? {
                ...campaign,
                knowledgeBaseUrl: campaign.knowledgeBase,
                knowledgeBase: "",
              }
            : { ...campaign };
          setCampaignData(updatedCampaign);
        } else {
          alert("Campaign not found");
        }
      } catch (error) {
        console.error("Error fetching campaign data", error);
      }
      setIsLoading(false);
    };

    fetchLanguagesAndVoices();
    if (isUpdate) {
      fetchCampaignData();
    } else {
      setCampaignData(initialCampaignData);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [isUpdate]);

  // useEffect to set file input value when knowledgeBase is updated
  useEffect(() => {
    if (campaignData.knowledgeBase) {
      const file = dataURLToFile(campaignData.knowledgeBase, "knowledgebase"); // Adjust the filename as needed
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
    }
  }, [campaignData.knowledgeBase]);

  // functions to view file and handle change and submit
  const viewFile = () => {
    const base64String = campaignData.knowledgeBase;
    if (base64String) {
      const blob = base64ToFile(base64String, "knowledgeBase.pdf");
      setModalContent(URL.createObjectURL(blob));
      setModalIsOpen(true);
    }
  };

  const isValidUrl = (string) => {
    try {
      const url = new URL(string);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
      return false;
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setCampaignData((prevState) => ({ ...prevState, [name]: value }));
  };

  async function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      try {
        const dataURL = await fileToDataURL(file);
        // Set knowledgeBase to the data URL string
        setCampaignData((prevState) => ({
          ...prevState,
          knowledgeBase: dataURL,
        }));
      } catch (error) {
        console.error("Error converting file to data URL:", error);
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const knowledgeBaseData =
      campaignData.knowledgeBaseUrl || campaignData.knowledgeBase || "";

    const processedData = {
      ...campaignData,
      knowledgeBase: knowledgeBaseData,
    };

    try {
      if (campaignData.knowledgeBase === "") {
        alert("Please upload a knowledge base document or Url");
        setIsSubmitting(false);
        return;
      }

      if (isUpdate) {
        const campaignId = localStorage.getItem("campaignId");
        if (campaignId) {
          await axios.post(
            `${toinggUrl}/api/v3/update_campaign/`,
            { campaignModelData: processedData, campId: campaignId },
            { headers }
          );
          alert("Campaign updated successfully!");
        } else {
          alert("Campaign ID not found in local storage.");
        }
      } else {
        const response = await axios.post(
          `${toinggUrl}/api/v3/create_campaign`,
          processedData,
          { headers }
        );
        localStorage.setItem("campaignId", response.data.result.campaignId);
        alert("Campaign created successfully!");
      }
    } catch (error) {
      console.error("Error processing campaign", error);
      alert(
        error.response?.data?.detail ||
          "An error occurred while processing the campaign."
      );
    } finally {
      setIsSubmitting(false);
      setCampaignData(initialCampaignData);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex place-content-center  h-screen  items-center ">
          <ClipLoader
            color={"#fba668"}
            loading={isLoading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="max-w-md mx-auto p-5 bg-white text-gray-700 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
          <h2 className="text-lg sm:text-2xl font-bold mb-4">
            {isUpdate ? "Update Campaign" : "Create Campaign"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={campaignData.title}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Language
              </label>
              <select
                name="language"
                value={campaignData.language}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm focus:ring focus:ring-blue-500"
              >
                <option value="">Select a language</option>
                {languages.map((lang, i) => (
                  <option key={i} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Voice
              </label>
              <select
                name="voice"
                value={campaignData.voice}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm focus:ring focus:ring-blue-500"
              >
                <option value="">Select a voice</option>
                {voices.map((voice, i) => (
                  <option key={i} value={voice.name}>
                    {voice.name} {voice.type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Script
              </label>
              <textarea
                name="script"
                value={campaignData.script}
                onChange={handleChange}
                placeholder="The script should have a minimum of 200 characters."
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm focus:ring focus:ring-blue-500"
              />
              {campaignData.script && campaignData.script.length < 200 && (
                <p className="text-red-600 text-xs">
                  Need at least 200 characters
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Knowledge Base URL
              </label>
              <input
                type="url"
                name="knowledgeBaseUrl"
                value={campaignData.knowledgeBaseUrl}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Knowledge Base Document
              </label>
              <input
                type="file"
                ref={fileInputRef}
                name="knowledgeBase"
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                onChange={handleFileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm focus:ring focus:ring-blue-500"
              />
              {campaignData.knowledgeBase && (
                <button
                  type="button"
                  onClick={viewFile}
                  className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                >
                  View File
                </button>
              )}
            </div>
            {campaignData.knowledgeBase === "" &&
            campaignData.knowledgeBaseUrl === "" ? (
              <span className="text-red-400 text-xs">
                Any One Knowledge Base details is Mandatory
              </span>
            ) : (
              ""
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full bg-[#fba668] text-white font-bold py-2 px-4 rounded hover:bg-[#fba668] transition duration-300"
            >
              {isSubmitting
                ? "Submitting..."
                : isUpdate
                ? "Update Campaign"
                : "Create Campaign"}
            </button>
          </form>
          {/* Modal for viewing file */}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="File Modal"
            className="fixed z-50 inset-0 bg-white p-4"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
          >
            {modalContent && (
              <iframe
                src={modalContent}
                className="w-full h-full"
                title="Document Preview"
              />
            )}
            <button
              onClick={() => setModalIsOpen(false)}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded"
            >
              Close
            </button>
          </Modal>
        </div>
      )}
    </>
  );
}
