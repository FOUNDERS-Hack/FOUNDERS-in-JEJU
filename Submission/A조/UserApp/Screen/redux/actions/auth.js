import caver from 'klaytn/caver'
import {
  LOGIN,
  LOGOUT,
  INTEGRATE_WALLET,
  REMOVE_WALLET,
} from './actionTypes'

//db연동으로 해결?
const privateKey = '0x133390fc4b36aecaa88c484d67efc3a7daa4fd7a148dae0dea3d68902d8f1c61';
export const integrateWallet = () => (dispatch) => {
    const walletInstance = caver.klay.accounts.privateKeyToAccount(privateKey)
    caver.klay.accounts.wallet.add(walletInstance)
    sessionStorage.setItem('walletInstance', JSON.stringify(walletInstance))
    return dispatch({
        type: INTEGRATE_WALLET,
        payload: {
        privateKey,
        address: walletInstance.address,
        },
    })
}

export const removeWallet = () => (dispatch) => {
  caver.klay.accounts.wallet.clear()
  sessionStorage.removeItem('walletInstance')
  return dispatch({
    type: REMOVE_WALLET,
  })
}

export const login = () => (dispatch) => {
  dispatch(integrateWallet(privateKey))
  return dispatch({
    type: LOGIN,
  })
}

export const logout = () => (dispatch) => {
  dispatch(removeWallet())
  return dispatch({
    type: LOGOUT,
  })
}