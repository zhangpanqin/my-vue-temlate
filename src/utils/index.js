/**
 * @param {number} time
 * @returns {string}
 */
export function formatTime(time) {
    return `${time}`;
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
    const search = url.split('?')[1];
    if (!search) {
        return {};
    }
    return JSON.parse(
        `{"${
            decodeURIComponent(search)
                .replace(/"/g, '\\"')
                .replace(/&/g, '","')
                .replace(/=/g, '":"')
                .replace(/\+/g, ' ')
        }"}`,
    );
}
