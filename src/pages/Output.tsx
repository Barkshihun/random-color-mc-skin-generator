import { createSelector } from "@reduxjs/toolkit";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import RenderedSkin from "../components/RenderedSkin";

function Output({ setIsGenerated }: { setIsGenerated: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [isRendering, setRendering] = useState(true);
  const getRgbaObj = (state: RootState) => state.rgbaObj.value;
  const rgbaObjSelector = createSelector(getRgbaObj, (rgbaObj) => rgbaObj);
  const rgbaObj = useSelector(rgbaObjSelector) as RgbaObj<number>;

  const ROW_DATA = 256;
  const HEAD = {
    START_COL_DATA: 0,
    END_COL_DATA: 128,
    END_ROW: 16,
    ONE_BOX_COL_DATA: 32,
  };
  const LIMB = {
    ONE_BOX_COL_DATA: 16,
    TOTAL_ROW: 16,
    WIDTH_DATA: 64,
  };
  const BODY = {
    START_COL_DATA: 64,
    END_COL_DATA: 158,
    START_ROW: 16,
    END_ROW: 32,
    TOTAL_ROW: 16,
  };
  let imageData = useRef<ImageData>();
  let noOverlayImageData = useRef<ImageData>();
  const makeImageData = () => {
    const tempCanvasCtx = document.createElement("canvas").getContext("2d") as CanvasRenderingContext2D;
    const tempImageData = tempCanvasCtx.createImageData(64, 64);
    const tempNoOverlayImageData = tempCanvasCtx.createImageData(64, 64);
    const fillPixel = (pixelData: number, isOverlayPixel = false) => {
      const randomRed = Math.floor(Math.random() * (rgbaObj.red.max - rgbaObj.red.min + 1)) + rgbaObj.red.min;
      const randomGreen = Math.floor(Math.random() * (rgbaObj.green.max - rgbaObj.green.min + 1)) + rgbaObj.green.min;
      const randomBlue = Math.floor(Math.random() * (rgbaObj.blue.max - rgbaObj.blue.min + 1)) + rgbaObj.blue.min;
      const randomAlpha = Math.floor(Math.random() * (rgbaObj.alpha.max - rgbaObj.alpha.min + 1)) + rgbaObj.alpha.min;
      tempImageData.data[pixelData] = randomRed;
      tempImageData.data[pixelData + 1] = randomGreen;
      tempImageData.data[pixelData + 2] = randomBlue;
      tempImageData.data[pixelData + 3] = isOverlayPixel ? randomAlpha : 255;

      tempNoOverlayImageData.data[pixelData] = randomRed;
      tempNoOverlayImageData.data[pixelData + 1] = randomGreen;
      tempNoOverlayImageData.data[pixelData + 2] = randomBlue;
      tempNoOverlayImageData.data[pixelData + 3] = isOverlayPixel ? 0 : 255;
    };
    const fillHead = () => {
      for (let row = 0; row < HEAD.END_ROW; row++) {
        for (let col = HEAD.START_COL_DATA; col < HEAD.END_COL_DATA; col += 4) {
          if (col === 0 && row < 8) {
            col += 28;
            continue;
          }
          if (col === 96 && row < 8) {
            break;
          }
          fillPixel(col + row * ROW_DATA);
          fillPixel(col + HEAD.ONE_BOX_COL_DATA * 4 + row * ROW_DATA, true); // Overlay
        }
      }
    };
    const fillRight = (direction: "leg" | "arm") => {
      const START_COL_DATA = direction === "leg" ? 0 : 160;
      const END_COL_DATA = START_COL_DATA + 64;
      const START_ROW = 16;
      const END_ROW = START_ROW + LIMB.TOTAL_ROW;
      for (let row = START_ROW; row < END_ROW; row++) {
        for (let col = START_COL_DATA; col < END_COL_DATA; col += 4) {
          if (col === START_COL_DATA && row < START_ROW + 4) {
            col += 12;
            continue;
          }
          if (col === START_COL_DATA + 48 && row < START_ROW + 4) {
            break;
          }
          fillPixel(col + row * ROW_DATA);
          fillPixel(col + (row + LIMB.TOTAL_ROW) * ROW_DATA, true); // Overlay
        }
      }
    };
    const fillLeft = (direction: "leg" | "arm") => {
      const START_COL_DATA = direction === "leg" ? 0 : 128;
      const END_COL_DATA = START_COL_DATA + 64;
      const START_ROW = 48;
      const END_ROW = START_ROW + LIMB.TOTAL_ROW;
      for (let row = START_ROW; row < END_ROW; row++) {
        for (let col = START_COL_DATA; col < END_COL_DATA; col += 4) {
          if (col === START_COL_DATA && row < START_ROW + 4) {
            col += 12;
            continue;
          }
          if (col === START_COL_DATA + 48 && row < START_ROW + 4) {
            break;
          }
          if (direction === "leg") {
            fillPixel(col + row * ROW_DATA + LIMB.WIDTH_DATA);
            fillPixel(col + row * ROW_DATA, true); // Overlay
          } else {
            fillPixel(col + row * ROW_DATA);
            fillPixel(col + row * ROW_DATA + LIMB.WIDTH_DATA, true); // Overlay
          }
        }
      }
    };
    const fillBody = () => {
      for (let row = BODY.START_ROW; row < BODY.END_ROW; row++) {
        for (let col = BODY.START_COL_DATA; col < BODY.END_COL_DATA; col += 4) {
          if (col === BODY.START_COL_DATA && row < 20) {
            col += 12;
            continue;
          }
          if (col === BODY.START_COL_DATA + 80 && row < 20) {
            break;
          }
          fillPixel(col + row * ROW_DATA);
          fillPixel(col + (row + BODY.TOTAL_ROW) * ROW_DATA, true); // Overlay
        }
      }
    };
    fillHead();
    fillRight("leg");
    fillRight("arm");
    fillBody();
    fillLeft("leg");
    fillLeft("arm");
    imageData.current = tempImageData;
    noOverlayImageData.current = tempNoOverlayImageData;
    setRendering(false);
  };
  useEffect(() => {
    makeImageData();
  }, []);
  return <>{!isRendering && <RenderedSkin imageData={imageData.current as ImageData} noOverlayImageData={noOverlayImageData.current as ImageData} setIsGenerated={setIsGenerated} />}</>;
}
export default Output;
