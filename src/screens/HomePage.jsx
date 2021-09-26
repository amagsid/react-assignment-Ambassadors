import React from "react";
import { createUseStyles } from "react-jss";
import { useState } from "react";
import { useWebcamCapture } from "../useWebcamCapture";
//icons import
import paintHand from "../../src/assets/paint-hand.png";
import realisticHand from "../../src/assets/realistic-hand.png";
import slap from "../../src/assets/slap.png";
import comic from "../../src/assets/comic.png";
import boxingGloves from "../../src/assets/boxing-gloves.png";
import { FaCloudDownloadAlt } from "react-icons/fa";
// import SocialShare from "../components/SocialShare";

const logos = [slap, realisticHand, paintHand, comic, boxingGloves];

const useStyles = createUseStyles((theme) => ({
  Container: {
    backgroundColor: theme.palette.text,
    color: "white",
    "& main": {
      width: "80%",
      margin: "0 auto",
      paddingTop: "30px",
      textAlign: "center",
    },
  },
  Choices: {
    "& input": {
      width: "300px",
      padding: "10px",
      border: "none",
      borderBottom: "4px solid #AC0C44",
      outline: "none",
      "&:focus": {
        color: "#AC0C44",
      },
    },
  },
  CameraView: {
    "& canvas": {
      width: "70%",
      height: "auto",
      margin: "0 auto",
    },
    "& video": {
      display: "none",
    },
  },
  Stickers: {
    "& img": {
      height: "4rem",
    },
  },
  Thumbnails: {
    width: "100%",
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#282f49",
    border: "solid black",
    borderColor: "white",
    borderWidth: " 3px 3px 5px 5px",
    borderRadius: "4% 95% 6% 95%/95% 4% 92% 5%",
    padding: "10px 20px 50px 20px",

    "& img": {
      height: "16rem",
      border: "solid .5px white",
    },
  },
  LatestPicture: {
    margin: "0 auto",
    position: "relative",
    padding: 4,

    "& h3": {
      padding: 8,
      textAlign: "center",
    },
  },
  Download: {
    position: "absolute",
    padding: "10px",
    overflowY: "scroll",
    maxHeight: "100%",
    "&:hover": {
      cursor: "pointer",
    },
  },
  Gallery: {
    maxHeight: "700px",
    width: "100%",
    overflow: "scroll",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    "& img": {
      width: "275px",
      height: "200px",
    },
  },
  GalleryView: {
    position: "relative",
  },
  PicTitle: {
    position: "absolute",
    bottom: "0",
    borderRadius: "10px 10px 10px 10px ",
    right: "10px",
    textShadow: "2px 2px 2px #AC0C44",
  },
}));

//looping over logos to create an array of objects with details for each
const stickers = logos.map((logo, i) => {
  const img = document.createElement("img");
  img.src = logo;

  return {
    logo: logo,
    id: i + 1,
    name: logo.slice(14, -4),
    img,
  };
});

const HomePage = (props) => {
  /*css classes from JSS hook  */
  const classes = useStyles(props);
  // currently active sticker
  const [sticker, setSticker] = useState();
  // title for the picture that will be captured
  const [title, setTitle] = useState("");
  // gallery of taken pictures
  const [gallery, setGallery] = useState([]);

  // webcam behavior hook
  const [
    handleVideoRef, // callback function to set ref for invisible video element
    handleCanvasRef, // callback function to set ref for main canvas element
    handleCapture, // callback function to trigger taking the picture
    picture, // latest captured picture data object
  ] = useWebcamCapture(sticker?.img, title);

  //download image file
  const download = (dataurl, filename) => {
    const link = document.createElement("a");
    link.href = dataurl;
    link.download = filename;
    link.click();
  };

  return (
    <>
      <div className={classes.Container}>
        <main>
          <div>
            <section className={classes.Choices}>
              <input
                type="text"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
                placeholder="First, give it a name"
              />
            </section>
            <section className={classes.Stickers}>
              <h3> Then, select your sticker... </h3>

              {stickers.map((sticker) => {
                return (
                  <button
                    className="raise"
                    key={sticker.id}
                    onClick={() => setSticker(sticker)}
                  >
                    <img alt={sticker.name} src={sticker.logo} />
                  </button>
                );
              })}
            </section>
          </div>
          <section className={classes.CameraView}>
            <h3> Go ahead, Slap yourself! </h3>
            <video ref={handleVideoRef} />
            <canvas
              ref={handleCanvasRef}
              width={2}
              height={2}
              onClick={() => {
                handleCapture();
                setGallery((prev) => [...prev, picture]);
              }}
            />
          </section>
          {gallery.length > 0 && (
            <section className={classes.Thumbnails}>
              <h3 style={{ marginBottom: "0" }}>
                Cherish this moment forever..{" "}
              </h3>
              <h4 style={{ marginTop: "0", fontSize: "2rem" }}>
                You slapped yourself {``}
                {gallery.length === 1
                  ? `${gallery.length} time`
                  : `${gallery.length} times!`}
              </h4>
              {picture && (
                <div className={classes.LatestPicture}>
                  {/* <SocialShare url={picture.dataUri} /> */}
                  <FaCloudDownloadAlt
                    size={45}
                    className={classes.Download}
                    onClick={() => download(picture.dataUri, picture.title)}
                  />
                  {title !== "" && (
                    <h3 className={classes.PicTitle}>{picture.title}</h3>
                  )}

                  <img alt={"capture"} src={picture.dataUri} />
                </div>
              )}

              {gallery.length > 1 && (
                <div className={classes.Gallery}>
                  {gallery
                    .slice(1)
                    .reverse()
                    .map((pic, i) => {
                      return (
                        <div className={classes.GalleryView} key={i}>
                          <FaCloudDownloadAlt
                            size={30}
                            className={classes.Download}
                            onClick={() => download(pic.dataUri, pic.title)}
                          />
                          <img alt="galler-pic" src={pic.dataUri} />
                          <h3
                            style={{ padding: "10px" }}
                            className={classes.PicTitle}
                          >
                            {pic.title}
                          </h3>
                        </div>
                      );
                    })}
                </div>
              )}
            </section>
          )}
        </main>
      </div>
    </>
  );
};

export default HomePage;
