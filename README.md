# ifTree
Javascript plugin to provide simple JSON driven dialogue trees or interactive fiction games, like [this one](http://localhost/ifTree/examples/simpleGame.html) with plenty of hooks to trigger JavaScript events. 

The tree consists of text nodes, with optional messages and option links to take you to other nodes. There are also flags that can be set as the user travels through the tree. 

## Usage

To use ifTree place the script on a page:

    <script src="js/ifTree.js"></script>

Then initialise it:

    var tree = ifTree.init(
        "tree",                                 // Id
        {...}                                      // Options
    );

Id is the id of the element you want to attach the tree to. 
Options provides the settings for the tree, including the data for the nodes and any flags.

 ### Options

 The structure of the options object is as follows:  

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
                                                // If an array is used a target will be randomly picked from it.
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

it is also recommened you take a look at the source of [the examples](http://localhost/ifTree/examples/index.html) to see it's various features in action.

### License
IfTree is licensed under the [MIT license](http://opensource.org/licenses/MIT).