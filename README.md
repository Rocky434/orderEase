<h1>orderEase</h1>
This project is an online food ordering website that provides a complete ordering process. Users are required to log in before accessing the website, and upon logging in, each user is assigned their own session for easier management and session control.

The homepage displays information about various dishes. Upon selecting a dish, users are directed to the shopping cart page to proceed with checkout. The shopping cart page shows the selected dishes and allows users to further modify and confirm their orders. Upon completing the order, users can proceed to payment via Line Pay. After payment, the system notifies the restaurant of a new order via Socket, ensuring timely processing.

Users can also view their past orders and track order progress on the order history page.
[DEMO](https://orderease.zeabur.app/)

<h2>Technologies Used</h2>

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine, used for server-side scripting.
  - [Node.js Documentation](https://nodejs.org/en/docs/)

- **MongoDB**: A NoSQL database program, used for storing and managing data.
  - [MongoDB Documentation](https://docs.mongodb.com/)

- **Socket.IO**: A JavaScript library for real-time web applications, enabling bidirectional communication between web clients and servers.
  - [Socket.IO Documentation](https://socket.io/docs/)

- **Session**: A middleware for managing user sessions.
  - [Session Documentation](https://www.npmjs.com/package/session)

- **LINE Pay API**: An API provided by LINE for processing payments in your application.
  - [LINE Pay API Documentation](https://pay.line.me/developers/apis)

- **Fetch API**: A modern JavaScript interface for fetching resources across the network.
  - [Fetch API Documentation](https://pay.line.me/tw/developers/apis/onlineApis?locale=zh_TW)

<h2>Installation</h2>

1. **Install Node.js**:
   - You can download and install Node.js from [here](https://nodejs.org/).
   
2. **Install MongoDB**:
   - You can download and install MongoDB from [here](https://www.mongodb.com/try/download/community).

3. **Download the project**:
   - You can clone the project from the GitHub repository using the following command:
     ```
     git clone <https://github.com/Rocky434/orderEase>
     ```
     
4. **Install dependencies**:
   - Navigate to the project directory and run the following command to install the required dependencies:
     ```
     npm install
     ```

5. **Configuration**:
   - Copy the `sample.env` file in the root of the project and rename it to `.env`.
   - Edit the `.env` file and fill in the necessary environment variables according to your setup.

6. **Start the application**:
   - Once the dependencies are installed, you can start the application using the following command:
     ```
     npm start
     ```
     
7. **Access the application**:
   - You can now access the application at [http://localhost:3000](http://localhost:3000).
