/* eslint-disable func-names */
/**
 * idleTimer
 *
 * If user is idle for idleTime fire callback
 *
 * @param {object} options
 *    - {function} callback - fired when user is idle
 *    - {function} activeCallback - fired when user is active
 *    - {Number} idleTime - time in milliseconds
 *
 * https://www.npmjs.com/package/idle-timer
 */

export default function idleTimer(options) {
  // eslint-disable-next-line no-param-reassign
  options = options || {};
  const callback = options.callback || function () {};
  const activeCallback = options.activeCallback || function () {};
  const idleTime = options.idleTime || 60000;
  let isActive = true;
  let timer;

  function idle() {
    if (!isActive) return;
    isActive = false;
    callback();
  }
  function activate() {
    if (!isActive) {
      isActive = true;
      activeCallback();
    }
    clearTimeout(timer);
    timer = setTimeout(idle, idleTime);
  }

  function addOrRemoveEvents(addOrRemove) {
    window[addOrRemove]('load', activate);
    document[addOrRemove]('mousemove', activate);
    document[addOrRemove]('scroll', activate);
    document[addOrRemove]('keypress', activate);
    document[addOrRemove]('click', activate);
  }

  function destroy() {
    clearTimeout(timer);
    addOrRemoveEvents('removeEventListener');
  }

  addOrRemoveEvents('addEventListener');
  activate();

  return {
    activate,
    destroy,
    idle,
  };
}
