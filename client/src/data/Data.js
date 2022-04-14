const Data = (function () {
    return {
        init: function () {
            this.name = "Quang";
        },
        reset: function () {
            this.init();
        },
        setName: function (name) {
            this.name = name;
        },
        getName: function () {
            return this.name;
        }
    }
})();

Data.init();

export default Data;