class EventHandler {
  events: { [key: string]: Function[] };
  constructor() {
    this.events = {};
  }

  on(events: string | string[], callback: Function) {
    // convert to array
    events = Array.isArray(events) ? events : [events];

    // loop through each event
    for (let event of events) {
      // add event to events object
      this.events[event] = this.events[event] || [];

      // add callback to event
      this.events[event].push(callback);
    }
  }

  emit(events: string | string[], params: { [key: string]: any } = {}) {
    // convert to array
    events = Array.isArray(events) ? events : [events];

    // loop through each event
    for (let event of events) {
      // callbacks
      let callbacks = this.events[event] || [];

      // call each callback
      callbacks.forEach((callback) => {
        callback(params);
      });
    }
  }
}

class API extends EventHandler {
  mockMode;
  constructor() {
    super();
    this.mockMode = true;

    window.requestAnimationFrame(() => {
      this.init();
    });
  }

  async init() {
    this.emit("init");

    if (this.mockMode) {
      await this.wait(1000);
      this.emit("connected", {
        name: "John Doe",
      });
      return;
    }
  }

  wait(time: number) {
    return new Promise((resolve: Function) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }

  async send(message: string) {
    this.emit("startSend", {
      message,
    });
    if (this.mockMode) {
      await this.wait(1000);
      this.emit("stopSend", {
        message,
      });

      await this.wait(2000);

      let isTyping = false;
      let typingInterval = setInterval(() => {
        isTyping = !isTyping;
        if (isTyping) this.emit("stopTyping");
        if (!isTyping) this.emit("startTyping");
      }, 1000);

      await this.wait(3000);
      clearInterval(typingInterval);
      this.emit("stopTyping");
      this.emit("receive", {
        message: `You said: ${message}`,
      });
      return;
    }
  }
}

export default new API();
