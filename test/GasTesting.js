describe("GasTesting", function () {
  let gasTesting;

  beforeEach(async function () {
    const GasTesting = await ethers.getContractFactory("GasTesting");
    gasTesting = await GasTesting.deploy();
    await gasTesting.deployed();
  });

  it("Call doNothing() function", async function () {
    await gasTesting.doNothing();
  });
});
