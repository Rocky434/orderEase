<h1>orderEase</h1>
This project is an online food ordering website that provides a complete ordering process. Users are required to log in before accessing the website, and upon logging in, each user is assigned their own session for easier management and session control.

The homepage displays information about various dishes. Upon selecting a dish, users are directed to the shopping cart page to proceed with checkout. The shopping cart page shows the selected dishes and allows users to further modify and confirm their orders. Upon completing the order, users can proceed to payment via Line Pay. After payment, the system notifies the restaurant of a new order via Socket, ensuring timely processing.

Users can also view their past orders and track order progress on the order history page.

<h2>Technologies Used</h2>
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine, used for server-side scripting.
  - Version: [Your Node.js Version]
  - [Node.js Documentation](https://nodejs.org/en/docs/)

- **MongoDB**: A NoSQL database program, used for storing and managing data.
  - Version: [Your MongoDB Version]
  - [MongoDB Documentation](https://docs.mongodb.com/)

- **Socket.IO**: A JavaScript library for real-time web applications, enabling bidirectional communication between web clients and servers.
  - Version: [Your Socket.IO Version]
  - [Socket.IO Documentation](https://socket.io/docs/)

- **Session**: A middleware for managing user sessions in Node.js applications.
  - Version: [Your Session Version]
  - [Session Documentation](https://www.npmjs.com/package/session)

- **LINE Pay API**: An API provided by LINE for processing payments in your application.
  - Version: [Your LINE Pay API Version]
  - [LINE Pay API Documentation](https://pay.line.me/developers/apis)

- **Fetch API**: A modern JavaScript interface for fetching resources across the network.
  - Version: [Your Fetch API Version]
  - [Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
