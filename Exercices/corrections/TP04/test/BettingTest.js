/* eslint-disable */
var Betting = artifacts.require("Betting");

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
    assert.equal(match[3].toNumber(), 0, "Le match doit être au statut UNSETTLED");
    assert.equal(match[4], "libelle", "Le libelle du match n'est pas correct.");
    assert.equal(match[5].toNumber(), 10, "La date n'est pas correcte");
    assert.equal(match[6].toNumber(), 100, "La cote n'est pas correcte");
  });

  it("should finish the match  when the resolveMatch function is called", async () => {
    let mainAccount = accounts[0];
    let betting = await Betting.deployed();

    await betting.createMatch("homeTeam", "challengerTeam", "libelle", 10, 200, {
      gas: 1000000,
      from: mainAccount
    });

    await betting.resolveMatch(
      1, false, false, {
        gas: 300000,
        from: mainAccount
      });

    let match = await betting.matchs.call(0);

    assert.equal(match[3].toNumber(), 2, "Le match doit être terminé sur victoire challenger"); 
  })
});