'use strict';
import { world, system, TicksPerSecond } from '@minecraft/server';
import { chaos } from './chaos';

const chaosInterval = TicksPerSecond * 30;

// Scoreboard setup
if (!world.scoreboard.getObjective('chaos')) world.scoreboard.addObjective('chaos');
let chaosObjective = world.scoreboard.getObjective('chaos');
chaosObjective.setScore('count', 0);
chaosObjective.setScore('enabled', 0);

system.runInterval(() => {
    if (!chaosObjective.getScore('enabled')) return;
    let count = chaosObjective.addScore('count', 1);
    chaosObjective.setScore('count', count % chaosInterval);
    if (count == chaosInterval) chaos();
});
