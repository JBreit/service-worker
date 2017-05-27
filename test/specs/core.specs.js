/* global jbreitGithubIo */
describe('Core', () => {
  it('node_experiments exists', () => expect(jbreitGithubIo).is.not.undefined );

  it('it can send friendly messages', () => {
    const greeter = new jbreitGithubIo();
    expect(greeter.message).is.equal('hi there Dear Coder!');
    // these white spaces will be trimmed
    greeter.message = '   goodbye         ';
    expect(greeter.message).is.equal('goodbye Dear Coder!');
  });
});
