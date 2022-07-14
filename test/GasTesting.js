describe("GasTesting", function () {
  let gasTestingPayable, gasTestingNonPayable;

  beforeEach(async function () {
    const GasTestingPayable = await ethers.getContractFactory(
      "GasTestingPayable"
    );
    gasTestingPayable = await GasTestingPayable.deploy();
    await gasTestingPayable.deployed();

    const GasTestingNonPayable = await ethers.getContractFactory(
      "GasTestingNonPayable"
    );
    gasTestingNonPayable = await GasTestingNonPayable.deploy();
    await gasTestingNonPayable.deployed();
  });

  it("Call doNothing() function", async function () {
    await gasTestingPayable.doNothing();
  });

  it("Call doNothingNonPayable() function", async function () {
    await gasTestingNonPayable.doNothingNonPayable();
  });
});
