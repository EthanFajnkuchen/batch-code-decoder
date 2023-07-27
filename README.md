<!DOCTYPE html>
<html>

<body>
  <h1>Batch Code Decoder for Cosmetic Products</h1>
  <p>
    This project is a small Node.js application that allows users to decode batch codes of cosmetic products. A batch
    code is a unique identifier used by cosmetic manufacturers to track production information, including the date of
    manufacture, expiration date, and other relevant details. With this batch code decoder, users can input a batch code
    and get information about the product's production date and other relevant data.
  </p>

<h2>How to Use</h2>
<p>
  You have two options for using the batch code decoder:
</p>
<ol>
  <li>Access the batch code decoder application online at the following link:
    <a href="https://potent-alive-trunk.glitch.me/">Batch Code Decoder - Live Demo</a>. Enter the batch code in the provided
    input field and click the "Decode" button. The application will process the input and display relevant information
    about the product.</li>
  <li>Clone the repository to your local machine to run the batch code decoder locally:</li>
</ol>

### Clone the Repository

1. Open a terminal or command prompt.

2. Clone the repository to your local environment using the following command:

```bash
git clone https://github.com/EthanFajnkuchen/batch-code-decoder
```

3. Navigate to the project's root directory:

```bash
cd batch-code-decoder
```

4. Start the server:

```bash
node server.js 
```
or 



  <h2>Dependencies</h2>
  <p>
    This project uses the following Node.js modules: 
  <ul>
    <li>express: A minimal and flexible Node.js web application framework for handling HTTP requests.</li>
    <li>body-parser: Node.js body parsing middleware. Parse incoming request bodies in a middleware before your handlers,
      available under the req.body property.</li>
    <li>https: Node.js module to handle HTTPS requests.</li>
  </ul>


</body>

</html>
