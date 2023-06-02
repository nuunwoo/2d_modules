exports.Library = t => new (class MyLibrary {
    // ES10(ES2019) private field
    #target

    constructor(target) {
        this.#target = target
        return this
    }

    get() {
        return this.#target
    }

    getType() {
        return typeof this.#target
    }

    // method chaining test
    addText(s) {
        if(this.getType() === 'string') {
            this.#target += s
            return this
        } else {
            throw new Error('Type Error')
        }
    }

})(t)