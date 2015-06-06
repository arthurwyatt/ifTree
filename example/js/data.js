var data = {
    nodes: {
        stream: {
            text: "<p>You are by a gently trickling  stream in a forest. A path heads deeper into the forest to the east.</p>",
            options: [{
                target: "beach",
                label: "Follow the stream"
            }, {
                target: "forest",
                label: "Go deeper into the forest"
            }],
            messages: [{
                showIf: "startingGame",
                text: "<p>How do you start your adventure?</p>"
            }],
            setFalse: "startingGame"
        },
        beach: {
            text: "<p>You are on a beach.</p>",
            options: [{
                target: "stream",
                label: "Go back."
            }, {
                showIfNot: "journalRead",
                target: "journal",
                label: "Read the journal"
            }],
            messages: [{
                showIfNot: "journalRead",
                text: "<p>Someone had carelessly left their journal here.</p>"
            }]
        },
        journal: {
            text: "<p>The last entry:</p><p><em>Hoped to explore the cave today, but I'm too afraid to go in since I lost my sword in the forest.</em></p>",
            options: [{
                showIf: "caveFound",
                target: "cave",
                label: "Head to the cave."
            }, {
                target: "forest",
                label: "Explore the forest."
            }, {
                target: "beach",
                label: "Stay on the beach."
            }],
            setTrue: "journalRead"
        },
        forest: {
            text: "<p>You are in a forest. A path leads to the east and west.</p>",
            options: [{
                target: "cave",
                label: "Go East."
            }, {
                target: "stream",
                label: "Go West."
            }, {
                target: "lost",
                label: "Leave the path"
            }]
        },
        lost: {
            text: "<p>Uh oh. You have gotten lost in the forest.</p>",
            options: [{
                target: "verylost",
                label: "Go left"
            }, {
                target: "superlost",
                label: "Go right"
            }],

            messages: [{
                showIf: "lostBefore",
                text: "<p>Again.</p>"
            }],
            setTrue: "lostBefore"
        },
        verylost: {
            text: "<p>I'm not sure if that was the right way.</p>",
            options: [{
                target: "stilllost",
                label: "Go that way."
            }, {
                target: "mostlylost",
                label: "Go this way."
            }]
        },
        superlost: {
            text: "<p>You have gotten yourself all turned around.</p>",
            options: [{
                target: "mostlylost",
                label: "Go North???"
            }, {
                target: "stilllost",
                label: "Go South????"
            }, {
                target: "mostlylost",
                label: "Go East???"
            }, {
                target: "verylost",
                label: "Go West???"
            }]
        },
        stilllost: {
            text: "<p>you are still lost.</p>",
            options: [{
                target: "superlost",
                label: "I think you came from this way."
            }, {
                target: "verylost",
                label: "Or was it back here?"
            }]
        },
        mostlylost: {
            text: "<p>That might have been the right way, I think I can see path from here.</p>",
            options: [{
                target: "forest",
                label: "Go forwards."
            }, {
                target: "stilllost",
                label: "Go back."
            }, {
                showIfNot: "hasSword",
                target: "sword",
                label: "Pick up the sword."
            }],
            messages: [{
                showIfNot: "hasSword",
                text: "<p>A sword lies on the ground.</p>"
            }]
        },
        sword: {
            text: "<p>You pick it up. Now you have a sword - awesome!</p>",
            options: [{
                target: "forest",
                label: "Go forwards."
            }, {
                target: "stilllost",
                label: "Go back."
            }],
            setTrue: "hasSword"
        },
        cave: {
            text: "<p>You have found a mysterious cave.</p>",
            options: [{
                showIfNot: "hasSword",
                target: "areyousure",
                label: "Go inside."
            }, {
                showIf: "hasSword",
                target: "treasure",
                label: "Go inside."
            }, {
                target: "forest",
                label: "Go back."
            }],
            setTrue: "caveFound"
        },
        areyousure: {
            text: "<p>Are you sure? It's a bit scary.</p>",
            options: [{
                target: "eaten",
                label: "Yes! Head right in."
            }, {
                target: "forest",
                label: "No! Run back to the forest."
            }]
        },
        eaten: {
            text: "<p>In the darkness of the cave something horrible eats you to death.</p>",
            resetFlags: true,
            options: [{
                target: "stream",
                label: "Try again."
            }]
        },
        treasure: {
            text: "<p>You bravely step into the cave. You think you hear something scuttle away but, holding your sword, you bravely bravely press on.</p><p>Eventually you find an ancient chest. You open it - CONGRATULATIONS, YOU HAVE FOUND THE LOST TREASURE!</p>",
            resetFlags: true,
            options: [{
                target: "stream",
                label: "Play again."
            }]
        }
    },

    flags: {
        startingGame: true,
        journalRead: false,
        foundCave: false,
        hasSword: false,
        lostBefore: false
    }
};
