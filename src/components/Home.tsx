import { useState } from "react";
import { useDispatch } from "react-redux";
import { generate } from "../store/isGeneratedSlice";

function Home() {
  const dispatch = useDispatch();
  interface rgbaList {
    name: String;
    minId: "rMin" | "gMin" | "bMin" | "aMin";
    maxId: "rMax" | "gMax" | "bMax" | "aMax";
  }
  interface rgbaState {
    rMin: string | number;
    rMax: string | number;
    gMin: string | number;
    gMax: string | number;
    bMin: string | number;
    bMax: string | number;
    aMin: string | number;
    aMax: string | number;
  }
  const MIN_VALUE = 0;
  const MAX_VALUE = 255;
  const [rgbaObj, setRgbaObj]: [rgbaState, any] = useState({ rMin: "", rMax: "", gMin: "", gMax: "", bMin: "", bMax: "", aMin: "", aMax: "" });
  // const isInvalidValue = (id: string, value: number) => {
  //   switch (id) {
  //     case "redMin":
  //       if (value > redMaxValue) {
  //         return true;
  //       }
  //       break;
  //     case "redMax":
  //       if (value < redMinValue) {
  //         return true;
  //       }
  //       break;
  //     case "greenMin":
  //       if (value > greenMaxValue) {
  //         return true;
  //       }
  //       break;
  //     case "greenMax":
  //       if (value < greenMinValue) {
  //         return true;
  //       }
  //       break;
  //     case "blueMin":
  //       if (value > blueMaxValue) {
  //         return true;
  //       }
  //       break;
  //     case "blueMax":
  //       if (value < blueMinValue) {
  //         return true;
  //       }
  //       break;
  //     default:
  //       return false;
  //   }
  // };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    const input = parseInt(event.target.value);

    if (id === "rMin" || id === "gMin" || id === "bMin" || id === "aMin" || id === "rMax" || id === "gMax" || id === "bMax" || id === "aMax") {
      if (!event.target.value) {
        setRgbaObj((prevRgbaObj: rgbaState) => {
          prevRgbaObj[id] = "";
          return { ...prevRgbaObj };
        });
        return;
      }
      if (input < MIN_VALUE) {
        setRgbaObj((prevRgbaObj: rgbaState) => {
          prevRgbaObj[id] = MIN_VALUE;
          return { ...prevRgbaObj };
        });
      } else if (input > MAX_VALUE) {
        return;
      } else {
        setRgbaObj((prevRgbaObj: rgbaState) => {
          prevRgbaObj[id] = input;
          return { ...prevRgbaObj };
        });
      }
    }
  };
  const rgbaList: rgbaList[] = [
    { name: "R", minId: "rMin", maxId: "rMax" },
    { name: "G", minId: "gMin", maxId: "gMax" },
    { name: "B", minId: "bMin", maxId: "bMax" },
    { name: "A", minId: "aMin", maxId: "aMax" },
  ];
  return (
    <section>
      <h1>랜덤 색깔 스킨 생성기</h1>
      {rgbaList.map((rgbaList, i) => {
        return (
          <div className="w-full flex justify-between" key={i}>
            <span>{rgbaList.name}</span>
            <input id={rgbaList.minId} value={`${rgbaObj[rgbaList.minId]}`} placeholder="최소값" type={"number"} min={0} max={255} onChange={onChange} className=" border w-3/4" />
            <input id={rgbaList.maxId} value={`${rgbaObj[rgbaList.maxId]}`} placeholder="최댓값" type={"number"} min={0} max={255} onChange={onChange} className=" border w-3/4" />
          </div>
        );
      })}
      <button
        onClick={() => {
          console.log();

          // dispatch(generate());
        }}
        className="bg-teal-300"
      >
        생성하기
      </button>
    </section>
  );
}
export default Home;
