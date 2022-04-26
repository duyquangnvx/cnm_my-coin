const Utility = (function () {

    return {

        getDateString: function () {
            return new Date().getDay().toString() + "." + new Date().getMonth().toString() + "." + new Date().getFullYear().toString();
        },
    }
})();

module.exports = Utility;