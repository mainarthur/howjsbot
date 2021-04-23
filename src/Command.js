const { AT_SIGN, NOT_FOUND_INDEX } = require('./constants');

/**
 *
 */
class Command {
  /**
   *
   * @param {string} commandName - /commandName[@username]
   *
   * @returns {string} commandName without [@username]
   */
  static clearUsernameFromCommand(commandName) {
    const atSignIndex = commandName.indexOf(AT_SIGN);

    if (atSignIndex == NOT_FOUND_INDEX) {
      return commandName;
    }

    return commandName.substring(0, atSignIndex);
  }

  /**
   *
   * @param {string} commandName - /commandName
   * @param {string} [args] - /commandName arguments
   */
  constructor(commandName, args) {
    if (!commandName) {
      throw new Error('commandName is required');
    }
    /**
     * @property {string} commandName - /commandName
     */
    this.commandName = Command.clearUsernameFromCommand(commandName);

    /**
     * @property {string | null | undefined} arguments - /commandName arguments
     */
    this.arguments = args;
  }

  toString() {
    return `/${this.commandName} ${this.arguments}`;
  }
}

module.exports = Command;
