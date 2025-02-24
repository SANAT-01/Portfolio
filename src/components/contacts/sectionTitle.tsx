import { m, LazyMotion, domAnimation } from "framer-motion";
import BounceComponent from "../bounce";

const SectionTitle = (props: { title: string; subtitle: string }) => {
  const { title, subtitle } = props;

  return (
    <div className="text-green-300">
      <LazyMotion features={domAnimation} strict>
        <m.div
          initial={{ x: -350 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-primary-600 p-6 noselect"
        >
          <span
            className="opacity-50"
            style={{
              textTransform: "uppercase",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "600",
            }}
          >
            {subtitle}
          </span>
          <h2
            className="tracking-wider text-7xl sm:text-8xl md:text-9xl"
            style={{ fontFamily: "Morganite Black" }}
          >
            <BounceComponent title={title} />
          </h2>
        </m.div>
      </LazyMotion>
    </div>
  );
};

export default SectionTitle;
