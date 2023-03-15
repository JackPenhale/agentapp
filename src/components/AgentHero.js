import { animated, useSpring } from "@react-spring/web";

export default function AgentHero(props) {
  const imageSpring = useSpring({
    opacity:0,
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: { duration: 1000, friction: 120 },
    reset: true,
  });

  const textSpring = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: { duration: 500, friction: 120 },

    reset: true,
  });

  return (
    <div className="absolute h-fit -top-20 m-auto right-0 left-0  z-50 text-off-white pointer-events-none">
      <animated.div
        style={imageSpring}
        className=" flex justify-center align-middle"
      >
        <img
          className="w-[1024px] h-auto pointer-events-none "
          src={props.agent.fullPortrait}
        ></img>
      </animated.div>
      <div className="absolute w-3/12 top-60 left-3/4">
        <h4 className="text-lg font-semibold pb-5">// ROLE</h4>
        <div className="flex">
          <animated.h3
            style={textSpring}
            className="font-extrabold text-4xl pb-5"
          >
            {props.agent.role.displayName.toUpperCase()}{" "}
          </animated.h3>
          <img className="w-6 h-6 pt " src={props.agent.role.displayIcon} />
        </div>
        <h4 className="text-lg font-semibold pb-5">// BIOGRAPHY</h4>
        <animated.p style={textSpring}>{props.agent.description}</animated.p>
      </div>
    </div>
  );
}
