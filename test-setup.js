before(() => {
    sinon.stub(console, 'error').callsFake((warning) => { throw new Error(warning) });
})

after(() => { console.error.restore() })