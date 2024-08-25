# Nolij Script Project version 24.08.25
NolijScript (a.k.a. NolijS, NJS) is a programming language that can be converted to Javascript and Typescript

## Installing & Using
get _run.js_ from [this link](https://raw.githubusercontent.com/TaarnN/Nolijs/main/runs/current/run.js)

then create _njsconfig.json_ such as

```json
[
  {"njs": "./project/in.njs", "js": "./project/out.js"}
]
```

the structure should be like this

```
ProjectName
|
|-- project
|     |-- in.njs
|     |-- out.js
|-- njsconfig.json
|-- run.js 
```

run the command (recomend using [bun](https://bun.sh))

```bash
bun run.js
```
