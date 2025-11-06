// import React, { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
// import { FaSeedling, FaCloudSun, FaFlask, FaTint } from "react-icons/fa";
// import Snav from "./sidenav";

// export default function AISuggestion() {
//   const [lat, setLat] = useState("");
//   const [lon, setLon] = useState("");
//   const [weather, setWeather] = useState({});
//   const [soilPh, setSoilPh] = useState("");
//   const [aiResult, setAiResult] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // 🌍 Auto-fetch Location, Weather, and Soil data
//   useEffect(() => {
//     const fetchEnvironmentData = async () => {
//       try {
//         navigator.geolocation.getCurrentPosition(async (pos) => {
//           const latitude = pos.coords.latitude;
//           const longitude = pos.coords.longitude;
//           setLat(latitude);
//           setLon(longitude);

//           // 🌦️ Fetch weather data
//           const weatherRes = await fetch(
//             `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=64ec4e8adf69cb9be080f0c6d813f56d
// &units=metric`
//           );
//           const weatherData = await weatherRes.json();
//           setWeather({
//             temp: weatherData.main.temp,
//             humidity: weatherData.main.humidity,
//           });

//           // 🌱 Fetch soil pH from SoilGrids API
//           const soilRes = await fetch(
//             `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=phh2o`
//           );
//           const soilData = await soilRes.json();
//           const ph =
//             soilData?.properties?.phh2o?.layers?.[0]?.values?.mean?.toFixed(2) ||
//             6.5;
//           setSoilPh(ph);

//           setLoading(false);
//         });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       }
//     };

//     fetchEnvironmentData();
//   }, []);

//   // 🧠 Fetch AI prediction
//   const getAiPrediction = async () => {
//     try {
//       const response = await fetch("http://localhost:1000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           N: 90,
//           P: 42,
//           K: 43,
//           temperature: weather.temp || 28,
//           humidity: weather.humidity || 70,
//           ph: soilPh || 6.5,
//           rainfall: 150,
//         }),
//       });

//       const data = await response.json();
//       setAiResult(data);
//     } catch (error) {
//       console.error("AI Fetch Error:", error);
//       alert("Error connecting to AI service.");
//     }
//   };

//   if (loading) {
//     return (
//       <h3 style={{ textAlign: "center", marginTop: "50px", color: "#283c86" }}>
//         🌍 Fetching environmental data...
//       </h3>
//     );
//   }

//   return (
//     <>
//       <Snav />
//       <div
//         style={{
//           backgroundColor: "#f8f9fa",
//           minHeight: "100vh",
//           padding: "40px 20px",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <h1
//           style={{
//             color: "#283c86",
//             fontWeight: "bold",
//             fontSize: "2rem",
//             marginBottom: "20px",
//           }}
//         >
//           🌾 AI Crop Suggestion
//         </h1>

//         {/* Environment Summary */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//             gap: "20px",
//             width: "90%",
//             maxWidth: "900px",
//             marginBottom: "30px",
//           }}
//         >
//           <div className="card">
//             <h4><FaCloudSun /> Weather</h4>
//             <p>Temperature: {weather.temp} °C</p>
//             <p>Humidity: {weather.humidity}%</p>
//           </div>

//           <div className="card">
//             <h4><FaFlask /> Soil</h4>
//             <p>pH Level: {soilPh}</p>
//           </div>

//           <div className="card">
//             <h4><FaTint /> Location</h4>
//             <p>Latitude: {lat.toFixed(3)}</p>
//             <p>Longitude: {lon.toFixed(3)}</p>
//           </div>
//         </div>

//         <Button
//           onClick={getAiPrediction}
//           style={{
//             backgroundColor: "#45a247",
//             border: "none",
//             padding: "10px 30px",
//             borderRadius: "10px",
//             fontWeight: "bold",
//           }}
//         >
//           🧠 Get AI Suggestion
//         </Button>

//         {aiResult && (
//           <div
//             style={{
//               marginTop: "30px",
//               width: "90%",
//               maxWidth: "800px",
//               backgroundColor: "#fff",
//               padding: "25px",
//               borderRadius: "12px",
//               boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//             }}
//           >
//             <h3 style={{ color: "#283c86" }}>AI Recommendation</h3>
//             <p><b>🌾 Recommended Crop:</b> {aiResult.recommended_crop}</p>
//             <p><b>🌱 Fertilizer Suggestion:</b> {aiResult.fertilizer}</p>
//             <p><b>💧 Irrigation Plan:</b> {aiResult.irrigation}</p>
//             <p><b>📜 Summary:</b> {aiResult.recommendation}</p>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

//64ec4e8adf69cb9be080f0c6d813f56d



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
// import InputGroup from "react-bootstrap/InputGroup";
// import "./User.css";
// import Snav from "./sidenav";

// function User() {
//   const navigate = useNavigate();

//   const [fname, setfname] = useState("");
//   const [lname, setlname] = useState("");
//   const [email, setemail] = useState("");
//   const [crop, setCrop] = useState("");
//   const [lat, setLat] = useState("");
//   const [lon, setLon] = useState("");
//   const [weather, setWeather] = useState({});
//   const [soil, setSoil] = useState({});
//   const [aiAdvice, setAiAdvice] = useState("");
//   const [fertilizer, setFertilizer] = useState("");
//   const [irrigation, setIrrigation] = useState("");
//   const [error, setError] = useState("");

