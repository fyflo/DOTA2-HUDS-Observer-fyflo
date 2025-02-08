const p1 = "rgba(52, 118, 255, 1.0)";
const p2 = "rgba(103, 255, 192, 1.0)";
const p3 = "rgba(192, 0, 192, 1.0)";
const p4 = "rgba(243, 240, 12, 1.0)";
const p5 = "rgba(255, 108, 0, 1.0)";
const p6 = "rgba(254, 135, 195, 1.0)";
const p7 = "rgba(162, 181, 72, 1.0)";
const p8 = "rgba(102, 217, 247, 1.0)";
const p9 = "rgba(0, 132, 34, 1.0)";
const p10 = "rgba(165, 106, 0, 1.0)";
const radiant_left = "rgba(125, 213, 77, 1.0)";
const diant_right = "rgba(227, 78, 49, 1.0)";

var teams = {
  left: {},
  right: {},
};

function updatePage(data) {
  var matchup = data.getMatchType();
  var match = data.getMatch();
  var team_one = data.getTeamOne();
  var team_two = data.getTeamTwo();
  var team_Dire = data.getDire();
  var team_Radiant = data.getRadiant();
  var observed = data.getObserved();
  var players = data.getPlayers();
  live_map = map;
  var abilities = data.abilities();
  var buildings = data.buildings();
  var couriers = data.couriers();
  var draft = data.draft();
  var events = data.events();
  var hero = data.hero();
  var items = data.items();
  var league = data.league();
  var map = data.map();
  var minimap = data.minimap();
  var neutralitems = data.neutralitems();
  var player = data.player();
  var previously = data.previously();
  var provider = data.provider();
  var roshan = data.roshan();
  var wearables = data.wearables();
  //console.log(observed);
  //console.log(team_Radiant);

  var test_player = data.getPlayer(1);

  if (test_player) {
    teams.left = test_player.team.toLowerCase() == "ct" ? team_ct : team_t;
    teams.right = test_player.team.toLowerCase() != "ct" ? team_ct : team_t;

    teams.left.name = team_one.team_name || teams.left.name;
    teams.right.name = team_two.team_name || teams.right.name;
    teams.left.short_name = team_one.short_name || teams.left.short_name;
    if (teams.left.short_name === undefined || teams.left.short_name === null) {
      if (teams.left.name == "Counter-terrorists") {
        teams.left.short_name = "CT";
      } else {
        teams.left.short_name = "TT";
      }
    }
    teams.right.short_name = team_two.short_name || teams.right.short_name;
    if (
      teams.right.short_name === undefined ||
      teams.right.short_name === null
    ) {
      if (teams.right.name == "Counter-terrorists") {
        teams.right.short_name = "CT";
      } else {
        teams.right.short_name = "TT";
      }
    }
    teams.left.logo = team_one.logo || null;
    teams.right.logo = team_two.logo || null;
    teams.left.flag = team_one.country_code || null;
    teams.right.flag = team_two.country_code || null;
  }

  //console.log(info.player.team2.player0.name)

  //console.log(data);
  //console.log(data.info.player.team2.player0.gold)
  //console.log(data.info.teams.team_1.team)
  //console.log(data.info.teams.team_1.team)
  //console.log(teams.left.name);

  teams.left.name = team_one.team_name || teams.left.name;
  teams.right.name = team_two.team_name || teams.right.name;
  teams.left.short_name = team_one.short_name || teams.left.short_name;
  if (teams.left.short_name === undefined || teams.left.short_name === null) {
    if (teams.left.name == "Counter-terrorists") {
      teams.left.short_name = "team2";
    } else {
      teams.left.short_name = "team3";
    }
  }
  teams.right.short_name = team_two.short_name || teams.right.short_name;
  if (teams.right.short_name === undefined || teams.right.short_name === null) {
    if (teams.right.name == "Counter-terrorists") {
      teams.right.short_name = "team2";
    } else {
      teams.right.short_name = "team3";
    }
  }
  teams.left.logo = team_one.logo || null;
  teams.right.logo = team_two.logo || null;
  teams.left.flag = team_one.country_code || null;
  teams.right.flag = team_two.country_code || null;

  teams.left.side = data.info.player.team2 || null;
  teams.right.side = data.info.player.team3 || null;
  teams.left.sidehero = data.info.hero.team2 || null;
  teams.right.sidehero = data.info.hero.team3 || null;
  //console.log(teams.right.sidehero);

  teams.left.players = teams.left.side;
  teams.right.players = teams.right.side;

  teams.left.hero = teams.left.sidehero;
  teams.right.hero = teams.right.sidehero;

  //console.log(teams.left.players);
  //console.log(teams.left.hero);
  //console.log(teams.right.players);

  const GAME_STATE = {
    HERO_SELECTION: "DOTA_GAMERULES_STATE_HERO_SELECTION",
    STRATEGY_TIME: "DOTA_GAMERULES_STATE_STRATEGY_TIME",
    TEAM_SHOWCASE: "DOTA_GAMERULES_STATE_TEAM_SHOWCASE",
  };

  const ELEMENTS_TO_TOGGLE = [
    "#observed",
    "#players_left",
    "#players_right",
    "#top_panel",
  ];

  function toggleElementsVisibility(data) {
    const gameState = data.info.map.game_state;
    const opacity =
      gameState === GAME_STATE.HERO_SELECTION ||
      gameState === GAME_STATE.STRATEGY_TIME ||
      gameState === GAME_STATE.TEAM_SHOWCASE
        ? 0
        : 1;

    ELEMENTS_TO_TOGGLE.forEach((selector) => {
      $(selector).css("opacity", opacity);
    });
  }

  // Заменить существующий if-else блок на:
  toggleElementsVisibility(data);

  var name1 = teams.left.players.player0.name;
  var name2 = teams.left.players.player1.name;
  var name3 = teams.left.players.player2.name;
  var name4 = teams.left.players.player3.name;
  var name5 = teams.left.players.player4.name;
  var name6 = teams.right.players.player5.name;
  var name7 = teams.right.players.player6.name;
  var name8 = teams.right.players.player7.name;
  var name9 = teams.right.players.player8.name;
  var name10 = teams.right.players.player9.name;
  var info1 = teams.left.players.player0;
  var info2 = teams.left.players.player1;
  var info3 = teams.left.players.player2;
  var info4 = teams.left.players.player3;
  var info5 = teams.left.players.player4;
  var info6 = teams.right.players.player5;
  var info7 = teams.right.players.player6;
  var info8 = teams.right.players.player7;
  var info9 = teams.right.players.player8;
  var info10 = teams.right.players.player9;
  var hero1 = teams.left.hero.player0.name;
  var hero2 = teams.left.hero.player1.name;
  var hero3 = teams.left.hero.player2.name;
  var hero4 = teams.left.hero.player3.name;
  var hero5 = teams.left.hero.player4.name;
  var hero6 = teams.right.hero.player5.name;
  var hero7 = teams.right.hero.player6.name;
  var hero8 = teams.right.hero.player7.name;
  var hero9 = teams.right.hero.player8.name;
  var hero10 = teams.right.hero.player9.name;
  var steam1 = teams.left.players.player0.steamid;
  var steam2 = teams.left.players.player1.steamid;
  var steam3 = teams.left.players.player2.steamid;
  var steam4 = teams.left.players.player3.steamid;
  var steam5 = teams.left.players.player4.steamid;
  var steam6 = teams.right.players.player5.steamid;
  var steam7 = teams.right.players.player6.steamid;
  var steam8 = teams.right.players.player7.steamid;
  var steam9 = teams.right.players.player8.steamid;
  var steam10 = teams.right.players.player9.steamid;
  var league = data.info.league;
  var abilities = data.info.abilities;
  //console.log(data.info.players.asVCmFbyuA8IHHSP.displayed_name);

  //teams.left.players.player0
  // net_worth - общая ценность
  // team_slot - слот на карте
  // steamid - steam64
  // gold - золото
  // runes_activated - активные руны (количество)
  // xpm - xpm / мана
  // team_name - название каомады (силы света или силы тьмы)

  // teams.left.hero.player0
  // aghanims_scepter - Улучшает ульт, а также некоторые способности всех героев.
  // aghanims_shard - Улучшает существующую способность героя или дает ему новую.
  // mana - мана
  // max_mana - максимально маны
  // health - хп
  // has_debuff - тру или фолс
  // buyback_cooldown - через сколько можно активировать байбэк
  // disarmed - обезоруженный
  // hexed -  заколдованный
  // level - уровень
  // magicimmune - есть ли иммун к магии
  // muted - замьючен
  // respawn_seconds - возраждение через
  // silenced -
  // smoked
  // stunned
  // talent_1 (2,3,4 до 8)

  /*
    var name = 0;

    for (var i = 0; i < 10; i++) {
      name++;
        console.log(name);
    }
  */
  //let heroname = newdata.hero.team2.player5.name.replace("npc_dota_hero_", "")
  //console.log(newdata);
  //console.log(newdata.league.dire.name)

  //console.log(newdata.player.team2.player0.accountid)
  //console.log(newdata.hero.team2.player[Index].name)
  //$("#left_team #main").text(newdata.hero.team2.player0.name)
  //console.log(name1);
  //console.log(name6);
  // ... existing code ...

  // Обновление имен игроков
  for (let i = 1; i <= 5; i++) {
    $(`#players_left #player_section #player${i} #player_alias_text`).text(
      eval(`name${i}`)
    );
    $(`#players_right #player_section #player${i} #player_alias_text`).text(
      eval(`name${i + 5}`)
    );
  }

  // ... existing code ...

  //console.log(hero1);
  //$("#player_health_text").text(newdata.hero.team2.player0.name.replace("npc_dota_hero_", ""))
  // ... existing code ...

  // Обновление текста здоровья героев
  for (let i = 1; i <= 5; i++) {
    $(`#players_left #player_section #player${i} #player_health_text`).text(
      eval(`hero${i}`)
    );
    $(`#players_right #player_section #player${i} #player_health_text`).text(
      eval(`hero${i + 5}`)
    );
  }

  // ... existing code ...
  /*
      if (hero9.name = "npc_dota_hero_rattletrap") {
        $("#players_right #player_section #player5 #player_health_text").text("Clockwerk")
      } else {
          $("#players_right #player_section #player5 #player_health_text").text(hero10)
      }
  */

  // ... existing code ...

  // Обновление изображений героев
  for (let i = 1; i <= 5; i++) {
    $(`#players_left #player_section #player${i} #player_image`).attr(
      "src",
      `/storage/dota2/heroes/${eval("hero" + i)}.webp`
    );
    $(`#players_right #player_section #player${i} #player_image`).attr(
      "src",
      `/storage/dota2/heroes/${eval("hero" + (i + 5))}.webp`
    );
  }

  // ... existing code ...

  //console.log(steam1);
  //$("#players_left #player_section #player1 #player_image").attr("src", "/storage/" + steam1 + ".png")

  // ... existing code ...

  // Обновление цветов боковых панелей
  for (let i = 1; i <= 5; i++) {
    $(`#players_left #player_section #player${i} .player_side_bar`).css(
      "background-color",
      eval(`p${i}`)
    );
    $(`#players_right #player_section #player${i} .player_side_bar`).css(
      "background-color",
      eval(`p${i + 5}`)
    );
  }

  // ... existing code ...

  //console.log(info1.gold);

  // ... existing code ...

  // Обновление статистики игроков (золото, убийства, помощь, смерти)
  for (let i = 1; i <= 5; i++) {
    $(
      `#players_left #player_section #player${i} #player_current_money_text`
    ).text(eval(`info${i}`).gold);
    $(
      `#players_right #player_section #player${i} #player_current_money_text`
    ).text(eval(`info${i + 5}`).gold);
  }

  // ... существующий код ...
  //console.log(info1.kills);
  // ... существующий код ...

  // Обновление статистики (убийства/смерти/помощь) для всех игроков
  const stats = ["kills", "deaths", "assists"];

  stats.forEach((stat) => {
    for (let i = 1; i <= 5; i++) {
      $(`#players_left #player_section #player${i} #player_${stat}_text`).text(
        eval(`info${i}`)[stat]
      );
      $(`#players_right #player_section #player${i} #player_${stat}_text`).text(
        eval(`info${i + 5}`)[stat]
      );
    }
  });

  // ... existing code ...

  $(document).ready(function () {
    // Глобальный перехватчик ошибок для изображений
    $("img").on("error", function (e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    });
  });

  updateTopPanel(league, teams);
  updateStateLive(data);
  updateObserver(data, players);
  abilitiesUlta(abilities, players);
  //updateObserved(observed);
  //console.log(match);
}

