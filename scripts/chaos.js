'use strict';
import { world, system, TicksPerSecond } from "@minecraft/server";
const chaosFunctions = [
    // Summon entities
    function (player) {
        player.runCommand('summon tnt');
    },
    function (player) {
        player.runCommand('summon lightning_bolt');
    },
    function (player) {
        player.runCommand('summon creeper ~~~ facing ~~~ minecraft:become_charged');
    },
    // Give effects
    function (player) {
        player.addEffect('nausea', TicksPerSecond * 10, { showParticles: false });
    },
    function (player) {
        player.addEffect('poison', TicksPerSecond * 10, { showParticles: false });
    },
    function (player) {
        player.addEffect('hunger', TicksPerSecond * 10, { showParticles: false });
    },
    function (player) {
        player.addEffect('levitation', TicksPerSecond * 1, { amplifier: 20, showParticles: false });
    },
    function (player) {
        player.addEffect('blindness', TicksPerSecond * 10, { amplifier: 3, showParticles: false });
    },
    function (player) {
        player.addEffect('mining_fatigue', TicksPerSecond * 20, { amplifier: 3, showParticles: false });
    },
    // Spawn blocks
    function (player) {
        if (player.dimension.id == 'nether') return; // Don't help the player
        player.runCommand('setblock ~~3~ respawn_anchor ["respawn_anchor_charge":4]');
    },
    function (player) {
        player.runCommand('setblock ~~10~ anvil ["damage":"very_damaged"]');
    },
    // Misc.
    function (player) {
        player.runCommand('camerashake add @p 4 10 rotational');
        player.runCommand('camerashake add @p 4 10 positional');
    },
    function (player) {
        player.setOnFire(10, false);
    },
    function (player) {
        player.runCommand('inputpermission set @p movement disabled');
        system.runTimeout(() => {
            player.runCommand('inputpermission set @p movement enabled');
        }, TicksPerSecond * 3);
    },
    function (player) {
        player.runCommand('inputpermission set @p camera disabled');
        system.runTimeout(() => {
            player.runCommand('inputpermission set @p camera enabled');
        }, TicksPerSecond * 3);
    },
    function (player) {
        player.runCommand('ride @p summon_ride minecart');
    },
];

export function chaos() {
    let players = world.getAllPlayers();
    players.forEach((player) => {
        if (!player.isValid()) return; // Don't run chaos functions on unloaded players
        if (player.getTags().indexOf('nochaos') != -1) return player.runCommand('title @p actionbar \xA7c\xA7l[Chaos]\xA7r You are exempt from chaos functions.');
        chaosFunctions[Math.floor(Math.random() * chaosFunctions.length)](player);
    });
}
