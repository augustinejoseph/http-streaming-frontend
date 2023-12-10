import { useEffect, useState } from "react";
import { BASE_URL } from "./constants/urls";
import { useNavigate } from "react-router-dom";
import "./App.css";

export const StreamText = () => {
  const [streamData, setStreamData] = useState([]);
  const [isOver, setIsOver] = useState(false);
  const [textSpeed, setTextSpeed] = useState(
    window.localStorage.getItem("speed")
  );
  const [progress, setProgress] = useState(0);
  console.log("progress", progress);
  const [controller, setController] = useState(new AbortController());
  const navigate = useNavigate();

  useEffect(() => {
    getData();
    return () => controller.abort();
  }, []);

  const setSpeed = (speed) => {
    localStorage.setItem("speed", speed);
    setTextSpeed(speed);
    getAnother();
  };

  const getAnother = () => {
    window.location.reload();
  };

  const stopStreaming = () => {
    controller.abort();
    setIsOver(true);
  };

  const getData = async () => {
    try {
      const abortController = new AbortController();
      setController(abortController);

      const response = await fetch(
        `${BASE_URL}streamer/stream-text?speed=${textSpeed}`,
        {
          signal: abortController.signal,
        }
      );

      const reader = response.body.getReader();
      const totalBytes = parseInt(response.headers.get("content-length"), 10);
      let receivedBytes = 0;
      console.log(totalBytes);
      const processStream = async () => {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            setIsOver(true);
            break;
          }

          const text = new TextDecoder().decode(value);

          setStreamData((prevData) => [...prevData, text]);

          receivedBytes += text.length;
          const currentProgress = (receivedBytes / totalBytes) * 100;
          setProgress(currentProgress);
        }
      };

      processStream();
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Fetch request aborted.");
      } else {
        console.error("Error fetching streaming data:", error);
      }
    }
  };

  return (
    <>
      <div className="text-container">
        <div className="backhome"></div>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <span>{`${progress.toPrecision(4)}%`}</span>
        <div className="speed-buttons">
          <span>Select speed : </span>
          <span className="speed-label">Fastest</span>

          <button
            className={textSpeed === "0.05" ? "active" : ""}
            onClick={() => setSpeed(0.05)}
          >
            5x
          </button>
          <button
            className={textSpeed === "0.1" ? "active" : ""}
            onClick={() => setSpeed(0.1)}
          >
            3x
          </button>
          <button
            className={textSpeed === "0.2" ? "active" : ""}
            onClick={() => setSpeed(0.2)}
          >
            2x
          </button>
          <button
            className={textSpeed === "0.5" ? "active" : ""}
            onClick={() => setSpeed(0.5)}
          >
            1x
          </button>
          <button
            className={textSpeed === "1" ? "active" : ""}
            onClick={() => setSpeed(1)}
          >
            .5x
          </button>
          <span className="speed-label">Slowest</span>
        </div>
        <pre className="streamview">{streamData.join("")}{!isOver && <span>...</span>}</pre>
        <div>
          {!isOver && (
            <>
              <button className="reload-button" onClick={() => stopStreaming()}>
                Stop
              </button>
              <button onClick={() => navigate("/")}>Back to home</button>
            </>
          )}
          {isOver && (
            <>
              <button className="reload-button" onClick={() => getAnother()}>
                Another One
              </button>
              <button onClick={() => navigate("/")}>Back to home</button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
