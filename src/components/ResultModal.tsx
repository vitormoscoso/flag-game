import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Alert, Button, IconButton, Snackbar } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import {
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

export default function ResultModal({ result, handleClickRestart }: any) {
  const [open, setOpen] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleClose = () => setOpen(false);
  const shareUrl = "https://vitormoscoso.github.io/flag-game/";
  const title = `Acertei ${result}/15 bandeiras no Jogo das Bandeiras! Jogue você também:`;

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        setOpenSnackbar(true);
      })
      .catch((err) => {
        console.error("Erro ao copiar o texto: ", err);
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div
        style={{
          border: "0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "40%",
          height: "40%",
          backgroundColor: "#FAF9F6",
          transform: "translate(75%, 65%)",
        }}
      >
        <div
          style={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "5%",
          }}
        >
          <h2>Parabéns! Você acertou {result}\15 bandeiras</h2>
          <h3>Compartilhe!</h3>
          <div
            style={{
              backgroundColor: "#D3D3D3",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "center",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              width: "50%",
              height: "8%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p>{shareUrl}</p>
            <IconButton
              onClick={copyToClipboard}
              title="Copiar para a área de transferência"
            >
              <ContentCopyIcon />
            </IconButton>
            <Snackbar
              open={openSnackbar}
              autoHideDuration={3000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                severity="success"
                sx={{ width: "100%" }}
              >
                Texto copiado para a área de transferência!
              </Alert>
            </Snackbar>
          </div>
          <div
            style={{
              marginTop: "3%",
              width: "12%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <WhatsappShareButton url={shareUrl} title={title} separator=" ">
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <TwitterShareButton url={shareUrl} title={title}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>
        </div>
        <Button variant="contained" onClick={handleClickRestart}>Jogar novamente</Button>
      </div>
    </Modal>
  );
}
