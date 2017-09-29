class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      this.config = config;
      this.state = config.initial;
      this.states = Object.getOwnPropertyNames(config.states);
      this.history = [this.state];
      this.history.pos = 1;}

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
     return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
    if(this.states.indexOf(state) ==-1) throw new Error("State is not exist");
      else this.state = state;
      this.history.push(this.state);
      this.history.pos++;
      this.history.length = this.history.pos;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
    if (this.config.states[this.state].transitions[event]){
        this.state = this.config.states[this.state].transitions[event];
        this.history.push(this.state);
        this.history.pos++;
        this.history.length = this.history.pos;
      }
      else throw new Error("Event is not exist");
    
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
     if (event == undefined){
        return this.states;
      }
      else{
        var states = [];
        for (var i = 0; i < this.states.length; i++) {
          if(this.config.states[this.states[i]].transitions[event]){
            states.push(this.states[i]);
          }
        }
        return states;
      }
    
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
    
   if (this.history.pos != 1) {
        this.history.pos--;
        this.state = this.history[this.history.pos - 1];
        return true;
      }
      return false;
    
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
     if (this.history.pos != this.history.length) {
        this.history.pos++;
        this.state = this.history[this.history.pos - 1];
        return true;
      }
      return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
    this.history.length = true;
      this.history.pos = true;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
