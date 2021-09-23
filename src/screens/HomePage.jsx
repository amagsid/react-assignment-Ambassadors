import React from "react";
import { createUseStyles } from "react-jss";
import { useState } from "react";
import { useWebcamCapture } from "../useWebcamCapture";
import slap from "../../src/Assets/slap.png";
import star from "../../src/Assets/star.png";
import heart from "../../src/Assets/heart.png";

const logos = [slap, star, heart];

const useStyles = createUseStyles((theme) => ({
  "@global body": {
    background: theme.palette.background,
    color: theme.palette.text,
    fontFamily: "sans-serif",
  },

  App: {
    padding: "20px",
    background: theme.palette.primary,
    maxWidth: "800px",
    minHeight: "600px",
    margin: "auto",
    "& a": {
      color: theme.palette.text,
    },
  },
  Header: {
    "&  h1": {
      fontFamily: "sans-serif",
      cursor: "pointer",
      fontSize: "4rem",
    },
  },
  Main: {
    background: theme.palette.secondary,

    "& canvas": {
      width: "100%",
      height: "auto",
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
  Gallery: {
    "& img": {
      height: "16rem",
    },
  },
  Picture: {
    background: "black",
    padding: 4,
    position: "relative",
    display: "inline-block",
    "& h3": {
      padding: 8,
      textAlign: "center",
      width: "100%",
    },
  },
}));

const stickers = logos.map((url) => {
  const img = document.createElement("img");
  img.src = url;
  return { img, url };
});

function HomePage(props) {
  // css classes from JSS hook
  const classes = useStyles(props);
  // currently active sticker
  const [sticker, setSticker] = useState();
  // title for the picture that will be captured
  const [title, setTitle] = useState("SLAPPE!");

  // webcam behavior hook
  const [
    handleVideoRef, // callback function to set ref for invisible video element
    handleCanvasRef, // callback function to set ref for main canvas element
    handleCapture, // callback function to trigger taking the picture
    picture, // latest captured picture data object
  ] = useWebcamCapture(sticker?.img, title);
  return (
    <main>
      <section className={classes.Gallery}>
        Step one: Give it a name
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
      </section>
      <section className={classes.Stickers}>
        Step 2: select your sticker...
        {stickers.map((sticker) => {
          return (
            <button onClick={() => setSticker(sticker)}>
              <img src={sticker.url} />
            </button>
          );
        })}
        {/* <button onClick={() => setSticker(stickers[0])}>
      <img src={stickers[0].url} />
    </button> */}
      </section>
      <section className={classes.Main}>
        Step three: Slap your self!
        <video ref={handleVideoRef} />
        <canvas
          ref={handleCanvasRef}
          width={2}
          height={2}
          onClick={handleCapture}
        />
      </section>
      <section className={classes.Gallery}>
        Step 4: Cherish this moment forever
        {picture && (
          <div className={classes.Picture}>
            <img src={picture.dataUri} />
            <h3>{picture.title}</h3>
          </div>
        )}
      </section>
    </main>
  );
}

export default HomePage;
