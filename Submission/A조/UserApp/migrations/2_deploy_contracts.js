const SOME = artifacts.require('./Kickboard.sol')
const fs = require('fs')

module.exports = function (deployer) {
  deployer.deploy(SOME)
    .then(() => {
    if (SOME._json) {
      // 1. 최근에 배포한 컨트랙트의 ABI 파일을 'deployedABI'에 기록합니다.
      fs.writeFile(
        'deployedABI',
        JSON.stringify(SOME._json.abi, 2),
        (err) => {
          if (err) throw err
          console.log(`The abi of ${SOME._json.contractName} is recorded on deployedABI file`)
        })
    }

    // 2. 최근에 배포한 컨트랙트 주소를 'deployedAddress'에 기록합니다.
    fs.writeFile(
      'deployedAddress',
      SOME.address,
      (err) => {
        if (err) throw err
        console.log(`The deployed contract address * ${SOME.address} * is recorded on deployedAddress file`)
    })
  })
}