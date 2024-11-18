// 'use client';

// import { useEffect, useRef } from 'react';

// const AutoSessionRefresh = () => {
//   const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

//   useEffect(() => {
//     const refreshToken = async () => {
//       try {
//         console.log('Attempting to refresh token...');
//         const response = await fetch('/api/auth/session');
//         const data = await response.json();
//         console.log('Token refresh response:', data);

//         if (data.error === 'RefreshAccessTokenError') {
//           console.log(
//             'RefreshAccessTokenError encountered, redirecting to login...',
//           );
//           window.location.href = '/login';
//         }

//         // Schedule next refresh
//         scheduleRefresh();
//       } catch (error) {
//         console.error('Failed to refresh session:', error);
//       }
//     };

//     const scheduleRefresh = async () => {
//       try {
//         console.log('Scheduling next token refresh...');
//         const response = await fetch('/api/auth/session');
//         const session = await response.json();
//         console.log('Session data:', session);

//         if (session?.expires) {
//           const expiresAt = new Date(session.expires).getTime();
//           const now = Date.now();

//           // Calculates when should refresh tokens (2 minutes before expiration)
//           const timeUntilRefresh = Math.max(0, expiresAt - now - 2 * 60 * 1000);
//           console.log('Time until next refresh (ms):', timeUntilRefresh);

//           // Clear previous timeout
//           if (timeoutRef.current) {
//             clearTimeout(timeoutRef.current);
//             console.log('Cleared previous timeout');
//           }

//           if (timeUntilRefresh < 1000) {
//             console.log(
//               'Time until refresh is less than 1 second, refreshing now...',
//             );
//             refreshToken();
//           } else {
//             console.log('Setting timeout for next refresh...');
//             timeoutRef.current = setTimeout(refreshToken, timeUntilRefresh);
//           }
//         }
//       } catch (error) {
//         console.error('Failed to get session:', error);
//       }
//     };

//     scheduleRefresh();

//     // Cleanup when component unmounts
//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//         console.log('Component unmounted, cleared timeout');
//       }
//     };
//   }, []);

//   return null;
// };

// export default AutoSessionRefresh;
