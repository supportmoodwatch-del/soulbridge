import { useEffect, useState } from "react";
import { initializePaddle } from "@paddle/paddle-js";

export function usePaddle() {
  const [paddle, setPaddle] = useState(null);

  useEffect(() => {
    initializePaddle({
      environment: "production",
      token: process.env.REACT_APP_PADDLE_CLIENT_TOKEN,
    }).then((paddleInstance) => {
      if (paddleInstance) {
        setPaddle(paddleInstance);
      }
    });
  }, []);

  return paddle;
}