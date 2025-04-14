const sessions = {};

module.exports = {
get: (id) => sessions[id],
set: (id, data) => { sessions[id] = data },
remove: (id) => { delete sessions[id] },
};