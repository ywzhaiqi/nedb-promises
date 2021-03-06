const {expect} = require('chai'),
	Datastore = require('../lib/Datastore');

describe('Find', () => {
	let documents = [
		{ name: 'first document' },
		{ name: 'second document' },
		{ name: 'third document' }
	];

	describe(`single`, () => {
		let db = new Datastore();
		it('should find the first inserted doc', () => {
			return db.insert(documents)
				.then(() => {
					return db.findOne();
				}).then((result) => {
					expect(result).to.be.an('object').that.has.all.keys('_id', 'name');
				});
		});
	});

	describe(`bulk`, () => {
		let db = new Datastore();
		it('should find all inserted docs', () => {
			return db.insert(documents)
				.then(() => {
					return db.find().exec();
				}).then((result) => {
					expect(result).to.be.an('array').that.has.lengthOf(3);
				});
		});
	});

  describe(`find().then()`, () => {
    let db = new Datastore();
    it('should find all inserted docs', () => {
      return db.insert(documents)
        .then(() => {
          return db.find().then((result) => {
            expect(result).to.be.an('array').that.has.lengthOf(3);
          });
        });
    });
  });
});