"use client";
import ContactForm from "@/pages/Contact/contactForm";
import ContactServices from "@/pages/Contact/contactService";
import GlobeComponent from "@/components/globe";
import SectionTitle from "@/pages/Contact/sectionTitle";
import SocialLinks from "@/pages/Contact/socialLinks";
import { m, LazyMotion, domAnimation } from "framer-motion";

const Contact = () => {
  return (
    <div
      id="contact"
      className="w-full flex flex-col items-center justify-center"
    >
      <div className="px-10 w-full md:w-[90%] min-h-[800px] flex flex-col ">
        <div className="w-full">
          <SectionTitle title="Contact" subtitle="Get in touch" />
        </div>
        <div className="w-full flex justify-center items-center">
          <LazyMotion features={domAnimation} strict>
            <m.div
              initial={{ x: 200 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="w-full sm:w-[90%] md:w-[80%] sm:h-fit items-center rounded-xl border-4 border-green-300 p-4 flex flex-col sm:flex-row gap-4"
            >
              <ContactServices />
              <ContactForm />
            </m.div>
          </LazyMotion>
        </div>
      </div>
      <div className="w-full bg-black flex justify-center mt-10">
        <GlobeComponent />
      </div>
      <div className="w-full flex flex-col">
        <SocialLinks />
        <div className="bg-grayscale-950 flex justify-center pb-4 text-grayscale-400">
          <span className="text-white">
            Created by <em>Sanat Tudu</em>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
