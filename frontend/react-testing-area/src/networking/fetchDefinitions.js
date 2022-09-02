module.exports = async function fetchDefinitions(path, word) {
    const requestPath = path + '/definition/' + word;
    const response = await fetch(requestPath);
    return await response.json();
}