function updateTopPanel(league, teams) {
  //#region Team Name
  if (teams.left.name === undefined) {
    $("#left_team #main")
      .text(league.radiant.name.toUpperCase())
      .css("color", radiant_left);
  } else {
    $("#left_team #main")
      .text(teams.left.name.toUpperCase())
      .css("color", radiant_left);
  }
  if (teams.right.name === undefined) {
    $("#right_team #main").text(league.dire.name).css("color", diant_right);
  } else {
    $("#right_team #main")
      .text(teams.right.name.toUpperCase())
      .css("color", diant_right);
  }
  //#endregion

  //#region Team Score
  // $("#left_team #score")
  //   .text(data.info.map.radiant_score)
  //   .css("color", radiant_left);
  // $("#right_team #score")
  //   .text(data.info.map.dire_score)
  //   .css("color", diant_right);
  //#endregion

  //#region Poles
  $("#left_team .bar").css("background-color", radiant_left);
  $("#right_team .bar").css("background-color", diant_right);
  /*$("#left_team #alert #alert_pole_right").css("background-color", teams.left.side == "ct" ? COLOR_NEW_CT : COLOR_NEW_T);
    $("#right_team #alert #alert_pole_left").css("background-color", teams.right.side == "ct" ? COLOR_NEW_CT : COLOR_NEW_T);
    $("#match_pole_1").css("background-color", teams.left.side == "ct" ? COLOR_NEW_CT : COLOR_NEW_T);
    $("#match_pole_2").css("background-color", teams.right.side == "ct" ? COLOR_NEW_CT : COLOR_NEW_T);
    //#endregion
  */
  //#region Team Logos
  if (!teams.left.logo) {
    teams.left.logo = "logo_" + "left" + "_default.webp";
  }
  if (!teams.right.logo) {
    teams.right.logo = "logo_" + "right" + "_default.webp";
  }
  $("#left_team #team_logo").attr("src", "/storage/" + teams.left.logo);
  $("#right_team #team_logo").attr("src", "/storage/" + teams.right.logo);
  //#endregion

  //#region Team Flag
  if (teams.left.flag && disp_team_flags) {
    $("#left_team #team_flag").css(
      "background-image",
      "url(/files/img/flags-50/" + teams.left.flag + ".png)"
    );
  } else {
    $("#left_team #team_flag").css("background-image", "");
  }
  if (teams.right.flag && disp_team_flags) {
    $("#right_team #team_flag").css(
      "background-image",
      "url(/files/img/flags-50/" + teams.right.flag + ".png)"
    );
  } else {
    $("#right_team #team_flag").css("background-image", "");
  }
  //#endregion
}

