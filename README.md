# CTF-BOT

A simplistic bot for IRC channel. With a dynamic module reload (Hot-reload) to create a changeable bot on-the-fly :dancer:

### Configuration

You can set the envoironment configuration file inside config folder, the file must have the same name of the desired env. There's a sample development config file :)

### Funcionalities

  - !nextctf: Return next CTF from [ctftime]

### Todos

 - ~~Dynamic module loader;~~ (by [@brunoventura]).
 - ~~CTF-BOT give voice to users;~~ (by [@fernandoGuisso])
 - CTF-BOT show national events in !nex
 - ~~Extract config params from script;~~ (by [@brunoventura]).

### Installation
  ```sh
$ npm install
```

### Run
  ```sh
$ node app.js
```

   [ctftime]: <https://ctftime.com/upcoming>
   [@fernandoGuisso]: <https://github.com/fernandoGuisso>
   [@brunoventura]: <https://github.com/brunoventura>
