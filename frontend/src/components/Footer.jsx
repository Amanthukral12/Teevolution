const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="px-[3rem] bg-slate-300 w-full absolute bottom-0">
      <div className="text-center">TeeVolution &copy; {currentYear}</div>
    </footer>
  );
};

export default Footer;
