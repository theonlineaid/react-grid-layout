import { useState } from "react";
import Marquee from "react-fast-marquee";

const financialData = [
  { symbol: "AAPL", price: 150.5, change: "+1.25" },
  { symbol: "GOOGL", price: 2700.1, change: "-2.34" },
  { symbol: "TSLA", price: 720.45, change: "+5.67" },
  { symbol: "AMZN", price: 3400.0, change: "+3.12" },
  { symbol: "MSFT", price: 290.25, change: "-0.95" },
  { symbol: "NFLX", price: 525.65, change: "+4.15" },
  { symbol: "FB", price: 355.2, change: "-1.10" },
  { symbol: "NVDA", price: 600.5, change: "+8.23" },
  { symbol: "INTC", price: 53.75, change: "-0.50" },
  { symbol: "AMD", price: 110.5, change: "+2.55" },
  { symbol: "BABA", price: 180.4, change: "-1.70" },
  { symbol: "ORCL", price: 88.35, change: "+0.65" },
  { symbol: "UBER", price: 45.25, change: "-0.85" },
  { symbol: "LYFT", price: 60.1, change: "+0.45" },
  { symbol: "SQ", price: 255.3, change: "-2.10" },
  { symbol: "SHOP", price: 1450.75, change: "+10.15" },
  { symbol: "TWTR", price: 70.5, change: "-1.05" },
  { symbol: "SNAP", price: 75.45, change: "+1.25" },
  { symbol: "ZM", price: 300.15, change: "-5.20" },
  { symbol: "PYPL", price: 280.25, change: "+2.10" },
  { symbol: "DIS", price: 170.45, change: "+1.90" },
  { symbol: "NKE", price: 145.55, change: "-0.75" },
  { symbol: "ADBE", price: 650.45, change: "+3.35" },
  { symbol: "CRM", price: 255.35, change: "-1.45" },
  { symbol: "V", price: 220.25, change: "+0.95" },
  { symbol: "MA", price: 375.5, change: "+2.45" },
  { symbol: "JPM", price: 160.45, change: "-0.65" },
  { symbol: "BAC", price: 42.15, change: "+0.45" },
  { symbol: "WMT", price: 145.25, change: "-1.15" },
  { symbol: "KO", price: 56.75, change: "+0.35" },
];
import ArrowLeftSharpIcon from "@mui/icons-material/ArrowLeftSharp";
import ArrowRightSharpIcon from "@mui/icons-material/ArrowRightSharp";
import StopCircleSharpIcon from "@mui/icons-material/StopCircleSharp";
import PlayCircleFilledWhiteSharpIcon from "@mui/icons-material/PlayCircleFilledWhiteSharp";
import { Box } from "@mui/material";
export default function MarqueeControl() {
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
      >
        {financialData.map((item, index) => (
          <span key={index} style={{ marginRight: "50px" }}>
            {item.symbol}: ${item.price}{" "}
            {item.change.startsWith("+") ? (
              <span style={{ color: "green" }}>▲ {item.change}</span>
            ) : (
              <span style={{ color: "red" }}>▼ {item.change}</span>
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
