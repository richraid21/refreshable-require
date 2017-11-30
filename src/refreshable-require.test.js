const _keys = obj => Object.keys(obj)

describe('Refreshable Require', () => {
    
    describe('Unit Tests', () => {
        let rr
        
        beforeAll(() => {
            rr = require('./refreshable-require')
        })

        it('Should initialize in default state', () => {
            const modules = rr.modules
            const whitelist = rr.moduleWhitelist
            const options = rr.options
            
            expect(_keys(modules).length).toBe(0)
            expect(whitelist.length).toBe(0)
            expect(_keys(options).length).toBe(0)
        })

    })

    describe('Integration Tests', () => {

    })

})