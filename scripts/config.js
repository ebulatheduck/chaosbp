'use strict';
import { TicksPerSecond, world } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";

let chaosInterval = TicksPerSecond * 30;

const configForm = new ModalFormData()
    .title('Chaos Config')
    .slider('Chaos Interval (s)', 10, 120, 10, 30);

configForm.show(world.getAllPlayers()[0]).then((response) => {
    chaosInterval = TicksPerSecond * response.formValues[0];
});