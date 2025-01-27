var io = io("http://" + ip + ":" + port + "/");
var avatars = {};

//console.log(io);
//console.log(ip)
//console.log(port)

function load(cb) {
  loadTeams(cb);
}

function loadTeams(cb) {
  $.get("/api/teams", function (data) {
    let teamsArray = data.teams;
    let teams = {};

    teamsArray.forEach(function (team) {
      teams[team._id] = team;
    }, this);
    loadPlayers(cb, teams);
  });
}

function loadPlayers(cb, teams) {
  $.get("/api/players", function (data) {
    let playersArray = data.players;
    let players = {};

    playersArray.forEach(function (player) {
      players[player._id] = player;
    }, this);
    cb(players, teams);
  });
}

function loadAvatar(steamid, callback) {
  if (!avatars[steamid]) {
    $.get("/av/" + steamid, function () {
      avatars[steamid] = true;
      if (callback) callback();
    });
  } else if (callback) {
    callback();
  }
}

$(document).ready(function () {
  if (io.connected) {
    console.log("main.js Connected to io");
    //console.log(data);
  }
  let ignoredSteamIDs = []; //Initialize ignoredSteamIDs array to hide players
  var slotted = [];
  var meth = {
    getTeamOne: function () {
      if (!this.info.teams) return false;
      return this.loadTeam(this.info.teams.team_1.team);
    },
    getTeamTwo: function () {
      if (!this.info.teams) return false;
      return this.loadTeam(this.info.teams.team_2.team);
    },
    loadTeam: function (id) {
      return this.info.teamList[id] || false;
    },
    getMatchType: function () {
      return this.info.teams && this.info.teams.match
        ? this.info.teams.match
        : false;
    },
    getMatch: function () {
      return this.info.teams || false;
    },
    getPlayers: function () {
      if (
        !this.info.player.team2 ||
        !this.info.player.team3 ||
        !this.info.player.team2.player0 ||
        !this.info.player.team2.player1 ||
        !this.info.player.team2.player2 ||
        !this.info.player.team2.player3 ||
        !this.info.player.team2.player4 ||
        !this.info.player.team3.player5 ||
        !this.info.player.team3.player6 ||
        !this.info.player.team3.player7 ||
        !this.info.player.team3.player8 ||
        !this.info.player.team3.player9
      )
        return false;

      let res = [];

      function processPlayer(player, team, slot) {
        if (player && player.team_slot !== undefined) {
          // Убедимся что steamid существует и корректен
          if (!player.steamid && player.accountid) {
            player.steamid = BigInt(player.accountid);
            player.steamid = player.steamid.toString();
          }

          // Добавляем данные о герое из info.hero
          if (
            this.info.hero &&
            this.info.hero[team] &&
            this.info.hero[team][slot]
          ) {
            player.hero = this.info.hero[team][slot];
          }

          // Назначаем курьеров только для определенных игроков
          if (this.info.couriers) {
            switch (slot) {
              case "player0":
                player.courier2 = this.info.couriers.courier2; // player0
                break;
              case "player1":
                player.courier3 = this.info.couriers.courier3; // player1
                break;
              case "player2":
                player.courier4 = this.info.couriers.courier4; // player2
                break;
              case "player3":
                player.courier5 = this.info.couriers.courier5; // player3
                break;
              case "player4":
                player.courier6 = this.info.couriers.courier6; // player4
                break;
              case "player5":
                player.courier7 = this.info.couriers.courier7; // player5
                break;
              case "player6":
                player.courier8 = this.info.couriers.courier8; // player6
                break;
              case "player7":
                player.courier9 = this.info.couriers.courier9; // player7
                break;
              case "player8":
                player.courier0 = this.info.couriers.courier0; // player8
                break;
              case "player9":
                player.courier1 = this.info.couriers.courier1; // player9
                break;
            }
          }
          // ... существующий код ...
          res.push(player);
        }
      }

      // Process team2 players
      processPlayer.call(
        this,
        this.info.player.team2.player0,
        "team2",
        "player0"
      );
      processPlayer.call(
        this,
        this.info.player.team2.player1,
        "team2",
        "player1"
      );
      processPlayer.call(
        this,
        this.info.player.team2.player2,
        "team2",
        "player2"
      );
      processPlayer.call(
        this,
        this.info.player.team2.player3,
        "team2",
        "player3"
      );
      processPlayer.call(
        this,
        this.info.player.team2.player4,
        "team2",
        "player4"
      );

      // Process team3 players
      processPlayer.call(
        this,
        this.info.player.team3.player5,
        "team3",
        "player5"
      );
      processPlayer.call(
        this,
        this.info.player.team3.player6,
        "team3",
        "player6"
      );
      processPlayer.call(
        this,
        this.info.player.team3.player7,
        "team3",
        "player7"
      );
      processPlayer.call(
        this,
        this.info.player.team3.player8,
        "team3",
        "player8"
      );
      processPlayer.call(
        this,
        this.info.player.team3.player9,
        "team3",
        "player9"
      );

      res.sort(function (a, b) {
        return a.team_slot - b.team_slot;
      });

      return res;
    },
    getDire: function () {
      let all_players = [];
      let team_money = 0;
      let equip_value = 0;
      let ret = {
        players: [],
        side: "dire",
      };

      if (!this.info.league || !this.info.league.dire.name) return false;

      ret = $.extend({}, ret, this.info.league.dire); //вытягивает игроков по слотам от 0 до 9

      if (!ret.name) ret.name = "dire";
      for (let sid in this.getPlayers()) {
        let player = this.getPlayers()[sid];
        /*if (player.team.toLowerCase() == "dire") {
          if (
            player.state &&
            (player.state.equip_value || player.state.money)
          ) {
            team_money += player.state.money || 0;
            equip_value += player.state.equip_value || 0;
          }
          all_players.push(player);
        }*/
      }
      ret.team_money = team_money;
      //ret.equip_value = equip_value;
      ret.players = all_players; //список игроков
      return ret;
    },
    getRadiant: function () {
      let all_players = [];
      let team_money = 0;
      let equip_value = 0;
      let ret = {
        players: [],
        side: "radiant",
      };

      if (!this.info.league || !this.info.league.radiant.name) return false;

      ret = $.extend({}, ret, this.info.league.radiant);

      if (!ret.name) ret.name = "Radiant";
      for (let sid in this.getPlayers()) {
        let player = this.getPlayers()[sid];
        /*if (player.team.toLowerCase() == "radiant") {
          if (
            player.state &&
            (player.state.equip_value || player.state.money)
          ) {
            team_money += player.state.money || 0;
            equip_value += player.state.equip_value || 0;
          }
          all_players.push(player);
        }*/
      }
      ret.team_money = team_money;
      //ret.equip_value = equip_value;
      ret.players = all_players;
      return ret;
    },
    getObserved: function () {
      let players = this.getPlayers();
      let observedPlayers = [];

      // Проверяем слоты от 0 до 9 для team2 и team3
      let teams = ["team2", "team3"];
      let slots = {
        team2: ["player0", "player1", "player2", "player3", "player4"],
        team3: ["player5", "player6", "player7", "player8", "player9"],
      };

      for (let team of teams) {
        if (this.info.player[team]) {
          // Проверяем, существует ли команда
          for (let slot of slots[team]) {
            let player = this.info.player[team][slot];
            if (player && player.steamid) {
              // Добавляем информацию о игроке из info.players, если имя совпадает
              for (let key in this.info.players) {
                if (this.info.players[key].displayed_name === player.name) {
                  player.sid = this.info.players[key].sid; // Добавляем sid
                  player.displayed_name = this.info.players[key].displayed_name; // Добавляем displayed_name
                  break; // Выходим из цикла, если нашли совпадение
                }
              }

              observedPlayers.push({
                name: player.name,
                kills: player.kills,
                kill_list: player.kill_list,
                kill_streak: player.kill_streak,
                net_worth: player.net_worth,
                assists: player.assists,
                deaths: player.deaths,
                selected_unit: player.hero ? player.hero.selected_unit : false,
                hero_damage: player.hero_damage,
                avatar: player.avatar || null, // Добавляем avatar, если он есть
                steamid: player.steamid || null, // Добавляем steamid, если он есть
                displayed_name: player.displayed_name || null, // Добавляем displayed_name, если он есть
                sid: player.sid || null, // Добавляем sid, если он есть
              });
            }
          }
        }
      }

      return observedPlayers.length > 0 ? observedPlayers : false;
    },
    getPlayer: function (slot) {
      slot = parseInt(slot);
      //if (!(slot >= 0 && slot <= 10)) return false;
      if (!(slot >= 0 && slot <= 12)) return false;
      return slotted[slot];
    },
    abilities: function () {
      //console.log(this.info.abilities);
      if (!this.info.abilities) return false;
      return this.info.abilities;
    },
    buildings: function () {
      if (!this.info.buildings) return false;
      return this.info.buildings;
    },
    couriers: function () {
      if (!this.info.couriers) return false;
      return this.info.couriers;
    },
    draft: function () {
      if (!this.info.draft) return false;
      return this.info.draft;
    },
    events: function () {
      if (!this.info.events) return false;
      return this.info.events;
    },
    hero: function () {
      if (!this.info.hero) return false;
      return this.info.hero;
    },
    items: function () {
      if (!this.info.items) return false;
      return this.info.items;
    },
    league: function () {
      if (!this.info.league) return false;
      return this.info.league;
    },
    map: function () {
      if (!this.info.map) return false;
      return this.info.map;
    },
    minimap: function () {
      if (!this.info.minimap) return false;
      return this.info.minimap;
    },
    neutralitems: function () {
      if (!this.info.neutralitems) return false;
      return this.info.neutralitems;
    },
    player: function () {
      if (!this.info.player) return false;
      return this.info.player;
    },
    previously: function () {
      if (!this.info.previously) return false;
      return this.info.previously;
    },
    provider: function () {
      if (!this.info.provider) return false;
      return this.info.provider;
    },
    roshan: function () {
      if (!this.info.roshan) return false;
      return this.info.roshan;
    },
    wearables: function () {
      if (!this.info.wearables) return false;
      return this.info.wearables;
    },
  };
  var integ = {
    info: {},
    extra: {},
  };
  let match = null;

  function create(data, players_data, teams_data) {
    data.teamList = teams_data;
    data.players = players_data;
    integ.info = data;
    integ = $.extend({}, meth, integ);

    if (integ.getPlayers() !== false) {
      for (var k in integ.getPlayers()) {
        let player = integ.getPlayers()[k];
        let slot = player.observer_slot;
        let steamid = player.steamid;

        slotted[slot] = player;
        // Найдем игрока в players_data по steamid или имени
        let playerData = null;
        for (let pid in players_data) {
          if (
            (players_data[pid].sid && players_data[pid].sid === steamid) ||
            (players_data[pid].steamid &&
              players_data[pid].steamid === steamid) || // Проверка по steamid
            players_data[pid].name === player.name || // Поиск по имени
            players_data[pid].displayed_name === player.name // Поиск по displayed_name
          ) {
            playerData = players_data[pid];
            break;
          }
        }

        let name = slotted[slot].name;

        if (playerData) {
          slotted[slot].name = playerData.displayed_name || name;
          slotted[slot].real_name = playerData.real_name || name;
          slotted[slot].country_code = playerData.country_code;
          if (playerData.avatar) {
            slotted[slot].avatar = playerData.avatar;
            /*console.log(
              "Аватар найден для игрока:",
              steamid,
              "Аватар:",
              playerData.avatar
            );*/
          }
          if (playerData.team) {
            slotted[slot].teamData = integ.loadTeam(playerData.team);
          }
        } /*else {
          console.log("Данные не найдены для игрока:", steamid);
        }*/

        // Настройка методов для игрока
        integ.getPlayers()[k].getState = function () {
          return this.state;
        };
        integ.getPlayers()[k].getStats = function () {
          var temp_stats = $.extend({}, this.match_stats, this.state);
          return temp_stats;
        };
      }
    }
  }

  function listener(players, teams) {
    io.on("match", function (data) {
      match = data;
      coach1 = data.team_1.coach;
      if (!ignoredSteamIDs.includes(coach1)) {
        ignoredSteamIDs.push(coach1);
      }
      coach2 = data.team_2.coach;
      if (!ignoredSteamIDs.includes(coach2)) {
        ignoredSteamIDs.push(coach2);
      }
    });
    io.on("update", function (json) {
      json.teams = match;
      if (delay >= 0) {
        setTimeout(function () {
          create(json, players, teams);
          updatePage(integ);
        }, delay * 500);
      }
    });
    io.on("refresh", function (data) {
      location.reload(data);
    });
    io.emit("ready", true);
    /*
    //Listening for hidPlayers - Also needed in index.js in root folder
    io.on("hidePlayers", function (data) {
      const iSID = data.iSID; //Setting iSID to the value of the parameter given data, and accessing iSID with dot operator
      if (!ignoredSteamIDs.includes(iSID)) {
        //If iSID is not already in ignoredSteamIDs,
        ignoredSteamIDs.push(iSID); //push iSID to ignoredSteamIDs
      }
    });
    */
    io.on("toggleScoreboard", function (data) {
      toggleScoreboard(data);
    });
    io.emit("ready", true);
    io.on("toggleScoreboard2", function (data) {
      toggleScoreboard2(data);
    });
    io.on("toggleRadar", function (data) {
      toggleRadar(data);
    });
    io.emit("ready", true);
    io.on("toggleFreezetime", function (data) {
      toggleFreezetime(data);
    });

    io.emit("ready", true);
    io.on("toggleMap1", function (data) {
      toggleMap1(data);
    });
    io.emit("ready", true);
    io.on("toggleMap2", function (data) {
      toggleMap2(data);
    });
    io.on("toggleMap3", function (data) {
      toggleMap3(data);
    });
    io.on("toggleMap4", function (data) {
      toggleMap4(data);
    });
    io.on("toggleMap5", function (data) {
      toggleMap5(data);
    });
    io.on("toggleMap6", function (data) {
      toggleMap6(data);
    });
    io.on("toggleMap7", function (data) {
      toggleMap7(data);
    });
    io.on("toggleMap8", function (data) {
      toggleMap8(data);
    });
  }
  load(listener);
});
