const defaultInputConfigs = {
    up: ['W', "UP", "ARROWUP"],
    down: ['S', "DOWN","ARROWDOWN"],
    left: ['A', "LEFT","ARROWLEFT"],
    right: ['D', "RIGHT","ARROWRIGHT"],
    action: ['SPACE', "ENTER"]
};

const arrows = {
    up: ['ARROWUP'],
    down: ['ARROWDOWN'],
    left: ['ARROWLEFT'],
    right: ['ARROWRIGHT'],
    action: ['ENTER']
};

const wasd = {
    up: ['W'],
    down: ['S'],
    left: ['A'],
    right: ['D'],
    action: ['SPACE']
};

const cursor = {
    up: ['UP', "ARROWUP"],
    down: ['DOWN', "ARROWDOWN"],
    left: ['LEFT', "ARROWLEFT"],
    right: ['RIGHT', "ARROWRIGHT"],
    action: ['SPACE', "ENTER"]
};

export const inputConfigs = {
    arrows,
    wasd,
    cursor,
    defaultInputConfigs
};