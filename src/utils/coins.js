import explorerList from 'agama-wallet-lib/src/coin-helpers';
import {
  IS_PBAAS,
  IS_ZCASH,
  IS_PBAAS_ROOT,
  IS_SAPLING,
  DEFAULT_DAEMON,
  KOMODO_DAEMON,
  Z_ONLY,
  IS_VERUS,
  ZCASH_DAEMON,
  ZCASH_CONF_NAME,
  KOMODO_CONF_NAME,
  ETH
} from './constants'
import networks from 'agama-wallet-lib/src/bitcoinjs-networks'
import { fromSats } from 'agama-wallet-lib/src/utils'
import komodoUtils from 'agama-wallet-lib/src/coin-helpers';
import { coinDataDirectories } from './coinDataDirectories';
import { CHAIN_PARAMS } from './chainParams';

/**
 * Aggregates all relevant coin data needed in order to add
 * a coin to the wallet based on its chain ticker
 * @param {String} chainTicker Coin to add's chain ticker
 * @param {Boolean} mode The mode the coin is being added in
 */
export const getCoinOptions = (chainTicker, mode) => {
  const chainTickerUc = chainTicker.toUpperCase()
  const chainTickerLc = chainTickerUc.toLowerCase()
  let tags = {}
  let options = {
    dustThreshold: 0,
  }

  if (explorerList.explorerList[chainTickerUc]) options.explorer = explorerList.explorerList[chainTickerUc]

  // Determine available modes based on available coin data and libraries
  if (mode !== ETH) {
    if (CHAIN_PARAMS[chainTickerUc] || chainTickerUc === 'KMD') {
      if (chainTickerUc !== 'KMD' && CHAIN_PARAMS[chainTickerUc].ac_private) {
        tags = {...tags, [IS_ZCASH]: true, [IS_SAPLING]: true, [Z_ONLY]: true}
      }

      options.dirNames = coinDataDirectories[chainTickerUc]

      if (komodoUtils.isKomodoCoin(chainTickerUc) && chainTickerUc !== 'VRSC' && chainTickerUc !== 'VRSCTEST') {
        options.daemon = KOMODO_DAEMON  // komodod

        if (chainTickerUc === 'KMD') options.confName = KOMODO_CONF_NAME // komodo.conf
      } else if (chainTickerUc === 'ZEC') {
        options.daemon = ZCASH_DAEMON // zcashd
        options.confName = ZCASH_CONF_NAME // zcash.conf
      } else {
        options.daemon = DEFAULT_DAEMON // verusd
      }
    }

    if (networks[chainTickerLc]) {
      if (chainTickerUc !== 'KMD' && networks[chainTickerLc].isZcash) tags[IS_ZCASH] = true
      if (networks[chainTickerLc].sapling) {
        tags[IS_SAPLING] = true
        options.saplingHeight = networks[chainTickerLc].saplingActivationHeight
      }
      if (networks[chainTickerLc].dustThreshold) options.dustThreshold = fromSats(networks[chainTickerLc].dustThreshold)
    }

    // Determine if chain is pbaas compatible, and if it is a pbaas root chain
    if (chainTickerUc === 'VRSCTEST') {
      tags = {
        ...tags,
        [IS_ZCASH]: true,
        [IS_PBAAS]: true,
        [IS_SAPLING]: true,
        [IS_PBAAS_ROOT]: true,
        [IS_VERUS]: true,
      };
      options.daemon = DEFAULT_DAEMON
    } else if (chainTickerUc === 'VRSC') {
      tags[IS_VERUS] = true
    }
  } 

  options.tags = Object.keys(tags)
  return options
}

