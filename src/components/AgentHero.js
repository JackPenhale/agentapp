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
    <div className="flex  w-10/12 flex-col md:absolute md:h-fit md:-top-20 md:m-auto md:right-0 md:left-0  md:z-50 md:text-off-white pointer-events-none text-slate-800">
      <animated.div
        style={imageSpring}
        className=" flex justify-center align-middle"
      >
        <img
          className="md:w-[1024px] h-full pointer-events-none "
          src={props.agent.fullPortrait}
        ></img>
      </animated.div>
      <div className="md:absolute md:w-3/12 md:top-60 md:left-3/4 pt-20 md:pt-0">
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
