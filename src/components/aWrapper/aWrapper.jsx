import "./aWrapper.css";

const AWrapper = ({ href, url, alt, c }) => {
  return (
    <div className={`aWpr ${c}`}>
      <a target="blank" href={href}>
        <img src={url} alt={alt} />
      </a>
    </div>
  );
};

export default AWrapper;
