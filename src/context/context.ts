// const [marketData, setMarketData] = useState<MarketDataStruct[]>([]);

// const wss: any = useRef(null);
// let data = new Map();

// const fetchItchSocketData = () => {
//   const itchSocketURL =
//     "ws://203.202.247.124:8765/socket-api/v1/marketfeed/ws";
//   const ws = new WebSocket(itchSocketURL);

//   ws.onopen = () => {
//     // setMarketData(demoData)
//     console.log("Connection Established!");
//   };
//   ws.binaryType = "blob";
//   ws.addEventListener("message", () => {});

//   ws.onmessage = (event) => {
//     const response: MarketDataStruct = JSON.parse(event.data);

//     setMarketData(() => {
//       let newMap = new Map(data);
//       newMap.set(response.orderbook, response);
//       data = newMap;
//       return Array.from(newMap.values());
//     });
//   };

//   ws.onclose = () => {
//     // setMarketData(demoData)
//     console.log("Connection Closed!");
//   };

//   ws.onerror = () => {
//     console.log("WS Error");
//   };
//   wss.current = ws;

//   return () => {
//     ws.close();
//   };
// };

// useEffect(() => {
//   fetchItchSocketData();
// }, []);
