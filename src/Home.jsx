import "./App.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMedium,
  faLinkedin,
  faGithub,
  faDeskpro,
} from "@fortawesome/free-brands-svg-icons";

function Home() {
  const navigate = useNavigate();
  const onClick = (number) => {
    if (number === 1) {
      navigate("/stream-number");
    } else if (number === 2) {
      navigate("/stream-text");
    }
  };

  const links = {
    0: "https://augustinejoseph.medium.com/",
    1: "https://www.linkedin.com/in/augustinjoseph/",
    2: "https://github.com/augustinejoseph",
    3: "https://augustinejoseph.github.io/",
  };
  const handleProfileClick = (number) => {
    let url = links[number];
    window.open(url)
  };
  return (
    <>
      <h1>AUGUSTINE JOSPEH</h1>
      <p>Experimenting with HTTP Streaming...</p>
      <div className="profile-links-container">
        <button onClick={() => handleProfileClick(0)} className="link-button">
          <FontAwesomeIcon icon={faMedium} color="white" />
          Medium
        </button>
        <button onClick={() => handleProfileClick(1)} className="link-button">
          <FontAwesomeIcon icon={faLinkedin} color="white" />
          LinkedIn
        </button>
        <button onClick={() => handleProfileClick(2)} className="link-button">
          <FontAwesomeIcon icon={faGithub} color="white" />
          GitHub
        </button>
        <button onClick={() => handleProfileClick(3)} className="link-button">
          <FontAwesomeIcon icon={faDeskpro} color="white" />
          Portfolio
        </button>
      </div>
      <h3>Choose one from the following to see streaming using &ldquo;StreamingHttpResponse&rdquo; from Django</h3>
      <div className="home-container">
        <button onClick={() => onClick(2)}>Stream Text</button>
        <button onClick={() => onClick(1)}>Stream Number</button>
      </div>
    </>
  );
}
export default Home;
