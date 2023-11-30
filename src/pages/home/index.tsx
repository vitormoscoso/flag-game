import { useState, useEffect } from "react";
import {
  CardContainer,
  ContentConatiner,
  PageConatiner,
  StyledButton,
} from "./styles";
import MapComponent from "../../components/MapComponent";
import ResultModal from "../../components/ResultModal";
import { useMediaQuery } from "react-responsive";
import useGetAmericas from "../../utils/useGetAmericas";

export default function Home() {
  const [answer, setAnswer] = useState<string>("");
  const [buttonColors, setButtonColors] = useState<{ [key: string]: string }>(
    {}
  );
  const [showText, setShowText] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [attempt, setAttempt] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  // const isBigScreen = useMediaQuery({ query: "(min-width: 768px)" });

  const { data, options, text, loading } = useGetAmericas(currentPage);

  useEffect(() => {
    if (data !== undefined) setAnswer(data?.[0]?.translations?.por?.common);
  }, [data]);

  const handleClick = (name: string) => {
    setAttempt(1);
    const newColors = { ...buttonColors };
    newColors[name] = name === answer ? "limegreen" : "orangered";
    newColors[answer] = "limegreen";
    setButtonColors(newColors);
    if (name === answer) {
      setShowText(true);
      setPoints(points + 1);
    } else {
      setShowText(false);
    }
  };
  const handleClickResult = () => {
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
    <>
      {isMobile ? (
        <PageConatiner>
          <ContentConatiner>
            <CardContainer>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p>{currentPage}/15</p>
                {currentPage >= 15 ? (
                  <button onClick={handleClickResult}>Obter Resultado!</button>
                ) : (
                  attempt === 1 && (
                    <button onClick={handleNextPage}>Próxima</button>
                  )
                )}
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
                    minWidth: "100%",
                    maxWidth: "100%",
                  }}
                ></img>
              )}
              {options?.map((countryName) => (
                <StyledButton
                  key={countryName}
                  bgColor={buttonColors[countryName]}
                  selected={attempt === 1}
                  attempt={attempt}
                  onClick={() => handleClick(countryName)}
                  disabled={attempt === 1}
                >
                  {countryName}
                </StyledButton>
              ))}
              {gameOver ? (
                <ResultModal
                  result={points}
                  handleClickRestart={handleClickRestart}
                />
              ) : (
                <></>
              )}
            </CardContainer>
            {showText ? (
              <div style={{ width: "100%", height: "25%", marginTop: "3%" }}>
                {/* <MapComponent position={position} /> */}
                <p style={{ maxWidth: "100%" }}>{text}</p>
              </div>
            ) : (
              <></>
            )}
          </ContentConatiner>
        </PageConatiner>
      ) : (
        <>
          <div
            style={{
              position: "fixed",
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
                alignItems: "center",
                width: "40%",
                height: "90%",
              }}
            >
              <div
                style={{
                  width: "55%",
                  height: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p>{currentPage}/15</p>
                  {currentPage >= 15 ? (
                    <button onClick={handleClickResult}>
                      Obter Resultado!
                    </button>
                  ) : (
                    attempt === 1 && (
                      <button onClick={handleNextPage}>Próxima</button>
                    )
                  )}
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
                      minWidth: "100%",
                      maxWidth: "100%",
                    }}
                  ></img>
                )}
                {options?.map((countryName) => (
                  <StyledButton
                    key={countryName}
                    bgColor={buttonColors[countryName]}
                    selected={attempt === 1}
                    attempt={attempt}
                    onClick={() => handleClick(countryName)}
                    disabled={attempt === 1}
                  >
                    {countryName}
                  </StyledButton>
                ))}
                {gameOver ? (
                  <ResultModal
                    result={points}
                    handleClickRestart={handleClickRestart}
                  />
                ) : (
                  <></>
                )}
              </div>
              {showText ? (
                <div style={{ width: "90%", height: "30%", marginTop: "3%" }}>
                  {/* <MapComponent position={position} /> */}
                  <p style={{ maxWidth: "100%" }}>{text}</p>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
