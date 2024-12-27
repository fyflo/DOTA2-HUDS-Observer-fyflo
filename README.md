# DOTA2-HUDS-Observer-fyflo

[MY DISCORD](https://discord.gg/a2whmHmv)

## Setting for monitors with resolutions greater than 1920 x 1080
1. Go to the address: `DOTA2-HUDS-Observer-fyflo-main\overlay` and adjust the resolution to yours in the `package.json` file ("width": `specify the width`, "height": `specify the height`).
2. If the HUD is on the wrong monitor, select it in the taskbar, and press `Win+Shift+Arrow keys` to move it to the correct monitor.

3. # Examples
<details><summary>HUD</summary>
	
![Ex1](https://i.imgur.com/NWGLDSB.jpeg)

</details>

## How does it work?

Basically, DOTA2 is streaming data to local app-server, that transforms data and then load it to local webpage.

## To-do before running

- Node.js needs to be installed v20.18
##
#### DOTA2
- You need to create a folder `gamestate_integration` at the address: SteamLibrary\steamapps\common\dota 2 beta\game\dota\cfg\ 
- SteamLibrary\steamapps\common\dota 2 beta\game\dota\cfg\gamestate_integration `gamestate_integration_dota2-gsi.cfg` needs to be placed in cfg folder in DOTA2 location

##
- DOTA2 needs to run on Fullscreen Windowed (I know people may dislike it, but since it's only for observation, soo...)
- Ensure everything in the `config.json` file is filled out

  ## How to make it run?

- Install NodeJS v20.18.0 (nodejs.org)
##
- Start DOTA2_HUD_fyflo.exe
##
- Run Overlay Exe from here: [OVERLAY DOWNLOAD](https://drive.google.com/file/d/1rqCMiZAmfJkEwtPSEFhkoDCm2SI1dRJA/view?usp=sharing) (OVERLAY Place in folder DOTA2-CSGO-HUDS-Observer-fyflo) or just go to your browser [http://Your IP:2626](http://Your IP:2626)
- Ensure that in the Overlay exe folder, there is a config.json file with the following:

  ## How to make it work with OBS?
- In your OBS create a new scene
- In scene, click on plus button and add window capture and choose csgo.exe
- Add browser and in url copy and paste your DOTA2 link
- Add second browser and paste url for radar (it should look like this)

  ## Admin Panel

After starting the code go to address showing up in terminal/command prompt. You should see Admin Panel divided in three parts - Teams, Players, Create Match and HUDs. In here you can manage data used in HUDs during match ups.

#### Teams tab

You can here define teams, their name, short names (actually short names are not use anywhere for now), their country flag and logo. Files for teams' logos are being held in `public/storage/` and their filename should start from `logo-`.
![Ex1](https://i.imgur.com/7HPOrB0.png)

#### Players tab

In Players tab you can define player's real name, displayed name, country flag (can also be set to "The same as team"), their team and, to identify players, SteamID64. Files for players' avatars are being held in `public/storage/` and their filename should start from `avatar-`.

![Ex2](https://i.imgur.com/tiDnUPj.png)

#### Create match tab

Here you can set type of match - is this a map of NONE, BO1, BO3 or BO5, score for teams and which team it should load to HUD. In case players are on the wrong side (left/right) there is `SWAP` button to quickly tell the HUD to swap teams' name, logo and flag.
Additionaly, if during the match you decide that there is a type in team's or player's information, you can change it (for example on mobile phone, if you allow Node through firewall and you are on the same local network) and then in this tab click the `Force Refresh HUD`, to make sure all the changes are applied.

This version of the program for DOTA2 does not require SteamID64

![Ex3](https://i.imgur.com/61l8zd7.png)

### HUDS

This tab shows local HUDs. They are not validated whether or not they actually work, but if any of the files is missing, it will notify you in Warnings column.
You can enable/disable each HUD to make it accessible or not. There is also HUD URL information - if you click it, it will redirect you to local webpage, that's serving as a HUD. It is useful if streamer wants to stream HUD separately - for example it can be added in OBS as Browser Source, then you just need to set it to HUD's URL.
It might be useful for bigger streaming workspaces, like for setups with different PC dedicated to replays - one server app will manage every HUD on local network, because all HUDs are available all the time, if they are not disabled.
![Ex4](https://i.imgur.com/HbdH4Ia.png)

## How to create your own HUD
Go to `public/huds` and copy and paste `default` folder and rename it to your heart's content - that's how your HUD will display in Admin Panel.
`template.pug` - template of your HUD in PUG, required.
`style.css` - css to your template, reccomended.
`index.js` - engine of your HUD. Look at the default one and at the template to get the idea how it works.

In `index.js` the most important part is `updatePage()` function. It is required for any HUD to work, because this function is called when data is coming from CS:GO. 

All of main action that will take place on your screen happens in `updatePage()` function, so when you want to represent some information you will need to write your code within its boundaries.
```javascript
function updatePage(data) {
	//Here happens magic
}
```
`data` argument is being passed to it, and from that we can take actions, such as getting informations about players, map, round phases, etc. Below you will find detailed information about received information :>


[The project is based on this project where information about the location of data from DOTA2 is described](https://github.com/antonpup/Dota2GSI)
