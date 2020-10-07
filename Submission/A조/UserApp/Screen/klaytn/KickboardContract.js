import { cav } from 'klaytn/caver'

const KickboardContract = DEPLOYED_ABI
  && DEPLOYED_ADDRESS
  && new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
//배포 후 DEPLOYED_ABI, DEPLOYED_ADDRESS 파일 설정

export default KlaystagramContract