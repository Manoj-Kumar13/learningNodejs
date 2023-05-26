const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log(req.method, req.headers);

  if (req.url === "/") {
    res.write("<html>");
    res.write("<head><title>My First Page</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='data1'><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (req.url === "/message" && req.method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("message.txt", message);
      console.log(message);
    });

    res.statusCode = 302;
    res.setHeader("Location", "/");

    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(5000);
