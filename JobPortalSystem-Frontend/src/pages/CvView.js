// Core viewer
import { Viewer, Worker } from "@react-pdf-viewer/core";
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useEffect, useState } from "react";
import Api, { endpoints } from "../configs/Api";
import { useParams } from "react-router-dom";
import CardSearchNoResult from "../components/commons/CardSearchNoResult";

const CvView = () => {
  const [url, setUrl] = useState(null);
  const { jobSeekerProfileId } = useParams();

  useEffect(() => {
    const loadCv = async () => {
      try {
        const res = await Api.get(
          endpoints["job-seeker-profile-cv"](jobSeekerProfileId)
        );

        if (res.status === 200 && res.data["id"] !== undefined) {
          setUrl(res.data.url_cv);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadCv();
  }, [jobSeekerProfileId]);

  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <div style={{ backgroundColor: url ? "gray" : "white" }}>
      <div
        style={{
          height: window.innerHeight,
          width: "70%",
          margin: "0 auto",
        }}
      >
        {url !== null ? (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
            <Viewer
              fileUrl={url}
              plugins={[defaultLayoutPluginInstance]}
              renderError={console.log}
            />
          </Worker>
        ): <CardSearchNoResult description="Thông tin CV không tồn tại"/>}
      </div>
    </div>
  );
};

export default CvView;
