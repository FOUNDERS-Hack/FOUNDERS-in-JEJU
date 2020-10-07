import Caver from 'caver-js'

export const config = {
  rpcURL: 'https://api.baobab.klaytn.net:8651'
}

export const cav = new Caver(config.rpcURL)

export default cav