function updateStateLive(data) {
  if (data.info.map.clock_time) {
    var clock_time = Math.abs(Math.ceil(data.info.map.clock_time));
    var count_minute = Math.floor(clock_time / 60);
    var count_seconds = clock_time - count_minute * 60;
    if (count_seconds < 10) {
      count_seconds = "0" + count_seconds;
    }
    $("#round_timer_text").text(count_minute + ":" + count_seconds);
  }
}

function updateObserver(data, players) {
  // ... существующий код ...
  /*
  // Создаем массивы для данных игроков
  const playerData = {
    names: [],
    steamIds: [],
    observers: []
  };

  // Заполняем данные для обеих команд
  for (let i = 0; i < 5; i++) {
    // Левая команда
    playerData.names[i] = teams.left.players[`player${i}`].name;
    playerData.steamIds[i] = teams.left.players[`player${i}`].steamid;
    playerData.observers[i] = data.info.hero.team2[`player${i}`].selected_unit;
    
    // Правая команда
    playerData.names[i+5] = teams.right.players[`player${i+5}`].name;
    playerData.steamIds[i+5] = teams.right.players[`player${i+5}`].steamid; 
    playerData.observers[i+5] = data.info.hero.team3[`player${i+5}`].selected_unit;
  }

  const DEFAULT_AVATAR = "/storage/dota2/player_silhouette.webp";

  function setPlayerAvatar(playerName, steamId) {
    // Пробуем загрузить аватар в следующем порядке:
    // 1. По имени игрока
    // 2. По steamId
    // 3. Дефолтный аватар
    const avatarUrls = [
      `/storage/avatar/${playerName}.png`,
      /*`/storage/avatar/${steamId}.png`,*/
  /*DEFAULT_AVATAR
    ];

    function tryNextAvatar(index) {
      if (index >= avatarUrls.length) {
        $("#obs_img").hide();
        $("#obs_img2").attr("src", DEFAULT_AVATAR).show();
        return;
      }

      const img = new Image();
      img.onload = function() {
        $("#obs_img").attr("src", avatarUrls[index]).show();
        $("#obs_img2").hide();
      };
      img.onerror = function() {
        tryNextAvatar(index + 1);
      };
      img.src = avatarUrls[index];
    }

    tryNextAvatar(0);
  }

  let activePlayerFound = false;

  // Ищем активного наблюдателя
  for (let i = 0; i < playerData.observers.length; i++) {
    if (playerData.observers[i]) {
      setPlayerAvatar(playerData.names[i], playerData.steamIds[i]);
      $("#obs_alias_text").text(playerData.names[i]);
      activePlayerFound = true;
      break;
    }
  }

  // Если активный игрок не найден
  if (!activePlayerFound) {
    $("#obs_img").hide();
    $("#obs_img2").attr("src", DEFAULT_AVATAR).show();
    $("#obs_alias_text").text("");
  }*/

  //тест
  //console.log(data.info.player.team2.player0.name);
  //console.log(data.info.player.team3.player5.name);
  //console.log(data.info.players.asVCmFbyuA8IHHSP.displayed_name);

  // Функция для поиска игрока и его аватара в базе players
  function findPlayerAvatar(searchName) {
    for (let playerId in data.info.players) {
      if (data.info.players[playerId].displayed_name === searchName) {
        return data.info.players[playerId].avatar;
      }
    }
    return null;
  }

  // Проверяем левую команду (player0-player4)
  for (let i = 0; i < 5; i++) {
    if (data.info.hero.team2[`player${i}`].selected_unit) {
      const playerName = data.info.player.team2[`player${i}`].name;
      const avatar = findPlayerAvatar(playerName);

      if (avatar) {
        $("#obs_img").attr("src", `/storage/${avatar}`).show();
        $("#obs_img2").hide();
        $("#obs_alias_text").text(playerName);
      } else {
        $("#obs_img").hide();
        $("#obs_img2")
          .attr("src", "/storage/dota2/player_silhouette.webp")
          .show();
        $("#obs_alias_text").text(playerName);
      }
      return;
    }
  }

  // Проверяем правую команду (player5-player9)
  for (let i = 5; i < 10; i++) {
    if (data.info.hero.team3[`player${i}`].selected_unit) {
      const playerName = data.info.player.team3[`player${i}`].name;
      const avatar = findPlayerAvatar(playerName);

      if (avatar) {
        $("#obs_img").attr("src", `/storage/${avatar}`).show();
        $("#obs_img2").hide();
        $("#obs_alias_text").text(playerName);
      } else {
        $("#obs_img").hide();
        $("#obs_img2")
          .attr("src", "/storage/dota2/player_silhouette.webp")
          .show();
        $("#obs_alias_text").text(playerName);
      }
      return;
    }
  }

  // Если никто не выбран, скрываем observed
  $("#observed").css("opacity", "0");
}