//   // ✅ Auto-fetch location, weather & soil data quickly
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         navigator.geolocation.getCurrentPosition(async (pos) => {
//           const latitude = pos.coords.latitude;
//           const longitude = pos.coords.longitude;
//           setLat(latitude.toFixed(4));
//           setLon(longitude.toFixed(4));

//           // 🌦️ Weather Data
//           const weatherRes = await fetch(
//             `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=64ec4e8adf69cb9be080f0c6d813f56d
// `
//           );
//           const weatherData = await weatherRes.json();
//           setWeather({
//             temperature: weatherData.main?.temp ?? "Unavailable",
//             humidity: weatherData.main?.humidity ?? "Unavailable",
//             rainfall:
//               weatherData.rain?.["1h"] ??
//               weatherData.rain?.["3h"] ??
//               "No rain detected",
//           });

//           // 🌱 Soil Data (SoilGrids)
//           const soilRes = await fetch(
//             `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}`
//           );
//           const soilData = await soilRes.json();

//           const phValue =
//             soilData?.properties?.phh2o?.values?.[0]?.value ?? null;
//           setSoil({
//             ph: phValue ? (phValue / 10).toFixed(2) : "Unavailable",
//           });
//         });
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Failed to fetch location or environmental data.");
//       }
//     };

//     fetchData();
//   }, []);

//   // 🧠 Fetch AI prediction manually (button)
//   const getAISuggestion = async () => {
//     try {
//       const inputData = {
//         latitude: lat,
//         longitude: lon,
//         temperature:
//           weather.temperature === "Unavailable" ? 0 : weather.temperature,
//         humidity: weather.humidity === "Unavailable" ? 0 : weather.humidity,
//         rainfall:
//           weather.rainfall === "No rain detected" ? 0 : weather.rainfall,
//         soil_ph: soil.ph === "Unavailable" ? 6.5 : soil.ph,
//         crop,
//       };

//       const aiRes = await fetch("http://localhost:1000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(inputData),
//       });

//       const aiData = await aiRes.json();
//       setAiAdvice(aiData.recommendation || "AI could not provide advice.");
//       setIrrigation(aiData.irrigation || "Not available");
//       setFertilizer(aiData.fertilizer || "Not available");
//     } catch (err) {
//       console.error("AI Fetch Error:", err);
//       alert("Error fetching AI suggestion");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Your data has been saved successfully!");
//     navigate("/success");
//   };

//   return (
//     <>
//       <Snav />
//       <div
//         className="outer"
//         style={{
//           padding: "20px",
//           backgroundColor: "#f4f4f4",
//           minHeight: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           flexDirection: "column",
//         }}
//       >
//         <h2
//           style={{
//             fontFamily: "serif",
//             color: "#283c86",
//             fontWeight: "bold",
//             marginBottom: "20px",
//             textAlign: "center",
//             fontSize: "2rem",
//           }}
//         >
//           🌾 AgriSense Smart Farming Assistant
//         </h2>

//         <div
//           className="container"
//           style={{
//             border: "1px solid #ccc",
//             borderRadius: "10px",
//             padding: "20px",
//             backgroundColor: "#ffffff",
//             boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//             width: "100%",
//             maxWidth: "650px",
//             margin: "0 auto",
//           }}
//         >
//           <Form onSubmit={handleSubmit}>
//             {/* ✅ Personal Info */}
//             <Row className="mb-3">
//               <Form.Group as={Col} xs={12} md={6}>
//                 <h4 style={{ color: "#283c86", fontWeight: "bold" }}>
//                   First Name
//                 </h4>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter your first name"
//                   value={fname}
//                   onChange={(e) => setfname(e.target.value)}
//                 />
//               </Form.Group>

//               <Form.Group as={Col} xs={12} md={6}>
//                 <h4 style={{ color: "#283c86", fontWeight: "bold" }}>
//                   Last Name
//                 </h4>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter your last name"
//                   value={lname}
//                   onChange={(e) => setlname(e.target.value)}
//                 />
//               </Form.Group>
//             </Row>

//             {/* ✅ Email */}
//             <Form.Group className="mb-3">
//               <h4 style={{ color: "#283c86", fontWeight: "bold" }}>
//                 Email Address
//               </h4>
//               <InputGroup>
//                 <InputGroup.Text>@</InputGroup.Text>
//                 <Form.Control
//                   type="email"
//                   placeholder="Enter email"
//                   value={email}
//                   onChange={(e) => setemail(e.target.value)}
//                 />
//               </InputGroup>
//             </Form.Group>

//             {/* ✅ Auto-fetched Table */}
//             <div style={{ marginTop: "20px" }}>
//               <h4 style={{ color: "#283c86", fontWeight: "bold" }}>
//                 🌍 Environment Data
//               </h4>
//               <table
//                 style={{
//                   width: "100%",
//                   borderCollapse: "collapse",
//                   marginTop: "10px",
//                   border: "1px solid #ddd",
//                 }}
//               >
//                 <thead>
//                   <tr style={{ backgroundColor: "#f7f5f5" }}>
//                     <th style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       Parameter
//                     </th>
//                     <th style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       Value
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       Latitude
//                     </td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       {lat || "Fetching..."}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       Longitude
//                     </td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       {lon || "Fetching..."}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       Temperature (°C)
//                     </td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       {weather.temperature}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       Humidity (%)
//                     </td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       {weather.humidity}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       Rainfall (mm)
//                     </td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       {weather.rainfall}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       Soil pH
//                     </td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       {soil.ph}
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>

//             {/* ✅ Crop Input */}
//             <Form.Group className="mb-3" style={{ marginTop: "20px" }}>
//               <h4 style={{ color: "#283c86", fontWeight: "bold" }}>Crop Type</h4>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter crop name (e.g., Wheat, Rice)"
//                 value={crop}
//                 onChange={(e) => setCrop(e.target.value)}
//               />
//             </Form.Group>

//             {/* ✅ AI Button */}
//             <Button
//               type="button"
//               style={{
//                 backgroundColor: "#45a247",
//                 border: "none",
//                 marginTop: "20px",
//                 width: "100%",
//                 fontWeight: "bold",
//               }}
//               onClick={getAISuggestion}
//             >
//               🌾 Get AI Suggestion
//             </Button>

//             {/* ✅ AI Output */}
//             {aiAdvice && (
//               <div style={{ marginTop: "20px", textAlign: "left" }}>
//                 <h5>🧠 AI Recommendation:</h5>
//                 <p><b>Advice:</b> {aiAdvice}</p>
//                 <p><b>Fertilizer:</b> {fertilizer}</p>
//                 <p><b>Irrigation:</b> {irrigation}</p>
//               </div>
//             )}

//             <Button
//               type="submit"
//               variant="primary"
//               style={{
//                 marginTop: "30px",
//                 width: "100%",
//                 fontWeight: "bold",
//                 backgroundColor: "#283c86",
//                 border: "none",
//               }}
//             >
//               Submit
//             </Button>
//           </Form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default User;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
// import InputGroup from "react-bootstrap/InputGroup";
// // import "./User.css";
// import Snav from "./sidenav";

// function AISuggestion() {
//   const navigate = useNavigate();

//   const [fname, setfname] = useState("");
//   const [lname, setlname] = useState("");
//   const [email, setemail] = useState("");
//   const [crop, setCrop] = useState("");
//   const [lat, setLat] = useState("");
//   const [lon, setLon] = useState("");
//   const [weather, setWeather] = useState({});
//   const [soil, setSoil] = useState({});
//   const [aiAdvice, setAiAdvice] = useState("");
//   const [fertilizer, setFertilizer] = useState("");
//   const [irrigation, setIrrigation] = useState("");
//   const [error, setError] = useState("");

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         navigator.geolocation.getCurrentPosition(async (pos) => {
// //           const latitude = pos.coords.latitude;
// //           const longitude = pos.coords.longitude;
// //           setLat(latitude.toFixed(4));
// //           setLon(longitude.toFixed(4));

// //           const weatherRes = await fetch(
// //             `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=64ec4e8adf69cb9be080f0c6d813f56d`
// //           );
// //           const weatherData = await weatherRes.json();
// //           setWeather({
// //             temperature: weatherData.main?.temp ?? "Unavailable",
// //             humidity: weatherData.main?.humidity ?? "Unavailable",
// //             rainfall:
// //               weatherData.rain?.["1h"] ??
// //               weatherData.rain?.["3h"] ??
// //               "No rain detected",
// //           });

// //         //   const soilRes = await fetch(
// //         //     `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}`
// //         //   );
// //         //   const soilData = await soilRes.json();
// //         //   const phValue =
// //         //     soilData?.properties?.phh2o?.values?.[0]?.value ?? null;
// //         //   setSoil({
// //         //     ph: phValue ? (phValue / 10).toFixed(2) : "Unavailable",
// //         //   });
// //         // 🌱 Soil Data (SoilGrids)
// // // const soilRes = await fetch(
// // //     `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=phh2o`
// // //   );
// // //   const soilData = await soilRes.json();
// // //   console.log("🌱 Soil Data:", soilData);

  
// // // //   const phValue =
// // // //     soilData?.properties?.phh2o?.values?.[0]?.value ??
// // // //     soilData?.properties?.phh2o?.mean ??
// // // //     null;
// // // const phValue =
// // //   soilData?.properties?.layers?.[0]?.depths?.[0]?.values?.mean ?? null;

  
// // //   setSoil({
// // //     ph: phValue ? (phValue / 10).toFixed(2) : "Unavailable",
// // //   });
  

// // // 🌱 Soil Data (SoilGrids)
// // const soilRes = await fetch(
// //     `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}`
// //   );
// //   const soilData = await soilRes.json();
// //   console.log("🌍 Full Soil Data:", soilData); // 👀 Debug log
  
// //   // ✅ Extract correct pH value safely
// //   let phValue = "Unavailable";
// //   try {
// //     phValue = soilData?.properties?.layers?.[0]?.depths?.[0]?.values?.mean;
// //     if (phValue) phValue = (phValue / 10).toFixed(2);
// //   } catch (err) {
// //     console.error("Error reading soil pH:", err);
// //   }
  
// //   setSoil({ ph: phValue });
  
// //         });
// //       } catch (err) {
// //         console.error("Error fetching data:", err);
// //         setError("Failed to fetch location or environmental data.");
// //       }
// //     };

// //     fetchData();
// //   }, []);


// useEffect(() => {
//     const fetchData = async () => {
//       try {
//         navigator.geolocation.getCurrentPosition(async (pos) => {
//           const latitude = pos.coords.latitude;
//           const longitude = pos.coords.longitude;
//           setLat(latitude.toFixed(4));
//           setLon(longitude.toFixed(4));
  
//           // 🌦️ Weather Data
//           const weatherRes = await fetch(
//             `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=64ec4e8adf69cb9be080f0c6d813f56d`
//           );
//           const weatherData = await weatherRes.json();
//           setWeather({
//             temperature: weatherData.main?.temp ?? "Unavailable",
//             humidity: weatherData.main?.humidity ?? "Unavailable",
//             rainfall:
//               weatherData.rain?.["1h"] ??
//               weatherData.rain?.["3h"] ??
//               "No rain detected",
//           });
  
//           // 🌱 Soil Data (SoilGrids)



//           const soilUrl = `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=phh2o`;
//           const soilRes = await fetch(soilUrl, {
//             method: "GET",
//             headers: {
//               "Accept": "application/json",
//               "User-Agent": "AgriSense/1.0",
//             },
//           });
//           const soilData = await soilRes.json();
//           alert(soilData);
  
//           const phValue =
//             soilData?.properties?.layers?.[0]?.depths?.[0]?.values?.mean ?? null;
  
//           setSoil({
//             ph: phValue ? (phValue / 10).toFixed(2) : "Unavailable",
//           });
          
//         //   const soilRes = await fetch(
//         //     `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=phh2o`

//         //     // `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}`
//         //   );
//         //   const soilData = await soilRes.json();
  
//         //   console.log("🌍 Full Soil Data:", soilData); // 👀 check browser console
  
//         //   // ✅ Proper extraction (as per your Thunder Client output)
//         //   const phValue =
//         //     soilData?.properties?.layers?.find((layer) => layer.name === "phh2o")
//         //       ?.depths?.[0]?.values?.mean ?? null;
  
//         //   if (phValue) {
//         //     setSoil({ ph: (phValue / 10).toFixed(2) });
//         //   } else {
//         //     setSoil({ ph: "Unavailable" });
//         //   }
//         });
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Failed to fetch location or environmental data.");
//       }
//     };
  
//     fetchData();
//   }, []);
  
//   const getAISuggestion = async () => {
//     try {
//       const inputData = {
//         latitude: lat,
//         longitude: lon,
//         temperature:
//           weather.temperature === "Unavailable" ? 0 : weather.temperature,
//         humidity: weather.humidity === "Unavailable" ? 0 : weather.humidity,
//         rainfall:
//           weather.rainfall === "No rain detected" ? 0 : weather.rainfall,
//         soil_ph: soil.ph === "Unavailable" ? 6.5 : soil.ph,
//         crop,
//       };

//       const aiRes = await fetch("http://localhost:1000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(inputData),
//       });

//       const aiData = await aiRes.json();
//       setAiAdvice(aiData.recommendation || "AI could not provide advice.");
//       setIrrigation(aiData.irrigation || "Not available");
//       setFertilizer(aiData.fertilizer || "Not available");
//     } catch (err) {
//       console.error("AI Fetch Error:", err);
//       alert("Error fetching AI suggestion");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Your data has been saved successfully!");
//     navigate("/success");
//   };

//   return (
//     <>
//       <Snav />
//       <div
//         className="outer"
//         style={{
//           padding: "20px",
//           backgroundColor: "#ffffff",
//           minHeight: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           flexDirection: "column",
//           fontFamily: "Poppins, sans-serif",
//         }}
//       >
//         <h2
//           style={{
//             color: "#000000",
//             fontWeight: "600",
//             marginBottom: "25px",
//             textAlign: "center",
//             fontSize: "2rem",
//           }}
//         >
//           🌾 AgriSense Smart Farming Assistant
//         </h2>

//         <div
//           className="container"
//           style={{
//             border: "1px solid #000000",
//             borderRadius: "10px",
//             padding: "25px",
//             backgroundColor: "#fff",
//             boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
//             width: "100%",
//             maxWidth: "700px",
//           }}
//         >
//           <Form onSubmit={handleSubmit}>
//             {/* Personal Info */}
//             <Row className="mb-3">
//               <Form.Group as={Col} xs={12} md={6}>
//                 <h4 style={{ color: "#000", fontWeight: "600" }}>First Name</h4>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter first name"
//                   value={fname}
//                   onChange={(e) => setfname(e.target.value)}
//                 />
//               </Form.Group>

//               <Form.Group as={Col} xs={12} md={6}>
//                 <h4 style={{ color: "#000", fontWeight: "600" }}>Last Name</h4>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter last name"
//                   value={lname}
//                   onChange={(e) => setlname(e.target.value)}
//                 />
//               </Form.Group>
//             </Row>

//             {/* Email */}
//             <Form.Group className="mb-3">
//               <h4 style={{ color: "#000", fontWeight: "600" }}>Email Address</h4>
//               <InputGroup>
//                 <InputGroup.Text>@</InputGroup.Text>
//                 <Form.Control
//                   type="email"
//                   placeholder="Enter email"
//                   value={email}
//                   onChange={(e) => setemail(e.target.value)}
//                 />
//               </InputGroup>
//             </Form.Group>

//             {/* Table */}
//             <div style={{ marginTop: "20px" }}>
//               <h4 style={{ color: "#000", fontWeight: "600" }}>🌍 Environment Data</h4>
//               <table
//                 style={{
//                   width: "100%",
//                   borderCollapse: "collapse",
//                   marginTop: "10px",
//                   border: "1px solid #000",
//                   color:"black"
//                 }}
//               >
//                 <thead>
//                   <tr style={{ backgroundColor: "#f9f9f9" }}>
//                     <th style={{ border: "1px solid #000", padding: "10px" }}>Parameter</th>
//                     <th style={{ border: "1px solid #000", padding: "10px" }}>Value</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr><td>Latitude</td><td>{lat || "Fetching..."}</td></tr>
//                   <tr><td>Longitude</td><td>{lon || "Fetching..."}</td></tr>
//                   <tr><td>Temperature (°C)</td><td>{weather.temperature}</td></tr>
//                   <tr><td>Humidity (%)</td><td>{weather.humidity}</td></tr>
//                   <tr><td>Rainfall (mm)</td><td>{weather.rainfall}</td></tr>
//                   <tr><td>Soil pH</td><td>{soil.ph}</td></tr>
//                 </tbody>
//               </table>
//             </div>

//             {/* Crop Input */}
//             <Form.Group className="mb-3" style={{ marginTop: "20px" }}>
//               <h4 style={{ color: "#000", fontWeight: "600" }}>Crop Type</h4>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter crop name (e.g., Wheat, Rice)"
//                 value={crop}
//                 onChange={(e) => setCrop(e.target.value)}
//               />
//             </Form.Group>

//             {/* AI Button */}
//             <Button
//               type="button"
//               style={{
//                 backgroundColor: "#000",
//                 color: "#fff",
//                 border: "none",
//                 marginTop: "20px",
//                 width: "100%",
//                 fontWeight: "600",
//               }}
//               onClick={getAISuggestion}
//             >
//               🌾 Get AI Suggestion
//             </Button>

//             {aiAdvice && (
//               <div style={{ marginTop: "25px", textAlign: "left", color: "#fff" }}>
//                 <h5>🧠 AI Recommendation:</h5>
//                 <p><b>Advice:</b> {aiAdvice}</p>
//                 <p><b>Fertilizer:</b> {fertilizer}</p>
//                 <p><b>Irrigation:</b> {irrigation}</p>
//               </div>
//             )}

//             <Button
//               type="submit"
//               variant="primary"
//               style={{
//                 marginTop: "30px",
//                 width: "100%",
//                 fontWeight: "600",
//                 backgroundColor: "#000",
//                 border: "none",
//               }}
//             >
//               Submit
//             </Button>
//           </Form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default AISuggestion;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
// import InputGroup from "react-bootstrap/InputGroup";
// import Snav from "./sidenav";

// function AISuggestion() {
//   const navigate = useNavigate();

//   const [fname, setfname] = useState("");
//   const [lname, setlname] = useState("");
//   const [email, setemail] = useState("");
//   const [crop, setCrop] = useState("");
//   const [lat, setLat] = useState("");
//   const [lon, setLon] = useState("");
//   const [weather, setWeather] = useState({});
//   const [soil, setSoil] = useState({});
//   const [aiAdvice, setAiAdvice] = useState("");
//   const [fertilizer, setFertilizer] = useState("");
//   const [irrigation, setIrrigation] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         navigator.geolocation.getCurrentPosition(async (pos) => {
//           const latitude = pos.coords.latitude;
//           const longitude = pos.coords.longitude;
//           setLat(latitude.toFixed(4));
//           setLon(longitude.toFixed(4));

//           // 🌦 Weather Data
//           const weatherRes = await fetch(
//             `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=64ec4e8adf69cb9be080f0c6d813f56d`
//           );
//           const weatherData = await weatherRes.json();
//           setWeather({
//             temperature: weatherData.main?.temp ?? "Unavailable",
//             humidity: weatherData.main?.humidity ?? "Unavailable",
//             rainfall:
//               weatherData.rain?.["1h"] ??
//               weatherData.rain?.["3h"] ??
//               "No rain detected",
//           });

//           // 🌱 Soil Data (through free ISRIC endpoint)
//           const soilUrl = `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=phh2o`;
//           const soilRes = await fetch(soilUrl, { method: "GET" });
//           if (!soilRes.ok) throw new Error("Failed to fetch soil data");
//           const soilData = await soilRes.json();

//           const phValue =
//             soilData?.properties?.layers?.[0]?.depths?.[0]?.values?.mean ?? null;

//           setSoil({
//             ph: phValue ? (phValue / 10).toFixed(2) : "Unavailable",
//           });
//         });
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Failed to fetch location or environmental data.");
//       }
//     };

//     fetchData();
//   }, []);

//   const getAISuggestion = async () => {
//     try {
//       const inputData = {
//         crop,
//         N: 90,
//         P: 42,
//         K: 43,
//         temperature:
//           weather.temperature === "Unavailable" ? 0 : weather.temperature,
//         humidity: weather.humidity === "Unavailable" ? 0 : weather.humidity,
//         ph: soil.ph === "Unavailable" ? 6.5 : soil.ph,
//         rainfall:
//           weather.rainfall === "No rain detected" ? 0 : weather.rainfall,
//       };

//       const aiRes = await fetch("http://127.0.0.1:5000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(inputData),
//       });

//       const aiData = await aiRes.json();
//       setAiAdvice(aiData.recommendation || "AI could not provide advice.");
//       setIrrigation(aiData.irrigation || "Not available");
//       setFertilizer(aiData.fertilizer || "Not available");
//     } catch (err) {
//       console.error("AI Fetch Error:", err);
//       alert("Error fetching AI suggestion");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Your data has been saved successfully!");
//     navigate("/success");
//   };

//   return (
//     <>
//       <Snav />
//       <div
//         className="outer"
//         style={{
//           padding: "20px",
//           backgroundColor: "#fff",
//           minHeight: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           flexDirection: "column",
//           fontFamily: "Poppins, sans-serif",
//         }}
//       >
//         <h2
//           style={{
//             color: "#000",
//             fontWeight: "600",
//             marginBottom: "25px",
//             textAlign: "center",
//             fontSize: "2rem",
//           }}
//         >
//           🌾 AgriSense Smart Farming Assistant
//         </h2>

//         <div
//           className="container"
//           style={{
//             border: "1px solid #000",
//             borderRadius: "10px",
//             padding: "25px",
//             backgroundColor: "#fff",
//             boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
//             width: "100%",
//             maxWidth: "700px",
//           }}
//         >
//           <Form onSubmit={handleSubmit}>
//             <Row className="mb-3">
//               <Form.Group as={Col} xs={12} md={6}>
//                 <h4 style={{ color: "#000", fontWeight: "600" }}>First Name</h4>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter first name"
//                   value={fname}
//                   onChange={(e) => setfname(e.target.value)}
//                 />
//               </Form.Group>

//               <Form.Group as={Col} xs={12} md={6}>
//                 <h4 style={{ color: "#000", fontWeight: "600" }}>Last Name</h4>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter last name"
//                   value={lname}
//                   onChange={(e) => setlname(e.target.value)}
//                 />
//               </Form.Group>
//             </Row>

//             <Form.Group className="mb-3">
//               <h4 style={{ color: "#000", fontWeight: "600" }}>Email Address</h4>
//               <InputGroup>
//                 <InputGroup.Text>@</InputGroup.Text>
//                 <Form.Control
//                   type="email"
//                   placeholder="Enter email"
//                   value={email}
//                   onChange={(e) => setemail(e.target.value)}
//                 />
//               </InputGroup>
//             </Form.Group>

//             <div style={{ marginTop: "20px" }}>
//               <h4 style={{ color: "#000", fontWeight: "600" }}>
//                 🌍 Environment Data
//               </h4>
//               <table
//                 style={{
//                   width: "100%",
//                   borderCollapse: "collapse",
//                   marginTop: "10px",
//                   border: "1px solid #000",
//                   color: "#000",
//                   textAlign: "center",
//                 }}
//               >
//                 <thead>
//                   <tr style={{ backgroundColor: "#f5f5f5" }}>
//                     <th style={{ border: "1px solid #000", padding: "10px" }}>
//                       Parameter
//                     </th>
//                     <th style={{ border: "1px solid #000", padding: "10px" }}>
//                       Value
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr><td>Latitude</td><td>{lat || "Fetching..."}</td></tr>
//                   <tr><td>Longitude</td><td>{lon || "Fetching..."}</td></tr>
//                   <tr><td>Temperature (°C)</td><td>{weather.temperature}</td></tr>
//                   <tr><td>Humidity (%)</td><td>{weather.humidity}</td></tr>
//                   <tr><td>Rainfall (mm)</td><td>{weather.rainfall}</td></tr>
//                   <tr><td>Soil pH</td><td>{soil.ph}</td></tr>
//                 </tbody>
//               </table>
//             </div>

//             <Form.Group className="mb-3" style={{ marginTop: "20px" }}>
//               <h4 style={{ color: "#000", fontWeight: "600" }}>Crop Type</h4>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter crop name (e.g., Wheat, Rice)"
//                 value={crop}
//                 onChange={(e) => setCrop(e.target.value)}
//               />
//             </Form.Group>

//             <Button
//               type="button"
//               style={{
//                 backgroundColor: "#000",
//                 color: "#fff",
//                 border: "none",
//                 marginTop: "20px",
//                 width: "100%",
//                 fontWeight: "600",
//               }}
//               onClick={getAISuggestion}
//             >
//               🌾 Get AI Suggestion
//             </Button>

//             {aiAdvice && (
//               <div
//                 style={{
//                   marginTop: "25px",
//                   textAlign: "left",
//                   color: "#000",
//                   backgroundColor: "#f9f9f9",
//                   borderRadius: "8px",
//                   padding: "15px",
//                   border: "1px solid #ddd",
//                 }}
//               >
//                 <h5>🧠 AI Recommendation:</h5>
//                 <p><b>Advice:</b> {aiAdvice}</p>
//                 <p><b>Fertilizer:</b> {fertilizer}</p>
//                 <p><b>Irrigation:</b> {irrigation}</p>
//               </div>
//             )}

//             <Button
//               type="submit"
//               variant="primary"
//               style={{
//                 marginTop: "30px",
//                 width: "100%",
//                 fontWeight: "600",
//                 backgroundColor: "#000",
//                 border: "none",
//               }}
//             >
//               Submit
//             </Button>
//           </Form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default AISuggestion;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
// import Snav from "./sidenav";

// function AISuggestion() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [crop, setCrop] = useState("");
//   const [lat, setLat] = useState("");
//   const [lon, setLon] = useState("");
//   const [weather, setWeather] = useState({});
//   const [soil, setSoil] = useState({});
//   const [aiAdvice, setAiAdvice] = useState("");
//   const [fertilizer, setFertilizer] = useState("");
//   const [irrigation, setIrrigation] = useState("");
//   const [error, setError] = useState("");

//   // ✅ Auto fetch weather & soil data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         navigator.geolocation.getCurrentPosition(async (pos) => {
//           const latitude = pos.coords.latitude;
//           const longitude = pos.coords.longitude;
//           setLat(latitude.toFixed(4));
//           setLon(longitude.toFixed(4));

//           // 🌦 Weather Data
//           const weatherRes = await fetch(
//             `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=64ec4e8adf69cb9be080f0c6d813f56d`
//           );
//           const weatherData = await weatherRes.json();
//           setWeather({
//             temperature: weatherData.main?.temp ?? "Unavailable",
//             humidity: weatherData.main?.humidity ?? "Unavailable",
//             rainfall:
//               weatherData.rain?.["1h"] ??
//               weatherData.rain?.["3h"] ??
//               "No rain detected",
//           });

//           // 🌱 Soil Data
//           const soilRes = await fetch(
//             `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=phh2o`
//           );
//           const soilData = await soilRes.json();

//           const phValue =
//             soilData?.properties?.layers?.[0]?.depths?.[0]?.values?.mean ?? null;

//           setSoil({
//             ph: phValue ? (phValue / 10).toFixed(2) : "Unavailable",
//           });
//         });
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Failed to fetch weather or soil data.");
//       }
//     };
//     fetchData();
//   }, []);

//   // 🧠 Get AI Suggestion
//   const getAISuggestion = async () => {
//     try {
//       const inputData = {
//         crop,
//         N: 90,
//         P: 42,
//         K: 43,
//         temperature:
//           weather.temperature === "Unavailable" ? 0 : weather.temperature,
//         humidity: weather.humidity === "Unavailable" ? 0 : weather.humidity,
//         ph: soil.ph === "Unavailable" ? 6.5 : soil.ph,
//         rainfall:
//           weather.rainfall === "No rain detected" ? 0 : weather.rainfall,
//       };

//       const aiRes = await fetch("http://127.0.0.1:5000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(inputData),
//       });

//       const aiData = await aiRes.json();
//       setAiAdvice(aiData.recommendation || "AI could not provide advice.");
//       setIrrigation(aiData.irrigation || "Not available");
//       setFertilizer(aiData.fertilizer || "Not available");
//     } catch (err) {
//       console.error("AI Fetch Error:", err);
//       alert("Error fetching AI suggestion.");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Your data has been submitted successfully!");
//     navigate("/success");
//   };

//   return (
//     <>
//       {/* <Snav /> */}
//       <div
//         style={{
//           backgroundColor: "#fff",
//           minHeight: "100vh",
//           padding: "40px 20px",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           flexDirection: "column",
//           fontFamily: "'Poppins', sans-serif",
//         }}
//       >
//         <h2
//           style={{
//             color: "#000",
//             fontWeight: "600",
//             marginBottom: "25px",
//             textAlign: "center",
//             fontSize: "2rem",
//           }}
//         >
//           🌾 AgriSense AI Farming Advisor
//         </h2>

//         <div
//           style={{
//             border: "1px solid #000",
//             borderRadius: "10px",
//             backgroundColor: "#fff",
//             boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//             width: "100%",
//             maxWidth: "700px",
//             padding: "25px",
//           }}
//         >
//           <Form onSubmit={handleSubmit}>
//             {/* ✅ Email */}
//             {/* <Form.Group className="mb-3">
//               {/* <h4 style={{ color: "#000", fontWeight: "600" }}>Email Address</h4> */}
//               {/* <InputGroup>
//                 <InputGroup.Text>@</InputGroup.Text>
//                 <Form.Control
//                   type="email"
//                   placeholder="Enter email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </InputGroup>
//             </Form.Group>  */}

//             {/* ✅ Auto-Fetched Environment Data */}
//             <div style={{ marginTop: "20px" }}>
//               <h4 style={{ color: "#000", fontWeight: "600" }}>
//                 🌍 Environment Data
//               </h4>
//               <table
//                 style={{
//                   width: "100%",
//                   borderCollapse: "collapse",
//                   marginTop: "10px",
//                   border: "1px solid #000",
//                   color: "#000",
//                   textAlign: "center",
//                 }}
//               >
//                 <thead style={{ backgroundColor: "#f0f0f0" }}>
//                   <tr>
//                     <th style={{ border: "1px solid #000", padding: "10px" }}>
//                       Parameter
//                     </th>
//                     <th style={{ border: "1px solid #000", padding: "10px" }}>
//                       Value
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr><td>Latitude</td><td>{lat || "Fetching..."}</td></tr>
//                   <tr><td>Longitude</td><td>{lon || "Fetching..."}</td></tr>
//                   <tr><td>Temperature (°C)</td><td>{weather.temperature}</td></tr>
//                   <tr><td>Humidity (%)</td><td>{weather.humidity}</td></tr>
//                   <tr><td>Rainfall (mm)</td><td>{weather.rainfall}</td></tr>
//                   <tr><td>Soil pH</td><td>{soil.ph}</td></tr>
//                 </tbody>
//               </table>
//             </div>

//             {/* ✅ Crop Input */}
//             <Form.Group className="mb-3" style={{ marginTop: "25px" }}>
//               <h4 style={{ color: "#000", fontWeight: "600" }}>Crop Type</h4>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter crop name (e.g., Wheat, Rice)"
//                 value={crop}
//                 onChange={(e) => setCrop(e.target.value)}
//               />
//             </Form.Group>

//             {/* ✅ Get Suggestion Button */}
//             <Button
//               type="button"
//               style={{
//                 backgroundColor: "#000",
//                 color: "#fff",
//                 border: "none",
//                 marginTop: "20px",
//                 width: "100%",
//                 fontWeight: "600",
//               }}
//               onClick={getAISuggestion}
//             >
//               🌾 Get AI Suggestion
//             </Button>

//             {/* ✅ AI Output */}
//             {aiAdvice && (
//               <div
//                 style={{
//                   marginTop: "25px",
//                   color: "#000",
//                   backgroundColor: "#f9f9f9",
//                   border: "1px solid #000",
//                   borderRadius: "8px",
//                   padding: "15px",
//                 }}
//               >
//                 <h5 style={{ fontWeight: "600" }}>🧠 AI Recommendation:</h5>
//                 <p><b>Advice:</b> {aiAdvice}</p>
//                 <p><b>Fertilizer:</b> {fertilizer}</p>
//                 <p><b>Irrigation:</b> {irrigation}</p>
//               </div>
//             )}

//             {/* ✅ Submit */}
//             <Button
//               type="submit"
//               variant="primary"
//               style={{
//                 marginTop: "30px",
//                 width: "100%",
//                 fontWeight: "600",
//                 backgroundColor: "#000",
//                 border: "none",
//               }}
//             >
//               Submit
//             </Button>
//           </Form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default AISuggestion;




// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Card from "react-bootstrap/Card";
// import Spinner from "react-bootstrap/Spinner";
// import Snav from "./sidenav";

// function AISuggestion() {
//   const navigate = useNavigate();

//   const [crop, setCrop] = useState("");
//   const [locationMode, setLocationMode] = useState("auto");
//   const [locationName, setLocationName] = useState("");
//   const [lat, setLat] = useState("");
//   const [lon, setLon] = useState("");
//   const [weather, setWeather] = useState({});
//   const [soil, setSoil] = useState({});
//   const [aiAdvice, setAiAdvice] = useState("");
//   const [fertilizer, setFertilizer] = useState("");
//   const [irrigation, setIrrigation] = useState("");
//   const [sustainability, setSustainability] = useState("");
//   const [pesticide, setPesticide] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
// //   const [fertilizer, setFertilizer] = useState({});
// // const [pesticide, setPesticide] = useState({});


//   const WEATHER_API = "64ec4e8adf69cb9be080f0c6d813f56d";

//   // 🌍 Auto Fetch Location + Data
//   useEffect(() => {
//     if (locationMode !== "auto") return;

//     const fetchAutoData = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         navigator.geolocation.getCurrentPosition(async (pos) => {
//           const latitude = pos.coords.latitude;
//           const longitude = pos.coords.longitude;
//           setLat(latitude);
//           setLon(longitude);

//           // Reverse Geocode
//           const locRes = await fetch(
//             `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
//           );
//           const locData = await locRes.json();
//           const city =
//             locData.city || locData.locality || locData.principalSubdivision;
//           setLocationName(city || "Unknown Location");

//           // Weather Data
//           const weatherRes = await fetch(
//             `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API}`
//           );
//           const weatherData = await weatherRes.json();
//           setWeather({
//             temperature: weatherData.main?.temp ?? "N/A",
//             humidity: weatherData.main?.humidity ?? "N/A",
//             rainfall:
//               weatherData.rain?.["1h"] ?? weatherData.rain?.["3h"] ?? "No rain detected",
//           });

//           // Soil Data
//           const soilRes = await fetch(
//             `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=phh2o`
//           );
//           const soilData = await soilRes.json();
//           const phValue =
//             soilData?.properties?.layers?.[0]?.depths?.[0]?.values?.mean ?? null;
//           setSoil({
//             ph: phValue ? (phValue / 10).toFixed(2) : "Unavailable",
//           });

//           setLoading(false);
//         });
//       } catch (err) {
//         console.error(err);
//         setError("Error fetching auto location data.");
//         setLoading(false);
//       }
//     };

//     fetchAutoData();
//   }, [locationMode]);

//   // 📍 Manual Location Fetch
//   const fetchManualData = async () => {
//     if (!locationName.trim()) {
//       setError("Please enter a valid city name.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const geoRes = await fetch(
//         `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
//           locationName
//         )}&limit=1&appid=${WEATHER_API}`
//       );
//       const geoData = await geoRes.json();
//       let latitude, longitude;

//       if (geoData.length === 0) {
//         const osmRes = await fetch(
//           `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
//             locationName
//           )}&format=json&limit=1`
//         );
//         const osmData = await osmRes.json();

//         if (!osmData.length) {
//           setLoading(false);
//           setError(`⚠️ Couldn't find "${locationName}". Try a nearby city.`);
//           return;
//         }

//         latitude = osmData[0].lat;
//         longitude = osmData[0].lon;
//       } else {
//         latitude = geoData[0].lat;
//         longitude = geoData[0].lon;
//       }

//       setLat(latitude);
//       setLon(longitude);

//       // Weather Data
//       const weatherRes = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API}`
//       );
//       const weatherData = await weatherRes.json();
//       setWeather({
//         temperature: weatherData.main?.temp ?? "N/A",
//         humidity: weatherData.main?.humidity ?? "N/A",
//         rainfall:
//           weatherData.rain?.["1h"] ?? weatherData.rain?.["3h"] ?? "No rain detected",
//       });

//       // Soil Data
//       const soilRes = await fetch(
//         `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=phh2o`
//       );
//       const soilData = await soilRes.json();
//       const phValue =
//         soilData?.properties?.layers?.[0]?.depths?.[0]?.values?.mean ?? null;
//       setSoil({
//         ph: phValue ? (phValue / 10).toFixed(2) : "Unavailable",
//       });

//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setError("⚠️ Error fetching data. Please try again.");
//       setLoading(false);
//     }
//   };

//   // 🧠 AI Suggestion
//   // const getAISuggestion = async () => {
//   //   try {
//   //     const inputData = {
//   //       crop, // Crop type (e.g., rice, wheat, etc.)
//   //       temperature: weather.temperature === "Unavailable" ? 0 : weather.temperature, // Temperature
//   //       humidity: weather.humidity === "Unavailable" ? 0 : weather.humidity, // Humidity
//   //       ph: soil.ph === "Unavailable" ? 6.5 : soil.ph, // Soil pH (default to 6.5 if unavailable)
//   //       rainfall: weather.rainfall === "No rain detected" ? 0 : weather.rainfall, // Rainfall (set to 0 if no rain detected)
//   //     };

//   //     console.log("📤 Sending:", inputData);

//   //     const aiRes = await fetch("http://127.0.0.1:5000/predict", {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify(inputData),
//   //     });

//   //     const aiData = await aiRes.json();
//   //     console.log("✅ Received:", aiData);

//   //     setAiAdvice(aiData.advice || "AI could not provide advice.");
//   //     setFertilizer(aiData.fertilizer || "No fertilizer advice.");
//   //     setIrrigation(aiData.irrigation || "No irrigation advice.");
//   //     setSustainability(aiData.sustainability || "No sustainability tip.");
//   //     setPesticide(aiData.pesticide || "No pesticide advice.");
//   //   } catch (err) {
//   //     console.error("AI Fetch Error:", err);
//   //     alert("Error fetching AI suggestion");
//   //   }
//   // };
//   // const getAISuggestion = async () => {
//   //   try {
//   //     const inputData = {
//   //       crop, // Crop type (e.g., rice, wheat, etc.)
//   //       temperature: weather.temperature === "Unavailable" ? 0 : weather.temperature, // Temperature
//   //       humidity: weather.humidity === "Unavailable" ? 0 : weather.humidity, // Humidity
//   //       ph: soil.ph === "Unavailable" ? 6.5 : soil.ph, // Soil pH (default to 6.5 if unavailable)
//   //     };
  
//   //     console.log("📤 Sending:", inputData);
  
//   //     const aiRes = await fetch("http://127.0.0.1:1000/predict", {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify(inputData),
//   //     });
  
//   //     const aiData = await aiRes.json();
//   //     console.log("✅ Received:", aiData);
  
//   //     // Set the responses to respective states
//   //     setAiAdvice(aiData.data.advice || "AI could not provide advice.");
//   //     setFertilizer(aiData.data.fertilizer || "No fertilizer advice.");
//   //     setIrrigation(aiData.data.irrigation || "No irrigation advice.");
//   //     setSustainability(aiData.data.sustainability_tip || "No sustainability tip.");
//   //     setPesticide(aiData.data.pesticide || "No pesticide advice.");
//   //   } catch (err) {
//   //     console.error("AI Fetch Error:", err);
//   //     alert("Error fetching AI suggestion");
//   //   }
//   // };
//   const getAISuggestion = async () => {
//     try {
//       const inputData = {
//         crop,
//         ph: soil.ph === "Unavailable" ? 6.5 : parseFloat(soil.ph),
//         soil_moisture:
//           weather.humidity === "Unavailable" ? 30 : parseFloat(weather.humidity),
//         temperature:
//           weather.temperature === "Unavailable" ? 25 : parseFloat(weather.temperature),
//         rainfall:
//           weather.rainfall === "No rain detected" ? 0 : parseFloat(weather.rainfall),
//       };
  
//       console.log("📤 Sending:", inputData);
  
//       const aiRes = await fetch("http://127.0.0.1:5000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(inputData),
//       });
  
//       if (!aiRes.ok) throw new Error("Server error");
  
//       const aiData = await aiRes.json();
//       console.log("✅ Received:", aiData);
  
//       if (aiData.status === "success" && aiData.data) {
//         setAiAdvice("🌾 Here’s your AI-generated farm planning suggestion:");
//         // setFertilizer(
//         //   `${aiData.data.fertilizer.name} (${aiData.data.fertilizer.amount_kg} kg)`
//         // );
//         // setPesticide(
//         //   `${aiData.data.pesticide.name} (${aiData.data.pesticide.amount_kg} kg)`
//         // );
//         setFertilizer(aiData.data.fertilizer || {});
// setPesticide(aiData.data.pesticide || {});

//         setIrrigation(aiData.data.irrigation);
//         setSustainability(aiData.data.sustainability_tip);
//       } else {
//         throw new Error("Invalid AI response");
//       }
//     } catch (err) {
//       console.error("AI Fetch Error:", err);
//       alert("Error fetching AI suggestion. Please make sure Flask is running on port 5000.");
//     }
//   };
  
  
//   return (
//     <>
    
//       <div
//         style={{
//           minHeight: "100vh",
//           background: "linear-gradient(to bottom right, #e3f2fd, #f1f8e9)",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           padding: "40px",
//         }}
//       >
//         <Card
//           style={{
//             width: "100%",
//             maxWidth: "750px",
//             borderRadius: "20px",
//             boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
//             backgroundColor: "#fff",
//             fontFamily: "'Poppins', sans-serif",
//             animation: "fadeIn 1s ease-in-out",
//           }}
//         >
//           <Card.Body>
//             <h2
//               style={{
//                 fontWeight: "700",
//                 textAlign: "center",
//                 color: "#1b5e20",
//                 marginBottom: "25px",
//               }}
//             >
//               🌾 AgriSense Smart Farming Advisor
//             </h2>

//             {/* Location Selector */}
//             <Form>
//               <Form.Group>
//                 <h5 style={{ fontWeight: "600" }}>📍 Location Mode</h5>
//                 <div>
//                   <Form.Check
//                     inline
//                     label="Auto Fetch"
//                     type="radio"
//                     value="auto"
//                     checked={locationMode === "auto"}
//                     onChange={() => setLocationMode("auto")}
//                   />
//                   <Form.Check
//                     inline
//                     label="Manual Entry"
//                     type="radio"
//                     value="manual"
//                     checked={locationMode === "manual"}
//                     onChange={() => setLocationMode("manual")}
//                   />
//                 </div>
//               </Form.Group>

//               {/* Manual Location Input */}
//               <Form.Group className="mt-3">
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter city (e.g., Delhi)"
//                   value={locationName}
//                   onChange={(e) => setLocationName(e.target.value)}
//                   disabled={locationMode === "auto"}
//                 />
//                 {locationMode === "manual" && (
//                   <Button
//                     onClick={fetchManualData}
//                     className="mt-2"
//                     variant="success"
//                     style={{ borderRadius: "10px" }}
//                   >
//                     Fetch Data
//                   </Button>
//                 )}
//               </Form.Group>

//               {/* Error */}
//               {error && (
//                 <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
//               )}

//               {/* Spinner */}
//               {loading && (
//                 <div style={{ textAlign: "center", marginTop: "20px" }}>
//                   <Spinner animation="border" variant="success" />
//                   <p style={{ color: "#2e7d32", marginTop: "10px" }}>
//                     Fetching live farm data...
//                   </p>
//                 </div>
//               )}

//               {/* Data Card */}
//               {!loading && weather.temperature && (
//                 <div
//                   style={{
//                     backgroundColor: "#f9fbe7",
//                     borderLeft: "6px solid #81c784",
//                     borderRadius: "10px",
//                     padding: "15px",
//                     marginTop: "20px",
//                     animation: "fadeInUp 1s",
//                   }}
//                 >
//                   <h5 style={{ color: "#33691e" }}>🌍 Environment Data</h5>
//                   <p><b>Location:</b> {locationName}</p>
//                   <p><b>Temperature:</b> {weather.temperature} °C</p>
//                   <p><b>Humidity:</b> {weather.humidity} %</p>
//                   <p><b>Rainfall:</b> {weather.rainfall}</p>
//                   <p><b>Soil pH:</b> {soil.ph}</p>
//                 </div>
//               )}

//               {/* Crop Selector */}
//               <Form.Group className="mt-4">
//                 <h5 style={{ fontWeight: "600" }}>🌱 Select Crop</h5>
//                 <Form.Select
//                   value={crop}
//                   onChange={(e) => setCrop(e.target.value)}
//                   style={{ borderRadius: "10px" }}
//                 >
//                   <option value="">-- Select a Crop --</option>
//                   {[
//                     "Rice", "Wheat", "Maize", "Barley", "Sugarcane", "Cotton",
//                     "Soybean", "Groundnut", "Mustard", "Potato", "Tomato", "Onion",
//                     "Pulses", "Millet", "Banana", "Sorghum", "Bajra", "Chili", "Tea", "Coffee"
//                   ].map((c) => (
//                     <option key={c} value={c.toLowerCase()}>{c}</option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>

//               {/* Button */}
//               <Button
//                 onClick={getAISuggestion}
//                 className="mt-4"
//                 style={{
//                   width: "100%",
//                   borderRadius: "10px",
//                   fontWeight: "600",
//                   backgroundColor: "#1b5e20",
//                   border: "none",
//                 }}
//               >
//                 {loading ? "Analyzing..." : "🧠 Get AI Suggestion"}
//               </Button>

//               {/* AI Result */}
//               {/* {aiAdvice && (
//                 <div
//                   style={{
//                     marginTop: "25px",
//                     background: "#f1f8e9",
//                     borderLeft: "6px solid #66bb6a",
//                     padding: "20px",
//                     borderRadius: "12px",
//                     animation: "fadeIn 0.8s ease-in",
//                   }}
//                 >
//                   <h5 style={{ color: "#2e7d32" }}>🧠 AI Recommendation</h5>
//                   <p><b>Advice:</b> {aiAdvice}</p>
//                   <p><b>Fertilizer:</b> {fertilizer}</p>
//                   <p><b>Pesticide:</b> {pesticide}</p>
//                   <p><b>Irrigation:</b> {irrigation}</p>
//                   <p><b>Sustainability Tip:</b> {sustainability}</p>
//                 </div>
//               )} */}
//               {/* AI Result */}
// {aiAdvice && (
//   <div
//     style={{
//       marginTop: "25px",
//       background: "#f1f8e9",
//       borderLeft: "6px solid #66bb6a",
//       padding: "20px",
//       borderRadius: "12px",
//       animation: "fadeIn 0.8s ease-in",
//     }}
//   >
//     <h5 style={{ color: "#2e7d32" }}>🧠 AI Recommendation</h5>
    
//     <div>
//       <b>🌱 Advice:</b>
//       <p>{aiAdvice}</p>
//     </div>
    
//     <div>
//       <b>💧 Fertilizer:</b>
//       <p>{fertilizer.name} ({fertilizer.amount_kg} kg)</p>
//     </div>
    
//     <div>
//       <b>🧴 Pesticide:</b>
//       <p>{pesticide.name} ({pesticide.amount_kg} kg)</p>
//     </div>
    
//     <div>
//       <b>💦 Irrigation:</b>
//       <p>{irrigation}</p>
//     </div>
    
//     <div>
//       <b>🌍 Sustainability Tip:</b>
//       <p>{sustainability}</p>
//     </div>
//   </div>
// )}

//             </Form>
//           </Card.Body>
//         </Card>
//       </div>

//       {/* Animations */}
//       <style>
//         {`
//         @keyframes fadeIn { from {opacity:0;transform:translateY(15px);} to {opacity:1;transform:translateY(0);} }
//         @keyframes fadeInUp { from {opacity:0;transform:translateY(20px);} to {opacity:1;transform:translateY(0);} }
//       `}
//       </style>
//     </>
//   );
// }

// export default AISuggestion;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Card from "react-bootstrap/Card";
// import Spinner from "react-bootstrap/Spinner";
// import Snav from "./sidenav";

// function AISuggestion() {
//   const navigate = useNavigate();

//   const [crop, setCrop] = useState("");
//   const [locationMode, setLocationMode] = useState("auto");
//   const [locationName, setLocationName] = useState("");
//   const [lat, setLat] = useState("");
//   const [lon, setLon] = useState("");
//   const [weather, setWeather] = useState({});
//   const [soil, setSoil] = useState({});
//   const [aiAdvice, setAiAdvice] = useState("");
//   const [fertilizer, setFertilizer] = useState("");
//   const [irrigation, setIrrigation] = useState("");
//   const [sustainability, setSustainability] = useState("");
//   const [pesticide, setPesticide] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
// //   const [fertilizer, setFertilizer] = useState({});
// // const [pesticide, setPesticide] = useState({});


//   const WEATHER_API = "64ec4e8adf69cb9be080f0c6d813f56d";

//   // 🌍 Auto Fetch Location + Data
//   useEffect(() => {
//     if (locationMode !== "auto") return;

//     const fetchAutoData = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         navigator.geolocation.getCurrentPosition(async (pos) => {
//           const latitude = pos.coords.latitude;
//           const longitude = pos.coords.longitude;
//           setLat(latitude);
//           setLon(longitude);

//           // Reverse Geocode
//           const locRes = await fetch(
//             `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
//           );
//           const locData = await locRes.json();
//           const city =
//             locData.city || locData.locality || locData.principalSubdivision;
//           setLocationName(city || "Unknown Location");

//           // Weather Data
//           const weatherRes = await fetch(
//             `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API}`
//           );
//           const weatherData = await weatherRes.json();
//           setWeather({
//             temperature: weatherData.main?.temp ?? "N/A",
//             humidity: weatherData.main?.humidity ?? "N/A",
//             rainfall:
//               weatherData.rain?.["1h"] ?? weatherData.rain?.["3h"] ?? "No rain detected",
//           });

//           // Soil Data
//           const soilRes = await fetch(
//             `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=phh2o`
//           );
//           const soilData = await soilRes.json();
//           const phValue =
//             soilData?.properties?.layers?.[0]?.depths?.[0]?.values?.mean ?? null;
//           setSoil({
//             ph: phValue ? (phValue / 10).toFixed(2) : "Unavailable",
//           });

//           setLoading(false);
//         });
//       } catch (err) {
//         console.error(err);
//         setError("Error fetching auto location data.");
//         setLoading(false);
//       }
//     };

//     fetchAutoData();
//   }, [locationMode]);

//   // 📍 Manual Location Fetch
//   const fetchManualData = async () => {
//     if (!locationName.trim()) {
//       setError("Please enter a valid city name.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const geoRes = await fetch(
//         `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
//           locationName
//         )}&limit=1&appid=${WEATHER_API}`
//       );
//       const geoData = await geoRes.json();
//       let latitude, longitude;

//       if (geoData.length === 0) {
//         const osmRes = await fetch(
//           `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
//             locationName
//           )}&format=json&limit=1`
//         );
//         const osmData = await osmRes.json();

//         if (!osmData.length) {
//           setLoading(false);
//           setError(`⚠️ Couldn't find "${locationName}". Try a nearby city.`);
//           return;
//         }

//         latitude = osmData[0].lat;
//         longitude = osmData[0].lon;
//       } else {
//         latitude = geoData[0].lat;
//         longitude = geoData[0].lon;
//       }

//       setLat(latitude);
//       setLon(longitude);

//       // Weather Data
//       const weatherRes = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API}`
//       );
//       const weatherData = await weatherRes.json();
//       setWeather({
//         temperature: weatherData.main?.temp ?? "N/A",
//         humidity: weatherData.main?.humidity ?? "N/A",
//         rainfall:
//           weatherData.rain?.["1h"] ?? weatherData.rain?.["3h"] ?? "No rain detected",
//       });

//       // Soil Data
//       const soilRes = await fetch(
//         `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=phh2o`
//       );
//       const soilData = await soilRes.json();
//       const phValue =
//         soilData?.properties?.layers?.[0]?.depths?.[0]?.values?.mean ?? null;
//       setSoil({
//         ph: phValue ? (phValue / 10).toFixed(2) : "Unavailable",
//       });

//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setError("⚠️ Error fetching data. Please try again.");
//       setLoading(false);
//     }
//   };

//   // 🧠 AI Suggestion
//   // const getAISuggestion = async () => {
//   //   try {
//   //     const inputData = {
//   //       crop, // Crop type (e.g., rice, wheat, etc.)
//   //       temperature: weather.temperature === "Unavailable" ? 0 : weather.temperature, // Temperature
//   //       humidity: weather.humidity === "Unavailable" ? 0 : weather.humidity, // Humidity
//   //       ph: soil.ph === "Unavailable" ? 6.5 : soil.ph, // Soil pH (default to 6.5 if unavailable)
//   //       rainfall: weather.rainfall === "No rain detected" ? 0 : weather.rainfall, // Rainfall (set to 0 if no rain detected)
//   //     };

//   //     console.log("📤 Sending:", inputData);

//   //     const aiRes = await fetch("http://127.0.0.1:5000/predict", {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify(inputData),
//   //     });

//   //     const aiData = await aiRes.json();
//   //     console.log("✅ Received:", aiData);

//   //     setAiAdvice(aiData.advice || "AI could not provide advice.");
//   //     setFertilizer(aiData.fertilizer || "No fertilizer advice.");
//   //     setIrrigation(aiData.irrigation || "No irrigation advice.");
//   //     setSustainability(aiData.sustainability || "No sustainability tip.");
//   //     setPesticide(aiData.pesticide || "No pesticide advice.");
//   //   } catch (err) {
//   //     console.error("AI Fetch Error:", err);
//   //     alert("Error fetching AI suggestion");
//   //   }
//   // };
//   // const getAISuggestion = async () => {
//   //   try {
//   //     const inputData = {
//   //       crop, // Crop type (e.g., rice, wheat, etc.)
//   //       temperature: weather.temperature === "Unavailable" ? 0 : weather.temperature, // Temperature
//   //       humidity: weather.humidity === "Unavailable" ? 0 : weather.humidity, // Humidity
//   //       ph: soil.ph === "Unavailable" ? 6.5 : soil.ph, // Soil pH (default to 6.5 if unavailable)
//   //     };
  
//   //     console.log("📤 Sending:", inputData);
  
//   //     const aiRes = await fetch("http://127.0.0.1:1000/predict", {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify(inputData),
//   //     });
  
//   //     const aiData = await aiRes.json();
//   //     console.log("✅ Received:", aiData);
  
//   //     // Set the responses to respective states
//   //     setAiAdvice(aiData.data.advice || "AI could not provide advice.");
//   //     setFertilizer(aiData.data.fertilizer || "No fertilizer advice.");
//   //     setIrrigation(aiData.data.irrigation || "No irrigation advice.");
//   //     setSustainability(aiData.data.sustainability_tip || "No sustainability tip.");
//   //     setPesticide(aiData.data.pesticide || "No pesticide advice.");
//   //   } catch (err) {
//   //     console.error("AI Fetch Error:", err);
//   //     alert("Error fetching AI suggestion");
//   //   }
//   // };
//   const getAISuggestion = async () => {
//     try {
//       const inputData = {
//         crop,
//         ph: soil.ph === "Unavailable" ? 6.5 : parseFloat(soil.ph),
//         soil_moisture:
//           weather.humidity === "Unavailable" ? 30 : parseFloat(weather.humidity),
//         temperature:
//           weather.temperature === "Unavailable" ? 25 : parseFloat(weather.temperature),
//         rainfall:
//           weather.rainfall === "No rain detected" ? 0 : parseFloat(weather.rainfall),
//       };
  
//       console.log("📤 Sending:", inputData);
  
//       const aiRes = await fetch("http://127.0.0.1:5000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(inputData),
//       });
  
//       if (!aiRes.ok) throw new Error("Server error");
  
//       const aiData = await aiRes.json();
//       console.log("✅ Received:", aiData);
  
//       if (aiData.status === "success" && aiData.data) {
//         setAiAdvice("🌾 Here’s your AI-generated farm planning suggestion:");
//         // setFertilizer(
//         //   `${aiData.data.fertilizer.name} (${aiData.data.fertilizer.amount_kg} kg)`
//         // );
//         // setPesticide(
//         //   `${aiData.data.pesticide.name} (${aiData.data.pesticide.amount_kg} kg)`
//         // );
//         setFertilizer(aiData.data.fertilizer || {});
// setPesticide(aiData.data.pesticide || {});

//         setIrrigation(aiData.data.irrigation);
//         setSustainability(aiData.data.sustainability_tip);
//       } else {
//         throw new Error("Invalid AI response");
//       }
//     } catch (err) {
//       console.error("AI Fetch Error:", err);
//       alert("Error fetching AI suggestion. Please make sure Flask is running on port 5000.");
//     }
//   };
  
  
//   return (
//     <>
//       {/* <Snav /> */}
//       <div
//         style={{
//           minHeight: "100vh",
//           background: "linear-gradient(to bottom right, #e3f2fd, #f1f8e9)",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           padding: "40px",
//         }}
//       >
//         <Card
//           style={{
//             width: "100%",
//             maxWidth: "750px",
//             borderRadius: "20px",
//             boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
//             backgroundColor: "#fff",
//             fontFamily: "'Poppins', sans-serif",
//             animation: "fadeIn 1s ease-in-out",
//           }}
//         >
//           <Card.Body>
//             <h2
//               style={{
//                 fontWeight: "700",
//                 textAlign: "center",
//                 color: "#1b5e20",
//                 marginBottom: "25px",
//               }}
//             >
//               🌾 AgriSense Smart Farming Advisor
//             </h2>

//             {/* Location Selector */}
//             <Form>
//               <Form.Group>
//                 <h5 style={{ fontWeight: "600" }}>📍 Location Mode</h5>
//                 <div>
//                   <Form.Check
//                     inline
//                     label="Auto Fetch"
//                     type="radio"
//                     value="auto"
//                     checked={locationMode === "auto"}
//                     onChange={() => setLocationMode("auto")}
//                   />
//                   <Form.Check
//                     inline
//                     label="Manual Entry"
//                     type="radio"
//                     value="manual"
//                     checked={locationMode === "manual"}
//                     onChange={() => setLocationMode("manual")}
//                   />
//                 </div>
//               </Form.Group>

//               {/* Manual Location Input */}
//               <Form.Group className="mt-3">
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter city (e.g., Delhi)"
//                   value={locationName}
//                   onChange={(e) => setLocationName(e.target.value)}
//                   disabled={locationMode === "auto"}
//                 />
//                 {locationMode === "manual" && (
//                   <Button
//                     onClick={fetchManualData}
//                     className="mt-2"
//                     variant="success"
//                     style={{ borderRadius: "10px" }}
//                   >
//                     Fetch Data
//                   </Button>
//                 )}
//               </Form.Group>

//               {/* Error */}
//               {error && (
//                 <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
//               )}

//               {/* Spinner */}
//               {loading && (
//                 <div style={{ textAlign: "center", marginTop: "20px" }}>
//                   <Spinner animation="border" variant="success" />
//                   <p style={{ color: "#2e7d32", marginTop: "10px" }}>
//                     Fetching live farm data...
//                   </p>
//                 </div>
//               )}

//               {/* Data Card */}
//               {!loading && weather.temperature && (
//                 <div
//                   style={{
//                     backgroundColor: "#f9fbe7",
//                     borderLeft: "6px solid #81c784",
//                     borderRadius: "10px",
//                     padding: "15px",
//                     marginTop: "20px",
//                     animation: "fadeInUp 1s",
//                   }}
//                 >
//                   <h5 style={{ color: "#33691e" }}>🌍 Environment Data</h5>
//                   <p><b>Location:</b> {locationName}</p>
//                   <p><b>Temperature:</b> {weather.temperature} °C</p>
//                   <p><b>Humidity:</b> {weather.humidity} %</p>
//                   <p><b>Rainfall:</b> {weather.rainfall}</p>
//                   <p><b>Soil pH:</b> {soil.ph}</p>
//                 </div>
//               )}

//               {/* Crop Selector */}
//               <Form.Group className="mt-4">
//                 <h5 style={{ fontWeight: "600" }}>🌱 Select Crop</h5>
//                 <Form.Select
//                   value={crop}
//                   onChange={(e) => setCrop(e.target.value)}
//                   style={{ borderRadius: "10px" }}
//                 >
//                   <option value="">-- Select a Crop --</option>
//                   {[
//                     "Rice", "Wheat", "Maize", "Barley", "Sugarcane", "Cotton",
//                     "Soybean", "Groundnut", "Mustard", "Potato", "Tomato", "Onion",
//                     "Pulses", "Millet", "Banana", "Sorghum", "Bajra", "Chili", "Tea", "Coffee"
//                   ].map((c) => (
//                     <option key={c} value={c.toLowerCase()}>{c}</option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>

//               {/* Button */}
//               <Button
//                 onClick={getAISuggestion}
//                 className="mt-4"
//                 style={{
//                   width: "100%",
//                   borderRadius: "10px",
//                   fontWeight: "600",
//                   backgroundColor: "#1b5e20",
//                   border: "none",
//                 }}
//               >
//                 {loading ? "Analyzing..." : "🧠 Get AI Suggestion"}
//               </Button>

//               {/* AI Result */}
//               {/* {aiAdvice && (
//                 <div
//                   style={{
//                     marginTop: "25px",
//                     background: "#f1f8e9",
//                     borderLeft: "6px solid #66bb6a",
//                     padding: "20px",
//                     borderRadius: "12px",
//                     animation: "fadeIn 0.8s ease-in",
//                   }}
//                 >
//                   <h5 style={{ color: "#2e7d32" }}>🧠 AI Recommendation</h5>
//                   <p><b>Advice:</b> {aiAdvice}</p>
//                   <p><b>Fertilizer:</b> {fertilizer}</p>
//                   <p><b>Pesticide:</b> {pesticide}</p>
//                   <p><b>Irrigation:</b> {irrigation}</p>
//                   <p><b>Sustainability Tip:</b> {sustainability}</p>
//                 </div>
//               )} */}
//               {/* AI Result */}
// {aiAdvice && (
//   <div
//     style={{
//       marginTop: "25px",
//       background: "#f1f8e9",
//       borderLeft: "6px solid #66bb6a",
//       padding: "20px",
//       borderRadius: "12px",
//       animation: "fadeIn 0.8s ease-in",
//     }}
//   >
//     <h5 style={{ color: "#2e7d32" }}>🧠 AI Recommendation</h5>
    
//     <div>
//       <b>🌱 Advice:</b>
//       <p>{aiAdvice}</p>
//     </div>
    
//     <div>
//       <b>💧 Fertilizer:</b>
//       <p>{fertilizer.name} ({fertilizer.amount_kg} kg)</p>
//     </div>
    
//     <div>
//       <b>🧴 Pesticide:</b>
//       <p>{pesticide.name} ({pesticide.amount_kg} kg)</p>
//     </div>
    
//     <div>
//       <b>💦 Irrigation:</b>
//       <p>{irrigation}</p>
//     </div>
    
//     <div>
//       <b>🌍 Sustainability Tip:</b>
//       <p>{sustainability}</p>
//     </div>
//   </div>
// )}

//             </Form>
//           </Card.Body>
//         </Card>
//       </div>

//       {/* Animations */}
//       <style>
//         {`
//         @keyframes fadeIn { from {opacity:0;transform:translateY(15px);} to {opacity:1;transform:translateY(0);} }
//         @keyframes fadeInUp { from {opacity:0;transform:translateY(20px);} to {opacity:1;transform:translateY(0);} }
//       `}
//       </style>
//     </>
//   );
// }

// export default AISuggestion;






// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Card from "react-bootstrap/Card";
// import Spinner from "react-bootstrap/Spinner";
// import Snav from "./sidenav";

// function AISuggestion() {
//   const navigate = useNavigate();

//   const [crop, setCrop] = useState("");
//   const [locationMode, setLocationMode] = useState("auto");
//   const [locationName, setLocationName] = useState("");
//   const [lat, setLat] = useState("");
//   const [lon, setLon] = useState("");
//   const [weather, setWeather] = useState({});
//   const [soil, setSoil] = useState({});
//   const [aiAdvice, setAiAdvice] = useState("");
//   const [fertilizer, setFertilizer] = useState("");
//   const [irrigation, setIrrigation] = useState("");
//   const [sustainability, setSustainability] = useState("");
//   const [pesticide, setPesticide] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const WEATHER_API = "64ec4e8adf69cb9be080f0c6d813f56d";

//   // Auto fetch location data
//   useEffect(() => {
//     if (locationMode !== "auto") return;

//     const fetchAutoData = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         navigator.geolocation.getCurrentPosition(async (pos) => {
//           const latitude = pos.coords.latitude;
//           const longitude = pos.coords.longitude;
//           setLat(latitude);
//           setLon(longitude);

//           const locRes = await fetch(
//             `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
//           );
//           const locData = await locRes.json();
//           const city =
//             locData.city || locData.locality || locData.principalSubdivision;
//           setLocationName(city || "Unknown Location");

//           const weatherRes = await fetch(
//             `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API}`
//           );
//           const weatherData = await weatherRes.json();
//           setWeather({
//             temperature: weatherData.main?.temp ?? "N/A",
//             humidity: weatherData.main?.humidity ?? "N/A",
//             rainfall:
//               weatherData.rain?.["1h"] ?? weatherData.rain?.["3h"] ?? "No rain detected",
//           });

//           const soilRes = await fetch(
//             `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=phh2o`
//           );
//           const soilData = await soilRes.json();
//           const phValue =
//             soilData?.properties?.layers?.[0]?.depths?.[0]?.values?.mean ?? null;
//           setSoil({
//             ph: phValue ? (phValue / 10).toFixed(2) : "Unavailable",
//           });

//           setLoading(false);
//         });
//       } catch (err) {
//         console.error(err);
//         setError("Error fetching auto location data.");
//         setLoading(false);
//       }
//     };

//     fetchAutoData();
//   }, [locationMode]);

//   // Manual location fetch
//   const fetchManualData = async () => {
//     if (!locationName.trim()) {
//       setError("Please enter a valid city name.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const geoRes = await fetch(
//         `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
//           locationName
//         )}&limit=1&appid=${WEATHER_API}`
//       );
//       const geoData = await geoRes.json();
//       let latitude, longitude;

//       if (geoData.length === 0) {
//         const osmRes = await fetch(
//           `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
//             locationName
//           )}&format=json&limit=1`
//         );
//         const osmData = await osmRes.json();

//         if (!osmData.length) {
//           setLoading(false);
//           setError(`⚠️ Couldn't find "${locationName}". Try a nearby city.`);
//           return;
//         }

//         latitude = osmData[0].lat;
//         longitude = osmData[0].lon;
//       } else {
//         latitude = geoData[0].lat;
//         longitude = geoData[0].lon;
//       }

//       setLat(latitude);
//       setLon(longitude);

//       const weatherRes = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API}`
//       );
//       const weatherData = await weatherRes.json();
//       setWeather({
//         temperature: weatherData.main?.temp ?? "N/A",
//         humidity: weatherData.main?.humidity ?? "N/A",
//         rainfall:
//           weatherData.rain?.["1h"] ?? weatherData.rain?.["3h"] ?? "No rain detected",
//       });

//       const soilRes = await fetch(
//         `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=phh2o`
//       );
//       const soilData = await soilRes.json();
//       const phValue =
//         soilData?.properties?.layers?.[0]?.depths?.[0]?.values?.mean ?? null;
//       setSoil({
//         ph: phValue ? (phValue / 10).toFixed(2) : "Unavailable",
//       });

//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setError("⚠️ Error fetching data. Please try again.");
//       setLoading(false);
//     }
//   };

//   // AI suggestion
//   const getAISuggestion = async () => {
//     try {
//       const inputData = {
//         crop,
//         ph: soil.ph === "Unavailable" ? 6.5 : parseFloat(soil.ph),
//         soil_moisture:
//           weather.humidity === "Unavailable" ? 30 : parseFloat(weather.humidity),
//         temperature:
//           weather.temperature === "Unavailable" ? 25 : parseFloat(weather.temperature),
//         rainfall:
//           weather.rainfall === "No rain detected" ? 0 : parseFloat(weather.rainfall),
//       };

//       console.log("📤 Sending:", inputData);

//       const aiRes = await fetch("http://127.0.0.1:5000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(inputData),
//       });

//       if (!aiRes.ok) throw new Error("Server error");

//       const aiData = await aiRes.json();
//       console.log("✅ Received:", aiData);

//       if (aiData.status === "success" && aiData.data) {
//         setAiAdvice("🌾 Here’s your AI-generated farm planning suggestion:");
//         setFertilizer(aiData.data.fertilizer || {});
//         setPesticide(aiData.data.pesticide || {});
//         setIrrigation(aiData.data.irrigation);
//         setSustainability(aiData.data.sustainability_tip);
//       } else {
//         throw new Error("Invalid AI response");
//       }
//     } catch (err) {
//       console.error("AI Fetch Error:", err);
//       alert("Error fetching AI suggestion. Please make sure Flask is running on port 5000.");
//     }
//   };

//   return (
//     <>
//       <div
//         style={{
//           minHeight: "100vh",
//           background: "linear-gradient(to bottom right, #e0f7fa, #e8f5e9)",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           padding: "20px",
//         }}
//       >
//         <Card
//           style={{
//             width: "100%",
//             maxWidth: "800px",
//             borderRadius: "20px",
//             boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
//             backgroundColor: "#ffffff",
//             fontFamily: "'Poppins', sans-serif",
//             padding: "25px",
//             animation: "fadeIn 1s ease-in-out",
//           }}
//         >
//           <Card.Body>
//             <h2
//               style={{
//                 fontWeight: "700",
//                 textAlign: "center",
//                 color: "#1b5e20",
//                 marginBottom: "30px",
//                 fontSize: "1.9rem",
//               }}
//             >
//               🌾 AgriSense Smart Farming Advisor
//             </h2>

//             <Form>
//               {/* Location Mode */}
//               <Form.Group>
//                 <h5 style={{ fontWeight: "700", color: "#2e7d32" }}>
//                   📍 Location Mode
//                 </h5>
//                 <div>
//                   <Form.Check
//                     inline
//                     label="Auto Fetch"
//                     type="radio"
//                     value="auto"
//                     checked={locationMode === "auto"}
//                     onChange={() => setLocationMode("auto")}
//                   />
//                   <Form.Check
//                     inline
//                     label="Manual Entry"
//                     type="radio"
//                     value="manual"
//                     checked={locationMode === "manual"}
//                     onChange={() => setLocationMode("manual")}
//                   />
//                 </div>
//               </Form.Group>

//               {/* Manual Input */}
//               <Form.Group className="mt-3">
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter city (e.g., Bhubaneswar)"
//                   value={locationName}
//                   onChange={(e) => setLocationName(e.target.value)}
//                   disabled={locationMode === "auto"}
//                   style={{ borderRadius: "12px", padding: "12px" }}
//                 />
//                 {locationMode === "manual" && (
//                   <Button
//                     onClick={fetchManualData}
//                     className="mt-2"
//                     variant="success"
//                     style={{ borderRadius: "10px", fontWeight: "600" }}
//                   >
//                     Fetch Data
//                   </Button>
//                 )}
//               </Form.Group>

//               {/* Error */}
//               {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

//               {/* Spinner */}
//               {loading && (
//                 <div style={{ textAlign: "center", marginTop: "20px" }}>
//                   <Spinner animation="border" variant="success" />
//                   <p style={{ color: "#2e7d32", marginTop: "10px", fontWeight: "600" }}>
//                     Fetching live farm data...
//                   </p>
//                 </div>
//               )}

//               {/* Environment Data */}
//               {!loading && weather.temperature && (
//                 <Card
//                   style={{
//                     backgroundColor: "#f1f8e9",
//                     borderLeft: "6px solid #66bb6a",
//                     borderRadius: "12px",
//                     padding: "18px",
//                     marginTop: "20px",
//                   }}
//                 >
//                   <h5 style={{ color: "#33691e", fontWeight: "700" }}>
//                     🌍 Environment Data
//                   </h5>
//                   <p><b>Location:</b> {locationName}</p>
//                   <p><b>Temperature:</b> {weather.temperature} °C</p>
//                   <p><b>Humidity:</b> {weather.humidity} %</p>
//                   <p><b>Rainfall:</b> {weather.rainfall}</p>
//                   <p><b>Soil pH:</b> {soil.ph}</p>
//                 </Card>
//               )}

//               {/* Crop Selector */}
//               <Form.Group className="mt-4">
//                 <h5 style={{ fontWeight: "700", color: "#2e7d32" }}>🌱 Select Crop</h5>
//                 <Form.Select
//                   value={crop}
//                   onChange={(e) => setCrop(e.target.value)}
//                   style={{ borderRadius: "12px", padding: "10px" }}
//                 >
//                   <option value="">-- Select a Crop --</option>
//                   {[
//                     "Rice", "Wheat", "Maize", "Barley", "Sugarcane", "Cotton",
//                     "Soybean", "Groundnut", "Mustard", "Potato", "Tomato", "Onion",
//                     "Pulses", "Millet", "Banana", "Sorghum", "Bajra", "Chili", "Tea", "Coffee"
//                   ].map((c) => (
//                     <option key={c} value={c.toLowerCase()}>{c}</option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>

//               {/* AI Button */}
//               <Button
//                 onClick={getAISuggestion}
//                 className="mt-4"
//                 style={{
//                   width: "100%",
//                   borderRadius: "12px",
//                   fontWeight: "700",
//                   backgroundColor: "#1b5e20",
//                   border: "none",
//                   padding: "12px",
//                   fontSize: "1rem",
//                 }}
//               >
//                 {loading ? "Analyzing..." : "🧠 Get AI Suggestion"}
//               </Button>

//               {/* AI Result */}
//               {aiAdvice && (
//                 <Card
//                   style={{
//                     marginTop: "25px",
//                     background: "#e8f5e9",
//                     borderLeft: "6px solid #43a047",
//                     padding: "20px",
//                     borderRadius: "12px",
//                     animation: "fadeIn 0.8s ease-in",
//                   }}
//                 >
//                   <h5 style={{ color: "#2e7d32", fontWeight: "700" }}>🧠 AI Recommendation</h5>

//                   <div style={{ marginTop: "10px" }}>
//                     <p><b>🌱 Advice:</b> {aiAdvice}</p>
//                     {fertilizer.name && (
//                       <p><b>💧 Fertilizer:</b> {fertilizer.name} ({fertilizer.amount_kg} kg)</p>
//                     )}
//                     {pesticide.name && (
//                       <p><b>🧴 Pesticide:</b> {pesticide.name} ({pesticide.amount_kg} kg)</p>
//                     )}
//                     <p><b>💦 Irrigation:</b> {irrigation}</p>
//                     <p><b>🌍 Sustainability Tip:</b> {sustainability}</p>
//                   </div>
//                 </Card>
//               )}
//             </Form>
//           </Card.Body>
//         </Card>
//       </div>

//       {/* Animations */}
//       <style>
//         {`
//         @keyframes fadeIn { from {opacity:0;transform:translateY(15px);} to {opacity:1;transform:translateY(0);} }
//         @keyframes fadeInUp { from {opacity:0;transform:translateY(20px);} to {opacity:1;transform:translateY(0);} }

//         @media (max-width: 768px) {
//           h2 { font-size: 1.6rem; }
//           Button { font-size: 0.95rem; padding: 10px; }
//           .card-body { padding: 15px; }
//         }
//       `}
//       </style>
//     </>
//   );
// }

// export default AISuggestion;






import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

function AISuggestion() {
  const navigate = useNavigate();

  const [crop, setCrop] = useState("");
  const [locationMode, setLocationMode] = useState("auto");
  const [locationName, setLocationName] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [weather, setWeather] = useState({});
  const [soil, setSoil] = useState({});
  const [aiAdvice, setAiAdvice] = useState("");
  const [fertilizer, setFertilizer] = useState("");
  const [irrigation, setIrrigation] = useState("");
  const [sustainability, setSustainability] = useState("");
  const [pesticide, setPesticide] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const WEATHER_API = "64ec4e8adf69cb9be080f0c6d813f56d";

  // Auto fetch location
  useEffect(() => {
    if (locationMode !== "auto") return;
    const fetchAutoData = async () => {
      setLoading(true);
      setError("");
      try {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          const latitude = pos.coords.latitude;
          const longitude = pos.coords.longitude;
          setLat(latitude);
          setLon(longitude);

          const locRes = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const locData = await locRes.json();
          const city = locData.city || locData.locality || locData.principalSubdivision;
          setLocationName(city || "Unknown Location");

          const weatherRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API}`
          );
          const weatherData = await weatherRes.json();
          setWeather({
            temperature: weatherData.main?.temp ?? "N/A",
            humidity: weatherData.main?.humidity ?? "N/A",
            rainfall: weatherData.rain?.["1h"] ?? weatherData.rain?.["3h"] ?? "No rain detected",
          });

          const soilRes = await fetch(
            `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=phh2o`
          );
          const soilData = await soilRes.json();
          const phValue = soilData?.properties?.layers?.[0]?.depths?.[0]?.values?.mean ?? null;
          setSoil({ ph: phValue ? (phValue / 10).toFixed(2) : "Unavailable" });

          setLoading(false);
        });
      } catch (err) {
        console.error(err);
        setError("Error fetching auto location data.");
        setLoading(false);
      }
    };
    fetchAutoData();
  }, [locationMode]);

  // Manual location fetch
  const fetchManualData = async () => {
    if (!locationName.trim()) {
      setError("Please enter a valid city name.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(locationName)}&limit=1&appid=${WEATHER_API}`
      );
      const geoData = await geoRes.json();
      let latitude, longitude;

      if (geoData.length === 0) {
        const osmRes = await fetch(
          `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(locationName)}&format=json&limit=1`
        );
        const osmData = await osmRes.json();

        if (!osmData.length) {
          setLoading(false);
          setError(`⚠️ Couldn't find "${locationName}". Try a nearby city.`);
          return;
        }

        latitude = osmData[0].lat;
        longitude = osmData[0].lon;
      } else {
        latitude = geoData[0].lat;
        longitude = geoData[0].lon;
      }

      setLat(latitude);
      setLon(longitude);

      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API}`
      );
      const weatherData = await weatherRes.json();
      setWeather({
        temperature: weatherData.main?.temp ?? "N/A",
        humidity: weatherData.main?.humidity ?? "N/A",
        rainfall: weatherData.rain?.["1h"] ?? weatherData.rain?.["3h"] ?? "No rain detected",
      });

      const soilRes = await fetch(
        `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=phh2o`
      );
      const soilData = await soilRes.json();
      const phValue = soilData?.properties?.layers?.[0]?.depths?.[0]?.values?.mean ?? null;
      setSoil({ ph: phValue ? (phValue / 10).toFixed(2) : "Unavailable" });

      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("⚠️ Error fetching data. Please try again.");
      setLoading(false);
    }
  };

  // AI suggestion
  const getAISuggestion = async () => {
    try {
      const inputData = {
        crop,
        ph: soil.ph === "Unavailable" ? 6.5 : parseFloat(soil.ph),
        soil_moisture: weather.humidity === "Unavailable" ? 30 : parseFloat(weather.humidity),
        temperature: weather.temperature === "Unavailable" ? 25 : parseFloat(weather.temperature),
        rainfall: weather.rainfall === "No rain detected" ? 0 : parseFloat(weather.rainfall),
      };

      console.log("📤 Sending:", inputData);

      const aiRes = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData),
      });

      if (!aiRes.ok) throw new Error("Server error");

      const aiData = await aiRes.json();
      console.log("✅ Received:", aiData);

      if (aiData.status === "success" && aiData.data) {
        setAiAdvice("🌾 Here’s your AI-generated farm planning suggestion:");
        setFertilizer(aiData.data.fertilizer || {});
        setPesticide(aiData.data.pesticide || {});
        setIrrigation(aiData.data.irrigation);
        setSustainability(aiData.data.sustainability_tip);
      } else {
        throw new Error("Invalid AI response");
      }
    } catch (err) {
      console.error("AI Fetch Error:", err);
      alert("Error fetching AI suggestion. Please make sure Flask is running on port 5000.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #a8e6cf, #dcedc1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "850px",
          borderRadius: "25px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.18)",
          backgroundColor: "#ffffff",
          fontFamily: "'Poppins', sans-serif",
          padding: "30px",
          animation: "fadeIn 1s ease-in-out",
        }}
      >
        <Card.Body>
          <h2
            style={{
              fontWeight: "800",
              textAlign: "center",
              color: "#1b5e20",
              marginBottom: "35px",
              fontSize: "2rem",
              textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            🌾 AgriSense Smart Farming Advisor
          </h2>

          <Form>
            {/* Location Mode */}
            <Form.Group>
              <h5 style={{ fontWeight: "800", color: "#2e7d32" }}>
                📍 Location Mode
              </h5>
              <div>
                <Form.Check
                  inline
                  label="Auto Fetch"
                  type="radio"
                  value="auto"
                  checked={locationMode === "auto"}
                  onChange={() => setLocationMode("auto")}
                />
                <Form.Check
                  inline
                  label="Manual Entry"
                  type="radio"
                  value="manual"
                  checked={locationMode === "manual"}
                  onChange={() => setLocationMode("manual")}
                />
              </div>
            </Form.Group>

            {/* Manual Input */}
            <Form.Group className="mt-3">
              <Form.Control
                type="text"
                placeholder="Enter city (e.g., Bhubaneswar)"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                disabled={locationMode === "auto"}
                style={{
                  borderRadius: "15px",
                  padding: "14px",
                  fontWeight: "500",
                  fontSize: "0.95rem",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                }}
              />
              {locationMode === "manual" && (
                <Button
                  onClick={fetchManualData}
                  className="mt-2"
                  variant="success"
                  style={{
                    borderRadius: "12px",
                    fontWeight: "700",
                    padding: "10px 20px",
                    boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
                    transition: "0.3s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Fetch Data
                </Button>
              )}
            </Form.Group>

            {/* Error */}
            {error && <p style={{ color: "red", marginTop: "10px", fontWeight: "600" }}>{error}</p>}

            {/* Spinner */}
            {loading && (
              <div style={{ textAlign: "center", marginTop: "25px" }}>
                <Spinner animation="border" variant="success" />
                <p style={{ color: "#2e7d32", marginTop: "12px", fontWeight: "600" }}>
                  Fetching live farm data...
                </p>
              </div>
            )}

            {/* Environment Data */}
            {!loading && weather.temperature && (
              <Card
                style={{
                  backgroundColor: "#e8f5e9",
                  borderLeft: "8px solid #43a047",
                  borderRadius: "15px",
                  padding: "20px",
                  marginTop: "25px",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
                  transition: "0.3s",
                }}
              >
                <h5 style={{ color: "#2e7d32", fontWeight: "800" }}>🌍 Environment Data</h5>
                <p><b>Location:</b> {locationName}</p>
                <p><b>Temperature:</b> {weather.temperature} °C</p>
                <p><b>Humidity:</b> {weather.humidity} %</p>
                <p><b>Rainfall:</b> {weather.rainfall}</p>
                <p><b>Soil pH:</b> {soil.ph}</p>
              </Card>
            )}

            {/* Crop Selector */}
            <Form.Group className="mt-4">
              <h5 style={{ fontWeight: "800", color: "#2e7d32" }}>🌱 Select Crop</h5>
              <Form.Select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                style={{
                  borderRadius: "15px",
                  padding: "12px",
                  fontWeight: "500",
                  fontSize: "0.95rem",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                }}
              >
                <option value="">-- Select a Crop --</option>
                {[
                  "Rice","Wheat","Maize","Barley","Sugarcane","Cotton",
                  "Soybean","Groundnut","Mustard","Potato","Tomato","Onion",
                  "Pulses","Millet","Banana","Sorghum","Bajra","Chili","Tea","Coffee"
                ].map((c) => (
                  <option key={c} value={c.toLowerCase()}>{c}</option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* AI Button */}
            <Button
              onClick={getAISuggestion}
              className="mt-4"
              style={{
                width: "100%",
                borderRadius: "15px",
                fontWeight: "800",
                backgroundColor: "#1b5e20",
                border: "none",
                padding: "14px",
                fontSize: "1rem",
                boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {loading ? "Analyzing..." : "🧠 Get AI Suggestion"}
            </Button>

            {/* AI Result */}
            {aiAdvice && (
              <Card
                style={{
                  marginTop: "30px",
                  background: "#dcedc1",
                  borderLeft: "8px solid #689f38",
                  padding: "20px",
                  borderRadius: "15px",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
                  animation: "fadeIn 0.8s ease-in",
                }}
              >
                <h5 style={{ color: "#33691e", fontWeight: "800" }}>🧠 AI Recommendation</h5>

                <div style={{ marginTop: "12px", lineHeight: "1.6" }}>
                  <p><b>🌱 Advice:</b> {aiAdvice}</p>
                  {fertilizer.name && <p><b>💧 Fertilizer:</b> {fertilizer.name} ({fertilizer.amount_kg} kg)</p>}
                  {pesticide.name && <p><b>🧴 Pesticide:</b> {pesticide.name} ({pesticide.amount_kg} kg)</p>}
                  <p><b>💦 Irrigation:</b> {irrigation}</p>
                  <p><b>🌍 Sustainability Tip:</b> {sustainability}</p>
                </div>
              </Card>
            )}
          </Form>
        </Card.Body>
      </Card>

      {/* Animations */}
      <style>
        {`
        @keyframes fadeIn { from {opacity:0; transform:translateY(15px);} to {opacity:1; transform:translateY(0);} }
        @keyframes fadeInUp { from {opacity:0; transform:translateY(20px);} to {opacity:1; transform:translateY(0);} }

        @media (max-width: 768px) {
          h2 { font-size: 1.6rem; }
          Button { font-size: 0.95rem; padding: 10px; }
          .card-body { padding: 15px; }
        }
      `}
      </style>
    </div>
  );
}

export default AISuggestion;


