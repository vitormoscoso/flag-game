import { useState, useEffect } from "react";
import useAxios from "../../utils/apiClient";
import { StyledButton } from "./styles";
export default function Home() {
  const [answer, setAnswer] = useState("");
  const [buttonColors, setButtonColors] = useState<{ [key: string]: string }>(
    {}
  );
  const [showText, setShowText] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [points, setPoints] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, options, text, loading } = useAxios(currentPage);

  useEffect(() => {
    if (data !== undefined) setAnswer(data?.[0]?.translations?.por?.common);
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
  const handleClickResult = () => {
    // setCurrentPage(1);
    // setAttempt(0);
    // setButtonColors({});
    // setShowText(false);
    setGameOver(true);
  };
  const handleClickRestart = () => {
    setCurrentPage(1);
    setAttempt(0);
    setButtonColors({});
    setShowText(false);
    setGameOver(false);
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
            <button onClick={handleClickResult}>Obter Resultado!</button>
          ) : (
            attempt === 1 && <button onClick={handleNextPage}>Próxima</button>
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
          <StyledButton
            key={countryName}
            bgColor={buttonColors[countryName]}
            onClick={() => handleClick(countryName)}
            disabled={attempt === 1}
          >
            {countryName}
          </StyledButton>
        ))}
        {showText ? <p style={{ maxWidth: "100%" }}>{text}</p> : <></>}
        {gameOver ? (
          <div style={{display: "flex", flexDirection:"column"}}>
            <p>Parabéns! Você acertou {points}\15 bandeiras</p>
            <button onClick={handleClickRestart}>Jogar novamente</button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
