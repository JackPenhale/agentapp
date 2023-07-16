import React, { useState, useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";

export default function AgentAbilities(props) {
  const [currentAbility, setCurrentAbility] = useState(
    props.agent.abilities[0]
  );
  const abilityHandler = (ability) => {
    setCurrentAbility(ability);
  };
  const styles = useSpring({
    from: {
      opacity: 0.2,
    },
    to: {
      opacity: 1,
    },
    config: { duration: 1000, friction: 120 },
    reset: true,
  });
  useEffect(() => {
    setCurrentAbility(props.agent.abilities[0]);
  }, [props.agent]);
  return (
    <div className="flex pt-80 md:pt-20 md:absolute  md:z-50  md:top-2/3 bg-off-white">
      <div className="flex align-middle justify-center w-screen">
        <div className="flex-col text-black w-3/4  justify-center align-middle">
          <h2 className="text-4xl font-extrabold text-center">
            SPECIAL ABILITIES
          </h2>
          <div className="flex justify-center align-middle ">
            {props.agent.abilities.map((ability) => (
              <div
                key={ability.slot}
                className="cursor-pointer 
                pointer-events-auto
                 text-black 
                 h-20 w-20  md:p-4  md:m-4 
                 border-2 
                 bg-[#0F1823]
                 transform
                 transition-all
                 hover:bg-red-500"
                onClick={() => abilityHandler(ability)}
              >
                <img
                  src={ability.displayIcon}
                  className="max-h-full max-w-full"
                />
              </div>
            ))}
          </div>
          <animated.div
            style={styles}
            className="flex-col justify-center align-middle items-center text-center content-center "
          >
            <h4 className="font-bold text-center text-2xl">
              {currentAbility.displayName}
            </h4>
            <div
              style={styles}
              className="flex w-full justify-center align-middle pb-36"
            >
              <p className="text-left md:w-1/3">{currentAbility.description}</p>
            </div>
          </animated.div>
        </div>
      </div>
    </div>
  );
}
