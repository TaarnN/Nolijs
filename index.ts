import fs from "fs";

const dat: { [key: string]: { [key: string]: string } } = {
  keys: {
    val: "const",
    var: "let",
    "else if": "else IF(",
    if: "if(",
    IF: "if",
    for: "for(",
    while: "while(",
    forever: "while(1",
    "else ->": "else",
    "\\~\\(": "/*",
    "\\)\\~": "*/",
    "\\~\\~": "//",
    act: "=>",
    connect: "()=>",
  },
  vars: {
    print: "console.log",
    error: "console.error",
    id: "n=>document.getElementById(n)",
    class: "n=>document.getElementsByClassName(n)",
    tag: "n=>document.getElementsByTagName(n)",
    query: "n=>document.querySelector(n)",
    queryx: "n=>document.querySelectorAll(n)",
    queryall: "document.querySelectorAll('*')",
    addlistener: "document.addEventListner",
    removelistener: "document.removeEventListner",
    createattr: "document.createAttribute",
    createcom: "document.createComment",
    createfrag: "document.createDocumentFragment",
    createelem: "document.createElement",
    createtext: "document.createTextNode",
    createevent: "document.createEvent",
    input: "prompt",
    pi: "Math.PI",
    e: "Math.E",
    round: "Math.round",
    floor: "Math.floor",
    ceil: "Math.ceil",
    power: "Math.pow",
    sqrt: "Math.sqrt",
    abs: "Math.abs",
    min: "Math.min",
    minx: "v=>Math.min(...v)",
    maxx: "v=>Math.max(...v)",
    max: "Math.max",
    random: "Math.random",
    sin: "Math.sin",
    cos: "Math.cos",
    tan: "Math.tan",
    randint: "(a,b)=>Math.floor(Math.random()*(b-a+1)) +a;",
    uniform: "(a,b)=>Math.random()*(b-a)+a",
    wait: "(e)=>new Promise(n=>setTimeout(n,e))",
    lorem: `i=>{const e="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".split(" ");let t="";for(let o=0;o<i;o++)t+=e[o%e.length]+" ";return t.trim()}`,
    qparam: "n=>new URLSearchParams(window.location.search).get(n)",
    deep: "o=>JSON.parse(JSON.stringify(o))",
    randstr:
      "l=>Array.from({length:l},()=>Math.random().toString(36)[2]).join('')",
    upper: "t=>t.toUpperCase()",
    lower: "t=>t.toLowerCase()",
    capitalize: "t=>t[0].toUpperCase()+t.slice(1)",
    snake: `s => s.replace(/\\s+/g, "_") .replace(/[A-Z]/g, letter => "_" + letter.toLowerCase()) .toLowerCase()`,
    camel: `e=>e.replace(/(?:^\\w|[A-Z]|\\b\\w)/g,((e,a)=>0===a?e.toLowerCase():e.toUpperCase())).replace(/\\s+/g,"")`,
    pascal: `e=>e.replace(/(?:^\\w|[A-Z]|\\b\\w)/g,(e=>e.toUpperCase())).replace(/\\s+/g,"")`,
    kebab: `e=>e.replace(/\\s+/g,"-").replace(/[A-Z]/g,(e=>"-"+e.toLowerCase())).toLowerCase()`,
    merge: "(...o)=>Object.assign({},...o)",
    unique: "a=>[...new Set(a)]",
    randitem: "a=>a[Math.floor(Math.random()*a.length)]",
    arrtoobj: "(a,k)=>a.reduce((o,v)=>(o[v[k]]=v,o),{})",
    value: "o=>Object.values(o)",
    keys: "o=>Object.keys(o)",
    shuffle:
      "t=>{for(let o=t.length-1;o>0;o--){const n=Math.floor(Math.random()*(o+1));[t[o],t[n]]=[t[n],t[o]]}return t}",
    range: "(n,r=0,c=1)=>{let e=[];for(let t=r;t<n;t+=c)e.push(t);return e}",
    intof: "parseInt",
    floatof: "parseFloat",
    stringof: "v=>JSON.stringify(v)",
    valueof: "v=>JSON.parse(v)",
    assign: "(n,b)=>{global[n]=b}",
    select: "n=>global[n]",
    set: "(n,b)=>{window[n]=b}",
    get: "n=>window[n]",
  },
};
const nsconfig = await Bun.file("./njsconfig.json").json();

for (let file of nsconfig) {
  let base: string = fs.readFileSync(file.njs, "utf8");

  let towrite: string = "";
  let top: string[] = [];

  const inclu = (b: string, s: string): boolean =>
    new RegExp(`(?<![A-Za-z.:])${s}(?![A-Za-z.:])`).test(b);
  const vars: { [key: string]: string } = dat.vars;
  const keys: { [key: string]: string } = dat.keys;

  for (let keyw of Object.keys(vars)) {
    if (inclu(base, keyw)) {
      top.push(`let ${keyw}=${vars[keyw]};`);
    }
  }

  for (let keyw of Object.keys(keys)) {
    base = base.replace(
      new RegExp(`(?<!["'\`])\\b${keyw}\\b(?!["'\`])`, "g"),
      keys[keyw]
    );
  }

  base = base.replace(/(?<!["'`])\->(?!["'`])/g, ")");

  towrite +=
    top.join("") +
    (top.length == 0 ? "" : "\n") +
    base
      .replace(/\/\/.*?$|\/\*[\s\S]*?\*\//gm, "")
      .trim()
      .split("\n")
      .filter((line) => line.trim() !== "")
      .join("\n");

  fs.writeFileSync(file.js, towrite);
}
