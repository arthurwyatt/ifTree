var ifTree = (function () {
    var Tree = function (elemId, options) {
        this.elem = document.getElementById(elemId);
        this.options = options || {};

        if (this.elem) {
            //initialise 
            this.init();
        } else {
            throw "Element #" + elemId + " not found.";
        }
    };

    //methods:
    Tree.prototype.init = function () {
        //set up nodes
        this.nodes = this.options.nodes || {};
        if (!this.nodes.nowhere) {
            this.nodes.nowhere = {
                text: "<p>You are not sure where you are.</p>"
            };
        }
 
        //set up flags 
        this.resetFlags();

        //set up UI        
        this.elem.addEventListener('click', function (e) {
            if (e.target.tagName === 'BUTTON') {
                this.selectOption(this.currentNode, e.target.value);
            }
        }.bind(this));

        //show the starting node
        this.currentNode = this.nodes[this.options.start || "start"];
        this.showNode(this.currentNode);
    };

    Tree.prototype.showNode = function (node) {
        //strings to be built
        var text = "";
        var options = "";

        //check for problems
        if (!node || !node.text) {
            console.log("No node, defaulting to nowhere");
            node = this.nodes.nowhere;
        }

        //execute onShow function if present
        if (node.onShow && typeof(node.onShow) === "function") {
            var result = node.onShow.call(this);
            if (typeof(result) === "string") {
                //if a string is returned we redirect to the node of that name
                this.goTo(result);
                return;   
            } 
        }

        //get text from current Node and start building text
        text = node.text;

        //show messages
        if (node.messages) {
            for (var i = 0; i < node.messages.length; i++) {
                var message = node.messages[i];
                //check flags
                if ((!message.showIf && !message.showIfNot) || (message.showIf && this.flags[message.showIf]) || (message.showIfNot && !this.flags[message.showIfNot])) {
                    text += message.text;
                }
            }
        }

        //show options
        if (node.options && node.options.length > 0) {
            for (var j = 0; j < node.options.length; j++) {
                var option = node.options[j];
                //check flags
                if ((!option.showIf && !option.showIfNot) || (option.showIf && this.flags[option.showIf]) || (option.showIfNot && !this.flags[option.showIfNot])) {
                    options += "<li><button value='" + j + "'>" + option.label + "</li>";
                }
            }
        }

        //set flags
        if (node.resetFlags) {
            this.resetFlags();
        }
        
        if (node.setFalse) {
            this.flags[node.setFalse] = false;
        }

        if (node.setTrue) {
            this.flags[node.setTrue] = true;
        }

        //write out text and options for the node
        this.elem.innerHTML = text + options;
    };


    Tree.prototype.selectOption = function (node, optionIndex) {
        var option = node.options[optionIndex];
        var target = option.target;

        //execute onShow function if present
        if (option.onSelect && typeof(option.onSelect) === "function") {
            var result = option.onSelect.call(this);
            if (typeof(result) === "string") {
                //if a string is returned use that as the new target
                target = result;
            } 
        }

        //set flags        
        if (option.resetFlags) {
            this.resetFlags();
        }
        
        if (option.setFalse) {
            this.flags[option.setFalse] = false;
        }

        if (option.setTrue) {
            this.flags[option.setTrue] = true;
        }        

        this.goTo(this.nodes[option.target]);
    };

    Tree.prototype.goTo = function (target) {
        this.currentNode = target;
        this.showNode(this.currentNode);        
    };

    Tree.prototype.resetFlags = function () {
        if (this.options.flags) {
            this.flags = (JSON.parse(JSON.stringify(this.options.flags)));
        } else {
            this.flags = {};
        }   
    };

    return {
        init: function (elemId, options) { 
            return new Tree(elemId, options);
        }
    };
})();