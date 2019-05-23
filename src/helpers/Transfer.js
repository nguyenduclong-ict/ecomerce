class Transfer {
  static chanels = [];

  /**
   *  @param {String} chanel Tên chanel
   *  @param {Object} message {type : String, data : any}
   */
  static pushMessage = (chanel, message) => {
    let index = this.chanels.findIndex(e => e.name === chanel);
    console.log(index);
    if (index >= 0) this.chanels[index].callbacks.forEach(callback => callback(message));
  };
  static registerChanel = name => {
    let index = this.chanels.findIndex(e => e.name === name);
    if (index >= 0) return index;
    this.chanels.push({ name, callbacks: [] });
    return this.chanels.length - 1;
  };

  static subscribe = (chanel, callback) => {
    let index = this.registerChanel(chanel);
    console.log(this.chanels, index, callback);
    this.chanels[index].callbacks.push(callback);
  };
}

export default Transfer;
