import { useState } from "react";
import { ArrowBigLeft, ArrowBigRight, CircleDot, CircleIcon } from "lucide-react";

export function ImageSlider ({images}) {
    const [imageIdex, setImageIndex] = useState(0);

    const showNextImage = () => {
        setImageIndex(index => {
            if(index === images.length - 1) return 0
            return index + 1
        })
    }

    const showPrevImage = () => {
        setImageIndex(index => {
            if(index === 0) return images.length - 1
            return index - 1
        })
    }

    return (
        <div style={{
            width: "100%",
            height: "100%",
            position: "relative"
        }}>
            <div style={{
                width: "100%",
                height: "100%",
                display: "flex",
                overflow: "hidden"
            }}>
                {
                    images.map(({url, alt}) => (
                        <img 
                            key={url} 
                            src={url} 
                            alt={alt}
                            className="img-slider-img"
                            style={{
                                translate: `${-100 * imageIdex}%`
                            }} />
                    ))
                }
            </div>
            <button onClick={showPrevImage} className="img-slider-btn" style={{left: "0"}} aria-label="View Previous Image">
                <ArrowBigLeft />
            </button>
            <button onClick={showNextImage} className="img-slider-btn" style={{right: "0"}} aria-label="View Next Image">
                <ArrowBigRight />
            </button>
            <div style={{
                position: "absolute",
                bottom: "1rem",
                left: "50%",
                translate: "-50%",
                display: "flex",
                gap: ".25rem"
            }}>
                {
                    images.map((_, index) => (
                        <button className="img-slider-dot-btn" onClick={() => setImageIndex(index)} aria-label={`View Image ${index}`}>
                            {
                                index === imageIdex ? 
                                <CircleDot aria-hidden /> : 
                                <CircleIcon aria-hidden />
                            }
                        </button>
                    ))
                }
            </div>
        </div>  
    )
}