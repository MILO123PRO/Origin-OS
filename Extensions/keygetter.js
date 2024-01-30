(function (Scratch) {
  "use strict";

  const MAX_KEY_HISTORY = 100; // Adjust the maximum number of keys to keep in history

  class KeyHistoryExtension {
    constructor() {
      this.keyHistory = [];
    }

    getInfo() {
      return {
        id: 'keyhistoryextension',
        name: 'Key History Extension',
        blocks: [
          {
            opcode: 'getRecentKeys',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Get recent keys',
          },
          {
            opcode: 'deleteFirstKey',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Delete the first key from history',
          },
        ],
      };
    }

    getRecentKeys() {
      return JSON.stringify(this.keyHistory);
    }

    deleteFirstKey() {
      if (this.keyHistory.length > 0) {
        this.keyHistory.shift();
      }
    }

    onKeyDown(event) {
      if (event.key && event.key.length === 1) {
        const key = event.key.toLowerCase();
          if (this.keyHistory.length >= MAX_KEY_HISTORY) {
            this.keyHistory.pop();
          }
          this.keyHistory.unshift(key);
      }
    }
  }

  const extension = new KeyHistoryExtension();
  Scratch.extensions.register(extension);

  document.addEventListener('keydown', (event) => extension.onKeyDown(event));

})(Scratch);
