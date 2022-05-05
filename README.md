# TubeStationNavigationApp

User Guide

Requirements
- Visual Studio Code
- Intellij IDEA
- Ngrok (If not using Emulator)
- Expo Go (On emulator, or phone)

Steps
1. Open Intellij IDEA and open the API folder.
2. Open the app folder using Visual Studio Code.
3. The IP addresses for the HTTP requests must be updated within the App files before running
If using an emulator, the first section of the IP address must be replaced with http//localhost/ 
If using a mobile device, boot up ngrok and take use the IP address provided there
4. Run the API in Intellij IDEA
5. Open a terminal in Visual Studio and run the command ‘npm run start’
A tab will open for Expo, with a QR Code and link, open the expo app on either the emulator or the mobile app and connect to the app.
Ensure that if your mobile device is not on the same mobile network as the host device that expo is set to tunnel.
6. The app should begin building and loading.
