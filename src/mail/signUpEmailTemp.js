const signUpEmailTemp = (data) => `
  <html>
    <head>
      <style>
        body {
          font-family: 'Verdana', 'Arial', sans-serif;        
          font-family: Arial, sans-serif;
          background-color: #f2f3f8;
          margin: 0;
          padding: 0;
        }
        .container {
          font-family: 'Verdana', 'Arial', sans-serif;        
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #022C22;
          font-size: 26px;
          margin-bottom: 20px;
          font-weight: bold;
          text-align: center;
        }
        p {
          color: #555555;
          line-height: 1.8;
          font-size: 16px;
          margin-bottom: 20px;
        }
        .logo {
          text-align: center;
        }
        .logo-img {
          max-width: 100%;
          margin-bottom: 20px;
        }
        .code {
          text-align: center;
          background-color: #e8f0fe;
          padding: 14px 24px;
          font-size: 20px;
          font-weight: bold;
          color: #022C22;
          border-radius: 6px;
          letter-spacing: 2px;
          margin: 20px 0;
        }
        .footer {
          margin-top: 30px;
          font-size: 13px;
          color: #9e9e9e;
          text-align: center;
        }
        .footer p {
          margin: 5px 0;
        }
        a {
          color: #022C22;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        
        <h1>You have received a new enquiry email  from Profitable Business For Sale</h1>
        <p>Dear Seller</p>
        <p>Thank you for being with Profitable Business. You have received a new enquiry for your listed business from a buyer</p>

        ${!data.name && "<h4>Please buy a subscription plan to receive buyer's contact details</h4>"}
        ${data.name ? "<h4>Buyer Name: {data.name}</h4>" : "<></>"}
        ${data.email ? "<h4>Buyer Email: {data.email}</h4>" : "<></>"}
        ${data.mobile ? "<h4>Buyer Mobile: {data.mobile}</h4>" : "<></>"}
      
        <p>For more information, please login Profitable business and check activity</p>

        <p>If you have any questions, please contact us at <a href="profitablebusinessforsale@gmail.com">profitablebusinessforsale@gmail.com</a>.</p>

        <p>Thank you,<br>Profitable Business Team</p>
      </div>
      <div class="footer">
        <p>&copy; ProfitableBusiness - All Rights Reserved.</p>
        <p>
          <a href="https://yourwebsite.com/privacy">Privacy Policy</a> |
          <a href="https://yourwebsite.com/contact">Contact Support</a>
        </p>
      </div>
    </body>
  </html>
`;

export default signUpEmailTemp;
