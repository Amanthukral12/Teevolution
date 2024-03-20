import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="px-[3rem] bg-slate-300 w-full absolute bottom-0">
      <div className="text-center text-lg">
        Made with <span className=" text-red-700">&lt;/&gt;</span> by Aman
        Thukral
      </div>
      <div className="flex justify-center my-2">
        <Link to={"https://github.com/Amanthukral12"} target="_blank">
          <FaGithub className="text-xl mx-2" />
        </Link>
        <Link
          to={"https://www.linkedin.com/in/aman-thukral-574b37150/"}
          target="_blank"
        >
          <FaLinkedin className="text-xl mx-2" />
        </Link>
        <Link to={"https://twitter.com/aman_thukral12"} target="_blank">
          <FaTwitter className="text-xl mx-2" />
        </Link>
        <Link to={"https://amanthukral.netlify.app/"} target="_blank">
          <FaGlobe className="text-xl mx-2" />
        </Link>
      </div>
      <div className="text-center">TeeVolution &copy; {currentYear}</div>
    </footer>
  );
};

export default Footer;
