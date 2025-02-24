// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "@/constants/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useRouter } from "next/navigation";

const SocialLinks = () => {
  const router = useRouter();
  return (
    <div className="w-full h-[100px] bg-grayscale-950 flex justify-center items-center space-x-10 p-6">
      <div
        onClick={() => {
          router.push("http://github.com/SANAT-01/");
        }}
      >
        <FontAwesomeIcon
          className="text-3xl text-green-300 hover:text-primary-400 hover:scale-[1.1] transition-all duration-75"
          icon={icons.faGithub}
        />
      </div>
      <div
        onClick={() => {
          router.push("https://www.linkedin.com/in/sanat-tudu/");
        }}
      >
        <FontAwesomeIcon
          className="text-3xl text-green-300 hover:text-primary-400 hover:scale-[1.1] transition-all duration-75"
          icon={icons.faLinkedinIn}
        />
      </div>
      <div
        onClick={() => {
          router.push("http://instagram/_sanat_tudu");
        }}
      >
        <FontAwesomeIcon
          className="text-3xl text-green-300 hover:text-primary-400 hover:scale-[1.1] transition-all duration-75"
          icon={icons.faInstagram}
        />
      </div>
    </div>
  );
};

export default SocialLinks;
