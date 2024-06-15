'use strict';
import { world, system } from '@minecraft/server';
import { chaos } from './chaos';
import * as config from './config';

// Scoreboard setup
if (!world.scoreboard.getObjective('chaos')) world.scoreboard.addObjective('chaos');
let chaosObjective = world.scoreboard.getObjective('chaos');
chaosObjective.setScore('count', 0);
chaosObjective.setScore('enabled', 0);

system.runInterval(() => {
    if (!chaosObjective.getScore('enabled')) return;
    let count = chaosObjective.addScore('count', 1);
    chaosObjective.setScore('count', count % chaosInterval);
    if (count == config.chaosInterval) chaos();
});
