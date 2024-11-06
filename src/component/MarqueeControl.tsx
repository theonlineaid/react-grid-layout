import { useState } from "react";
import Marquee from "react-fast-marquee";
import ArrowLeftSharpIcon from "@mui/icons-material/ArrowLeftSharp";
import ArrowRightSharpIcon from "@mui/icons-material/ArrowRightSharp";
import StopCircleSharpIcon from "@mui/icons-material/StopCircleSharp";
import PlayCircleFilledWhiteSharpIcon from "@mui/icons-material/PlayCircleFilledWhiteSharp";
import { Box } from "@mui/material";
import { useMarket } from "../context/MarketContext";

export default function MarqueeControl() {
  const { marketData } = useMarket(); // Access market data from context
  const [isPlaying, setIsPlaying] = useState(true); // Controls play/pause
  const [direction, setDirection] = useState<"left" | "right">("left"); // Controls direction

  // Toggle the play/pause state
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Marquee
        pauseOnClick={true}
        pauseOnHover={true}
        play={isPlaying}
        direction={direction}
        loop={0}
        speed={100}
      >
        {marketData.map((item, index) => (
          <span key={index} style={{ marginRight: "50px" }}>
            {item.ticker}: ${item.last}{" "}
            {item.chg >= 0 ? (
              <span style={{ color: "green" }}>▲ {item.chg}</span>
            ) : (
              <span style={{ color: "red" }}>▼ {item.chg}</span>
            )}
          </span>
        ))}
      </Marquee>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <ArrowLeftSharpIcon onClick={() => setDirection("left")} />
        <button onClick={togglePlay}>
          {isPlaying ? (
            <StopCircleSharpIcon />
          ) : (
            <PlayCircleFilledWhiteSharpIcon />
          )}
        </button>
        <ArrowRightSharpIcon onClick={() => setDirection("right")} />
      </Box>
    </Box>
  );
}
