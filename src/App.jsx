import { useEffect, useState } from 'react';
import { BASE_URL } from './constants/urls';

function App() {
  const [streamData, setStreamData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(`${BASE_URL}streamer/stream`);

      const reader = response.body.getReader();

      const processStream = async () => {
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
      console.error('Error fetching streaming data:', error);
    }
  };

  return (
    <>
      <h1>Streaming Data</h1>
      <pre>{streamData.join("\n")}</pre>
    </>
  );
}

export default App;
