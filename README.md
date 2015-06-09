# ifTree
Javascript plugin to provide simple JSON driven dialogue trees or interactive fiction games, with plenty of hooks to trigger JavaScript events. 

## Usage

To use ifTree place the script on a page:

    <script src="js/ifTree.js"></script>

Then initialise it:

    var tree = ifTree.init(
        "tree",                                 // Id
        {}                                      // Options
    );

Id is the id of the element you want to attach the tree to. 

Options provides the settings for the tree, including the node structure, in the following structure: 


    {
        /* The nodes of our tree as key value pairs */
        nodes: {
            exampleNode: {                      // Each node must have a unique key.
                text: "<p>Example text.</p>",   // Text to be shown for the node, REQUIRED.
                                                // Can be formated using HTML.
                /* Array of messages - these show if conditions are met */
                messages: [{                    
                    text: "",                   // Text of a message.
                    showIf: "anyFlag",          // Shows the message if this flag is true.
                    showIfNot: "anotherFlag"    // Shows the message if this flag is false.
                }],
                /* Array of options - can be shown or hidden using flags but are shown by default. */
                options: [{
                    target: "anyNode",          // Node to navigate to if the option is selected.
                    label: "Click Me.",         // Text to show for the node.
                    showIf: "anyFlag",          // Shows the option if this flag is true.
                    showIfNot: "anotherFlag"    // Shows the option if this flag is false.
                    onSelect: function() {},    // JavaScript function to be executed when the page is shown.
                                                // If a node key is returned as a string redirects to that node.
                    setTrue: "anyFlag",         // Sets a flag to true when the option is selected.
                    setFalse: "anotherFlag"     // Sets a flag to false when the option is selected.
                    resetFlags: true            // Reset all flags to their defaults.               
                }],
                onShow: function() {},          // JavaScript function to be executed when the page is shown.
                                                // If a node key is returned as a string redirects to that node.
                setTrue: "anyFlag",             // Set a flag to true.
                setFalse: "anotherFlag"         // Set a flag to false.
                resetFlags: true                // Reset all flags to their defaults. 
            }
        }
        /* Flags as key value pairs */
        flags: {
            anyFlag: true,                      // Default setting of flag, true or false.
            anotherFlag: false,
        }
        start: "anyNode"                        // Starting node - defaults to "Start"
    }

