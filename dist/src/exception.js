// TODO: Error handling
function raiseException(message) {
    if (message.type === "error") {
        console.error(message.reason);
    }
}
