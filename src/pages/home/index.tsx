import { useState, useEffect } from "react";
import useAxios from "../../utils/apiClient";
export default function Home() {
  const [answer, setAnswer] = useState("");
  const [buttonColors, setButtonColors] = useState<{ [key: string]: string }>(
    {}
  );
  const [showText, setShowText] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [points, setPoints] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, options, text, loading } = useAxios(currentPage);

  useEffect(() => {
    if (data !== undefined) setAnswer(data?.[0]?.name?.common);
  }, [data]);

  const handleClick = (name: string) => {
    setAttempt(1);
    const newColors = { ...buttonColors };
    newColors[name] = name === answer ? "limegreen" : "orangered";
    setButtonColors(newColors);
    if (name === answer) {
      setShowText(true);
      setPoints(points + 1);
    } else {
      setShowText(false);
    }
  };
  const handleClickRestart = () => {
    setCurrentPage(1);
    setAttempt(0);
    setButtonColors({});
    setShowText(false);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    setAttempt(0);
    setButtonColors({});
    setShowText(false);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "whitesmoke",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "20%",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
          }}
        >
          <p>{currentPage}/15</p>
          {currentPage >= 15 ? (
            <button onClick={handleClickRestart}>Reiniciar</button>
          ) : (
            <button onClick={handleNextPage}>Próxima</button>
          )}
          {/* {attempt === 1 ? (
            <button
              style={{ height: "fit-content" }}
              onClick={() => {
                setAttempt(0);
                setButtonColors({});
                setShowText(false);
              }}
            >
              Outra tentativa
            </button>
          ) : (
            <></>
          )} */}
        </div>
        {loading ? (
          <></>
        ) : (
          <img
            alt="flag"
            src={data?.[0]?.flags?.png}
            style={{
              minHeight: "25vh",
              maxHeight: "25vh",
              minWidth: "20vw",
              maxWidth: "20vw",
            }}
          ></img>
        )}
        {options?.map((countryName) => (
          <button
            key={countryName}
            style={{
              border: "1px solid",
              width: "100%",
              textAlign: "center",
              marginTop: "5px",
              marginBottom: "5px",
              padding: "5px",
              backgroundColor: buttonColors[countryName] || "",
              cursor: `${attempt === 1 ? "default" : "pointer"}`,
            }}
            onClick={() => handleClick(countryName)}
            disabled={attempt === 1 ? true : false}
          >
            {countryName}
          </button>
        ))}
        {showText ? <p style={{ maxWidth: "100%" }}>{text}</p> : <></>}
      </div>
    </div>
  );
}
