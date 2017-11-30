
class RefreshableRequire {
    constructor(){
        this.modules = {}
        this.moduleWhitelist = []
        this.options = {}
    }

    config(options = {}){
        this.options = options
        
        if (this.options.refreshOnSignal){
            const signal = this.options.refreshOnSignal
            process.on(signal, () => {
                this.emptyCache()
            })
        }

        if (this.options.modules){
            this.moduleWhitelist = this.options.modules
        }
    }

    age(module){
        const path = arguments[0]
        if (!this.modules[path])
            return null
        
        return this.modules[path].lastReload
    }

    require(module){
        const path = arguments[0]

        if (!this.moduleWhitelist.includes(path) && this.moduleWhitelist.length > 0){
            return require(path)
        }

        if (!this.modules.hasOwnProperty(path)){
            this.modules[path] = { lastReload: Date.now() }
        }

        return require(path)
    }

    refresh(module){
        const path = arguments[0]
        
        if (this.modules.hasOwnProperty(path)){
            console.log('Deleting ', path)
            delete require.cache[require.resolve(path)]
            delete this.modules[path]
        }

        return this.require(path)
    }
    
    emptyCache(){
        console.log('Clearing cache')
        Object.keys(this.modules).forEach((path) => {
            this.refresh(path)
        })
    }
}

module.exports = new RefreshableRequire()