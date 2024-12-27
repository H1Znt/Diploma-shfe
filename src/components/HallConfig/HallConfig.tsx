// import React, { useState } from "react";
// import { IFilm } from "../../models";
// import "../../styles/_hallConfig.scss";

// interface HallConfigProps {
//   hallId: number;
//   initialRows: number;
//   initialPlaces: number;
//   initialConfig: string[][];
//   onSave: (updatedHall: IFilm) => void;
// }

// export const HallConfig: React.FC<HallConfigProps> = ({
//   hallId,
//   initialRows,
//   initialPlaces,
//   initialConfig,
//   onSave,
// }) => {
//   const [rowCount, setRowCount] = useState(initialRows);
//   const [placeCount, setPlaceCount] = useState(initialPlaces);
//   const [config, setConfig] = useState(initialConfig);

//   const handleSeatClick = (rowIndex: number, placeIndex: number) => {
//     const updatedConfig = [...config];
//     const currentType = updatedConfig[rowIndex][placeIndex];
//     const nextType =
//       currentType === "standart"
//         ? "vip"
//         : currentType === "vip"
//         ? "disabled"
//         : "standart";
//     updatedConfig[rowIndex][placeIndex] = nextType;
//     setConfig(updatedConfig);
//   };

//   const handleSave = async () => {
//     const formData = new FormData();
//     formData.set("rowCount", rowCount.toString());
//     formData.set("placeCount", placeCount.toString());
//     formData.set("config", JSON.stringify(config));

//     try {
//       const response = await fetch(
//         `https://shfe-diplom.neto-server.ru/hall/${hallId}`,
//         {
//           method: "POST",
//           body: formData,
//         }
//       );
//       const updatedHall = await response.json();
//       onSave(updatedHall);
//     } catch (error) {
//       console.error("Ошибка сохранения конфигурации зала", error);
//     }
//   };

//   const renderSeat = (seatType: string, rowIndex: number, placeIndex: number) => {
//     const seatClass =
//       seatType === "standart"
//         ? "seat-standart"
//         : seatType === "vip"
//         ? "seat-vip"
//         : "seat-disabled";
//     return (
//       <div
//         key={`${rowIndex}-${placeIndex}`}
//         className={`seat ${seatClass}`}
//         onClick={() => handleSeatClick(rowIndex, placeIndex)}
//       />
//     );
//   };

//   const handleRowChange = (newRowCount: number) => {
//     const updatedConfig = [...config];
//     if (newRowCount > rowCount) {
//       for (let i = rowCount; i < newRowCount; i++) {
//         updatedConfig.push(Array(placeCount).fill("standart"));
//       }
//     } else {
//       updatedConfig.length = newRowCount;
//     }
//     setRowCount(newRowCount);
//     setConfig(updatedConfig);
//   };

//   const handlePlaceChange = (newPlaceCount: number) => {
//     const updatedConfig = config.map((row) => {
//       const newRow = [...row];
//       if (newPlaceCount > placeCount) {
//         newRow.push(...Array(newPlaceCount - placeCount).fill("standart"));
//       } else {
//         newRow.length = newPlaceCount;
//       }
//       return newRow;
//     });
//     setPlaceCount(newPlaceCount);
//     setConfig(updatedConfig);
//   };

//   return (
//     <div className="hall-config">
//       <div className="hall-config-controls">
//         <label>
//           Рядов:
//           <input
//             type="number"
//             min="1"
//             value={rowCount}
//             onChange={(e) => handleRowChange(Number(e.target.value))}
//           />
//         </label>
//         <label>
//           Мест в ряду:
//           <input
//             type="number"
//             min="1"
//             value={placeCount}
//             onChange={(e) => handlePlaceChange(Number(e.target.value))}
//           />
//         </label>
//       </div>
//       <div className="hall-config-seats">
//         {config.map((row, rowIndex) => (
//           <div key={rowIndex} className="hall-config-row">
//             {row.map((seat, placeIndex) =>
//               renderSeat(seat, rowIndex, placeIndex)
//             )}
//           </div>
//         ))}
//       </div>
//       <button onClick={handleSave}>Сохранить</button>
//     </div>
//   );
// };
