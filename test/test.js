var mochi = require('mochi')

describe('funderscore', function () {
  
  var _ = require('../.')

  it('has interface', function () {

    _.should.have.interface({
      pair: Function,
      key: Function,
      value: Function,
      contains: Function,
      some: Function,
      every: Function,
      first: Function,
      count: Function,
      filter: Function,
      forEach: Function,
      map: Function,
      reduce: Function,
      concat: Function,
      flatMap: Function,
      eq: Function,
      assert: Function,
      not: Function,
      and: Function,
      or: Function,
      xor: Function,
      select: Function
    })

  })

  describe('.key', function () {
    it('returns the key of a Pair', function () {
      _.key({jden:true})
        .should.equal('jden')
    })
  })

  describe('.value', function () {
    it('returns the value of a Pair', function () {
      _.value({foo: 'asd'})
        .should.equal('asd')
    })
  })

  describe('.first', function () {
    it('returns the first key/val of an object', function () {
      _.first({a:1,b:2})
        .should.deep.equal({a:1})
    })
  })

  describe('.select', function () {
    it('throws a TypeError if data is not an object', function () {
      mochi.expect(function () {
        _.select()
      }).to.throw(/missing required parameter `data`/)
    })
    it('throws a TypeError if projection is not an object', function () {
      mochi.expect(function () {
        _.select({})
      }).to.throw(/missing required parameter `projection`/)
    })
    it('returns a projection of an object', function (){
      var data = {
        a: 1,
        b: 2,
        c: 3
      }

      _.select(data, {a:true, b: true})
        .should.deep.equal({
          a: 1, b: 2
        })
    })
    it('can rename an key', function () {
      var data = {
        a: 1,
        b: 2,
        c: 3
      }

      _.select(data, {a:'A', c: 'C'})
        .should.deep.equal({
          A: 1, C: 3
        })
    })
    it('can take an array of strings as shorthand', function () {
      var data = {
        a: 1,
        b: 2,
        c: 3
      }

      _.select(data, ['a','c'])
        .should.deep.equal({
          a: 1, c: 3
        })
    })
    it('can take mixed arrays', function () {
      var data = {
        a: 1,
        b: 2,
        c: 3
      }

      _.select(data, ['a',{c:'C'}])
        .should.deep.equal({
          a: 1, C: 3
        })
    })
  })
})