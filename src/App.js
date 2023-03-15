import React, { useState, useEffect } from "react";
import bg1 from "./assets/images/special-abilities-background-sprite.png";
import bg2 from "./assets/images/bg-image.png";
import { animated, useSpring } from "@react-spring/web";

import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";
import agentBackground from "./assets/video/agent-background-generic.mp4";
import Slider from "react-slick";
import AgentHero from "./components/AgentHero";
import AgentAbilities from "./components/AgentAbilities";

export default function App() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAgent, setCurrentAgent] = useState();
  const styles = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: { duration: 500, friction: 120 },
    reset: true
  });
  useEffect(() => {
    fetch(`https://valorant-api.com/v1/agents`)
      .then((response) => response.json())
      .then((actualData) => {
        setAgents(actualData.data.filter(isPlayable));
        console.log(actualData.data);
        setCurrentAgent(actualData.data[0]);
        setLoading(false);
      });
  }, []);

  const isPlayable = (value) => {
    return value.isPlayableCharacter;
  };

  const settings = {
    focusOnSelect: true,
    arrows: false,
    dots: false,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    beforeChange: function (currentSlide, nextSlide) {
      console.log("before change", currentSlide, nextSlide);
    },
    afterChange: function (currentSlide) {
      console.log("after change", currentSlide);
    },
  };
  const agentHandler = (agent) => {
    setCurrentAgent(agent);
    console.log("current agent is " + currentAgent.displayName);
  };

  return (
    <div className="h-screen w-screen bg-off-white">
      <div className="w-full h-1/2 overflow-hidden relative bg-teal-500">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover  -z-10"
        >
          <source src={agentBackground} type="video/mp4" />
        </video>
      </div>
      <div className="flex justify-center align-middle">
        {!loading && (
          <div className="absolute h-full z-10 top-0  w-3/4">
            <Slider {...settings} className="">
              {agents.map((agent) =>
                agent.uuid === currentAgent.uuid ? (
                  <h2
                    key={agent.uuid}
                    className="cursor-grab font-extrabold text-8xl text-[#FE4555] pointer-events-auto transform transition-all hover:pl-11"
                    onClick={() => agentHandler(agent)}
                  >
                    {agent.displayName.toUpperCase()}
                  </h2>
                ) : (
                  <h2
                    key={agent.uuid}
                    className="cursor-grab font-extrabold text-8xl text-off-white pointer-events-auto transform transition-all hover:pl-11"
                    onClick={() => agentHandler(agent)}
                  >
                    {agent.displayName.toUpperCase()}
                  </h2>
                )
              )}
            </Slider>
            <animated.div style={styles}>
              {!loading && <AgentHero agent={currentAgent}></AgentHero>}
            </animated.div>
          </div>
        )}
      </div>
      {!loading && (
        <animated.div>
          <AgentAbilities
            agent={currentAgent}
            className="animate-in spin-in duration-700"
          />
        </animated.div>
      )}
      <img className="absolute bottom-0" src={bg1} />
      <img className="absolute bottom-0 right-11" src={bg2} />
    </div>
  );
}
