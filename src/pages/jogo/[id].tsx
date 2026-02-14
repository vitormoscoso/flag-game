import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { WhatsappIcon } from "react-share";
import {
  Container,
  FlagContainer,
  FlagImage,
  GameCard,
  Header,
  LoadingContainer,
  LoadingText,
  NavButton,
  NavigationContainer,
  OptionButton,
  OptionsContainer,
  ProgressBar,
  ProgressFill,
  QuestionCounter,
  Score,
  ScoreText,
  ShareContainer,
  Spinner,
  Title,
} from "./styles";

interface CountryInfo {
  name: { common: string };
  flags: { png: string };
  capital?: string[];
  area: number;
  subregion: string;
  population: number;
  translations: { por: { common: string } };
  latlng: number[];
  currencies: any;
  region: string;
}

interface QuestionState {
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  answered: boolean;
}

export default function Game() {
  const navigate = useNavigate();
  const gameID = useParams().id;
  const [countriesInfo, setCountriesInfo] = useState<CountryInfo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [questionStates, setQuestionStates] = useState<QuestionState[]>([]);
  const [options, setOptions] = useState<string[][]>([]);
  const [gameFinished, setGameFinished] = useState(false);

  useEffect(() => {
    const handleCountriesInfo = async () => {
      try {
        const countries = gameID?.match(/.{1,2}/g) || [];
        const response = await Promise.all(
          countries.map((code) =>
            axios.get(
              `https://restcountries.com/v3.1/alpha/${code}?fields=name,flags,capital,area,subregion,population,translations,latlng,currencies,region`,
            ),
          ),
        );
        const countriesData = response.map((res) => res.data);
        setCountriesInfo(countriesData);

        // Inicializar estados das questões
        const initialStates = countriesData.map(() => ({
          selectedAnswer: null,
          isCorrect: null,
          answered: false,
        }));
        setQuestionStates(initialStates);

        // Gerar opções para cada país
        const allOptions = await Promise.all(
          countriesData.map(async (country) => {
            return generateOptions(country.translations.por.common, country.region, countries);
          }),
        );
        setOptions(allOptions);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar informações dos países", error);
        setLoading(false);
      }
    };

    if (gameID) {
      handleCountriesInfo();
    }
  }, [gameID]);

  const generateOptions = async (
    correctAnswer: string,
    region: string,
    excludeCodes: string[],
  ) => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/region/${region}?fields=translations,cca2`,
      );

      let wrongOptions: string[] = [];
      const availableCountries = response.data.filter(
        (c: any) =>
          !excludeCodes.includes(c.cca2) &&
          c.translations?.por?.common !== correctAnswer,
      );

      // Selecionar 4 opções erradas aleatórias
      for (let i = 0; i < 4 && availableCountries.length > 0; i++) {
        const randomIndex = Math.floor(
          Math.random() * availableCountries.length,
        );
        wrongOptions.push(
          availableCountries[randomIndex].translations.por.common,
        );
        availableCountries.splice(randomIndex, 1);
      }

      // Adicionar a resposta correta e embaralhar
      const allOptions = [...wrongOptions, correctAnswer];
      return shuffleArray(allOptions);
    } catch (error) {
      console.error("Erro ao gerar opções", error);
      return [correctAnswer];
    }
  };

  const shuffleArray = (array: string[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleAnswerSelect = (answer: string) => {
    if (questionStates[currentIndex].answered) return;

    const correctAnswer = countriesInfo[currentIndex].translations.por.common;
    const isCorrect = answer === correctAnswer;

    const newStates = [...questionStates];
    newStates[currentIndex] = {
      selectedAnswer: answer,
      isCorrect,
      answered: true,
    };
    setQuestionStates(newStates);
  };

  const handleNext = () => {
    if (currentIndex < countriesInfo.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setGameFinished(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const calculateScore = () => {
    return questionStates.filter((state) => state.isCorrect === true).length;
  };

  const buildShareMessage = () => {
    const score = calculateScore();
    const total = countriesInfo.length;
    const gameUrl = window.location.href;
    return `🌍 Jogo das Bandeiras - Consegui ${score}/${total} pontos! Você consegue me superar?\n\n${gameUrl}`;
  };

  const shareResults = () => {
    const text = buildShareMessage();

    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Resultados copiados para a área de transferência!");
      })
      .catch((err) => {
        console.error("Erro ao copiar os resultados: ", err);
      });
  };

  if (loading) {
    return (
      <Container>
        <GameCard>
          <LoadingContainer>
            <Spinner />
            <LoadingText>Carregando jogo...</LoadingText>
          </LoadingContainer>
        </GameCard>
      </Container>
    );
  }

  if (gameFinished) {
    const score = calculateScore();
    const total = countriesInfo.length;
    const percentage = ((score / total) * 100).toFixed(0);

    return (
      <Container>
        <GameCard>
          <Header>
            <Title>🎉 Jogo Finalizado!</Title>
          </Header>
          <Score>
            <ScoreText>
              Você acertou {score} de {total} questões ({percentage}%)
            </ScoreText>
          </Score>
          <ShareContainer>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(buildShareMessage())}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={shareResults}
              style={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                gap: "8px",
                textDecoration: "none",
                color: "#fff",
              }}
            >
              <WhatsappIcon size={32} round />
              Compartilhar Resultado
            </a>
          </ShareContainer>
          <NavigationContainer>
            <NavButton onClick={() => navigate("/")}>
              🏠 Voltar ao Início
            </NavButton>
            <NavButton
              variant="primary"
              onClick={() => window.location.reload()}
            >
              🔄 Jogar Novamente
            </NavButton>
          </NavigationContainer>
        </GameCard>
      </Container>
    );
  }

  const currentCountry = countriesInfo[currentIndex];
  const currentState = questionStates[currentIndex];
  const currentOptions = options[currentIndex] || [];
  const progress = ((currentIndex + 1) / countriesInfo.length) * 100;

  return (
    <Container>
      <GameCard>
        <Header>
          <ProgressBar>
            <ProgressFill progress={progress} />
          </ProgressBar>
          <QuestionCounter>
            Questão {currentIndex + 1} de {countriesInfo.length}
          </QuestionCounter>
          <Title>Qual país tem esta bandeira?</Title>
        </Header>

        <FlagContainer>
          <FlagImage
            src={currentCountry?.flags?.png}
            alt={`Bandeira ${currentIndex + 1}`}
          />
        </FlagContainer>

        <OptionsContainer>
          {currentOptions.map((option, index) => {
            const isSelected = currentState.selectedAnswer === option;
            const isCorrect =
              option === currentCountry?.translations?.por?.common;
            const showCorrect = currentState.answered && isCorrect;
            const showWrong = currentState.answered && isSelected && !isCorrect;

            return (
              <OptionButton
                key={index}
                selected={isSelected && !currentState.answered}
                correct={showCorrect}
                wrong={showWrong}
                disabled={currentState.answered}
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </OptionButton>
            );
          })}
        </OptionsContainer>

        <NavigationContainer>
          <NavButton onClick={handlePrevious} disabled={currentIndex === 0}>
            ← Anterior
          </NavButton>
          <NavButton
            variant="primary"
            onClick={handleNext}
            disabled={!currentState.answered}
          >
            {currentIndex === countriesInfo.length - 1
              ? "Finalizar"
              : "Próximo →"}
          </NavButton>
        </NavigationContainer>

        <Score>
          <ScoreText>
            Pontuação: {calculateScore()} / {countriesInfo.length}
          </ScoreText>
        </Score>
      </GameCard>
    </Container>
  );
}
