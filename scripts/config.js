'use strict';
import { TicksPerSecond, world } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";
export let chaosInterval = TicksPerSecond * 30;

world.beforeEvents.worldInitialize.subscribe(({ itemComponentRegistry }) => {
    itemComponentRegistry.registerCustomComponent('chaos:config_component', {
        onUse(event) {
            new ModalFormData()
            .title('Chaos Config')
            .slider('Chaos Interval (s)', 10, 120, 10, chaosInterval / TicksPerSecond)
            .show(event.source).then((response) => {
                if (response.formValues) {
                    chaosInterval = TicksPerSecond * response.formValues[0];
                    world.sendMessage(`\xA7c\xA7l[Chaos]\xA7r Chaos interval was set to ${chaosInterval / TicksPerSecond}s.`);
                }
            });
        }
    });
});
