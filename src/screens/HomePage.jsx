import React from "react";
import { createUseStyles } from "react-jss";
import { useState, useEffect } from "react";
import { useWebcamCapture } from "../useWebcamCapture";
import paintHand from "../../src/Assets/paint-hand.png";
import realisticHand from "../../src/Assets/realistic-hand.png";
import slap from "../../src/Assets/slap.png";
import comic from "../../src/Assets/comic.png";
import SocialShare from "../components/SocialShare";
import { FaCloudDownloadAlt } from "react-icons/fa";

const logos = new Array(slap, realisticHand, paintHand, comic);

const useStyles = createUseStyles((theme) => ({
  Container: {
    backgroundColor: theme.palette.text,
    color: "white",
    "& main": {
      width: "80%",
      margin: "0 auto",
      paddingTop: "30px",
      // backgroundColor: "#696E77",
      // display: "flex",
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
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#282f49",
    border: "solid black",
    borderColor: "white",
    borderWidth: " 3px 3px 5px 5px",
    borderRadius: "4% 95% 6% 95%/95% 4% 92% 5%",
    padding: "20px",
    // transform: "rotate(-2deg)",

    "& img": {
      height: "16rem",
    },
  },
  LatestPicture: {
    padding: 4,
    "& img": {
      width: "50%",
      height: "50%",
    },
    "& h3": {
      padding: 8,
      textAlign: "center",
      width: "100%",
    },
  },

  Download: {
    position: "absolute",
    padding: "10px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  Gallery: {
    height: "700px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    "& img": {
      width: "275px",
      height: "200px",
    },
  },
  PicTitle: {
    bottom: "10px",
    margin: "0",
  },
}));

const stickers = logos.map((url, i) => {
  const img = document.createElement("img");
  img.src = url;
  const id = 1 + i++;

  return { img, url, id };
});

function HomePage(props) {
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

  function download(dataurl, filename) {
    const link = document.createElement("a");
    link.href = dataurl;
    link.download = filename;
    link.click();
  }

  // console.log(gallery);

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
                    <img alt={`sticker-${sticker}`} src={sticker.url} />
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
              {picture && (
                <div className={classes.LatestPicture}>
                  <h3>Cherish this moment forever </h3>
                  <h4>
                    You slapped yourself {``}
                    {gallery.length == 1
                      ? `${gallery.length} time`
                      : `${gallery.length} times!`}
                  </h4>

                  {/* <SocialShare url={picture.dataUri} /> */}
                  <FaCloudDownloadAlt
                    size={45}
                    className={classes.Download}
                    style={{ right: "900px", paddingTop: "20px" }}
                    onClick={() => download(picture.dataUri, picture.title)}
                  />
                  <h3 className={classes.PicTitle}>{picture.title}</h3>
                  <img
                    alt={"capture"}
                    src={picture.dataUri}
                    className={classes.LatestImage}
                  />
                </div>
              )}

              {gallery.length > 1 && (
                <div className={classes.Gallery}>
                  <h1> </h1>
                  {gallery.slice(1).map((pic) => {
                    return (
                      <>
                        <div className={classes.GalleryView}>
                          <FaCloudDownloadAlt
                            size={30}
                            className={classes.Download}
                            onClick={() => download(pic.dataUri, pic.title)}
                          />
                          <img src={pic.dataUri} />
                          <h3 className={classes.PicTitle}>{pic.title}</h3>
                        </div>
                      </>
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
}

export default HomePage;
