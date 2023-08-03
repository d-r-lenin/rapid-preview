#! /usr/bin/env node

const args = parseArgs();
const PORT = args.port || 4040;

const help = `


#   ____    __    ____  ____  ____  ____  ____  ____  _  _  ____  ____  _    _ 
#  (  _ \  /__\  (  _ \(_  _)(  _ \(  _ \(  _ \( ___)( \/ )(_  _)( ___)( \/\/ )
#   )   / /(__)\  )___/ _)(_  )(_) ))___/ )   / )__)  \  /  _)(_  )__)  )    ( 
#  (_)\_)(__)(__)(__)  (____)(____/(__)  (_)\_)(____)  \/  (____)(____)(__/\__)


rapidpreview --help            -----> show  help
rapidpreview                   -----> watch current path , open first HTML document, serving in default port
rapidpreview <file_name>       -----> to specify file to open(default:: first HTML document)
rapidpreview --port <number>   -----> set port number or change the default port
rapidpreview --path <path>     -----> set path to watch(default:: current path)
rapidpreview --file <file_name>-----> to specify file to open(default:: first HTML document)

EXAMPLES:
'''''''''
        rapidpreview index.html
        rapidpreview --path C://Github/myApp --file example.html --port 3000
`;

const poison = `
<!-- code injucted by server -->
<script src="/socket.io/socket.io.js"></script>
<script>
const socket = io('ws://localhost:${PORT}');
socket.on("connect", () => {
    console.log("Socket connect for live preview");
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
const readline = require('readline');

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
          "Error:: \n   Can't Find Any Html Document in current PATH.\n\n\t Please Specify --file Property with relative path.."
        );
        exit();
      }
    });
  }
}


io.on("connection", (socket) => {
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
    res.send("Please Write Proper BODY Tag To Use rapidpreview...🙃");
    exit();
  } else {
    fs.writeFileSync(path.join(process.env.TMP || process.env.TMPDIR, "temp.html"), html);
    res.sendFile(path.join(process.env.TMP || process.env.TMPDIR, "temp.html"));
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
    console.log(`rapidpreview Server running on : http://localhost:${PORT}`);
    console.log(`type command "exit" anytime to stop`);
    console.log(`watching path ${args.path || './'}`);
    open(`http://localhost:${PORT}`);
    ask();
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
    console.error("Error<b0>: Please Write Proper <body> Tag To Use rapidpreview..");
    return undefined;
  }
  const newHtml = `${splited[0]}
    ${poison}
    </body>
    ${splited[1]}
    `;
  return newHtml;
}


function ask() {
  const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  r1.question('', a => {
    r1.close();
    if(a === 'end' || a === 'close' || a === 'exit'){
      process.exit();
    }
    if(a === "help"){
      console.log(help);
    }
    ask();
  })
}
