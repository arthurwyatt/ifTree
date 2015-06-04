var Tree = (function () {
    var Tree = function (elemId, options) {
        this.elem = document.getElementById(elemId);
        this.options = options;

        //initialise
        this.init();
    };

    //methods:
    Tree.prototype.init = function () {
        //set up nodes
        this.nodes = this.options.nodes || {};
        if (!this.nodes.nowhere) {
            this.nodes.nowhere = {
                nowhere: {
                    text: "<p>You are not sure where you are.</p>"
                }
            };
        }

        //set up flags - uses JSON object to clone
        this.flags = (JSON.parse(JSON.stringify(this.options.flags))) || {};

        //set up UI        
        this.elem.addEventListener('click', function (e) {
            if (e.target.tagName === 'BUTTON') {
                this.selectOption(this.currentNode, e.target.value)
            }
        }.bind(this));

        //show the starting node
        this.currentNode = this.nodes[this.options.start || "start"];
        this.showNode(this.currentNode);
    };

    Tree.prototype.showNode = function (currentNode) {
        //strings to be built
        var text = "";
        var options = "";

        //check for problems
        if (!currentNode || !currentNode.text) {
            console.log("No node, defaulting to nowhere");
            currentNode = this.nodes.nowhere;
        }

        //get text from currentNode and start building text
        text = currentNode.text;

        //show messages
        if (currentNode.messages) {
            for (var i = 0; i < currentNode.messages.length; i++) {
                var message = currentNode.messages[i];
                //check flags
                if ((!message.showIf && !message.showIfNot) || (message.showIf && this.flags[message.showIf]) || (message.showIfNot && !this.flags[message.showIfNot])) {
                    text += message.text;
                }
            }
        }

        //show options
        if (currentNode.options && currentNode.options.length > 0) {
            for (var j = 0; j < currentNode.options.length; j++) {
                option = currentNode.options[j];
                //check flags
                if ((!option.showIf && !option.showIfNot) || (option.showIf && this.flags[option.showIf]) || (option.showIfNot && !this.flags[option.showIfNot])) {
                    options += "<li><button value='" + j + "'>" + option.label + "</li>";
                }
            }
        }

        //set flags
        
        if (currentNode.resetFlags) {
            //reclone flags from options
            this.flags = (JSON.parse(JSON.stringify(this.options.flags)));   
        }
        
        if (currentNode.setFalse) {
            this.flags[currentNode.setFalse] = false;
        }

        if (currentNode.setTrue) {
            this.flags[currentNode.setTrue] = true;
        }

        //write out text and options for the node
        this.elem.innerHTML = text + options;
    };

    Tree.prototype.selectOption = function (currentNode, selectedOption) {
        //just use the node name for now, we'll do something more in depth later
        var option = currentNode.options[selectedOption];
        this.currentNode = this.nodes[option.target];
        this.showNode(this.currentNode);
    }

    return Tree;
})();