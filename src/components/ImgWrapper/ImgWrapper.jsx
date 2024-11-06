import "./ImgWrapper.css"

const ImgWrapper = ({ url, alt, c }) => {
    return (
      <div className={`ImgWpr ${c}`} >
        <img src={url} alt={alt} />
      </div>
    );
  };

export default ImgWrapper