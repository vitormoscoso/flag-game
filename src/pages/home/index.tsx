import axios from "axios";
import { useState } from "react";
import {
  Container,
  Card,
  Title,
  Subtitle,
  ButtonGroup,
  Button,
  RegionGrid,
  RegionButton,
  InputGroup,
  Input,
  ErrorMessage,
  SectionTitle,
  Divider,
} from "./styles";

export default function Home() {
  const [newGame, setNewGame] = useState<boolean>(false);
  const [existingGame, setExistingGame] = useState<boolean>(false);
  const [gameCode, setGameCode] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleNewGame = async (region: string) => {
    try {
      let baseUrl = "";
      if (region === "europa") {
        baseUrl = "https://restcountries.com/v3.1/region/europe?fields=cca2";
        region = "europe";
      } else if (region === "mundo") {
        baseUrl = "https://restcountries.com/v3.1/all?fields=cca2";
      } else {
        baseUrl = `https://restcountries.com/v3.1/region/${region}?fields=cca2`;
      }

      const countriesList = await axios.get(baseUrl);

      if (countriesList) {
        let randomCountries: string[] = [];
        for (let i = 0; i < 10; i++) {
          const randomIndex = Math.floor(
            Math.random() * countriesList.data.length,
          );

          if(randomCountries.includes(countriesList.data[randomIndex].cca2)) {
            i--;
            continue;
          }

          randomCountries.push(countriesList.data[randomIndex].cca2);
        }
        const path = `/flag-game/jogo/${randomCountries.join("")}`;
        window.location.href = path;
      } else {
        setNewGame(false);
        setError("Erro ao buscar países por região.");
      }
    } catch (error) {
      setNewGame(false);
      setError("Erro ao iniciar jogo.");
      console.error("Erro ao iniciar jogo", error);
    }
  };

  const handleExistingGame = (code: string) => {
    const path = `/flag-game/jogo/${code}`;
    window.location.href = path;
  };

  return (
    <Container>
      <Card>
        <Title>🌍 Jogo das Bandeiras</Title>
        <Subtitle>Teste seus conhecimentos sobre bandeiras do mundo!</Subtitle>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <ButtonGroup>
          <Button
            variant={newGame ? "primary" : "secondary"}
            onClick={() => {
              setNewGame(true);
              setExistingGame(false);
            }}
          >
            🎮 Novo Jogo
          </Button>
          <Button
            variant={existingGame ? "primary" : "secondary"}
            onClick={() => {
              setExistingGame(true);
              setNewGame(false);
            }}
          >
            🔗 Jogo Existente
          </Button>
        </ButtonGroup>

        {newGame && (
          <>
            <Divider />
            <SectionTitle>Escolha uma região:</SectionTitle>
            <RegionGrid>
              {["mundo", "americas", "africa", "asia", "europa", "oceania"].map(
                (region) => (
                  <RegionButton
                    key={region}
                    onClick={() => handleNewGame(region)}
                  >
                    {region.charAt(0).toUpperCase() + region.slice(1)}
                  </RegionButton>
                ),
              )}
            </RegionGrid>
          </>
        )}

        {existingGame && (
          <>
            <Divider />
            <SectionTitle>Digite o código do jogo:</SectionTitle>
            <InputGroup>
              <Input
                type="text"
                placeholder="Código do jogo"
                value={gameCode}
                onChange={(e) => setGameCode(e.target.value)}
              />
              <Button
                variant="primary"
                onClick={() => handleExistingGame(gameCode)}
              >
                Jogar
              </Button>
            </InputGroup>
          </>
        )}
      </Card>
    </Container>
  );
}
