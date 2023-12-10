import { useEffect, useState } from "react";
import { BASE_URL } from "./constants/urls";
import { useNavigate } from "react-router-dom";
export const StreamNumber = () => {
  const [streamData, setStreamData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(`${BASE_URL}streamer/stream-number`);

      const reader = response.body.getReader();

      const processStream = async () => {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          // Convert the chunk (Uint8Array) to text
          const text = new TextDecoder().decode(value);

          setStreamData((prevData) => [...prevData, text]);
        }
      };

      processStream();
    } catch (error) {
      console.error("Error fetching streaming data:", error);
    }
  };

  return (
    <>
      <div className="number-container">
        <pre>{streamData.join("\n")}</pre>
        <div className="backhome">
          <button onClick={() => navigate("/")}>Back to home</button>
        </div>
      </div>
    </>
  );
};