function abilitiesUlta(abilities) {
  // Проходим по всем игрокам (0-9)
  for (let player = 0; player < 10; player++) {
    // Определяем команду и номер игрока
    const team = player < 5 ? "team2" : "team3";
    const playerNum = player < 5 ? player : player - 5;

    // HTML элементы нумеруются с 1 до 10, а игроки с 0 до 9
    const uiIndex = player + 1;

    // Проверяем способности от 0 до 8 для каждого игрока
    for (let i = 0; i < 9; i++) {
      const ability = abilities[team][`player${player}`][`ability${i}`];

      // Если находим ульту
      if (ability && ability.ultimate === true) {
        //console.log(`Найдена ульта игрока ${player}: ${ability.name}`);

        // Отображаем название ульты для конкретного игрока
        $(`#ultimate_name_${uiIndex}`).text(ability.name);

        // Проверяем кулдаун
        if (ability.cooldown !== 0) {
          // Если кулдаун не 0, показываем картинку и значение кулдауна
          $(`#ultimate_image_${uiIndex}`)
            .attr({
              src: `/storage/dota2/abilities/${ability.name}.webp`,
              alt: ability.name,
            })
            .show();
          $(`#ultimate_cooldown_${uiIndex}`)
            .text(Math.ceil(ability.cooldown))
            .show();
        } else {
          // Если кулдаун 0, скрываем картинку и значение кулдауна
          $(`#ultimate_image_${uiIndex}`).hide();
          $(`#ultimate_cooldown_${uiIndex}`).hide();
        }

        break; // Переходим к следующему игроку после нахождения ульты
      }
    }
  }
}
