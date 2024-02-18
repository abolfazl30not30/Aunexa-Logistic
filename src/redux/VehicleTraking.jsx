// import { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';
//
// const VehicleTraceComponent = ({ vehicleIds }) => {
//
//     const [sockets, setSockets] = useState([]);
//
//     useEffect(() => {
//         // Create WebSocket connections for each vehicle ID
//         const newSockets = vehicleIds.map((vehicleId) => {
//             const socket = io('ws://your-websocket-server');
//             const topic = `vehicle_${vehicleId}`;
//             socket.emit('subscribe', topic);
//             return { vehicleId, socket };
//         });
//
//         // Update state with the new sockets
//         setSockets(newSockets);
//
//         // Clean up WebSocket connections when component unmounts
//         return () => {
//             newSockets.forEach(({ socket }) => {
//                 socket.emit('unsubscribe', topic);
//                 socket.close();
//             });
//         };
//     }, [vehicleIds]); // Reconnect when vehicleIds change
//
//     useEffect(() => {
//         // Set up event listeners for each socket
//         sockets.forEach(({ socket }) => {
//             socket.on('message', (data) => {
//                 console.log(`Received message for vehicle ${vehicleId}:`, data);
//                 // Handle received messages
//             });
//         });
//
//         // Clean up event listeners when component unmounts
//         return () => {
//             sockets.forEach(({ socket }) => {
//                 socket.off('message');
//             });
//         };
//     }, [sockets]); // Re-setup event listeners when sockets change
//
//     return (
//         // Your component UI
//         <div>Vehicle Trace Component for Vehicle IDs: {vehicleIds.join(', ')}</div>
//     );
// };
//
// export default VehicleTraceComponent;