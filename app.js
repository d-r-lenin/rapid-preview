#!/usr/bin/env node

const args = parseArgs();
const PORT = args.port || 5353;

const help = `

RRR         PPPPP     IIIIIIII    TTTTTTTTTT
RR RR       PP  PP       II           TT
RR   RR     PP   PP      II           TT
RR  RR      PP PP        II           TT
RR R        PP           II           TT  
RR  RR      PP           II           TT
RR    RR    PP        IIIIIIII        TT


rpit --help            -----> show  help
rpit                   -----> watch current path , open first HTML document, serving in default port
rpit <file_name>       -----> to specify file to open(default:: first HTML document)
rpit --port <number>   -----> set port number or change the default port
rpit --path <path>     -----> set path to watch(default:: current path)
rpit --file <file_name>-----> to specify file to open(default:: first HTML document)

EXAMPLES:
'''''''   
        rpit index.html
        rpit --path C://Github/myApp --file example.html --port 3000
`;

const poison = `
<!-- code injucted by server -->
<script src="/socket.io/socket.io.js"></script>
<script>
const socket = io('ws://localhost:${PORT}');
console.log("hi")
socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    socket.on('hello',data=>{
        console.log(data);
    });
    socket.on('change',data=>{
        document.location.reload()
    })
  });
  
  socket.on("disconnect", () => {
    console.log(socket.id); // undefined
  });
</script>
`;

const express = require("express");
const app = express();
const http = require("http");
const httpServer = http.createServer(app);
const open = require("open");
const path = require("path");
const io = require("socket.io")(httpServer);
const fs = require("fs");
const { exit } = require("process");
let html;

if (args.help) {
  console.log(help);
  exit();
}

if (!args.path) {
  args.path = ".";
}
if (!args.file) {
  if (!process.argv[3] && process.argv[2]) {
    if (process.argv[2].slice(-5) !== ".html") {
      console.error("Error>2?2: Invalid File Name ...(supported:HTML):..");
      exit();
    }
    args.file = process.argv[2];
  } else {
    fs.readdir(args.path, (e, data) => {
      if (e) {
        console.error(a);
        exit();
      }
      data.forEach((d) => {
        if (!args.file && d.slice(-5) === ".html") {
          args.file = d;
        }
      });
      if (!args.file) {
        console.error(
          "Error:1>2: Can't Find Any Html Document in current PATH. Please Specify --file Property with relative path.."
        );
        exit();
      }
    });
  }
}


io.on("connection", (socket) => {
  socket.emit("hello", "hay 😎");
  fs.watch(args.path, { recursive: true }, (e, f) => {
    socket.emit("change", e);
  });
});

app.get("/", (req, res) => {
  html = fs
    .readFileSync(path.join(args.path, args.file || "index.html"))
    .toString("utf-8");
  html = injuct(html, poison);
  if (html === undefined) {
    res.send("Please Write Proper BODY Tag To Use Rpit...🙃");
    exit();
  } else {
    fs.writeFileSync(path.join(process.env.TMP, "temp.html"), html);
    res.sendFile(path.join(process.env.TMP, "temp.html"));
  }
});

app.use(express.static(args.path));


setTimeout(() => {
  html = fs
    .readFileSync(path.join(args.path, args.file || "index.html"))
    .toString("utf-8");
  html = injuct(html, poison);
  if (html === undefined) {
    exit();
  }

  httpServer.listen(PORT, () => {
    console.log(`rpit Server running on : http://localhost:${PORT}`);
    open(`http://localhost:${PORT}`);
  });
  
}, 1000);


function parseArgs(argsA) {
  const args = {};
  if (!argsA) {
    argsA = process.argv;
  }
  argsA.forEach((arg, i) => {
    if (arg.slice(0, 2) === "--") {
      if (arg === "--help") {
        args[arg.slice(2)] = true;
      } else if (argsA[i + 1]) {
        args[arg.slice(2)] = argsA[i + 1];
      }
    }
  });
  return args;
}

function injuct(html, poison) {
  const splited = html.split("</body>");
  if (splited.length != 2) {
    console.error("Error<b0>: Please Write Proper <body> Tag To Use Rpit..");
    return undefined;
  }
  const newHtml = `${splited[0]}
    ${poison}
    </body>
    ${splited[1]}
    `;
  return newHtml;
}
