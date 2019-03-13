/* eslint-disable */
var Betting = artifacts.require("Betting");
let BigNumber = require('bignumber.js');

contract('Betting', async (accounts) => {
  it("should persist a match when the createMatch function is called", async () => {
    let betting = await Betting.deployed();
    let mainAccount = accounts[0];

    await betting.createMatch("homeTeam", "challengerTeam", "libelle", 10, 100, {
      gas: 1000000,
      from: mainAccount
    });

    let match = await betting.matchs.call(0);
    assert.equal(match[0].toNumber(), 1, "l'id du match est incorrect");
    assert.equal(match[1], "homeTeam", "La home team n'est pas correcte");
    assert.equal(match[2], "challengerTeam", "La home des challengers n'est pas correcte");
    assert.equal(match[3], true, "Le match ne doit pas être terminé - victoire homeTeam");
    assert.equal(match[4], true, "Le match ne doit pas être terminé - égalité");
    assert.equal(match[5], "libelle", "Le libelle du match n'est pas correct.");
    assert.equal(match[6].toNumber(), 10, "La date n'est pas correcte");
    assert.equal(match[7], false, "Le match ne doit pas être terminé");
    assert.equal(match[8].toNumber(), 100, "La cote n'est pas correcte");
  });
});