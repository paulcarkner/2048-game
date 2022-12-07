import Style from "./App.module.css";
import "./Game.js";

//Styles set programatically so App can be used as sub-module in portfolio
const bodyStyles = {
  width: "100vw",
  height: "100vh",
  margin: 0,
  padding: 0,
  overflow: "hidden",
  fontFamily: "sans-serif",
  fontSize: "min(7.5vw, 7.5vh, 48px)",
  fontWeight: "bold",
  backgroundColor: "#444",
};

const rootStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
};

export default function App() {
  //Set BODY and #root styles programatically
  for (let key in bodyStyles) document.body.style[key] = bodyStyles[key];
  for (let key in rootStyles) document.getElementById("root").style[key] = rootStyles[key];

  return (
    <table className={Style.App}>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
}
