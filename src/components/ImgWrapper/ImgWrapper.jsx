import "./ImgWrapper.css"

const ImgWrapper = ({ url, alt, c, imgc="" }) => {
    return (
      <div className={`ImgWpr ${c}`} >
        <img src={url} alt={alt} className={imgc}/>
      </div>
    );
  };

export default ImgWrapper