import React from "react";
import { createUseStyles } from "react-jss";
import { useState } from "react";
import { useWebcamCapture } from "../useWebcamCapture";
import paintHand from "../../src/Assets/paint-hand.png";
import realisticHand from "../../src/Assets/realistic-hand.png";
import slap from "../../src/Assets/slap.png";
import comic from "../../src/Assets/comic.png";

const logos = [slap, realisticHand, paintHand, comic];

const useStyles = createUseStyles((theme) => ({
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
  const [title, setTitle] = useState("SLAPPE!");

  // webcam behavior hook
  const [
    handleVideoRef, // callback function to set ref for invisible video element
    handleCanvasRef, // callback function to set ref for main canvas element
    handleCapture, // callback function to trigger taking the picture
    picture, // latest captured picture data object
  ] = useWebcamCapture(sticker?.img, title);

  console.log(picture);

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
            <button key={sticker.id} onClick={() => setSticker(sticker)}>
              <img alt={`sticker-${sticker}`} src={sticker.url} />
            </button>
          );
        })}
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
            <img alt={"capture"} src={picture.dataUri} />
            <h3>{picture.title}</h3>
          </div>
        )}
      </section>
    </main>
  );
}

export default HomePage;
