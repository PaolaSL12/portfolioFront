import "./aWrapper.css";

const AWrapper = ({ href, url, alt, c, sc= "" }) => {
  return (
    <div className={`aWpr ${c}`}>
      <a target="blank" href={href}>
        <img src={url} alt={alt} className={sc} />
      </a>
    </div>
  );
};

export default AWrapper;
